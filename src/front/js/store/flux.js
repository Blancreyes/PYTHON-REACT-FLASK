import axios from "axios";

const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            message: null,
            demo: [{
                    title: "FIRST",
                    background: "white",
                    initial: "white",
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white",
                },
            ],
            auth: false,
        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            signUp: async (email, password) => {
                try {
                    // fetching data from the backend
                    let response = await axios.post(
                        "https://3000-blancreyes-authenticati-1lmbwos89sv.ws-eu90.gitpod.io/user", {
                            name: "Luis",
                            surname: "Blanco",
                            email: email,
                            password: password,
                        }
                    );
                    // don't forget to return something, that is how the async resolves
                    console.log(response);
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },

            logIn: async (email, password) => {
                try {
                    let response = await axios.post(
                        "https://3000-blancreyes-authenticati-1lmbwos89sv.ws-eu90.gitpod.io/login", {
                            email: email,
                            password: password,
                        }
                    );
                    localStorage.setItem("token", response.data.access_token);
                    console.log(response.data.access_token);
                    setStore({
                        auth: true,
                    });
                    return true;
                } catch (error) {
                    console.log(error);
                    if (error.response.status === 401) alert(error.response.data.message);
                    return false;
                }
            },

            validToken: async () => {
                let token = localStorage.getItem("token");
                try {
                    let response = await axios.get(
                        "https://3000-blancreyes-authenticati-1lmbwos89sv.ws-eu90.gitpod.io/profile", {
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                        }
                    );

                    // if (response.status === 200) {
                    setStore({
                        auth: response.data.isLogged,
                    });
                    return true;
                    // }
                } catch (error) {
                    console.log(error);
                    // if (error.response.status === 401)
                    //     alert(error.response.data.msg)
                    return false;
                }
            },

            logout: () => {
                localStorage.removeItem("token");
                setStore({
                    auth: false,
                });
                return true;
            },

            // getMessage: async () => {
            //     try {
            //         // fetching data from the backend
            //         const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
            //         const data = await resp.json();
            //         setStore({
            //             message: data.message,
            //         });
            //         // don't forget to return something, that is how the async resolves
            //         return data;
            //     } catch (error) {
            //         console.log("Error loading message from backend", error);
            //     }
            // },
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
                setStore({
                    demo: demo,
                });
            },
        },
    };
};

export default getState;