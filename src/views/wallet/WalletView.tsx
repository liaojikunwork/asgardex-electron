import React, { useCallback, useMemo } from 'react'

import * as H from 'history'
import { useObservableState } from 'observable-hooks'
import { Switch, Route, Redirect } from 'react-router-dom'

import { useWalletContext } from '../../contexts/WalletContext'
import { RedirectRouteState } from '../../routes/types'
import * as walletRoutes from '../../routes/wallet'
import View from '../View'
import FundsReceiveScreen from './FundsReceiveScreen'
import FundsSendScreen from './FundsSendScreen'
import ImportsView from './ImportsView'
import LockView from './LockView'
import UserAssetDetailsScreen from './UserAssetDetailsScreen'
import UserAssetsScreen from './UserAssetsScreen'
import UserBondsScreen from './UserBondsScreen'
import UserStakesScreen from './UserStakesScreen'
import WalletSettingsScreen from './WalletSettingsScreen'
import WalletViewNav from './WalletViewNav'

const WalletView: React.FC = (): JSX.Element => {
  const { isLocked$, phrase } = useWalletContext()
  const isLocked = useObservableState(isLocked$)
  const importedPhrase = useObservableState(phrase.current$)

  // Following routes are accessable only,
  // if an user has a phrase imported and wallet has not been locked
  const renderWalletRoutes = useMemo(
    () => (
      <Switch>
        <Route path={walletRoutes.base.template} exact>
          <Redirect to={walletRoutes.assets.path()} />
        </Route>
        <Route path={walletRoutes.settings.template} exact>
          <WalletSettingsScreen />
        </Route>
        <Route path={walletRoutes.assets.template} exact>
          <WalletViewNav />
          <UserAssetsScreen />
        </Route>
        <Route path={walletRoutes.stakes.template} exact>
          <WalletViewNav />
          <UserStakesScreen />
        </Route>
        <Route path={walletRoutes.bonds.template} exact>
          <WalletViewNav />
          <UserBondsScreen />
        </Route>
        <Route path={walletRoutes.fundsReceive.template} exact>
          <FundsReceiveScreen />
        </Route>
        <Route path={walletRoutes.fundsSend.template} exact>
          <FundsSendScreen />
        </Route>
        <Route path={walletRoutes.assetDetails.template} exact>
          <UserAssetDetailsScreen />
        </Route>
      </Switch>
    ),
    []
  )

  const renderWalletRoute = useCallback(
    // Redirect if  an user has not a phrase imported or wallet has been locked
    ({ location }: { location: H.Location }) => {
      if (!isLocked) {
        return importedPhrase ? (
          renderWalletRoutes
        ) : (
          <Redirect
            to={{
              pathname: walletRoutes.imports.path(),
              state: { from: location } as RedirectRouteState
            }}
          />
        )
      } else {
        return (
          <Redirect
            to={{
              pathname: walletRoutes.locked.path(),
              state: { from: location } as RedirectRouteState
            }}
          />
        )
      }
    },
    [isLocked, renderWalletRoutes, importedPhrase]
  )

  return (
    <View>
      <Switch>
        <Route path={walletRoutes.locked.template} exact>
          <LockView />
        </Route>
        <Route path={walletRoutes.imports.template} exact>
          <ImportsView />
        </Route>
        <Route path={walletRoutes.base.template} render={renderWalletRoute} />
      </Switch>
    </View>
  )
}

export default WalletView
