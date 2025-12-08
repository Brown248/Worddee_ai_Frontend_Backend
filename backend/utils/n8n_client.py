import requests
import os
import json
import re

def send_to_n8n(word: str, sentence: str):
    # แก้ URL ให้ตรงกับ n8n ของคุณ (validate-sentence)
    webhook_url = os.getenv("N8N_WEBHOOK_URL", "http://localhost:5678/webhook/validate-sentence")

    payload = {
        "word": word,
        "sentence": sentence
    }

    print(f"🚀 Sending to n8n: {webhook_url}")

    try:
        resp = requests.post(webhook_url, json=payload, timeout=30)
        print(f"📩 Raw response from n8n: {resp.text}")

        # --- ส่วน Auto-Clean JSON ---
        data = None
        raw_text = resp.text

        def clean_json_text(text):
            return re.sub(r'```json\s*|\s*```', '', text, flags=re.IGNORECASE).strip()

        try:
            cleaned = clean_json_text(raw_text)
            data = json.loads(cleaned)
        except:
            pass

        if not data:
            try:
                temp_data = resp.json()
                if isinstance(temp_data, dict):
                    if 'score' in temp_data:
                        data = temp_data
                    else:
                        inner_text = temp_data.get('text') or temp_data.get('content') or temp_data.get('output') or json.dumps(temp_data)
                        if isinstance(inner_text, str):
                            cleaned = clean_json_text(inner_text)
                            data = json.loads(cleaned)
            except:
                pass

        if not data or not isinstance(data, dict):
             raise Exception("Could not parse AI response")
        
        return {
            "score": float(data.get("score", 0.0)),
            "level": data.get("level", "Unknown"),
            "suggestion": data.get("suggestion", "No suggestion provided."),
            "corrected_sentence": data.get("corrected_sentence", sentence)
        }

    except Exception as e:
        print(f"❌ Error connecting to n8n: {e}")
        return {
            "score": 0.0,
            "level": "Connection Error",
            "suggestion": f"AI Error: {str(e)}",
            "corrected_sentence": sentence
        }