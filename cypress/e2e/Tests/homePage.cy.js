import HomePage from '../Pages/homePage'

const homePage = new HomePage()

describe('Home Page', () => {
  let data

  before(() => {
    cy.fixture('homePageData').then((fixtureData) => {
      data = fixtureData
    })
  })

  beforeEach(() => {
    homePage.visitHomePage(data.url)
  })

  it('TC01 - should display the logo', () => {
    homePage.getLogo().should('be.visible')
  })

  it('TC02 - should display search bar with correct placeholder', () => {
    homePage.getSearchBar()
      .should('be.visible')
      .and('have.attr', 'placeholder', data.searchPlaceholder)
  })

  it('TC03 - should display the navigation menu with items', () => {
    homePage.getMenu()
      .should('be.visible')
      .within(() => {
        cy.get('ul.nav > li').should('have.length.at.least', data.minMenuItems)
      })
  })

  it('TC04 - should display the main slideshow image', () => {
    homePage.getSlideshowImage().should('be.visible')
  })

  it('TC05 - should display alternate slide image', () => {
    homePage.getAltSlideImage().should('be.visible')
  })

  it('TC06 - should display h3 headings with text', () => {
    homePage.getHeadings()
      .should('exist')
      .and('not.have.text', '')
  })

  it('TC07 - should display the featured products carousel', () => {
    homePage.getCarousel()
      .should('exist')
      .and('be.visible')
  })

  it('TC08 - should display the footer', () => {
    homePage.getFooter().should('be.visible')
  })

  it('TC09 - should display minimum number of footer links', () => {
    homePage.getFooterLinks().should('have.length.at.least', data.minFooterLinks)
  })
})
