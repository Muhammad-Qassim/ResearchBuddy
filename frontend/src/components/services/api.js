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

    if (!data.metadata) {
      console.error("Missing metadata in API response:", data)
      throw new Error("No metadata found in the response")
    }

    if (!data.summary) {
      console.warn("Missing summary in API response:", data)
    }

    return data
  } catch (error) {
    console.error("API Error:", error)
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

export default {
  processQuery,
  testConnection,
}

