import wikipedia

def get_wikipedia_intro(query):
    try:
        return wikipedia.summary(query, sentences=5)
    except wikipedia.exceptions.PageError:
        results = wikipedia.search(query)
        if results:
            try:
                return wikipedia.summary(results[0], sentences=5)
            except Exception:
                return f"No summary available for '{query}'."
        return f"No Wikipedia page found for '{query}'."
    except wikipedia.exceptions.DisambiguationError as e:
        try:
            return wikipedia.summary(e.options[0], sentences=5)
        except Exception:
            return f"The topic '{query}' is ambiguous. Try a more specific term."
    except Exception as e:
        return f"An error occurred: {str(e)}"

def get_wikipedia_related_topics(query):
    try:
        page = wikipedia.page(query)
        links = page.links
        return links[:5]
    except wikipedia.exceptions.PageError:
        results = wikipedia.search(query)
        if results:
            try:
                page = wikipedia.page(results[0])
                links = page.links
                return links[:5] 
            except Exception:
                return f"No related topics available for '{query}'."
        return f"No Wikipedia page found for '{query}'."
    except Exception as e:
        return f"An error occurred: {str(e)}"