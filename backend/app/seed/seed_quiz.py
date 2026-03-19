import json
from pathlib import Path

from app.db.session import SessionLocal
from app.models.quiz import QuizQuestion


def main() -> None:
    data_path = Path(__file__).with_name("quiz_questions.json")
    data = json.loads(data_path.read_text(encoding="utf-8"))

    with SessionLocal() as db:
        existing = db.query(QuizQuestion).count()
        if existing:
            print(f"Quiz questions already exist: {existing}")
            return

        questions = [
            QuizQuestion(
                question=item["question"],
                options=item["options"],
                correct_index=item["correct_index"],
                explanation=item["explanation"],
                pool=item.get("pool", "daily"),
            )
            for item in data
        ]
        db.add_all(questions)
        db.commit()
        print(f"Inserted {len(questions)} quiz questions.")


if __name__ == "__main__":
    main()
