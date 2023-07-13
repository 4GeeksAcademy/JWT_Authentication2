import axios from 'axios';

const getState = ({ getStore, setStore }) => {
	return {
	  store: {
		token: null,
		cf_url: 'https://johncritch90-upgraded-computing-machine-j6gxr5v9x6j3p5g4-3000.preview.app.github.dev/',
		cb_url: 'https://johncritch90-upgraded-computing-machine-j6gxr5v9x6j3p5g4-3001.preview.app.github.dev/',
	  },
	  actions: {
		createUser: async (email, password) => {
			const cb_url = getStore().cb_url;
			const cf_url = getStore().cf_url;
			const url = cb_url + "/api/signup";
			const data = {
				email: email,
				password: password,
			};
			try {
				const response = await axios.post(url, data)

				if (response.status !== 200) {
					alert("There has been an error");
					return false;
				}

				const responseData = response.data;

				if (responseData.status === "true") {
					window.location.href = cf_url + "/home"
				}

				return true;
			} catch (error) {
				console.error(error);
			}
		},

		login: async (email, password) => {
			const cb_url = getStore().cb_url;
			const url = cb_url + "/api/login";
			const data = {
				email: email,
				password: password,
			};

			try {
				const response = await axios.post(url, data, {
					headers: {
						"Content-Type": "application/json"
					},
				});

				if (response.status !== 200) {
					alert("There has been an error");
					return false;
				}

				const responseData = response.data;
				sessionStorage.setItem("token", responseData.access_token);

				setStore({ token: responseData.access_token, favorites: responseData.favorites, user_name: responseData.user_name });
				return true;
			} catch (error) {
				console.error(error);
			}
		},
		logout: async (email, password) => {
			const cf_url = getStore.cf_url
			const token = sessionStorage.removeItem("token");
			setStore({ token: null });
			window.location.href = "/";
		},
  
		getMessage: () => {
		  // Implementation of getMessage function
		  // You can replace this with your actual implementation
		  console.log('getMessage function called');
		}
	  },
	};
  };
  
  export default getState;
  