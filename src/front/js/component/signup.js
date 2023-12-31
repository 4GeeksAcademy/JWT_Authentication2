import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate()

    const token = sessionStorage.getItem; ("token");
    console.log(token);
    const handleClick = async (e) => {
        e.preventDefault();
        await actions.createUser(email, password);
        navigate("/login");
    };

    return (
        <Container className="container">
            <div className="signupCont">
                <form className="signupForm">
                    <div className="loginFormContent">
                        <h1 className="sign">Sign Up for Account </h1>
                        <div className="input-field">
                            <input className="myInput" type={"text"} placeholder={'Email'} value={email} onChange={(e) => setemail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <input className="myInput" type={'password'} placeholder={'Password'} value={password} onChange={(e) => setpassword(e.target.value)} />
                        </div>

                    </div>
                    <div className="loginFormAction">
                        <button className="formBtn regBtn" onClick={(e) => handleClick(e)}>Register</button>
                    </div>
                </form>
            </div>
        </Container >
    );
}
