import React from "react";
import Login from "../../components/Login/Login";
import authBG from "../../assets/images/auth.png";

export default function LoginPage() {
    return (
        <div style={{ display: "flex", maxHeight: "100vh", maxWidth: "100vw" }}>
            <Login />
            <div>
                <img
                    src={authBG}
                    style={{
                        position: "absolute",
                        maxHeight: "100vh",
                        width: "50vw",
                        zIndex: 0,
                    }}
                    alt="Register Cover"
                />
               
            </div>
        </div>
    );
}
