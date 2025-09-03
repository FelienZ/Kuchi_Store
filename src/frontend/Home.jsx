import Brands from './Body/BrandSlide'
import './App.css'
import Drawer from './Body/Drawer'
import ProductCard from './Productlist/ProductCard'
import CheckoutForm from './Form/CheckoutForm'
import {useReducer, useState } from 'react'
import CheckOutCard from './Productlist/CheckOutCard'
import { product } from '../Products/product'
import { ProductReducerContext } from '../storeContext'
import Navigation from './Navigation'

function ProductReducer(list, action){
  switch(action.type){
    case "SET_FILTER":
      return {...list, filter: {...list.filter, keyword: action.text, price: action.price}}
  }
}

function App() {
  const [visibility, setVisibility] = useState(false)
  const [selectedItem, setSelectItem] = useState(null)
  const [checkOutItem, setCheckOutItem] = useState([]);
  const [filterPrice, setFilterPrice] = useState(null)
  const [ProductList, dispatch] = useReducer(ProductReducer, {
    item: product,
    filter: {
      keyword: '',
      price: 0
    },
    status: ''
  })
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
  const filteredProduct = product.filter(i => {
    const findMin = filterPrice !== null ? i.price >= filterPrice.min  : i
    const findMax = filterPrice !== null ? i.price <= filterPrice.max  : i
    return findMax && findMin
  })
  console.log('produk: ', filteredProduct)
  return (
    <div className='min-h-screen flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
      <CheckoutForm product={selectedItem} onClose={()=> handleClose()} onCheckout={handleCheckout}/>
      <div className="content w-[80%] my-20">
        <div className="item-content flex flex-col lg:grid lg:grid-cols-3 gap-5">
          {/* <ProductReducerContext.Provider value={dispatch}> */}
            <Drawer sendFilter={handleFilterPrice}/>
          {/* </ProductReducerContext.Provider> */}
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
