import React from 'react'
import Footer from './Footer'
import Header from './Header'
const Layout = ({children}) => {
  return (
    <>
  <div className="layout-container">
  <Header/>
      <div className="content" >
        {children}
      </div>
      <Footer></Footer>
  </div>
    
    
      
    </>
  )
}

export default Layout
