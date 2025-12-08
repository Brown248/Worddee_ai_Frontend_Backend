from tinydb import TinyDB, Query
from datetime import datetime

db = TinyDB('db.json')
history_table = db.table('history')

def save_result(word: str, score: float, user_sentence: str, duration: float = 0):
    today = datetime.now().strftime("%Y-%m-%d")
    history_table.insert({
        "date": today,
        "word": word,
        "score": score,
        "sentence": user_sentence,
        "duration": duration, 
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

    chart_data = []
    seen_dates = set()
    
    for record in all_records[-10:]:
        d_str = record['date'][5:] # เอาแค่ MM-DD
        chart_data.append({"name": d_str, "score": record['score']})
        seen_dates.add(record['date'])

    total_seconds = sum(r.get('duration', 720) for r in all_records)  
    hours_learned = total_seconds / 3600

    return {
        "day_streak": len(seen_dates),
        "hours_learned": hours_learned,
        "missions_completed": datetime.now().strftime("%Y-%m-%d") in seen_dates,
        "chart_data": chart_data
    }