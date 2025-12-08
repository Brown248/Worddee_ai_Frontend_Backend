from tinydb import TinyDB, Query
from datetime import datetime

# สร้างไฟล์ Database (db.json จะถูกสร้างอัตโนมัติ)
db = TinyDB('db.json')
history_table = db.table('history')

def save_result(word: str, score: float, user_sentence: str):
    today = datetime.now().strftime("%Y-%m-%d")
    history_table.insert({
        "date": today,
        "word": word,
        "score": score,
        "sentence": user_sentence,
        "timestamp": datetime.now().isoformat()
    })

def get_stats():
    all_records = history_table.all()
    if not all_records:
        return {
            "day_streak": 0,
            "hours_learned": 0,
            "missions_completed": False,
            "chart_data": []
        }

    # ข้อมูลสำหรับกราฟ (Average score per day - แบบย่อ)
    chart_data = []
    seen_dates = set()
    for record in all_records[-10:]: # 10 records ล่าสุด
        d_str = record['date'][5:] # เอาแค่ MM-DD
        chart_data.append({"name": d_str, "score": record['score']})
        seen_dates.add(record['date'])

    return {
        "day_streak": len(seen_dates),
        "hours_learned": len(all_records) * 0.2, # สมมติว่า 1 คำ = 12 นาที (0.2 ชม.)
        "missions_completed": datetime.now().strftime("%Y-%m-%d") in seen_dates,
        "chart_data": chart_data
    }