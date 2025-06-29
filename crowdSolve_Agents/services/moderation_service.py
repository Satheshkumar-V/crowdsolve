from core.llm_client import llm
from core.prompts import moderation_prompt_template
from langchain_core.messages import HumanMessage

def moderate_text(text):
    prompt = moderation_prompt_template.format(text=text)
    result = llm.invoke([HumanMessage(content=prompt)])
    return result.content.strip()
