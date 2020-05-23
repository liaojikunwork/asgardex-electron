import React, { useState, useCallback } from 'react'
import { crypto } from '@binance-chain/javascript-sdk'
import * as BIP39 from 'bip39'
import { KeyStore } from '@binance-chain/javascript-sdk/typings/crypto'

import { Form, Input, Button } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { delay } from '@thorchain/asgardex-util'

const ImportMnemonicForm: React.FC = (): JSX.Element => {
  const [loadingMsg, setLoadingMsg] = useState<string>('')
  const [form] = Form.useForm()

  const importMnemonicWallet = (mnemonic: string, password: string) => {
    const network = 'testnet'
    console.log('importing mnemonic...')
    console.log(`network: ${network}; mnemonic: ${mnemonic}; password: ${password}`)
    const privKey: string = crypto.getPrivateKeyFromMnemonic(mnemonic)
    const keystore: KeyStore = crypto.generateKeyStore(privKey, password)
    const address: string = crypto.getAddressFromPrivateKey(privKey)
    // Temporary store during development
    localStorage.setItem('address', address)
    localStorage.setItem('keystore', JSON.stringify(keystore))
  }

  const checkMnemonic = (_: any, value: any) => {
    console.log('validating something?')
    // console.log(rule)
    console.log(value)
    if (!value) {
      return Promise.reject('required tettster')
    }
    return BIP39.validateMnemonic(value) ? Promise.resolve() : Promise.reject('Invalid mnemonic seed phrase')
  }
  const checkPasswords = (_: any, value: any) => {
    console.log('checking passwords')
  }
  const handleImportFormSubmit = useCallback(async (vals: Store) => {
    setLoadingMsg('Generating wallet')
    // Delay to allow for UI render DOM update before CPU takes over keystore/cryto processing
    await delay(200)
    try {
      importMnemonicWallet(vals.mnemonic, vals.password)
    } catch (err) {
      setLoadingMsg('')
      console.log(err)
    }
  }, [])
  return (
    <Form form={form} onFinish={handleImportFormSubmit} labelCol={{ span: 24 }}>
      <Form.Item
        name="mnemonic"
        label="Mnemonic (Phrase)"
        rules={[{ required: true, validator: checkMnemonic }]}
        validateTrigger={['onSubmit', 'onChange']}>
        <Input size="large" type="text" />
      </Form.Item>
      <Form.Item
        name="password"
        label="New Password"
        rules={[{ required: true }]}
        validateTrigger={['onSubmit', 'onChange']}>
        <Input size="large" type="password" />
      </Form.Item>
      <Form.Item
        name="repeatPassword"
        label="Repeat Password"
        dependencies={['password']}
        validateTrigger={['onSubmit', 'onBlur']}
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('Password mismatch!')
            }
          })
        ]}>
        <Input size="large" type="password" />
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit" block>
          {loadingMsg || 'Import'}
        </Button>
      </Form.Item>
    </Form>
  )
}
export default ImportMnemonicForm
