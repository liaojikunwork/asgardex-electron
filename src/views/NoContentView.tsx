import React from 'react'

import { Layout, Button } from 'antd'
import { useHistory } from 'react-router-dom'

type Props = {}

const NoContentView: React.FC<Props> = (_): JSX.Element => {
  const history = useHistory()

  const clickHandler = () => {
    history.goBack()
  }

  return (
    <Layout.Content>
      <h1>404</h1>
      <Button onClick={clickHandler}>Back</Button>
    </Layout.Content>
  )
}

export default NoContentView
