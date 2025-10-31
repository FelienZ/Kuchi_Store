import { useEffect, useState } from "react";
import { UserContext } from "./storeContext";
import useFetchUser from "./hooks/fetchUser";
import { useLocation } from "react-router";

export function UserProvider({children}){
  const location = useLocation()
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const fetchUser = useFetchUser(setUser, setIsLoading)
  useEffect(() => {
    fetchUser()
  }, [fetchUser, location.pathname]);
  return(
        <UserContext.Provider value={{user, setUser, isLoading, refetchUser: fetchUser}}>
            {children}
        </UserContext.Provider>
  )
}