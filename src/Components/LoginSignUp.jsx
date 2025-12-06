import "./LoginSignUp.css"
import { useState } from "react"
export default function LoginSignUp() {

    const [mode, setMode] = useState("");

    const [loginMsg, setLoginMsg] = useState("");

    const [inputData, setInputData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [successMsg, setSuccessMsg] = useState("");


    function handleInputData(event) {
        let fieldName = event.target.name;
        console.log(fieldName);
        let newValue = event.target.value;
        console.log(newValue);
        setInputData(() => {
            setInputData({
                ...inputData,
                [fieldName]: event.target.value
            });

        })
    }
    function ValidateSignUp() {
        if (inputData.username !== "" && inputData.email !== "" && inputData.password !== "") {
            localStorage.setItem("userData", JSON.stringify(inputData));
            setSuccessMsg("Successfully Signed-In");
        }
    }

    function handleGoBack() {
        setSuccessMsg("");
        setInputData({
            username: "",
            email: "",
            password: ""
        });
        setMode("");
    }

    if (successMsg !== "") {
        return (
            <div className="auth-box">
                <h2 style={{ color: "green", textAlign: "center" }}>
                    {successMsg}
                </h2>

                <button
                    onClick={handleGoBack}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Go Back
                </button>
            </div>
        );
    }

    function ValidateLoginData() {
        const storedData = JSON.parse(localStorage.getItem("userData"));

        if (!storedData) {
            setLoginMsg("No user found ! first sign up..");
            return;
        }
        if (
            inputData.email === storedData.email &&
            inputData.password === storedData.password
        ) {
            setLoginMsg("Login Successful!");
        } else {
            setLoginMsg("Invalid Email or Password!");
        }

    }

    if (loginMsg !== "") {
        return (
            <div className="auth-box">
                <h2 style={{ color: "green", textAlign: "center" }}>
                    {loginMsg}
                </h2>
            </div>
        );
    }

    return (
        <>
            <div className="auth-box">
                <div id="loginForm" className="form active">
                    <h2>{mode === "" ? "Login Page" : mode}</h2>
                    {mode === "Sign Up" ? <input type="text" placeholder="Name" name="username" onChange={handleInputData} required /> : <div></div>}
                    <input type="email" placeholder="Email" name="email" onChange={handleInputData} required />
                    <input type="password" placeholder="Password" name="password" onChange={handleInputData} required />

                    <div className="tabs">
                        {mode !== "Login" &&
                            <button id="signupTab" type="submit" className="tab" onClick={() => {
                                setMode("Sign Up");
                                ValidateSignUp();
                            }}>
                                Sign Up
                            </button>
                        }
                        {mode !== "Sign Up" &&
                            <button id="loginTab" type="submit" className="tab active" onClick={() => {
                                setMode("Login");
                                ValidateLoginData();
                            }}>
                                Login
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
