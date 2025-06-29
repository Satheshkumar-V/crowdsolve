from core.llm_client import llm
from core.prompts import tag_prompt
from langchain_core.messages import HumanMessage

def get_suggested_tags(content):
    prompt = tag_prompt.format(content=content)
    response = llm.invoke([HumanMessage(content=prompt)])
    return [tag.strip().lstrip("#*- ") for tag in response.content.strip().splitlines() if tag.strip()]
