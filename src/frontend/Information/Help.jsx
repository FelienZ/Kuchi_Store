import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Help(){
    return (
        <section className="flex flex-col gap-4">
            <p className="font-bold text-xl">Pusat Bantuan</p>
            <div className="seacrhField flex items-center">
                <input type="text" className="input rounded-none bg-transparent border border-neutral max-md:w-full w-[50%]" placeholder="Cari Topik"/>
                <button className="btn btn-neutral rounded-none"><FontAwesomeIcon icon={faSearch}/></button>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow border-gray-400 border">
            <div className="collapse-title font-semibold">Sample Q1</div>
            <div className="collapse-content text-sm">
                <p>Sample A1</p>
            </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow border-gray-400 border">
            <div className="collapse-title font-semibold">Sample Q2</div>
            <div className="collapse-content text-sm">
                <p>Sample A2</p>
            </div>
            </div>
        </section>
    )
}