import React from "react";

const Logout: React.FC = ()=> {

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        navigate("/login");
      };

    return (
        <div>
            onClick={handleLogout};
        </div>
        )
}

export default Logout;