import { useRef, useCallback } from "react";
import GlobalContext from "./GlobalContext";

const GlobalContextState = (props) => {
    const ButtonRef = useRef(null);
    ButtonRef.current = true;

    const toggleAddNote = useCallback((val) => {
        ButtonRef.current = val;
    }, []);

    return (
        <GlobalContext.Provider value={{ toggleAddNote, addButtonOn: ButtonRef.current }}>
            {props.children}
        </GlobalContext.Provider>
    );
};
export default GlobalContextState;
