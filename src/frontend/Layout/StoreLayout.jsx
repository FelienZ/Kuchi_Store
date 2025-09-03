import { Outlet } from "react-router";
import Navigation from "../Navigation";
import Footer from "../Footer";

export default function StoreLayout(){
    return(
        <div className ='min-h-screen flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
            <Navigation />
            <div>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}