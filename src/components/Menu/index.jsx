import { useCallback, useState } from 'react'
import { FiChevronDown, FiChevronUp, FiMenu, FiSettings } from 'react-icons/fi'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import {
  Container,
  MenuTitle,
  MenuSession,
  MenuItem,
  MenuItemTitle,
  MenuSessionSubItens,
  MenuSubItem,
} from './styles'
import logoImg from '../../assets/logoWhite.png'

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(true)
  const [width, setWidth] = useState(275)
  const [admin, setAdmin] = useState(false)
  const [question, setQuestion] = useState(false)

  const handleMenu = useCallback(() => {
    console.log(menuOpen)
    setMenuOpen(!menuOpen)
    setWidth(width === 275 ? 55 : 275)
  }, [width, menuOpen])

  return (
    <Container width={width} menuOpen={menuOpen}>
      <MenuTitle>
        <button onClick={handleMenu}>
          <FiMenu size={30} />
        </button>
        <Link to="/">
          {menuOpen && <img src={logoImg} alt="Turtle Quiz" />}
        </Link>
      </MenuTitle>

      <MenuSession>
        <MenuItem>
          <MenuItemTitle onClick={() => setAdmin(!admin)}>
            <button
              onClick={() => {
                if (!menuOpen) {
                  handleMenu()
                  setAdmin(true)
                  setQuestion(false)
                }
              }}
            >
              <FiSettings size={20} />
            </button>
            {menuOpen && (
              <>
                <span>Administração</span>
                {admin ? <FiChevronUp /> : <FiChevronDown />}
              </>
            )}
          </MenuItemTitle>

          {admin && menuOpen && (
            <MenuSessionSubItens>
              <MenuSubItem to={'email_settings'}>
                Configurações de E-mail
              </MenuSubItem>
              <MenuSubItem to={'users_settings'}>Usuários</MenuSubItem>
            </MenuSessionSubItens>
          )}
        </MenuItem>

        <MenuItem>
          <MenuItemTitle onClick={() => setQuestion(!question)}>
            <button
              onClick={() => {
                if (!menuOpen) {
                  handleMenu()
                  setAdmin(false)
                  setQuestion(true)
                }
              }}
            >
              <AiOutlineQuestionCircle size={20} />
            </button>
            {menuOpen && (
              <>
                <span>Questões</span>
                {question ? <FiChevronUp /> : <FiChevronDown />}
              </>
            )}
          </MenuItemTitle>

          {question && menuOpen && (
            <MenuSessionSubItens>
              <MenuSubItem to={'categories'}>Categorias</MenuSubItem>
              <MenuSubItem to={'topcs'}>Tópicos</MenuSubItem>
              <MenuSubItem to={'tags'}>Tags</MenuSubItem>
            </MenuSessionSubItens>
          )}
        </MenuItem>
      </MenuSession>
    </Container>
  )
}

export { Menu }
