from core.state import TagSuggestionState
from tools.tag_tool import suggest_tags_tool

def tag_suggestion_agent(state: TagSuggestionState) -> TagSuggestionState:
    print("🏷️ Agent: Tag Suggestor")
    try:
        tags = suggest_tags_tool(state["content"])
        state["suggested_tags"] = tags
        state["current_agent"] = "next_step"
        print("✅ Tags suggested:", tags)
    except Exception as e:
        state["error_message"] = str(e)
        state["current_agent"] = "error"
    return state
