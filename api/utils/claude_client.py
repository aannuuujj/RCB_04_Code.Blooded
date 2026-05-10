import os
import anthropic
from api.utils.json_parser import safe_parse_json

# Initialize client if key exists
api_key = os.environ.get("ANTHROPIC_API_KEY")
client = anthropic.AsyncAnthropic(api_key=api_key) if api_key else None

async def call_claude(system_prompt: str, user_prompt: str, mock_fallback: dict) -> dict:
    """
    Calls Claude 3.5 Sonnet asynchronously. 
    If API key is missing or an error occurs, returns the mock fallback to keep the demo running.
    """
    if not client:
        print("WARNING: ANTHROPIC_API_KEY not found. Using mock fallback response.")
        return mock_fallback

    try:
        response = await client.messages.create(
            model="claude-3-5-sonnet-latest",
            max_tokens=1024,
            temperature=0.7,
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_prompt}
            ]
        )
        
        response_text = response.content[0].text
        
        parsed_json = safe_parse_json(response_text)
        if parsed_json:
            return parsed_json
            
        print("WARNING: Failed to parse Claude response. Using mock fallback.")
        return mock_fallback
        
    except Exception as e:
        print(f"Claude API Error: {str(e)}")
        print("WARNING: API call failed. Using mock fallback response.")
        return mock_fallback
