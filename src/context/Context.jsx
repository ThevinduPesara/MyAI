import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showresult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");


    const onSent = async (prompt) => {
        await runChat(prompt)
    }


    onSent("what is react js")

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showresult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }

    return(
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider