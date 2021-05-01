import {useState, useContext, createContext, useEffect} from "react";
import {fakeAuthApi} from "../components/Login/fakeAuthApi";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isUserLoggedin, setLogin] = useState(false);
    const [error,  setError] = useState(null);
     const {state} = useLocation();
    const navigate = useNavigate();
   

    useEffect(() => {
        const loginStatus = JSON.parse(localStorage?.getItem("login"));
        loginStatus?.isUserLoggedin && setLogin(true);
    }, []);
    
    const loginUserWithCredentials = async (username, password) => {
       try {
        const response = await fakeAuthApi(username, password);
        if(response.success){
            setLogin(true);
            localStorage?.setItem("login", JSON.stringify({isUserLoggedin: true}));
            navigate(state?.from? state.from : "/");
          } 
        }
        catch(error) {
            setLogin(false);
            setError("Incorrect email or password.");
        }
     }
  
     const logoutUser = () => {
         setLogin(false);
         localStorage?.removeItem("login");
          navigate("/");
     }
    return (
        <AuthContext.Provider value={{isUserLoggedin, loginUserWithCredentials, logoutUser,error}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}