import json
from pathlib import Path

from app.db.session import SessionLocal
from app.models.content import ContentItem


def main() -> None:
    data_path = Path(__file__).with_name("content_items.json")
    data = json.loads(data_path.read_text(encoding="utf-8"))

    with SessionLocal() as db:
        existing = db.query(ContentItem).count()
        if existing:
            print(f"Content items already exist: {existing}")
            return

        items = [
            ContentItem(
                title=item["title"],
                description=item.get("description"),
                content=item["content"],
                type=item.get("type", "prompt"),
                product=item["product"],
                author_name=item.get("author_name", "Unknown"),
                author_sub=item.get("author_sub"),
                status=item.get("status", "published"),
                tags=item.get("tags", []),
                likes_count=item.get("likes_count", 0),
            )
            for item in data
        ]
        db.add_all(items)
        db.commit()
        print(f"Inserted {len(items)} content items.")


if __name__ == "__main__":
    main()
