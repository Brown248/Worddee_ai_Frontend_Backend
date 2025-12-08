import requests
import os
import json

def send_to_n8n(word: str, sentence: str):
    webhook_url = os.getenv("N8N_WEBHOOK_URL", "http://localhost:5678/webhook/Gen_word")

    payload = {
        "word": word,
        "sentence": sentence
    }

    try:
        resp = requests.post(webhook_url, json=payload, timeout=10)

        try:
            data = resp.json()
        except Exception:
            print("⚠ n8n response is not JSON:", resp.text)
            raise Exception("Invalid JSON returned from n8n")

        return {
            "score": float(data.get("score", 0.0)),
            "level": data.get("level", "Unknown"),
            "suggestion": data.get("suggestion", ""),
            "corrected_sentence": data.get("corrected_sentence", sentence)
        }

    except Exception as e:
        print(f"❌ Error connecting to n8n: {e}")

        return {
            "score": 0.0,
            "level": "Connection Error",
            "suggestion": f"Failed to connect to n8n server: {e}",
            "corrected_sentence": sentence
        }
