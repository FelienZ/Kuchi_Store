import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop(){
    const pathName = useLocation();

    useEffect(()=> {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [pathName])

    return null
}