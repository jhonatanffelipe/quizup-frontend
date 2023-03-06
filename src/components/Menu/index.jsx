import { useCallback, useState } from 'react'
import { FiMenu } from 'react-icons/fi'

import { Container } from './styles'
import logoImg from '../../assets/logoWhite.png'
import { Link } from 'react-router-dom'

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
        <Link to="/">
          {menuOpen && <img src={logoImg} alt="Turtle Quiz" />}
        </Link>
      </div>
    </Container>
  )
}

export { Menu }
