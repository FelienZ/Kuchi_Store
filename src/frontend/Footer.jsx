import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardPayment from "./Productlist/CardPayment";

export default function Footer(){
    return(
        <footer className="footer mt-10 sm:footer-horizontal bg-neutral text-base-content p-10">
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
            </footer>
    )
}