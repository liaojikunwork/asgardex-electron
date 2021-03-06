import React, { useCallback } from 'react'

import Icon, { TwitterOutlined, GithubOutlined, BranchesOutlined, BugOutlined } from '@ant-design/icons'
import { Row, Col, Grid } from 'antd'
import { useHistory } from 'react-router-dom'

import { ReactComponent as TelegramIcon } from '../assets/svg/icon-telegram.svg'
import { ReactComponent as ThorChainIcon } from '../assets/svg/logo-thorchain.svg'
import * as playgroundRoutes from '../routes/playground'
import { FooterContainer, FooterLink, FooterIconWrapper, FooterLinkWrapper } from './Footer.style'

const { shell } = window.require('electron')

type IconProps = {
  url: string
  children: React.ReactNode
}

const FooterIcon: React.FC<IconProps> = (props: IconProps): JSX.Element => {
  const { children, url } = props

  const clickHandler = useCallback(() => {
    shell.openExternal(url)
  }, [url])

  return <FooterIconWrapper onClick={clickHandler}>{children}</FooterIconWrapper>
}

type Props = {
  commitHash?: string
}

const Footer: React.FC<Props> = (props: Props): JSX.Element => {
  const { commitHash } = props

  const history = useHistory()
  const screens = Grid.useBreakpoint()

  const gotoPlayground = useCallback(() => history.push(playgroundRoutes.base.path()), [history])

  return (
    <FooterContainer>
      <Row justify="space-between" align="middle">
        <Col span={24} sm={4}>
          <Row justify={screens.sm ? 'start' : 'center'}>
            <FooterIcon url="https://thorchain.org">
              <ThorChainIcon />
            </FooterIcon>
          </Row>
        </Col>
        <Col span={24} sm={16}>
          <FooterLinkWrapper justify="center">
            <FooterLink to="/stats">STATS</FooterLink>
            <FooterLink to="/network">NETWORK</FooterLink>
            <FooterLink to="/faqs">FAQS</FooterLink>
          </FooterLinkWrapper>
        </Col>
        <Col span={24} sm={4}>
          <Row justify={screens.sm ? 'end' : 'center'}>
            <FooterIcon url="https://twitter.com/thorchain_org">
              <TwitterOutlined />
            </FooterIcon>
            <FooterIcon url="https://t.me/thorchain_org">
              <Icon component={TelegramIcon} />
            </FooterIcon>
            <FooterIcon url="https://github.com/thorchain">
              <GithubOutlined />
            </FooterIcon>
            {commitHash && (
              <FooterIcon url={`https://github.com/thorchain/asgardex-electron/commit/${commitHash}`}>
                <BranchesOutlined />
              </FooterIcon>
            )}
            {/* TODO (@Veado) Just for debugging - Remove it if we don't need it anymore */}
            <FooterIconWrapper onClick={gotoPlayground}>
              <BugOutlined />
            </FooterIconWrapper>
          </Row>
        </Col>
      </Row>
    </FooterContainer>
  )
}

export default Footer
