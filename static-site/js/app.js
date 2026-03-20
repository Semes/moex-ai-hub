/**
 * MOEX Agent Hub — shared application logic for static HTML site.
 * Plain JavaScript, no modules. Requires icons.js for icon().
 */

// ——— 1. Likes System (localStorage) ———
const LikesStore = {
  _key: 'moex-agent-hub-likes',
  _liked: new Set(JSON.parse(localStorage.getItem('moex-agent-hub-likes') || '[]')),
  _listeners: [],

  isLiked(id) {
    return this._liked.has(id);
  },

  toggle(id) {
    if (this._liked.has(id)) this._liked.delete(id);
    else this._liked.add(id);
    localStorage.setItem(this._key, JSON.stringify([...this._liked]));
    this._listeners.forEach(fn => fn());
  },

  getEffective(id, baseLikes) {
    return baseLikes + (this._liked.has(id) ? 1 : 0);
  },

  onChange(fn) {
    this._listeners.push(fn);
  },
};

// ——— 2. User Settings (from backend API) ———
const UserSettings = {
  _settings: null,
  _loaded: false,

  async load() {
    if (this._loaded) return this._settings;
    try {
      // Try to get auth token from sessionStorage (set by Keycloak redirect)
      const token = sessionStorage.getItem('auth_token');
      if (!token) { this._loaded = true; return null; }

      const res = await fetch('/api/v1/me/settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(res.status);
      this._settings = await res.json();
      this._loaded = true;
      return this._settings;
    } catch (e) {
      console.warn('Settings unavailable (static mode):', e.message);
      this._loaded = true;
      return null;
    }
  },

  isProductEnabled(productId) {
    if (!this._settings) return true; // static mode = everything visible
    return this._settings.products[productId] !== false;
  },

  isModelEnabled(modelAlias) {
    if (!this._settings) return true;
    return this._settings.models[modelAlias] !== false;
  },

  getApiKey() {
    return this._settings?.api_key || null;
  },

  isAdmin() {
    // Check from sessionStorage token payload
    try {
      const token = sessionStorage.getItem('auth_token');
      if (!token) return false;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return (payload.realm_access?.roles || []).includes('admin');
    } catch { return false; }
  }
};

// ——— 3. Toast notifications ———
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ——— 4. Clipboard copy ———
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Скопировано! Вставьте в чат AI-продукта');
  } catch {
    showToast('Не удалось скопировать', 'error');
  }
}

// ——— 5. Dialog/Modal system ———
function openDialog(contentHtml) {
  closeDialog();
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.id = 'dialog-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Детали материала');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDialog();
  });
  overlay.innerHTML = `<div class="dialog-content">${contentHtml}</div>`;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  // Focus the close button for keyboard accessibility
  const closeBtn = overlay.querySelector('.dialog-close');
  if (closeBtn) closeBtn.focus();
  // Focus trap
  overlay.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;
    const focusable = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  document.addEventListener('keydown', _dialogEscHandler);
}

function closeDialog() {
  const overlay = document.getElementById('dialog-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = '';
  }
  document.removeEventListener('keydown', _dialogEscHandler);
}

function _dialogEscHandler(e) {
  if (e.key === 'Escape') closeDialog();
}

// ——— 6. HTML escape utility ———
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ——— 7. Display tags helper ———
// getDisplayTags is defined in data.js (returns up to 4 tags for cards)

