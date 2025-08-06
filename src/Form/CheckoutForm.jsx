import { faClose, faShoppingCart, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CheckoutForm({product, onClose, onCheckout}){
    if(product !== null){
    return(
        <form className={`fixed z-40 inset-0 bg-black/50 justify-center items-center transition-opacity duration-300 ${product ? 'flex' : 'hidden'}`}>
            <div className="container flex bg-white flex-col items-center justify-center p-3 rounded-md w-fit">
                <p className="text-lg self-end rounded-sm" onClick={onClose}><FontAwesomeIcon icon={faClose}/></p>
                <p className="text-lg font-medium">Detail Barang</p>
                <div className="image">
                    <img src={product.url} alt={`Item-${product.name}`} className="size-50"/>
                </div>
                <div className="item-content flex flex-col items-center gap-2">
                    <p className="font-medium">{product.name}</p>
                    <p><FontAwesomeIcon icon={faTag} className="text-yellow-500"/>{product.price.toLocaleString('id-ID',{style:'currency', currency:'IDR'})}</p>
                    <p>Stock: {product.stock}</p>
                </div>
                <button className="btn btn-warning" 
                onClick={(e)=> {
                e.preventDefault();
                onCheckout(product)
                }}><FontAwesomeIcon icon={faShoppingCart}/> Checkout Now!</button>
            </div>
        </form>
    )    
    }
}