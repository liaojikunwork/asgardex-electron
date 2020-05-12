import React, { useMemo, useCallback } from 'react'
import { Row, Col, Typography, Button, Card } from 'antd'
const { Title, Text, Paragraph } = Typography

// Dummy Data
const userAccount = {
  _id: 'MTbyhYhWysp25TDBy',
  address: 'tbnb1vxutrxadm0utajduxfr6wd9kqfalv0dg2wnx5y',
  keystore: {
    version: 1,
    id: '84a9e412-90a1-4076-8e7c-e516f78059ee',
    crypto: {}
  }
}
type ClientTypes = { network: string; chainId: string }
const UserAccountsScreen: React.FC = (): JSX.Element => {
  const client: ClientTypes = useMemo(() => {
    return { chainId: 'testing', network: 'testing' }
  }, [])

  const downloadLink: string = useMemo(() => {
    const keystore: string = window.localStorage.getItem('binance') || ''
    return 'data:text/plain;charset=utf-8,' + encodeURIComponent(keystore)
  }, [])

  const fileName = (): string => userAccount.address.concat('-keystore.txt')

  const lockWallet = useCallback(async () => {
    console.log('locking wallet...')
  }, [])
  const removeWallet = useCallback(async () => {
    console.log('removing wallet...')
  }, [])

  return (
    <Row>
      <Title level={3}>Settings</Title>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
            <Paragraph strong>Wallet Management</Paragraph>
            <Card>
              <Row>
                <Col span={12}>
                  <Card bordered={false}>
                    <Button type="ghost" shape="round" block href={downloadLink} download={fileName()}>
                      Export Keystore
                    </Button>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card bordered={false}>
                    <Button type="ghost" shape="round" block onClick={lockWallet}>
                      Lock Wallet
                    </Button>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card bordered={false}>
                    <Button type="ghost" shape="round" block disabled={true}>
                      View Phrase
                    </Button>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card bordered={false}>
                    <Button type="ghost" danger shape="round" block onClick={removeWallet}>
                      Remove Wallet
                    </Button>
                  </Card>
                </Col>
              </Row>
            </Card>
            <Paragraph strong>Network Client</Paragraph>
            <Card>
              <Row>
                <Col md={{ span: 24 }} lg={{ span: 12 }}>
                  <Text strong>Account:</Text>
                  <Paragraph ellipsis>{userAccount.address}</Paragraph>
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 12 }}>
                  <Text strong>Keystore Version:</Text>
                  <Paragraph>{userAccount.keystore.version}</Paragraph>
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 12 }}>
                  <Text strong>Type:</Text>
                  <Paragraph>{client.network}</Paragraph>
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 12 }}>
                  <Text strong>Chain ID:</Text>
                  <Paragraph>{client.chainId}</Paragraph>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
            <Paragraph strong>Manage Accounts</Paragraph>
            <Card title="Accounts">{/* List of accounts goes here */}</Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default UserAccountsScreen
