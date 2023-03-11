import { useCallback, useState } from 'react'
import { FiChevronDown, FiChevronUp, FiMenu, FiSettings } from 'react-icons/fi'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import {
  Container,
  MenuTitle,
  MenuSession,
  MenuItem,
  MenuSessionSubItens,
  MenuSubItem,
} from './styles'
import logoImg from '../../assets/logoWhite.png'

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(true)
  const [width, setWidth] = useState(275)
  const [admin, setAdmin] = useState(false)
  const [question, setQuestion] = useState(false)

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(!menuOpen)
    setWidth(width === 275 ? 55 : 275)
  }, [width, menuOpen])

  return (
    <Container width={width} menuOpen={menuOpen}>
      <MenuTitle>
        <button onClick={handleCloseMenu}>
          <FiMenu size={30} />
        </button>
        <Link to="/">
          {menuOpen && <img src={logoImg} alt="Turtle Quiz" />}
        </Link>
      </MenuTitle>

      <MenuSession>
        {menuOpen ? (
          <>
            <MenuItem onClick={() => setAdmin(!admin)}>
              <span>Administração</span>
              {admin ? <FiChevronUp /> : <FiChevronDown />}
            </MenuItem>
            {admin && (
              <MenuSessionSubItens>
                <MenuSubItem to={'email_settings'}>
                  Configurações de E-mail
                </MenuSubItem>
                <MenuSubItem to={'users_settings'}>Usuários</MenuSubItem>
              </MenuSessionSubItens>
            )}
          </>
        ) : (
          <FiSettings
            size={20}
            onClick={() => {
              handleCloseMenu()
              setAdmin(true)
              setQuestion(false)
            }}
          />
        )}

        {menuOpen ? (
          <>
            <MenuItem onClick={() => setQuestion(!question)}>
              <span>Questões</span>
              {question ? <FiChevronUp /> : <FiChevronDown />}
            </MenuItem>
            {question && (
              <MenuSessionSubItens>
                <MenuSubItem to={'categories'}>Categorias</MenuSubItem>
                <MenuSubItem to={'topcs'}>Tópicos</MenuSubItem>
                <MenuSubItem to={'tags'}>Tags</MenuSubItem>
              </MenuSessionSubItens>
            )}
          </>
        ) : (
          <AiOutlineQuestionCircle
            size={20}
            onClick={() => {
              handleCloseMenu()
              setAdmin(false)
              setQuestion(true)
            }}
          />
        )}
      </MenuSession>
    </Container>
  )
}

export { Menu }
