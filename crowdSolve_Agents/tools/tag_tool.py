from langchain_core.tools import tool
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv
import os
from config.prompts import tag_prompt

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("❌ GOOGLE_API_KEY not found in .env")

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=GOOGLE_API_KEY,
    temperature=0.3
)

@tool
def suggest_tags_tool(content: str) -> list:
    """
    Suggest clean 3-5 tags for a given challenge using Gemini AI.
    """
    try:
        final_prompt = tag_prompt.format(content=content)
        response = llm.invoke([HumanMessage(content=final_prompt)])
        raw_output = response.content.strip()

        clean = raw_output.replace("```", "").replace("python", "")
        tags = [tag.strip().lstrip("#*- ") for tag in clean.split(",") if tag.strip()]
        return tags
    except Exception as e:
        return [f"Error: {str(e)}"]



# def suggest_tags_tool(content: str) -> list:
#     """
#     Suggest 5 tags for a given challenge content using Mistral via OpenRouter.
#     """
#     try:
#         from dotenv import load_dotenv
#         load_dotenv()
#         api_key = os.getenv("OPENROUTER_API_KEY")

#         llm = ChatOpenAI(
#             temperature=0.3,
#             openai_api_base="https://openrouter.ai/api/v1",
#             openai_api_key=api_key,
#             model="mistralai/mistral-7b-instruct"
#         )

#         final_prompt = tag_prompt.format(content=content)
#         response = llm.invoke([HumanMessage(content=final_prompt)])
#         tags = [tag.strip().lstrip("#*- ") for tag in response.content.strip().splitlines() if tag.strip()]
#         return tags
#     except Exception as e:
#         return [f"Error: {str(e)}"]
