import { useSnackbar, SNACKBAR_ACTIONS } from "../../context/snackbar-context";
import { useEffect } from "react";
import "./Snackbar.css";

export default function Snackbar() {
    const { snackbarStatus, snackbarDispatch } = useSnackbar();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            snackbarDispatch({
                type: SNACKBAR_ACTIONS.INITIAL
            })
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [])
    return (
        <div className="snackbar-container">
        <div className={snackbarStatus["alertType"].toLowerCase(), "snackbar"}>
            <i className="fas fa-check"></i>
            <span> {snackbarStatus["msg"]} </span>
        </div>
        </div>
    )
}