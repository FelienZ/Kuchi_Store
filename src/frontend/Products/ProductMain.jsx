import '../App.css'
import Drawer from '../Body/Drawer'
import ProductCard from './Productlist/ProductCard'
import {useContext, useState } from 'react'
import { ProductList } from '../../storeContext'
import { useSearchParams } from 'react-router'

function ProductMain() {
  
  const product = useContext(ProductList);
  const [searchParams] = useSearchParams()
  const [visibility, setVisibility] = useState(false)
  const [selectedItem, setSelectItem] = useState(null)
  const [sortBy, setSortBy] = useState('')

  const keyword = searchParams.get('keyword') || ''
  const category = searchParams.get('category') || ''
  const minPrice = Number(searchParams.get('min'))
  const maxPrice = Number(searchParams.get('max'))
  const stats = searchParams.get('status') || ''

  function handleOnclick(items){
    setSelectItem(items)
    setVisibility(!visibility)
  }
  function handleClose(){
    setSelectItem(null)
    setVisibility(!visibility)
  }
  function handleSelectSort(e){
    setSortBy(e.target.value)
  }

  const filterProduct = product.filter(i => {
    const matchKeyword = i.name.trim().toLowerCase().includes(keyword.trim().toLowerCase());
    const matchCategory = category? i.type.trim().toLowerCase() === category.trim().toLowerCase() : i.type;
    const matchMin = minPrice ? i.price >= minPrice : true;
    const matchMax = maxPrice ? i.price <= maxPrice : true;
    const matchNew = stats.trim() === '_new' ? i._new === true : true;
    const matchPopular = stats.trim() === 'popular' ? i.popular === true : true;
    const matchRecommended = stats.trim() === 'recommended' ? i.recommended === true : true;
    return matchKeyword && matchCategory && matchMin && matchMax && matchNew && matchPopular && matchRecommended
  })

  const sortItem = sortBy.trim() === 'descend' ?  filterProduct.toSorted((a, b) => b.price - a.price) : filterProduct.toSorted((a, b) => a.price - b.price)

  return (
    <div className='h-full flex flex-col justify-between gap-5 items-center text-base-300 w-screen bg-white overflow-x-hidden'>
      <div className="content w-[80%] my-20">
        <div className="item-content flex flex-col lg:grid lg:grid-cols-3 gap-5">
            <Drawer/>
          <div className={`product flex flex-col ${filterProduct.length ? '':'place-content-center'} gap-2 col-span-2`}>
            <div className={`${filterProduct.length ? 'flex justify-between' : 'hidden'}`}>
              <p className='font-bold'>{(category.trim() !== '' || stats.trim() !== '') ? (category.toUpperCase() || `${stats.trim() === '_new' ? 'NEW' : stats.toUpperCase()} PRODUCTS`) : 'Halaman Produk'}</p>
              <select defaultValue={sortBy} onChange={handleSelectSort} className='select bg-transparent w-[40%] md:w-[15%] border border-neutral'>
                <option disabled hidden value="">Urutkan</option>
                <option value="ascend">Menaik</option>
                <option value="descend">Menurun</option>
              </select>
            </div>
            {filterProduct.length > 0 ? 
            (<section className='grid max-sm:grid-cols-2 max-xl:grid-cols-3 grid-cols-4 gap-2'>
                {sortBy.trim() !== '' ? (
                 sortItem.map(item => (
                <ProductCard key={item.id} products={item} onCheckout={handleOnclick}/>
              ))) : filterProduct.map(item => (
                <ProductCard key={item.id} products={item} onCheckout={handleOnclick}/>
              ))
              }
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

export default ProductMain
