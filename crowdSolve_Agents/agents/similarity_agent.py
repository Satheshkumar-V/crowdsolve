from core.state import SimilarityState
from tools.similarity_tool import similarity_check_or_add

def similarity_agent(state: SimilarityState) -> SimilarityState:
    print("🔍 Agent: Similarity Checker")
    try:
        result = similarity_check_or_add( state["content"])
        state["similar_results"] = result
        state["current_agent"] = "next_step"
        print("✅ Similarity analysis complete")
    except Exception as e:
        state["error_message"] = str(e)
        state["current_agent"] = "error"
    return state
