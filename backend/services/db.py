from tinydb import TinyDB, Query
from datetime import datetime

# สร้างไฟล์ Database ชื่อ db.json (จะถูกสร้างเองอัตโนมัติ)
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

    # คำนวณข้อมูลจริง (Simple Logic)
    # 1. Chart Data (Average score per day)
    chart_data = []
    # (ในโค้ดจริงส่วนนี้สามารถเขียน Group by Date ได้ แต่ทำแบบย่อเพื่อความเข้าใจ)
    for record in all_records[-7:]: # เอา 7 ครั้งล่าสุด
        chart_data.append({
            "name": record['date'][5:], # show MM-DD
            "score": record['score']
        })

    return {
        "day_streak": len(set(r['date'] for r in all_records)), # นับวันที่ไม่ซ้ำ
        "hours_learned": len(all_records) * 0.2, # สมมติว่า 1 ข้อใช้เวลา 0.2 ชม.
        "missions_completed": len([r for r in all_records if r['date'] == datetime.now().strftime("%Y-%m-%d")]) >= 1,
        "chart_data": chart_data
    }