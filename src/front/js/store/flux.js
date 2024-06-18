import { SignUp } from "../pages/signup";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {

      user:{}

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

      register: async (username, email, password,role) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "api/signup",
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

      login:async(email,password)=>{
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login",{
						method:"POST",
						headers:{"Content-Type":"application/json"},
						body:JSON.stringify({
							email:email,
							password:password,
						})
					})
					const data = await response.json()
					if(!response.ok){
						throw new Error("Error al hacer Login")
					} 
					localStorage.setItem("token",data.access_token )
					console.log(data)
					setStore({user:data.user})
					return true
				} catch (error) {
					alert(error)
				}
			},
    },
  };
};

export default getState;