// ——— 8. Installation steps helper (skills only) ———
function getInstallationSteps(item) {
  const content = (item.content || '').trim();
  let steps = [];

  if (content.startsWith('{') || content.startsWith('[')) {
    // JSON content — MCP server config
    steps = [
      'Откройте VS Code с расширением Kilo Code',
      'Нажмите на иконку Kilo Code в боковой панели',
      'Перейдите в настройки \u2192 MCP Servers',
      'Нажмите "Edit MCP Settings" (откроется mcp.json)',
      'Вставьте скопированную конфигурацию в файл',
      'Сохраните файл \u2014 сервер подключится автоматически',
    ];
  } else if (/slug\s*:/m.test(content) || /roleDefinition\s*:/m.test(content)) {
    // YAML content — Custom Modes
    steps = [
      'Откройте VS Code с расширением Kilo Code',
      'Нажмите на иконку Kilo Code в боковой панели',
      'Перейдите в настройки \u2192 Custom Modes',
      'Нажмите "+" чтобы создать новый режим',
      'Вставьте скопированное содержимое',
      'Сохраните \u2014 режим появится в списке доступных',
    ];
  } else {
    // Markdown / Rules content (starts with # or fallback)
    steps = [
      'В корне вашего проекта создайте папку .kilocode/rules/',
      'Скачайте файл кнопкой "Скачать файл" выше',
      'Поместите скачанный .md файл в папку .kilocode/rules/',
      'Откройте VS Code \u2014 Kilo Code автоматически подхватит правила',
      'Правила будут применяться ко всем задачам в этом проекте',
    ];
  }

  return steps.map((text, i) => `
    <div class="flex gap-3 items-start">
      <span class="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF0508] text-white text-xs font-bold flex items-center justify-center">${i + 1}</span>
      <p class="body-text-sm text-[#5c5f63]">${text}</p>
    </div>`).join('');
}

// ——— 9. Modal like toggle (in-place update, no re-render) ———
function toggleModalLike(id, baseLikes) {
  LikesStore.toggle(id);
  const btn = document.getElementById('modal-like-btn');
  if (!btn) return;
  const isLiked = LikesStore.isLiked(id);
  const count = LikesStore.getEffective(id, baseLikes);
  btn.innerHTML = `${icon('heart', 'w-5 h-5')} ${count}`;
  btn.className = `cursor-pointer inline-flex items-center gap-2 min-h-[44px] px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isLiked ? 'text-[#FF0508] bg-red-50' : 'text-[#5c5f63] hover:text-[#FF0508] hover:bg-[#FBF7F3]'}`;
}

// ——— 9b. Card like toggle (in-place update, no card re-render) ———
function toggleCardLike(btn, id, baseLikes) {
  const isLiked = LikesStore.isLiked(id);
  const count = LikesStore.getEffective(id, baseLikes);
  btn.innerHTML = `${icon('heart', 'h-5 w-5')} ${count}`;
  btn.className = `flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm font-medium transition-colors ${isLiked ? 'text-[#FF0508] bg-red-50' : 'text-[#5c5f63] hover:text-[#FF0508] hover:bg-[#FBF7F3]'}`;
}

