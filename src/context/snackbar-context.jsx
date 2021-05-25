import { useReducer, useContext, createContext } from "react";

export const SNACKBAR_ACTIONS = {
    INITIAL: "initial",
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info"
}

export const SnackbarContext = createContext();

export function SnackbarContextProvider({children}) {
    const reducer = (state, action) => {
        switch(action.type){
            case SNACKBAR_ACTIONS.INITIAL:
                return {display: false, alertType: ""}

            case SNACKBAR_ACTIONS.SUCCESS:
                return {display: true, alertType: "SUCCESS", msg: action.payload}
            
            case SNACKBAR_ACTIONS.ERROR:
                return {display: true, alertType: "ERROR", msg: action.payload}    
            
            case SNACKBAR_ACTIONS.INFO:
                return {display: true, alertType: "INFO", msg: action.payload}

            default:
                return state
        }
    }

    const [ snackbarStatus, snackbarDispatch ] = useReducer(reducer, { display: false, alertType: "", msg: ""  });
    return (
        <SnackbarContext.Provider value={{ snackbarStatus, snackbarDispatch }}>
            {children}
        </SnackbarContext.Provider>
    )
}
export function useSnackbar(){
    return useContext(SnackbarContext);
}
