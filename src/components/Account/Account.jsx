import {useAuth} from "../../context/auth-context";
import "./Account.css";
import { useEffect, useState } from "react";

export default function Account(){
    const {isUserLoggedIn, logoutUser} = useAuth();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(JSON.parse(localStorage?.getItem("user")).name);
    })
    
    return (
        <>
        <h1 className="account-header">Hello, {userName}</h1>
        <h2>Your orders</h2>
        <button onClick={() => {logoutUser(); }}  className="btn btn-small">{isUserLoggedIn ? "logout" : "login"}</button>
        </>
    )
}
