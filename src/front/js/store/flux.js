import { SignUp } from "../pages/signup";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      
      // Jose Antonio
      user: {},
      Clients: [],
      ClientId: [],
      Providers: [],
      ProviderID: [],
      Services: [],
      ServicesId: [],
      Favorite: [],

    
      //Luis
      listProviders: [],
      provider: [],
      providersCategory: []

    },
    actions: {

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },


      //FETCH SISTEM OF AUTHENTICATION

      // FETCH REGISTRO
      register: async (username, email, password, role) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                role: role,
              }),
            }
          );
          const data = await response.json();
          if (!response.ok) {
            throw new Error("Error al Registrarte");
          }
          console.log(data);
          return true;
        } catch (error) {
          alert(error);
        }
      },

      // FETCH INICIO SESION
      login: async (email, password) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password,
            })
          })
          const data = await response.json()
          if (!response.ok) {
            throw new Error("Error al hacer Login")
          }
          localStorage.setItem("token", data.access_token)
          console.log(data.user)
          setStore({ user: data.user })
          return true
        } catch (error) {
          alert(error)
        }
      },

      // FETCH SALIR SESION
      logout: () => {
        let store = getStore()
        setStore({ ...store, user: {} })
      },

      //FETCH PROFILE

      // FETCH GET PROFILE PROVIDER
      getProfileProvider: async (id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/profile/provider/${id}`)
          const data = await response.json()
          setStore({ user: data })
        } catch (error) {
          console.log(error)
        }
      },
      // FETCH GET PROFILE CLIENT
      getProfileClient: async (id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/profile/client/${id}`)
          const data = await response.json()
          setStore({ user: data })
        } catch (error) {
          console.log(error)
        }
      },


      // FETCH USERS

      // FETCH GET ALL USER
      getUsers: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + '/api/profile');
          const data = await response.json();
          console.log(data);
          let store = getStore();
          setStore({ ...store, User: data.results });
        } catch (error) {
          console.error("Error fetching User", error);
        }
      },

      // FETCH GET USER ID
      getUserID: async (id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/profile/${id}`);
          const data = await response.json();
          console.log(data);
          let store = getStore();
          setStore({ ...store, UserID: data });
        } catch (error) {
          console.error("Error fetching characters:", error);
        }
      },

      // FETCH CLIENT

      // FETCH GET ALL CLIENT
      getClients: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + '/api/client');
          const data = await response.json();
          console.log(data);
          let store = getStore();
          setStore({ ...store, Clients: data.results });
        } catch (error) {
          console.error("Error fetching Clients:", error);
        }
      },

      // FETCH GET CLIENT ID
      getClientID: async (id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/client/${id}`);
          const data = await response.json();
          console.log(data);
          let store = getStore();
          setStore({ ...store, ClientId: data });
        } catch (error) {
          console.error("Error fetching Client:", error);
        }
      },

      // FETCH PROVIDER

      // FETCH GET ALL PROVIDER
      getProviders: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + '/api/provider');
          const data = await response.json();
          console.log(data);
          let store = getStore();
          setStore({ ...store, Providers: data.results });
        } catch (error) {
          console.error("Error fetching Providers:", error);
        }
      },

      // FETCH GET PROVIDER ID

      getClientID: async (id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/provider'/${id}`);
          const data = await response.json();
          console.log(data);
          let store = getStore();
          setStore({ ...store, ProviderId: data });
        } catch (error) {
          console.error("Error fetching Client:", error);
        }
      },

      // FETCH SERVICES

      // FETCH GET ALL SERVICES
      getProviders: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + '/api/services');
          const data = await response.json();
          console.log(data);
          let store = getStore();
          setStore({ ...store, Providers: data.results });
        } catch (error) {
          console.error("Error fetching Providers:", error);
        }
      },
      // FETCH GET SERVICES ID
      getClientID: async (id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/services/${id}`);
          const data = await response.json();
          console.log(data);
          let store = getStore();
          setStore({ ...store, ProviderId: data });
        } catch (error) {
          console.error("Error fetching Client:", error);
        }
      },
      // FETCH ALL PROVIDER (LUIS)
      getProviders: () => {
        console.log("funciona")
        fetch(process.env.BACKEND_URL + "/api/providers"
          // {
          // 'mode': 'no-cors',
          // 'headers': {
          //   	'Access-Control-Allow-Origin': '*',
          // }}
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("error")
            }
            return response.json()
          })
          .then((data) => {
            setStore({ listProviders: data.data })
            console.log(data.data);
          })
          .catch((error) => { error })
      },
      // FETCH PROVIDER ID (LUIS)
      getSingleProvider: (id) => {
        fetch(process.env.BACKEND_URL + `/api/provider/${id}`, {
          method: "GET"

        })
          .then((response) => {
            console.log(response.status);
            return response.json()

          })
          .then((data) => {

            setStore({ provider: data })

          })
          .catch((error) => { error })
      },

      //FETCH CATEGORY

      // FETCH GET CATEGORY BY SEARCH ()
      getCategorySearchBar: () => {
        fetch(process.env.BACKEND_URL + "/api/providers", {
          method: "GET"
        })
          .then((response) => {
            console.log(response.status);
            return response.json()

          })
          .then((data) => {
            setStore({ providersCategory: data.data })
            console.log(data);

          })
          .catch((error) => { error })
      },

    }

  }
};




export default getState;
