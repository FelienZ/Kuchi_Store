import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router'

export default function ProductCard({products, onCheckout}){
    const navigate = useNavigate()
    return(
    <section id='list'>
          <div onClick={()=> navigate(`/products/${products.id}`)} className='flex flex-col items-center border border-base-300 p-3 rounded-sm hover:cursor-pointer'>
            <div className="picture">
              <img src={products.url} alt={`Gambar-${products.name}`} className='max-sm:size-30 size-40 rounded-md' />
            </div>
            <div className="content flex flex-col gap-2 items-center">
              <div className="detail max-sm:text-sm text-center h-full">
                <p className='font-bold text-md h-25 flex items-center '>{products.name}</p>
                <p>{products.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
              </div>
              {/* <div className="buttons flex justify-center">
                <button className='btn' onClick={()=> onCheckout(products)}><FontAwesomeIcon icon={faCartShopping}/> Checkout</button>
              </div> */}
            </div>
          </div>
      </section>
    )
}