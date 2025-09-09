import { NavLink, Outlet } from "react-router";

export default function HelpPage(){
    return(
        <section className="my-10 min-h-screen w-[80%] divide-y place-self-center gap-4 flex flex-col">
            <p className="font-bold md:text-2xl py-3">Pusat Informasi</p>
            <div className="container grid gap-3 md:grid-cols-3">
                <div className="left flex max-md:hidden flex-col gap-8">
                    <p className="font-bold text-lg">Tentang Kami</p>
                    <div className={`navigation flex flex-col gap-5`}>
                        <NavLink className={({isActive}) => isActive ? 'text-lime-500' : ''} to={'help'}><p>Bantuan</p></NavLink>
                        <NavLink className={({isActive}) => isActive ? 'text-lime-500' : ''} to={'about'}><p>Tentang Kami</p></NavLink>
                        <NavLink className={({isActive}) => isActive ? 'text-lime-500' : ''} to={'contact'}><p>Hubungi Kami</p></NavLink>
                        <p>Partnership</p>
                        <p>Cara Berbelanja</p>
                        <p>Services</p>
                    </div>
                </div>
                <div tabIndex={0} className="left hidden max-md:collapse collapse-arrow border-gray-400 border max-md:rounded-none">
                <div className="collapse-title font-bold">Tentang Kami</div>
                <div className="navigation collapse-content flex flex-col gap-4">
                    <NavLink className={({isActive}) => isActive ? 'text-lime-500' : ''} to={'help'}><p>Bantuan</p></NavLink>
                    <NavLink className={({isActive}) => isActive ? 'text-lime-500' : ''} to={'about'}><p>Tentang Kami</p></NavLink>
                    <p>Hubungi Kami</p>
                    <p>Partnership</p>
                    <p>Cara Berbelanja</p>
                    <p>Services</p>
                </div>
                </div>
                <div className="right md:col-span-2 flex flex-col gap-8">
                    {/* <p>Tes</p> */}
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}