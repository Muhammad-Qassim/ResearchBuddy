import re
import requests
import wikipedia
from qdrant_client.models import Filter, FieldCondition, MatchValue, SearchParams
from Qdrant.embed_utils import embed_text
from Qdrant.my_qdrant_client import qdrant_client

STEM_COLLECTION = "stem-concepts"


def clean_label(label):
    """Remove parentheses or brackets from a label."""
    return re.sub(r"\s*[\(\[].*?[\)\]]", "", label).strip()


def get_clean_wikipedia_summary(text):
    """Trim unwanted sections and clean summary text."""
    if "==" in text:
        text = text.split("==")[0].strip()
    return text.strip()


def get_wikipedia_intro(query):
    """
    Fetch a clean Wikipedia summary using Wikidata lookup first.
    If no exact match, fall back to search.
    """
    try:
        # Step 1: Search Wikidata for a matching Wikipedia page
        sparql_url = "https://query.wikidata.org/sparql"
        headers = {"Accept": "application/json"}
        sparql_query = f"""
        SELECT ?item ?sitelink WHERE {{
          ?item (rdfs:label|skos:altLabel) "{query}"@en.
          ?sitelink schema:about ?item;
                    schema:isPartOf <https://en.wikipedia.org/>.
        }}
        LIMIT 1
        """
        response = requests.get(sparql_url, headers=headers, params={"query": sparql_query})
        data = response.json()

        if not data["results"]["bindings"]:
            return f"No Wikipedia page found for '{query}'."

        # Step 2: Extract page title from Wikidata result
        sitelink_url = data["results"]["bindings"][0]["sitelink"]["value"]
        title = sitelink_url.rsplit("/", 1)[-1].replace("_", " ")  # Title as used in Wikipedia

        # Step 3: Fetch summary using corrected title
        summary_raw = wikipedia.summary(title, sentences=5, auto_suggest=True, redirect=True)
        return get_clean_wikipedia_summary(summary_raw)

    except wikipedia.exceptions.DisambiguationError:
        return f"The topic '{query}' is ambiguous. Try a more specific term."
    except wikipedia.exceptions.PageError:
        return f"No Wikipedia page found for '{query}'."
    except Exception as e:
        return f"An error occurred: {str(e)}"


def get_related_topics_from_qdrant(query, domain="computer science", limit=5):
    """
    Retrieve related topics from Qdrant based on vector similarity.
    """
    try:
        query_vector = embed_text([query])[0]

        domain_filter = Filter(
            must=[FieldCondition(key="domain", match=MatchValue(value=domain))]
        )

        results = qdrant_client.search(
            collection_name=STEM_COLLECTION,
            query_vector=query_vector,
            limit=30,
            search_params=SearchParams(hnsw_ef=128),
            query_filter=domain_filter
        )

        seen = set()
        cleaned = []
        query_lower = query.lower()

        for point in results:
            raw_label = point.payload.get("label", "")
            label = clean_label(raw_label)
            label_lower = label.lower()

            if (
                label_lower == query_lower or
                len(label_lower) < 5 or
                label_lower in seen or
                label_lower in query_lower or
                query_lower in label_lower
            ):
                continue

            seen.add(label_lower)
            cleaned.append(label)

            if len(cleaned) >= limit:
                break

        return cleaned

    except Exception as e:
        return [f"Error fetching related topics: {e}"]
