import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import StoreLayout from './frontend/Layout/StoreLayout.jsx'
import CheckoutPage from './frontend/CheckoutPage.jsx'
import HelpPage from './frontend/HelpPage.jsx'
import HomePage from './frontend/Home/HomePage.jsx'
import ProdocutMain from './frontend/Body/ProductMain.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<StoreLayout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/products' element={<ProdocutMain/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='/help' element={<HelpPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
