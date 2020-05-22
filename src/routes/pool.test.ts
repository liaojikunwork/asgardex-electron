import { base } from './pool'

describe('Pool routes', () => {
  describe('base', () => {
    it('template', () => {
      expect(base.template).toEqual('/pool')
    })
    it('path', () => {
      expect(base.path()).toEqual('/pool')
    })
  })
})
