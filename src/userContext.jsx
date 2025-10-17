import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)

export function UserProvider({children}){
    const [user, setUser] = useState(null);
    useEffect(() => {
    fetch('http://localhost:3000/api/users/me', { 
        credentials: 'include' 
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {setUser(data.data); console.log(data)})
      .catch(() => setUser(null));
      //kalo basi -> null
  }, []);
    
    return(
        <UserContext.Provider value={{user, setUser}}>
            {console.log('cek user dari context: ', user)}
            {children}
        </UserContext.Provider>
    )
}