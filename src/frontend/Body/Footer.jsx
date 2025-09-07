import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardPayment from "../Products/Productlist/CardPayment";
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer(){
    return(
        <footer className="flex flex-col gap-20 w-full mt-10 bg-neutral text-base-content">
            <section className="footer sm:footer-horizontal p-10">
            <nav className="flex flex-col gap-2">
                <h6 className="footer-title">Tentang Kami</h6>
                <a className="link link-hover"><FontAwesomeIcon icon={faLocationDot}/> Sako, Palembang, Sumatera Selatan</a>
                <a className="link link-hover"><FontAwesomeIcon icon={faPhone}/> +62-812-1234-5678</a>
                <a className="link link-hover"><FontAwesomeIcon icon={faEnvelope}/> KuchiStore@gmail.com</a>
            </nav>
            <nav>
                <h6 className="footer-title">Metode Pembayaran</h6>
                <CardPayment/>
            </nav>
            <form>
                <h6 className="footer-title">Newsletter</h6>
                <fieldset className="w-80 flex flex-col gap-2">
                <label>Dapatkan Penawaran Spesial</label>
                <div className="join">
                    <input
                    type="text"
                    placeholder="username@gmail.com"
                    className="input input-ghost border border-base-100 join-item" />
                    <button className="btn btn-ghost hover:bg-neutral border border-base-100 max-sm:p-2 join-item">Subscribe</button>
                </div>
                </fieldset>
            </form>
            </section>
            <section className="flex flex-col items-center gap-5 border-t py-5 border-neutral-500/30">
                <div className="pt-5 logo flex w-full gap-5 justify-center">
                    <FontAwesomeIcon icon={faGithub} className="text-2xl"/>
                    <FontAwesomeIcon icon={faInstagram} className="text-2xl"/>
                    <FontAwesomeIcon icon={faLinkedin} className="text-2xl"/>
                </div>
                <p className="font-bold">2025 © Kuchiha Store By FelienZ</p>
            </section>
        </footer>
    )
}