import React, { useState } from 'react'

import MobileMenu from '../MobileMenu'

interface MenuButtonProps {
  onClick: () => void
}
const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => (
  <div className="m-1 flex size-10 items-center justify-center rounded-md border border-500" onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="icon"
      width="24px"
      height="24px"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32"
      >
      </path>
    </svg>
  </div>
)

const Brand: React.FC = () => (
  <div className="flex items-center">
    <a href="/" className="router-link-active router-link-exact-active text-2xl font-bold" aria-current="page">
      黑沙盒子
    </a>
  </div>
)

const LanguageSelector: React.FC = () => (
  <div className="flex gap-2 py-1">
    <div className="group">
      <div className="mr-4 flex h-12 items-center gap-1">
        <button className="cut-text flex h-10 items-center gap-1 rounded px-2 text-lg font-bold" style={{ background: 'linear-gradient(121deg, rgb(88, 101, 242) 0%, rgb(64, 78, 237) 100%)' }}>
          登录
        </button>
      </div>
    </div>
  </div>
)

const MobileNavbar: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false)

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  return (
    <div className="relative block h-12 w-full bg-700 lg:hidden">
      <div className="flex justify-between">
        <MenuButton onClick={toggleMenu} />
        <Brand />
        <LanguageSelector />
      </div>
      {menuVisible && <MobileMenu />}
    </div>
  )
}

export default MobileNavbar
