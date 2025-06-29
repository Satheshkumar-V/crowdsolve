import os
from dotenv import load_dotenv
from langchain_openrouter import ChatOpenRouter

load_dotenv()
print("🔐 API KEY:", os.getenv("OPENROUTER_API_KEY"))
llm = ChatOpenRouter(
    temperature=0.3,
    model="mistralai/mistral-7b-instruct",
    openai_api_base="https://openrouter.ai/api/v1",
    openai_api_key=os.getenv("OPENROUTER_API_KEY")
)
