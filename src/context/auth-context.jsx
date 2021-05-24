import {useState, useContext, createContext, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {restAPICalls} from "../utils/CallRestAPI";
import {useLoader} from "./loader-context";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const {setLoading} = useLoader();
    const [isUserLoggedIn, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loginError,  setLoginError] = useState(null);
    const {state} = useLocation();
    const navigate = useNavigate();
    const {request} = restAPICalls();
   

    useEffect(() => {
        const userLoginStatus = JSON.parse(localStorage?.getItem("user"));
        userLoginStatus?.isUserLoggedIn && setLogin(true);
    }, []);
    
    const loginUserWithCredentials = async (email, password) => {
     try {
        setLoading(true);
        const  { data, success } = await request({
            method: "POST",
            endpoint: "/api/user/login",
            body: {
              email,
              password,
            },
          });
         
        if (success) {
            localStorage.setItem("user", JSON.stringify({ userId: data._id, email: data.email, name: data.firstName, isUserLoggedIn: true }));
            setUserId(JSON.parse(localStorage?.getItem("user"))?.userId);
            setLoading(false);
            setLogin(true);
            navigate(state?.from? state.from : "/");
        } else {
            setLoading(false);
            setLogin(false);
            setUserId(null);
            setLoginError("Incorrect email or password.");
        }
        
      } catch (err) {
        console.error(err);
      }
     }
  
     const logoutUser = () => {
        setLogin(false);
        localStorage?.removeItem("user");
        navigate("/");
     }
    return (
        <AuthContext.Provider value={{isUserLoggedIn, userId, loginUserWithCredentials, logoutUser,loginError,setLoginError}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}