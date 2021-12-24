const API_END_POINT = "https://learn.programmers.co.kr";

export default async function request(url, options = { method: "GET" }) {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (res.ok) {
      const result = res.json();
      return result;
    }

    throw new Error("API Error");
  } catch (e) {
    return false;
  }
}
