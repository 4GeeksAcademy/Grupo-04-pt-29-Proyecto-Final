
export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token !== null;
    }