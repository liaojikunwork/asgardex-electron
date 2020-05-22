import { Route } from './types'

export const base: Route<void> = {
  template: '/pool',
  path() {
    return this.template
  }
}
