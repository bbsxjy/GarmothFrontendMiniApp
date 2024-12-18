import React from 'react'
import Menu from './header/menu'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <main id="main" className="pt-[48px] lg:pt-[76px]">
        
        {children}
      </main>
    </div>
  )
}

export default Layout
