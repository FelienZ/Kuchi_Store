import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function ProductCard({products, onCheckout}){

    return(
    <section id='list'>
          <div className='flex flex-col items-center border border-base-300 p-3 rounded-sm'>
            <div className="picture">
              <img src={products.url} alt={`Gambar-${products.name}`} className='size-40 rounded-md' />
            </div>
            <div className="content flex flex-col gap-2 items-center">
              <div className="detail max-sm:text-sm text-center h-20">
                <p className='font-bold text-md h-15 flex items-center '>{products.name}</p>
                <p>{products.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
              </div>
              <div className="buttons flex justify-center">
                <button className='btn' onClick={()=> onCheckout(products)}><FontAwesomeIcon icon={faCartShopping}/> Checkout</button>
              </div>
            </div>
          </div>
      </section>
    )
}