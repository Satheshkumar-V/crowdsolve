from langgraph.graph import StateGraph, START
from core.state import SimilarityState
from core.state import TagSuggestionState
from agents.similarity_agent import similarity_agent
from agents.tag_agent import tag_suggestion_agent

def create_similarity_graph():
    workflow = StateGraph(SimilarityState)
    workflow.add_node("similarity_agent", similarity_agent)
    workflow.set_entry_point("similarity_agent")
    workflow.set_finish_point("similarity_agent")
    return workflow.compile()

def create_tag_graph():
    workflow = StateGraph(TagSuggestionState)
    workflow.add_node("tag_suggestion_agent", tag_suggestion_agent)
    workflow.set_entry_point("tag_suggestion_agent")
    workflow.set_finish_point("tag_suggestion_agent")
    return workflow.compile()   