import { useCallback, useState } from 'react'
import { FiChevronDown, FiHelpCircle, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Container, Content, ContentMenu } from './styles'
import avatarImg from '../../assets/avatar.png'
import { useAuth } from '../../hooks/auth'

const Header = () => {
  const [showContent, setShowContent] = useState(false)

  const { user, signOut } = useAuth()

  window.onclick = (e) => {
    if (
      !(
        (e.target?.className?.includes &&
          e.target?.className?.includes('menu-profile')) ||
        e.target?.className?.baseVal === 'menu-profile'
      )
    ) {
      if (e.target !== document.getElementById('content-menu-profile')) {
        setShowContent(false)
      }
    }
  }

  const handleOpenContent = useCallback(() => {
    setShowContent(!showContent)
  }, [showContent])

  return (
    <Container>
      <ContentMenu onClick={handleOpenContent} className="menu-profile">
        <img
          src={user.avatar ? user.avatar : avatarImg}
          alt="avatar"
          className="menu-profile"
        />
        <div className="menu-profile">
          Olá,
          <span className="menu-profile"> {`${user.name}`}</span>
        </div>
        <FiChevronDown className="menu-profile" />
      </ContentMenu>

      <Content id="content-menu-profile" showContent={showContent}>
        <div className="menu-profile info-profile">
          <div>
            <img
              src={user.avatar ? user.avatar : avatarImg}
              alt="avatar"
              className="menu-profile"
            />
          </div>
          <div>
            <span className="menu-profile"> {`${user.name}`}</span>
            <p className="menu-profile">
              {' '}
              {`${user.isAdmin && 'Administrador'}`}
            </p>
            <p className="menu-profile"> {`${user.email}`}</p>
          </div>
        </div>

        <div className="menu-profile-itens">
          <Link to="/user_profile">
            <FiUser size={30} />
            <div>
              <span>Meu Perfil</span>
              <p>Configurações da conta</p>
            </div>
          </Link>

          <Link to="/application_about">
            <FiHelpCircle size={30} />
            <div>
              <span>Sobre</span>
              <p>Informações sobre a aplicação</p>
            </div>
          </Link>

          <button className="sign-out" onClick={signOut}>
            Sair
          </button>
        </div>
      </Content>
    </Container>
  )
}

export { Header }
