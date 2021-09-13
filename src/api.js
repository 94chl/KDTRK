const API_END_POINT = "https://cat-api.roto.codes";

export const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (!res.ok) {
      throw new Error("failed request");
    }

    return await res.json();
  } catch (e) {
    console.log(e);
  }
};
