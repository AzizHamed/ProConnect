import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";

export function useGetAuthUser(authData: any) {
    const [authUser, setAuthUser] = useState();
    const auth = getAuth(); 
    // const dispatch = useDispatch<AppDispatch>();
    // const currentWindow = useSelector(getWindow);

    useEffect(() => {
        auth.onAuthStateChanged((user: any)=>{
            console.log(user)
            setAuthUser(user);
        }, (error: any)=>{
            console.log(error)
            setAuthUser(undefined);
        })
    }, []);
  
    // Return the width so we can use it in our components
    return { authUser };
  }