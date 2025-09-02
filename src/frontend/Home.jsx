import Brands from './Body/BrandSlide'
import './App.css'
import Drawer from './Body/Drawer'
import ProductCard from './Productlist/ProductCard'
import CheckoutForm from './Form/CheckoutForm'
import {useState } from 'react'
import CheckOutCard from './Productlist/CheckOutCard'
import { product } from '../Products/product'

function App() {
  const [visibility, setVisibility] = useState(false)
  const [selectedItem, setSelectItem] = useState(null)
  const [checkOutItem, setCheckOutItem] = useState([]);
  const [filterPrice, setFilterPrice] = useState(0)
  function handleOnclick(items){
    setSelectItem(items)
    setVisibility(!visibility)
  }
  function handleClose(){
    setSelectItem(null)
    setVisibility(!visibility)
  }
  function handleCheckout(product){
    console.log(product)
    setCheckOutItem(item => [...item, product ])
  }
  function handleFilterPrice(payload){
    console.log('tes: ', payload)
    setFilterPrice(payload)
  }
  const filteredProduct = product.filter(i => (i.price >= filterPrice.min && i.price <= filterPrice.max))
  console.log('produk: ', filteredProduct)
  return (
    <div className='min-h-screen flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
      <CheckoutForm product={selectedItem} onClose={()=> handleClose()} onCheckout={handleCheckout}/>
      <div className="content w-[80%] my-20">
        <div className="item-content flex flex-col lg:grid lg:grid-cols-3 gap-5">
          <Drawer sendFilter={handleFilterPrice}/>
          <div className="product col-span-2">
            <section className='grid grid-cols-2 md:grid-cols-4 gap-2'>
              {filteredProduct.length ? (
                filteredProduct.map(item => (
                <ProductCard key={item.id} products={item} onCheckout={handleOnclick}/>
              ))
              ) : (
                product.map(item => (
                <ProductCard key={item.id} products={item} onCheckout={handleOnclick}/>
              ))
              )}  
            </section>
          </div>
        </div>
      </div>
      <Brands/>
      {/* <CheckOutCard checkoutItems={checkOutItem}/> */}
    </div>
      
  )
}

export default App
