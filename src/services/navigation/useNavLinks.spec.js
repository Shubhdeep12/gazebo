import { MemoryRouter, Route } from 'react-router-dom'
import { renderHook } from '@testing-library/react-hooks'

import { useNavLinks, useStaticNavLinks } from './useNavLinks'

describe('useNavLinks', () => {
  let hookData

  function setup(location) {
    hookData = renderHook(() => useNavLinks(), {
      wrapper: (props) => (
        <MemoryRouter initialEntries={location} initialIndex={0}>
          <Route path="/:provider">{props.children}</Route>
          <Route path="/:provider/:owner">{props.children}</Route>
          <Route path="/:provider/:owner/:repo">{props.children}</Route>
          <Route path="/:provider/:owner/:repo/:id">{props.children}</Route>
        </MemoryRouter>
      ),
    })
  }

  describe('provider link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.provider.path()).toBe('/gl')
    })
    it('can override the params', () => {
      expect(hookData.result.current.provider.path({ provider: 'dog' })).toBe(
        '/dog'
      )
    })
  })

  describe('Sign Out', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.signOut.path()).toBe(
        'https://codecov.io/logout/gl'
      )
    })
    it('can override the params', () => {
      expect(hookData.result.current.signOut.path({ provider: 'bb' })).toBe(
        'https://codecov.io/logout/bb'
      )
    })
  })

  describe('Sign In', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.signIn.path()).toBe(
        'https://codecov.io/login/gl'
      )
    })
    it('can override the params', () => {
      expect(hookData.result.current.signIn.path({ provider: 'bb' })).toBe(
        'https://codecov.io/login/bb'
      )
    })
  })

  describe('owner link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.owner.path()).toBe('/gl/doggo')
    })
    it('can override the params', () => {
      expect(hookData.result.current.owner.path({ provider: 'bb' })).toBe(
        '/bb/doggo'
      )
      expect(hookData.result.current.owner.path({ owner: 'cat' })).toBe(
        '/gl/cat'
      )
    })
  })

  describe('repo link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.repo.path()).toBe(
        '/gl/doggo/squirrel-locator'
      )
    })
    it('can override the params', () => {
      expect(hookData.result.current.repo.path({ provider: 'bb' })).toBe(
        '/bb/doggo/squirrel-locator'
      )
      expect(hookData.result.current.repo.path({ owner: 'cat' })).toBe(
        '/gl/cat/squirrel-locator'
      )
      expect(hookData.result.current.repo.path({ repo: 'no-cats' })).toBe(
        '/gl/doggo/no-cats'
      )
    })
  })

  describe('account link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.account.path()).toBe('/account/gl/doggo')
    })
    it('can override the params', () => {
      expect(hookData.result.current.account.path({ provider: 'bb' })).toBe(
        '/account/bb/doggo'
      )
      expect(hookData.result.current.account.path({ owner: 'cat' })).toBe(
        '/account/gl/cat'
      )
    })
  })

  describe('accountAdmin link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.accountAdmin.path()).toBe(
        '/account/gl/doggo'
      )
    })
    it('can override the params', () => {
      expect(
        hookData.result.current.accountAdmin.path({ provider: 'bb' })
      ).toBe('/account/bb/doggo')
      expect(hookData.result.current.accountAdmin.path({ owner: 'cat' })).toBe(
        '/account/gl/cat'
      )
    })
  })

  describe('yamlTab link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.yamlTab.path()).toBe(
        '/account/gl/doggo/yaml'
      )
    })
    it('can override the params', () => {
      expect(hookData.result.current.yamlTab.path({ provider: 'bb' })).toBe(
        '/account/bb/doggo/yaml'
      )
      expect(hookData.result.current.yamlTab.path({ owner: 'cat' })).toBe(
        '/account/gl/cat/yaml'
      )
    })
  })

  describe('accessTab link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.accessTab.path()).toBe(
        '/account/gl/doggo/access'
      )
    })
    it('can override the params', () => {
      expect(hookData.result.current.accessTab.path({ provider: 'bb' })).toBe(
        '/account/bb/doggo/access'
      )
      expect(hookData.result.current.accessTab.path({ owner: 'cat' })).toBe(
        '/account/gl/cat/access'
      )
    })
  })

  describe('billingAndUsers link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.billingAndUsers.path()).toBe(
        '/account/gl/doggo/billing'
      )
    })
    it('can override the params', () => {
      expect(
        hookData.result.current.billingAndUsers.path({ provider: 'bb' })
      ).toBe('/account/bb/doggo/billing')
      expect(
        hookData.result.current.billingAndUsers.path({ owner: 'cat' })
      ).toBe('/account/gl/cat/billing')
    })
  })

  describe('upgradePlan link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.upgradePlan.path()).toBe(
        '/account/gl/doggo/billing/upgrade'
      )
    })
    it('can override the params', () => {
      expect(hookData.result.current.upgradePlan.path({ provider: 'bb' })).toBe(
        '/account/bb/doggo/billing/upgrade'
      )
      expect(hookData.result.current.upgradePlan.path({ owner: 'cat' })).toBe(
        '/account/gl/cat/billing/upgrade'
      )
    })
  })

  describe('cancelPlan link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.cancelPlan.path()).toBe(
        '/account/gl/doggo/billing/cancel'
      )
    })
    it('can override the params', () => {
      expect(hookData.result.current.cancelPlan.path({ provider: 'bb' })).toBe(
        '/account/bb/doggo/billing/cancel'
      )
      expect(hookData.result.current.cancelPlan.path({ owner: 'cat' })).toBe(
        '/account/gl/cat/billing/cancel'
      )
    })
  })

  describe('invoiceTab link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.invoiceTab.path()).toBe(
        '/account/gl/doggo/invoices'
      )
    })
    it('can override the params', () => {
      expect(hookData.result.current.invoiceTab.path({ provider: 'bb' })).toBe(
        '/account/bb/doggo/invoices'
      )
      expect(hookData.result.current.invoiceTab.path({ owner: 'cat' })).toBe(
        '/account/gl/cat/invoices'
      )
    })
  })

  describe('invoiceDetail link', () => {
    beforeAll(() => {
      setup(['/gl/doggo/squirrel-locator/42'])
    })

    it('Returns the correct link with nothing passed', () => {
      expect(hookData.result.current.invoiceDetail.path()).toBe(
        '/account/gl/doggo/invoices/42'
      )
    })
    it('can override the params', () => {
      expect(
        hookData.result.current.invoiceDetail.path({ provider: 'bb' })
      ).toBe('/account/bb/doggo/invoices/42')
      expect(hookData.result.current.invoiceDetail.path({ owner: 'cat' })).toBe(
        '/account/gl/cat/invoices/42'
      )
      expect(hookData.result.current.invoiceDetail.path({ id: '999' })).toBe(
        '/account/gl/doggo/invoices/999'
      )
    })
  })
})

describe('useStaticNavLinks', () => {
  let links = useStaticNavLinks()
  describe.each`
    link                       | outcome
    ${links.root}              | ${'https://about.codecov.io'}
    ${links.terms}             | ${'https://codecov.io/terms'}
    ${links.privacy}           | ${'https://codecov.io/privacy'}
    ${links.security}          | ${'https://codecov.io/security'}
    ${links.gdpr}              | ${'https://codecov.io/gdpr'}
    ${links.shop}              | ${'https://codecov.io/shop'}
    ${links.pricing}           | ${'https://codecov.io/pricing'}
    ${links.support}           | ${'https://codecov.io/support'}
    ${links.docs}              | ${'https://docs.codecov.io/'}
    ${links.enterprise}        | ${'https://codecov.io/enterprise'}
    ${links.githubMarketplace} | ${'https://github.com/marketplace/codecov'}
    ${links.freshdesk}         | ${'https://codecov.freshdesk.com/support/home'}
    ${links.blog}              | ${'https://about.codecov.io/blog'}
  `('static links return path', ({ link, outcome }) => {
    it('Returns the correct link', () => {
      expect(link.path()).toBe(outcome)
    })
  })
})