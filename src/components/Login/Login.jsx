import "./Login.css";
import { useAuth } from "../../context/auth-context";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { useLoader } from "../../context/loader-context";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Login() {
    const {isUserLoggedIn, loginUserWithCredentials, loginError, setLoginError} = useAuth();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const {isLoading} = useLoader();
    const {state} = useLocation();
    const navigate = useNavigate();

    if(isUserLoggedIn){
        navigate(state?.from? state.from : "/");
    }
     function loginHandler() {  
        loginUserWithCredentials(credentials.email, credentials.password);
    }
    function handleGuestCredentials() {
        loginUserWithCredentials("testuser@gmail.com", "testuser@12");
    }
    function handleChange(event){
        setLoginError();
        const {name, value} = event.target;
       
            setCredentials((prevVal) => {
                if(name === "email")
                    return  { 
                    email: value, 
                    password: prevVal.password
                    }
                else if(name === "password")
                    return {
                        email: prevVal.email,
                        password: value
                    }
            });
        }
       
    
    return (
        <> {isLoading && <Loader />}
           {!isLoading && <div className="login-form">
            <h1>Login</h1>
            <div className="error-message">{loginError}</div>
            <label>Email </label>
            <input type="text" name="email" value={credentials.email} onChange={handleChange} required className="input-box"/>
            <label>Password </label>
            <input type="password" name="password" value={credentials.password} autoComplete="on" onChange={handleChange} required className="input-box"/>
            <button type="button" onClick={loginHandler} className="btn btn-primary btn-large">LOG IN</button>
            <button type="button" onClick={handleGuestCredentials} className="btn btn-primary btn-large">Login as Guest</button>
            <Link to="/register" className="create-link">Don't have an account? Sign Up</Link>
          </div>
}
        </>
    )
}