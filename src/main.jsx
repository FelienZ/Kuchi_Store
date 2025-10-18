import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import StoreLayout from './frontend/Layout/StoreLayout.jsx'
import CheckoutPage from './frontend/CheckoutPage.jsx'
import HomePage from './frontend/Home/HomePage.jsx'
import ProductMain from './frontend/Products/ProductMain.jsx'
import ProductDetail from './frontend/Products/ProductDetail.jsx'
import HelpPage from './frontend/Information/HelpPage.jsx'
import Help from './frontend/Information/Help.jsx'
import About from './frontend/Information/About.jsx'
import Contact from './frontend/Information/Contact.jsx'
import Partner from './frontend/Information/Partner.jsx'
import Tutorials from './frontend/Information/Tutorials.jsx'
import Services from './frontend/Information/Services.jsx'
import ProfilePages from './frontend/User/profilePages.jsx'
import ScrollToTop from './hooks/Effect/scrollToTop.js'
import { UserProvider } from './UserProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            <Route path='' element={<StoreLayout/>}>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/products' element={<ProductMain/>}/>
              <Route path='/products/:id' element={<ProductDetail/>}/>
              <Route path='/checkout' element={<CheckoutPage/>}/>
              <Route path='/profile' element={<ProfilePages/> }/>
              <Route path='/information' element={<HelpPage/>}>
                <Route path='help' element={<Help/>}/>
                <Route path='about' element={<About/>}/>
                <Route path='contact' element={<Contact/>}/>
                <Route path='partnership' element={<Partner/>}/>
                <Route path='tutorials' element={<Tutorials/>}/>
                <Route path='services' element={<Services/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
