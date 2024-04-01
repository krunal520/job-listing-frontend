import React from "react";
import Register from "../../components/Register/Register";
import authBG from "../../assets/images/auth.png";

export default function RegisterPage() {
    return (
        <div style={{ display: "flex", maxHeight: "100vh", maxWidth: "100vw" }}>
            <Register />
            <div style={{ display: "flex", flexDirection: "column" }}>
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
