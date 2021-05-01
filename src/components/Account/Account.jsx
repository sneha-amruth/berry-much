import {useAuth} from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import "./Account.css";

export default function Account(){
    const {isUserLoggedin, logoutUser} = useAuth();
    const navigate = useNavigate();
    
    return (
        <>
        <h1 className="account-header">Your account</h1>
        <h2>Your orders</h2>
        <button onClick={() => {logoutUser(); }}  className="btn btn-small">{isUserLoggedin ? "logout" : "login"}</button>
        </>
    )
}
