const storage = window.localStorage;

export const setUser = ({ user, token }) => {
	const userString = JSON.stringify(user);
	storage.setItem("token", token);
	storage.setItem("user", userString);
};

export const getUser = () => {
	const user = JSON.parse(storage.getItem("user"));
	const token = storage.getItem("token");

	return { user, token };
};


export const logout = () => {
	storage.removeItem("user");
	storage.removeItem("token");
  };
export const setPost = (post) => {
  const postString = JSON.stringify(post);
  storage.setItem("post", postString);
};

export const getPost = () => {
  const post = JSON.parse(storage.getItem("post"));
  return post;
};

export const removeStorage = (keys) => {
  keys.forEach((key) => storage.removeItem(key));
};
