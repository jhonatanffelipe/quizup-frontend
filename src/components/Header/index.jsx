import { useCallback, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

import { Container, Content, ContentMenu } from './styles'
import avatarImg from '../../assets/avatar.png'
import { useAuth } from '../../hooks/auth'

const Header = () => {
  const [showContent, setShowContent] = useState(false)

  const { user } = useAuth()

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
          <FiChevronDown className="menu-profile" />
        </div>
      </ContentMenu>

      <Content id="content-menu-profile" showContent={showContent}></Content>
    </Container>
  )
}

export default Header
