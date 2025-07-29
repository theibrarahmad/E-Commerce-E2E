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

  it('TC11 - should display the logo', () => {
    homePage.getLogo().should('be.visible')
  })

  it('TC12 - should display search bar with correct placeholder', () => {
    homePage.getSearchBar()
      .should('be.visible')
      .and('have.attr', 'placeholder', data.searchPlaceholder)
  })

  it('TC13 - should display the navigation menu with items', () => {
    homePage.getMenu()
      .should('be.visible')
      .within(() => {
        cy.get('ul.nav > li').should('have.length.at.least', data.minMenuItems)
      })
  })

  it('TC14 - should display the main slideshow image', () => {
    homePage.getSlideshowImage().should('be.visible')
  })

  it('TC15 - should display alternate slide image', () => {
    homePage.getAltSlideImage().should('be.visible')
  })

  it('TC16 - should display h3 headings with text', () => {
    homePage.getHeadings()
      .should('exist')
      .and('not.have.text', '')
  })

  it('TC17 - should display the featured products carousel', () => {
    homePage.getCarousel()
      .should('exist')
      .and('be.visible')
  })

  it('TC18 - should display the footer', () => {
    homePage.getFooter().should('be.visible')
  })

  it('TC19 - should display minimum number of footer links', () => {
    homePage.getFooterLinks().should('have.length.at.least', data.minFooterLinks)
  })
})
