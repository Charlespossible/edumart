import React from "react";

const Logout: React.FC = ()=> {

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        //navigate("/login");
      };

    return (
        <div>
            onClick={};
        </div>
        )
}

export default Logout;