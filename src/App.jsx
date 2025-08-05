import Brands from './BrandSlide'
import './App.css'
import Drawer from './Drawer'
import Footer from './Footer'
import Navigation from './Navigation'
import ProductCard from './Productlist/ProductCard'
import CheckoutForm from './Form/CheckoutForm'
import { useState } from 'react'
import { product } from './Products/product'

function App() {
  const [visibility, setVisibility] = useState(false)
  const [selectedItem, setSelectItem] = useState(null)
  
  function handleOnclick(items){
    setSelectItem(items)
    setVisibility(!visibility)
  }
  function handleClose(){
    setSelectItem(null)
    setVisibility(!visibility)
  }
  return (
    <div className='min-h-screen flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
      <Navigation/>
      <CheckoutForm product={selectedItem} onClose={()=> handleClose()}/>
      <div className="content w-[80%] my-20">
        <div className="item-content flex flex-col lg:grid lg:grid-cols-3 gap-5">
          <Drawer/>
          <div className="product col-span-2">
            <section className='grid grid-cols-2 md:grid-cols-4 gap-2'>
              {product.map(item => (
                <ProductCard key={item.id} products={item} onCheckout={handleOnclick}/>
              ))}  
            </section>
          </div>
        </div>
      </div>
      <Brands/>
      <Footer/>
    </div>
      
  )
}

export default App
