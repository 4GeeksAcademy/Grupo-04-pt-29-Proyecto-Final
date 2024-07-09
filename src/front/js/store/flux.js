const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {

      // Jose Antonio
      user: {},
      clients: [],
      client: {},
      providers: [],
      provider: {},
      services: [],
      service: {},
      favorite: [],




      // Luis
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
          setStore({ ...getStore(), message: data.message });
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
        setStore({ ...getStore(), demo: demo });
      },


      // FETCH SISTEM OF AUTHENTICATION

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
          setStore({ ...getStore(), user: data.user })
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
      getCurrentUser: async () => {
        console.log("epale")
        try {
          console.log("hola")
          const response = await fetch(process.env.BACKEND_URL + `/api/private`,{
            method: "GET",
            headers:{
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
          })
          const data = await response.json()
          setStore({ ...getStore(), user: data })
        } catch (error) {
        }
      },

      // FETCH GET PROFILE PROVIDER
      getProfileProvider: async (id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/profile/provider/${id}`)
          const data = await response.json()
          setStore({ ...getStore(), user: data })
        } catch (error) {
        }
      },
      // FETCH GET PROFILE CLIENT
      getProfileClient: async (id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/profile/client/${id}`)
          const data = await response.json()
          setStore({ ...getStore(), user: data })
        } catch (error) {
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
          console.error("Error fetching Users", error);
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
          console.error("Error fetching User:", error);
        }
      },

      // FETCH CLIENT

      // FETCH GET ALL CLIENT
      getClients: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + '/api/client');
          const data = await response.json();
          console.log(data);
          setStore({ ...getStore(), clients: data.results });
        } catch (error) {
          console.error("Error fetching Clients:", error);
        }
      },

      // FETCH GET CLIENT ID
      getClientID: async (id) => {
        //const token= localStorage.getItem("token")
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/client/${id}`);
          const data = await response.json();
          console.log(data);
          setStore({ ...getStore(), clients: data });
        } catch (error) {
          console.error("Error fetching Client:", error);
        }
      },

      // FETCH GET PROVIDER BY USER ID
      getClientByUserID: async (user_id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/client/byuser/${user_id}`);
          const data = await response.json();
          console.log(data);
          setStore({ ...getStore(), client: data });
        } catch (error) {
          console.error("Error fetching provider:", error);
        }
      },

      // FETCH ADD CLIENT 
      createClient: function (name, last_name, phone, location, bio, url_image) {
        const token = localStorage.getItem("token")
        fetch(process.env.BACKEND_URL + '/api/add/client', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({
            name: name,
            last_name: last_name,
            phone: phone,
            location: location,
            bio: bio,
            url_image: url_image
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log("Tu Perfil ha sido Actualizado:", data);
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
          });
      },

      // FETCH EDIT CLIENT ID
      editClient: function (id, name, last_name, phone, location, bio, url_image) {
        const token = localStorage.getItem("token")
        fetch(process.env.BACKEND_URL + `/api/edit/client/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({
            name: name,
            last_name: last_name,
            phone: phone,
            location: location,
            bio: bio,
            url_image: url_image
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log("Tu Perfil ha sido Actualizado", data);
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
          });
      },

      // FETCH DELETE CLIENT ID (OJO)
      deleteClient: function (id) {
        fetch(process.env.BACKEND_URL + `/api/client/<int:id>/user/<int:user_id${id}`, {
          method: "DELETE",
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log("Tus Datos del Perfil han sido Eliminado");
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
          });
      },

      // FETCH PROVIDER

      // FETCH GET ALL PROVIDER
      getProviders: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + '/api/provider');
          const data = await response.json();
          console.log(data);
          setStore({ ...getStore(), providers: data.results });
        } catch (error) {
          console.error("Error fetching Providers:", error);
        }
      },

      // FETCH GET PROVIDER ID
      getProviderID: async (id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/provider/${id}`);
          const data = await response.json();
          console.log(data);
          setStore({ ...getStore(), providers: data });
        } catch (error) {
          console.error("Error fetching Provider:", error);
        }
      },

      // FETCH GET PROVIDER BY USER ID
      getProviderByUserID: async (user_id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/provider/byuser/${user_id}`);
          const data = await response.json();
          setStore({ ...getStore(), provider: data });
        } catch (error) {
          console.error("Error fetching provider:", error);
        }
      },

      // FETCH ADD PROVIDER 
      createProvider: function (name, last_name, identity_number, company, number_company, phone, location, profession, experience, description, url_image) {
        const token = localStorage.getItem("token")
        fetch(process.env.BACKEND_URL + '/api/add/provider', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({
            name: name,
            last_name: last_name,
            identity_number: identity_number,
            company: company,
            number_company: number_company,
            phone: phone,
            location: location,
            profession: profession,
            experience: experience,
            description: description,
            url_image: url_image
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log("Tu Perfil ha sido Actualizado:", data);
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
          });
      },

      // FETCH EDIT PROVIDER ID
      editProvider: function (id, name, last_name, identity_number, company, number_company, phone, location, profession, experience, description, url_image) {
        const token = localStorage.getItem("token")
        fetch(process.env.BACKEND_URL + `/api/edit/provider/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({
            name: name,
            last_name: last_name,
            identity_number: identity_number,
            company: company,
            number_company: number_company,
            phone: phone,
            location: location,
            profession: profession,
            experience: experience,
            description: description,
            url_image: url_image
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log("Tu Perfil ha sido Actualizado:", data);
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
          });
      },

      // FETCH DELETE PROVIDER ID (OJO)
      deleteProvider: function (id) {
        fetch(process.env.BACKEND_URL + `/api/provider/<int:id>/user/<int:user_id>${id}`, {
          method: "DELETE",
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log("Tus Datos del Perfil han sido Eliminado");
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
          });
      },


      // FETCH SERVICES

      // FETCH GET ALL SERVICES
      getServices: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + '/api/services');
          const data = await response.json();
          console.log(data);
          let store = getStore();
          setStore({ ...getStore(), services: data.results });
        } catch (error) {
          console.error("Error fetching Services:", error);
        }
      },

      // FETCH GET SERVICES ID
      getServiceID: async (id) => {
        const token = localStorage.getItem("token")
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/services/${id}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },

          });
          const data = await response.json();
          console.log(data);
          setStore({ ...getStore(), services: data });
        } catch (error) {
          console.error("Error fetching Service:", error);
        }
      },



      // FETCH ADD SERVICES 
      createService: function (title, category, price, description, url_image) {
        console.log(title, category, price, description, url_image)
        const token = localStorage.getItem("token")
        fetch(process.env.BACKEND_URL + '/api/add/service', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token

          },
          body: JSON.stringify({
            title: title,
            category: category,
            price: price,
            description: description,
            url_image: url_image
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log("El Servicio ha sido creado:", data);
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
          });
      },

      // FETCH EDIT SERVICES ID
      editService: function (id, title, category, price, description, url_image) {
        const token = localStorage.getItem("token")
        fetch(process.env.BACKEND_URL + `/api/edit/service/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", "Authorization": "Bearer " + token
          },
          body: JSON.stringify({
            title: title,
            category: category,
            price: price,
            description: description,
            url_image: url_image
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log("El servicio ha sido Editado:", data);
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
          });
      },

      // FETCH DELETE SERVICES ID (OJO)
      deleteService: function (id) {
        fetch(process.env.BACKEND_URL + `/api/services/${id}`, {
          method: "DELETE",
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log("El Servicio ha sido eliminado correctamente");
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
          });
      },



      // FETCH ALL PROVIDER (LUIS)
      getProviders: () => {
        console.log("funciona")
        fetch(process.env.BACKEND_URL + "/api/provider"
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
            setStore({ ...getStore(), listProviders: data.data })
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

            setStore({ ...getStore(), provider: data })

          })
          .catch((error) => { error })
      },

      // FETCH CATEGORY

      // FETCH GET CATEGORY BY SEARCH ()
      getCategorySearchBar: () => {
        fetch(process.env.BACKEND_URL + "/api/provider", {
          method: "GET"
        })
          .then((response) => {
            console.log(response.status);
            return response.json()

          })
          .then((data) => {
            setStore({ ...getStore(), providersCategory: data.data })
            console.log(data);

          })
          .catch((error) => { error })
      },
    }
  }
};

export default getState;
