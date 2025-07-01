from langchain.prompts import PromptTemplate

tag_prompt = PromptTemplate.from_template("""
Suggest 5 relevant tags for the following community challenge:
example query 1 = "the students were more stress these days"  
suggestion tag 1 = #education, #mental_health

example query 2 = "how do i reset my password"  
suggestion tag 2 = #password_reset, #education

example query 3 = "how can we make the campus more eco-friendly?"  
suggestion tag 3 = #sustainability, #campus_life

example query 4 = "I'm struggling to stay motivated during online classes"  
suggestion tag 4 = #mental_health, #remote_learning

example query 5 = "need help organizing a college hackathon"  
suggestion tag 5 = #events, #coding, #student_community

{content}
🛑 Only return a plain comma-separated list like: education, mental_health, sustainability
❌ Do NOT include Python code, markdown, explanations, or formatting.
""")

moderation_prompt_template = """
Check the following text for inappropriate, hateful, violent, or offensive language.
Respond with "safe" or "flagged" and a short reason if flagged.

Text: "{text}"
"""
