from core.state import SimilarityState
from core.graph import create_similarity_graph
from core.state import TagSuggestionState
from core.graph import create_tag_graph

def run_similarity_pipeline(content: str) -> SimilarityState:
    app = create_similarity_graph()
    state = SimilarityState(
        content=content,
        similar_results=[],
        current_agent="similarity_agent",
        error_message=""
    )
    final_state = app.invoke(state)
    return final_state

def run_tag_pipeline(content: str) -> TagSuggestionState:
    app = create_tag_graph()
    initial_state = TagSuggestionState(
        content=content,
        suggested_tags=[],
        current_agent="tag_suggestion_agent",
        error_message=""
    )
    return app.invoke(initial_state)