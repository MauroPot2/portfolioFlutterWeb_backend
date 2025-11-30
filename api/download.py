import os
import base64

def handler(request):
    cv_path = os.path.join(os.path.dirname(__file__), "..", "storage", "cv", "cv.pdf")

    if not os.path.exists(cv_path):
        return {"error": "CV non trovato"}, 404

    with open(cv_path, "rb") as f:
        file_data = f.read()

    # Codifica base64 perché Vercel deve restituire JSON-safe content
    encoded = base64.b64encode(file_data).decode("utf-8")

    return {
        "file": encoded,
        "filename": "cv.pdf",
        "content_type": "application/pdf"
    }
