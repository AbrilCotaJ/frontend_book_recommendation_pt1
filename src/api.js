// Change this URL to point to your backend repository
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function getData() {
  const response = await fetch(`${API_URL}/api/data`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
