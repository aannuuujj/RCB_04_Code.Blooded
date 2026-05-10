import json

def safe_parse_json(text: str) -> dict:
    """
    Safely parses JSON from Claude responses, stripping Markdown formatting
    and handling common errors.
    """
    try:
        # Strip markdown code blocks if Claude returned them
        text = text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        
        text = text.strip()
        
        # Additional safety: try to find JSON object bounds if there's surrounding text
        start = text.find("{")
        end = text.rfind("}")
        
        if start != -1 and end != -1:
            text = text[start:end+1]
            
        return json.loads(text)
    except Exception as e:
        print(f"JSON Parsing Error: {str(e)}")
        print(f"Raw Text: {text}")
        return None
