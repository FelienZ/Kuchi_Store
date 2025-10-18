import { useEffect, useState } from "react";
import { UserContext } from "./storeContext";

export function UserProvider({children}){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
    fetch('http://localhost:3000/api/users/me', { 
        credentials: 'include' 
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setUser(data.data))
      .catch(() => setUser(null))
      .finally(()=> setIsLoading(true))
      //kalo basi -> null
  }, []);
    
    return(
        <UserContext.Provider value={{user, setUser, isLoading}}>
            {children}
        </UserContext.Provider>
    )
}