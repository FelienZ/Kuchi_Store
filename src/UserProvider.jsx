import { useEffect, useState } from "react";
import { UserContext } from "./storeContext";
import useFetchUser from "./hooks/fetchUser";

export function UserProvider({children}){
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const fetchUser = useFetchUser(setUser, setIsLoading)
  useEffect(() => {
    fetchUser()
  }, [fetchUser]);
  return(
        <UserContext.Provider value={{user, setUser, isLoading, refetchUser: fetchUser}}>
            {children}
        </UserContext.Provider>
  )
}