const getState = ({ getStore, setStore }) => {
	return {
	  store: {
		token: null,
		cf_url: 'https://johncritch90-fictional-broccoli-r9xj7gqw5wrfp6r6-3000.preview.app.github.dev/',
		cb_url: 'https://johncritch90-fictional-broccoli-r9xj7gqw5wrfp6r6-3001.preview.app.github.dev/',
		user_name: null,
	  },
	  actions: {
		syncTokenFromSessionStore: () => {
		  const token = sessionStorage.getItem("token");
		  if (token && token !== "" && token !== undefined)
			setStore({ token: token });
		},
  
		loadData: () => {
		},
  
		logout: () => {
		  const cf_url = getStore().cf_url;
		  sessionStorage.removeItem("token");
		  setStore({ token: null });
		  window.location.href = cf_url + "/";
		},
  
		login: async (email, password) => {
		  const cb_url = getStore().cb_url;
		  const opts = {
			method: "POST",
			mode: "cors",
			headers: {
			  "Content-Type": "application/json",
			  "Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
			  email: email,
			  password: password,
			}),
		  };
		  try {
			const res = await fetch(cb_url + "/api/login", opts);
			if (res.status !== 200) {
			  alert("There has been an error");
			  return false;
			}
			const data = await res.json();
			data.favorites.forEach((f) => {
			  f.item = f.item.replace(/'/g, '"');
			  f.item = JSON.parse(f.item);
			});
			setStore({
			  token: data.access_token,
			  user_name: data.user_name,
			});
			sessionStorage.setItem("token", data.access_token);
			return true;
		  } catch (error) {
			console.error(error);
		  }
		},
  
		createUser: async (name, email, password) => {
		  const cb_url = getStore().cb_url;
		  const cf_url = getStore().cf_url;
		  const opts = {
			method: "POST",
			mode: "cors",
			headers: {
			  "Content-Type": "application/json",
			  "Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
			  name: name,
			  email: email,
			  password: password,
			}),
		  };
		  try {
			const res = await fetch(cb_url + "/api/createUser", opts);
			if (res.status !== 200) {
			  alert("There has been an error");
			  return false;
			}
			const data = await res.json();
			if (data.status === "true") {
			  window.location.href = cf_url + "/login";
			}
			return true;
		  } catch (error) {
			console.error(error);
		  }
		},
	  },
	};
  };
  
  export default getState;
  