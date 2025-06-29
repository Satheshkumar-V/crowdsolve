from core.llm_client import llm
from langchain_core.messages import HumanMessage
import os
print("🔐 API KEY:", os.getenv("OPENROUTER_API_KEY"))
def extract_tasks_from_solution(solution):
    print("🧠 Received solution to extract tasks from:", solution)
    prompt = f"Convert this solution into a list of actionable tasks:\n{solution}"
    response = llm.invoke([HumanMessage(content=prompt)])
    print("Using OpenRouter key:", os.getenv("OPENROUTER_API_KEY"))
    return [task.strip() for task in response.content.strip().splitlines() if task.strip()]
