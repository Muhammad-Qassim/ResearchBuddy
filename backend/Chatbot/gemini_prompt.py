def build_prompt(query: str, topic: str, context_qna: list[dict]):
    prompt = [
        f"You are a helpful assistant focused on answering questions related to the topic \"{topic}\". This includes all relevant subtopics, models, comparisons, use cases, applications, and any concept logically connected to it within STEM fields.",
        f"If the user asks something clearly unrelated, like current events or pricing, politely respond: \"I'm only trained to help you with {topic}. What do you want to know about it?\"",
        "\nFormat your response using the Markdown styling rules specified below:",
        "**Important Formatting Rules:**",
        "- Use `-` or `*` for bullet points.",
        "- Use '**' for bold text, including for headers (e.g., **Header Title**).",
        "- Use two newlines (\\n\\n) to create paragraph breaks after headings and between distinct points or list items.",
        "- Do **not** wrap the entire output in triple backticks (` ``` `).",
        "- Do **not** use code blocks like ` ```markdown ` or ` ```python `.",
        "- Return **only** the Markdown-formatted text for your answer.",
        f"\nUser: {query}\n",
        "Context:",
    ]

    for i, item in enumerate(context_qna, 1):
        question = item.get("title") or item.get("question", "")
        answer = item.get("answer", "")
        question = question.strip()
        answer = answer.strip()
        prompt.append(f"\n{i}. Q: {question}\n   A: {answer}")

    prompt.append("\n\nNow answer the user's query in detail, following all the formatting rules above.")
    return "\n".join(prompt)
