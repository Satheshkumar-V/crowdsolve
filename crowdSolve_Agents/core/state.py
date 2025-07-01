from typing import TypedDict, List, Dict, Any

class SimilarityState(TypedDict):
    content : str
    similar_results: List[Dict[str, Any]]
    current_agent: str
    error_message: str

class TagSuggestionState(TypedDict):
    content: str
    suggested_tags: List[str]
    current_agent: str
    error_message: str
