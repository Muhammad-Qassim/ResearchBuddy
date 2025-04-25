const API_BASE_URL = process.env.REACT_APP_BACKEND_URL

export const processQuery = async (query) => {
  try {
    console.log(`Sending request to ${API_BASE_URL}/process-query with query: ${query}`)

    const response = await fetch(`${API_BASE_URL}/process-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to process query: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("API response data:", data)

    // Validate the response structure
    if (!data) {
      throw new Error("Empty response from API")
    }

    // Check if the response is an array (multiple papers)
    if (Array.isArray(data)) {
      // Validate each item in the array
      data.forEach((item, index) => {
        if (!item.metadata) {
          console.warn(`Missing metadata in result ${index}:`, item)
        }
      })
      return data
    } else {
      // Handle single result (for backward compatibility)
      if (!data.metadata) {
        console.error("Missing metadata in API response:", data)
        throw new Error("No metadata found in the response")
      }
      return [data] // Convert to array for consistent handling
    }
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

export const processGithubQuery = async (query) => {
  try {
    console.log(`Sending request to ${API_BASE_URL}/process-github-query with query: ${query}`)

    const response = await fetch(`${API_BASE_URL}/process-github-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to process GitHub query: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("GitHub API response data:", data)

    // Validate the response structure
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("No GitHub repositories found for this query")
    }

    return data
  } catch (error) {
    console.error("GitHub API Error:", error)
    throw error
  }
}

export const testConnection = async () => {
  try {
    console.log(`Testing connection to ${API_BASE_URL}/test`)
    const response = await fetch(`${API_BASE_URL}/test`)

    if (!response.ok) {
      throw new Error(`Failed to connect to API: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("API connection test response:", data)
    return data
  } catch (error) {
    console.error("API Connection Error:", error)
    throw error
  }
}

export const initChatbot = async (topic) => {
  try {
    console.log(`Initializing chatbot for topic: ${topic}`)
    const response = await fetch(`${API_BASE_URL}/chatbot/init?topic=${encodeURIComponent(topic)}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Failed to initialize chatbot: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Chatbot initialization response:", data)
    return data
  } catch (error) {
    console.error("Chatbot initialization error:", error)
    throw error
  }
}

export const queryChatbot = async (query, topic) => {
  try {
    console.log(`Sending chatbot query: ${query} for topic: ${topic}`)

    const response = await fetch(`${API_BASE_URL}/chatbot/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, topic }),
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Failed to query chatbot: ${response.status} ${response.statusText}`)
    }

    return response
  } catch (error) {
    console.error("Chatbot query error:", error)
    throw error
  }
}
export const getTopicOverview = async (topic) => {
  try {
    console.log(`Sending request to ${API_BASE_URL}/overview with topic: ${topic}`)

    const response = await fetch(`${API_BASE_URL}/overview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to get topic overview: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Overview API response data:", data)

    return data
  } catch (error) {
    console.error("Overview API Error:", error)
    throw error
  }
}

export default {
  processQuery,
  processGithubQuery,
  testConnection,
  initChatbot,
  queryChatbot,
  getTopicOverview,
  
}
