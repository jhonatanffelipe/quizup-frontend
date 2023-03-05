import { useCallback, useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

import { Container, Content, ContentMenu } from './styles'
import avatarImg from '../../assets/avatar.png'

const Header = () => {
  const [userName, setUserName] = useState('')
  const [showContent, setShowContent] = useState(false)

  const handleOpenContent = useCallback(() => {
    setShowContent(!showContent)
  }, [showContent])

  useEffect(() => {
    setUserName('Jhonatan Nascimento'.split(' ')[0])
  }, [showContent])

  return (
    <Container>
      <ContentMenu onClick={handleOpenContent}>
        <img src={avatarImg} alt="avatar" />
        <div>
          Olá,
          <p> {`${userName}`}</p>
          <span>
            <FiChevronDown />
          </span>
        </div>
      </ContentMenu>

      <Content id="content-menu-profile" showContent={showContent}></Content>
    </Container>
  )
}

export default Header
