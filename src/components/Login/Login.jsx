import "./Login.css";
import {useAuth} from "../../context/auth-context";
import {useState} from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const {isUserLoggedin, loginUserWithCredentials, error} = useAuth();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    

    async function loginHandler() {  
     loginUserWithCredentials(credentials.email, credentials.password);
    }
    function handleChange(event){
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
        <> 
            <div className="login-form">
            <h1>Login</h1>
            <div className="error-message">{error}</div>
            <label>Email </label>
            <input type="text" name="email" onChange={handleChange} required className="input-box"/>
            <label>Password </label>
            <input type="password" name="password" onChange={handleChange} required className="input-box"/>
            <button type="button" onClick={loginHandler} className="btn btn-primary btn-large">{isUserLoggedin ? "logout" : "SIGN IN"}</button>
            <Link to="/register"><button type="button" className="btn btn-large btn-create">Create account</button></Link> 
            </div>
        </>
    )
}
