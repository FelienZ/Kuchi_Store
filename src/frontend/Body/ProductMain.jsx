import '../App.css'
import Drawer from './Drawer'
import ProductCard from '../Products/Productlist/ProductCard'
import CheckoutForm from '../Form/CheckoutForm'
import {useContext, useState } from 'react'
import { ProductList } from '../../storeContext'
import { useSearchParams } from 'react-router'

function ProdocutMain() {
  
  const product = useContext(ProductList);
  const [searchParams] = useSearchParams()
  const [visibility, setVisibility] = useState(false)
  const [selectedItem, setSelectItem] = useState(null)
  const [checkOutItem, setCheckOutItem] = useState([]);

  const keyword = searchParams.get('keyword') || ''
  const category = searchParams.get('category') || ''
  const minPrice = Number(searchParams.get('min'))
  const maxPrice = Number(searchParams.get('max'))

  function handleOnclick(items){
    setSelectItem(items)
    setVisibility(!visibility)
  }
  function handleClose(){
    setSelectItem(null)
    setVisibility(!visibility)
  }
  function handleCheckout(product){
    setCheckOutItem(item => [...item, product ])
  }
  const filterProduct = product.filter(i => {
    const matchKeyword = i.name.trim().toLowerCase().includes(keyword.trim().toLowerCase());
    const matchCategory = i.type.trim().toLowerCase() === category.trim().toLowerCase();
    const matchMin = minPrice ? i.price >= minPrice : true;
    const matchMax = maxPrice ? i.price <= maxPrice : true

    return matchKeyword && matchCategory && matchMin && matchMax
  })
  return (
    <div className='h-full flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
      <CheckoutForm product={selectedItem} onClose={()=> handleClose()} onCheckout={handleCheckout}/>
      <div className="content w-[80%] my-20">
        <div className="item-content flex flex-col lg:grid lg:grid-cols-3 gap-5">
            <Drawer/>
          <div className={`product flex flex-col ${filterProduct.length ? '':'place-content-center'} col-span-2`}>
            <p className={`font-bold ${filterProduct.length ? 'flex justify-end' : 'hidden'}`}>{category.toLocaleUpperCase('id-ID')}</p>
            {filterProduct.length > 0 ? 
            (<section className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                {filterProduct.map(item => (
                <ProductCard key={item.id} products={item} onCheckout={handleOnclick}/>
              ))}
            </section>) : (
              <section className='grid md:border border-neutral rounded-md place-content-center h-screen'>
                <p>Produk Tidak Tersedia!</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
      
  )
}

export default ProdocutMain