// ——— 10. Prompt Detail Dialog ———
function _slugify(text) {
  const ru = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
  return text.toLowerCase().replace(/[а-яё]/g, c => ru[c] || c).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

function _getSkillExtension(content) {
  const trimmed = content.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return '.json';
  if (/^customModes\s*:/m.test(trimmed) || /^slug\s*:/m.test(trimmed) || /roleDefinition\s*:/m.test(trimmed)) return '.yaml';
  return '.md';
}

function downloadSkillFile(itemId) {
  const item = marketplaceItems.find(i => i.id === itemId);
  if (!item) return;
  const ext = _getSkillExtension(item.content);
  const filename = _slugify(item.title) + ext;
  const blob = new Blob([item.content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Файл скачан: ' + filename);
}

function openPromptDetail(item) {
  const liked = LikesStore.isLiked(item.id);
  const likes = LikesStore.getEffective(item.id, item.likes);
  const tags = (item.tags || []).slice(0, 10); // show more tags in detail view

  const productBadgeClass = getProductBadgeClass(item.product);

  // Render content: prompts as pre on dark bg, MCP markdown rendered, skills as pre
  let contentBlock;
  const trimmedContent = (item.content || '').trim();
  const copyCodeBtn = `<button onclick="event.stopPropagation();copyToClipboard(marketplaceItems.find(i=>i.id==='${item.id}').content)" class="absolute top-3 right-3 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-colors" title="Копировать">${icon('copy','w-4 h-4')}</button>`;
  if (item.type === 'prompt') {
    contentBlock = `
      <div class="relative rounded-lg border border-[#EEE7DC] bg-[#1e1e2e] p-4 mb-4 overflow-x-auto">
        ${copyCodeBtn}
        <pre class="whitespace-pre-wrap text-xs font-mono leading-relaxed text-[#cdd6f4]">${escapeHtml(item.content)}</pre>
      </div>`;
  } else if (item.type === 'mcp' && !trimmedContent.startsWith('{') && !trimmedContent.startsWith('[')) {
    // MCP with markdown content: render as markdown
    const rendered = typeof marked !== 'undefined' ? marked.parse(item.content) : `<pre>${escapeHtml(item.content)}</pre>`;
    contentBlock = `
      <div class="rounded-lg border border-[#EEE7DC] bg-white p-5 mb-4 markdown-body">
        ${rendered}
      </div>`;
  } else {
    // Skills and MCP with JSON: dark background, code
    contentBlock = `
      <div class="relative rounded-lg border border-[#EEE7DC] bg-[#1e1e2e] p-4 mb-4 overflow-x-auto">
        ${copyCodeBtn}
        <pre class="whitespace-pre-wrap text-xs font-mono leading-relaxed text-[#cdd6f4]">${escapeHtml(item.content)}</pre>
      </div>`;
  }

  // Download button (skills only)
  const downloadBtn = (item.type === 'skill' || item.type === 'mcp')
    ? `<button onclick="downloadSkillFile('${item.id}')"
        class="cursor-pointer inline-flex items-center gap-1.5 h-8 px-3 bg-[#33373B] text-white text-xs font-medium rounded-lg hover:bg-[#FF0508] transition-colors">
        ${icon('download', 'w-3 h-3')} Скачать файл
      </button>`
    : '';

  const html = `
    <button onclick="closeDialog()" class="dialog-close" aria-label="Закрыть">${icon('x', 'w-5 h-5')}</button>
    <div class="flex items-center gap-2 flex-wrap mb-2">
      <span class="badge-text px-2 py-0.5 rounded-md ${productBadgeClass}">${item.product}</span>
      <span class="badge-text px-2 py-0.5 rounded-md border border-[#EEE7DC] text-[#5c5f63]">${item.type === 'prompt' ? 'Промпт' : item.type === 'mcp' ? 'MCP-сервер' : 'Скилл'}</span>
    </div>
    <h2 class="section-title mb-1">${item.title}</h2>
    <p class="body-text-sm mb-4">${item.description}</p>
    ${contentBlock}
    ${(item.type === 'skill' || item.type === 'mcp') ? `
    <div class="mt-6 p-5 bg-[#FBF7F3] rounded-xl border border-[#EEE7DC] mb-4">
      <h3 class="font-semibold text-[#33373B] mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-[#FF0508]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        Как установить
      </h3>
      <div class="space-y-3">
        ${getInstallationSteps(item)}
      </div>
    </div>` : ''}
    <div class="flex flex-wrap gap-1.5 mb-4">
      ${tags.map(t => `<span class="inline-flex items-center rounded-md bg-[#EEE7DC]/50 px-2 py-0.5 badge-text text-[#5c5f63]">${t}</span>`).join('')}
    </div>
    <div class="flex items-center justify-between border-t border-[#EEE7DC] pt-4 flex-wrap gap-3">
      <div class="flex items-center gap-4 text-xs text-[#5c5f63]">
        <span>${item.author}</span>
        <span class="flex items-center gap-1">${icon('calendar', 'w-3 h-3')} ${new Date(item.createdAt).toLocaleDateString('ru-RU')}</span>
      </div>
      <div class="flex items-center gap-2">
        <button id="modal-like-btn" onclick="toggleModalLike('${item.id}', ${item.likes})"
          class="cursor-pointer inline-flex items-center gap-2 min-h-[44px] px-3 py-2 text-sm font-medium rounded-lg transition-colors ${liked ? 'text-[#FF0508] bg-red-50' : 'text-[#5c5f63] hover:text-[#FF0508] hover:bg-[#FBF7F3]'}">
          ${icon('heart', 'w-5 h-5')} ${likes}
        </button>
        <button onclick="copyToClipboard(marketplaceItems.find(i=>i.id==='${item.id}').content)"
          class="cursor-pointer inline-flex items-center gap-1.5 h-8 px-3 bg-[#33373B] text-white text-xs font-medium rounded-lg hover:bg-[#FF0508] transition-colors">
          ${icon('copy', 'w-3 h-3')} Копировать
        </button>
        ${downloadBtn}
      </div>
    </div>
  `;
  openDialog(html);
}

// ——— 11. Render header ———
function renderHeader(currentPath) {
  const navLinks = [
    { href: 'index.html', label: 'Главная', file: 'index.html', isHome: true },
    { href: 'library.html', label: 'Библиотека', file: 'library.html' },
    { href: 'learn.html', label: 'Обучение', file: 'learn.html' },
    { href: 'leaderboard.html', label: 'Лидерборд', file: 'leaderboard.html' },
    { href: 'profile.html', label: 'Личный кабинет', file: 'profile.html' },
  ];

  // Conditionally add admin link for users with admin role
  if (UserSettings.isAdmin()) {
    navLinks.push({ href: 'admin.html', label: 'Админка', file: 'admin.html' });
  }

  const pathname = window.location.pathname;
  const page = pathname.split('/').pop() || '';

  function _isNavActive(link) {
    if (link.isHome) {
      // Home matches: empty filename, bare '/', or 'index.html'
      return page === '' || page === '/' || page === 'index.html' || pathname === '/';
    }
    return page === link.file;
  }

  const desktopNav = navLinks
    .map((link) => {
      const active = _isNavActive(link);
      return `<a href="${link.href}" class="px-4 py-2 text-sm font-medium rounded-lg transition-colors ${active ? 'text-[#33373B] bg-[#EEE7DC]/60' : 'text-[#5c5f63] hover:text-[#33373B] hover:bg-[#FBF7F3]'}">${link.label}</a>`;
    })
    .join('');

  const mobileNav = navLinks
    .map((link) => {
      const active = _isNavActive(link);
      return `<a href="${link.href}" onclick="closeMobileMenu()" class="block px-3 py-2 text-sm font-medium rounded-md transition-colors ${active ? 'text-[#33373B] bg-[#EEE7DC]/60' : 'text-[#5c5f63] hover:text-[#33373B] hover:bg-[#FBF7F3]'}">${link.label}</a>`;
    })
    .join('');

  return `
  <header class="sticky top-0 z-50 w-full border-b border-[#EEE7DC] bg-white/90 backdrop-blur-lg">
    <div class="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-4 sm:px-6">
      <a href="index.html" class="flex flex-col justify-center">
        <span class="text-lg font-bold tracking-tight text-[#33373B] leading-tight">MOEX <span class="text-[#FF0508]">Agent</span> Hub</span>
        <span class="badge-text text-[#5c5f63] leading-tight">Офис по развитию ИИ</span>
      </a>
      <nav class="hidden md:flex items-center gap-1">${desktopNav}</nav>
      <div class="hidden md:flex items-center">
        <a href="submit.html" class="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#FF0508] text-sm font-semibold text-white hover:bg-[#d90407] shadow-sm transition-colors">
          ${icon('plus', 'w-4 h-4')} Предложить материал
        </a>
      </div>
      <button onclick="openMobileMenu()" id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-[#FBF7F3]" aria-label="Меню" aria-expanded="false">
        ${icon('menu', 'w-5 h-5')}
      </button>
    </div>
  </header>
  <template id="mobile-menu-template">
    <div class="mobile-menu-overlay" onclick="closeMobileMenu()"></div>
    <div class="mobile-menu">
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm font-bold text-[#33373B]">Навигация</span>
        <button onclick="closeMobileMenu()" class="p-1 rounded hover:bg-[#FBF7F3]">${icon('x', 'w-5 h-5')}</button>
      </div>
      <hr class="border-[#EEE7DC] mb-3">
      <nav class="flex flex-col gap-1">
        ${mobileNav}
        <hr class="border-[#EEE7DC] my-2">
        <a href="submit.html" onclick="closeMobileMenu()" class="mx-3 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-[#FF0508] text-sm font-semibold text-white hover:bg-[#d90407]">
          ${icon('plus', 'w-3.5 h-3.5')} Предложить материал
        </a>
      </nav>
    </div>
  </template>`;
}

// ——— 12. Mobile menu ———
function openMobileMenu() {
  const tpl = document.getElementById('mobile-menu-template');
  if (!tpl) return;
  const wrapper = document.createElement('div');
  wrapper.id = 'mobile-menu-wrapper';
  wrapper.innerHTML = tpl.innerHTML;
  document.body.appendChild(wrapper);
  document.body.style.overflow = 'hidden';
  const btn = document.getElementById('mobile-menu-btn');
  if (btn) btn.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  const w = document.getElementById('mobile-menu-wrapper');
  if (w) {
    w.remove();
    document.body.style.overflow = '';
  }
  const btn = document.getElementById('mobile-menu-btn');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

// ——— 13. Render footer ———
function renderFooter() {
  return `
  <footer class="border-t border-[#EEE7DC] bg-[#FBF7F3]">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div class="space-y-2">
          <span class="text-sm font-bold text-[#33373B] block">MOEX <span class="text-[#FF0508]">Agent</span> Hub</span>
          <span class="badge-text text-[#5c5f63]">Офис по развитию ИИ</span>
          <p class="max-w-xs text-xs leading-relaxed text-[#5c5f63]">Единая платформа AI-инструментов.</p>
        </div>
        <div class="flex gap-12 text-xs">
          <div class="space-y-2">
            <p class="badge-text font-semibold text-[#5c5f63] uppercase tracking-wider">Продукты</p>
            <nav class="flex flex-col gap-1.5">
              <a href="library.html" class="text-[#5c5f63] hover:text-[#33373B] transition-colors">MOEX GPT</a>
              <a href="library.html" class="text-[#5c5f63] hover:text-[#33373B] transition-colors">MOEX Insight</a>
              <a href="library.html" class="text-[#5c5f63] hover:text-[#33373B] transition-colors">Code Agent</a>
              <a href="library.html" class="text-[#5c5f63] hover:text-[#33373B] transition-colors">Dion Agent</a>
            </nav>
          </div>
          <div class="space-y-2">
            <p class="badge-text font-semibold text-[#5c5f63] uppercase tracking-wider">Ресурсы</p>
            <nav class="flex flex-col gap-1.5">
              <a href="library.html" class="text-[#5c5f63] hover:text-[#33373B] transition-colors">Библиотека</a>
              <a href="learn.html" class="text-[#5c5f63] hover:text-[#33373B] transition-colors">Обучение</a>
              <a href="leaderboard.html" class="text-[#5c5f63] hover:text-[#33373B] transition-colors">Лидерборд</a>
            </nav>
          </div>
        </div>
      </div>
      <div class="mt-8 border-t border-[#EEE7DC] pt-4">
        <p class="badge-text text-[#5c5f63]">&copy; ${new Date().getFullYear()} ПАО Московская Биржа. Все данные конфиденциальны.</p>
      </div>
    </div>
  </footer>`;
}

// ——— 14. Page init ———
function initPage() {
  const currentPath = window.location.pathname;
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = renderHeader(currentPath);
  if (footerEl) footerEl.innerHTML = renderFooter();
}

document.addEventListener('DOMContentLoaded', initPage);

// ——— 15. Accessibility: keyboard activation for role="button" elements ———
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"]')) {
    e.preventDefault();
    e.target.click();
  }
});
