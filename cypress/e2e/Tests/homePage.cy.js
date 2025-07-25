import HomePage from '../Pages/homePage'

const homePage = new HomePage()
// import registerData from '../fixtures/homePageData.json'

describe('Home Page', () => {
  let data

  before(() => {
    cy.fixture('homePageData').then((fixtureData) => {
      data = fixtureData
    })
  })

  it('should load the home page and validate key UI elements', () => {
    homePage.visitHomePage(data.url)

    homePage.getLogo().should('be.visible')

    homePage.getSearchBar()
      .should('be.visible')
      .and('have.attr', 'placeholder', data.searchPlaceholder)

    homePage.getMenu()
      .should('be.visible')
      .within(() => {
        cy.get('ul.nav > li').should('have.length.at.least', data.minMenuItems)
      })

    homePage.getSlideshowImage().should('be.visible')
    homePage.getAltSlideImage().should('be.visible')

    homePage.getHeadings()
      .should('exist')
      .and('not.have.text', '')

    homePage.getCarousel()
      .should('exist')
      .and('be.visible')

    homePage.getFooter().should('be.visible')
    homePage.getFooterLinks().should('have.length.at.least', data.minFooterLinks)
  })
})
