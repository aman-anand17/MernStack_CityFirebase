import react, { useState } from "react";
import { LoginContext } from "./LoginContext";

const LoginContextState =(props)=>{
    const[islogin,setLogin]=useState(false);
    const[userName,setUserName]=useState("");
    const[userEmail,setUserEmail]=useState("");
    return(
        <LoginContext.Provider value={{islogin,setLogin,userName,setUserName,userEmail,setUserEmail}}>
            {props.children}
        </LoginContext.Provider>

    )
}

export default LoginContextState;