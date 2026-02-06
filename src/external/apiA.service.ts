import axios from "axios";

const API_A_URL = "https://jsonplaceholder.typicode.com/posts";

/**
 * Fetch data from external API A
 * - Timeout handling
 * - Retry with exponential backoff
 */
export async function fetchApiAData(retries = 3): Promise<any> {
  try {
    const response = await axios.get(API_A_URL, {
      timeout: 2000, // 2 seconds timeout
    });

    return response.data;
  } catch (error) {
    if (retries <= 0) {
      console.error("API A failed after retries");
      throw error;
    }

    const delay = Math.pow(2, 3 - retries) * 300;
    await new Promise((res) => setTimeout(res, delay));

    return fetchApiAData(retries - 1);
  }
}