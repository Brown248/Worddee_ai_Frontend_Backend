import requests
import os
import json
import re

def send_to_n8n(word: str, sentence: str):
    webhook_url = os.getenv("N8N_WEBHOOK_URL", "http://localhost:5678/webhook/validate-sentence")

    payload = {
        "word": word,
        "sentence": sentence
    }

    print(f" Sending to n8n: {webhook_url}")

    try:
        # เพิ่ม timeout เป็น 30 วินาที เผื่อ AI คิดนาน
        resp = requests.post(webhook_url, json=payload, timeout=30)
        raw_text = resp.text
        print(f" Raw response from n8n: {raw_text}")

        data = None

        def extract_json_from_text(text):
            try:
                start = text.find('{')
                end = text.rfind('}')
                
                if start != -1 and end != -1:
                    json_str = text[start : end + 1]
                    return json.loads(json_str)
            except Exception as e:
                print(f" Failed to extract JSON: {e}")
            return None

        data = extract_json_from_text(raw_text)

        if not data:
            try:
                temp_json = resp.json()
                if isinstance(temp_json, dict):
                    # ถ้าโชคดี เจอ keys ที่ต้องการเลย
                    if 'score' in temp_json:
                        data = temp_json
                    else:
                        for key in ['text', 'content', 'output', 'message', 'response']:
                            if key in temp_json and isinstance(temp_json[key], str):
                                data = extract_json_from_text(temp_json[key])
                                if data: break
            except:
                pass


        if not data or not isinstance(data, dict):
             print("Parsing failed completely.")
             raise Exception("AI did not return a valid score (Format Error).")
        
        return {
            "score": float(data.get("score", 0.0)),
            "level": str(data.get("level", "Unknown")),
            "suggestion": str(data.get("suggestion", "No suggestion provided.")),
            "corrected_sentence": str(data.get("corrected_sentence", sentence))
        }

    except Exception as e:
        print(f"Critical Error: {e}")
        return {
            "score": 0.0,
            "level": "AI Error",
            "suggestion": "Could not parse AI response. Please try again.",
            "corrected_sentence": sentence
        }