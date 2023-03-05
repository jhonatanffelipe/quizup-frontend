import { useCallback, useState } from 'react'
import { FiMenu } from 'react-icons/fi'

import { Container } from './styles'
import logoImg from '../../assets/logoWhite.png'

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(true)
  const [width, setWidth] = useState(275)

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(!menuOpen)
    setWidth(width === 275 ? 55 : 275)
  }, [width, menuOpen])

  return (
    <Container width={width} menuOpen={menuOpen}>
      <div className="menu-title">
        <button onClick={handleCloseMenu}>
          <FiMenu size={30} color="#fff" />
        </button>
        {menuOpen && <img src={logoImg} alt="Turtle Quiz" />}
      </div>
    </Container>
  )
}

export default Menu
