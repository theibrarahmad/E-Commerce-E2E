import SearchPage from '../Pages/searchPage'

const searchPage = new SearchPage()
let searchData

describe('Search Functionality Tests', () => {
  before(() => {
    cy.fixture('searchData').then((data) => {
      searchData = data
    })
  })

  beforeEach(() => {
    searchPage.visitHomePage()
  })

  it('TC33 - should return Macbook results and validate first product image', () => {
    searchPage.searchProduct(searchData.validProducts[0])
    searchPage.getFirstProductImage().should('be.visible')
  })

  it('TC34 - should return Macbook results and validate second product image', () => {
    searchPage.searchProduct(searchData.validProducts[1])
    searchPage.getSecondProductImage().should('be.visible')
  })

  it('TC35 - should show no result for camera', () => {
    searchPage.searchProduct(searchData.invalidProducts[0])
    searchPage.getNoResultsText().should('contain', searchData.noResultsText)
  })

  it('TC36 - should show no result for watch', () => {
    searchPage.searchProduct(searchData.invalidProducts[1])
    searchPage.getNoResultsText().should('contain', searchData.noResultsText)
  })

  it('TC37 - should show no result for car', () => {
    searchPage.searchProduct(searchData.invalidProducts[2])
    searchPage.getNoResultsText().should('contain', searchData.noResultsText)
  })

  it('TC38 - should show no result for knife', () => {
    searchPage.searchProduct(searchData.invalidProducts[3])
    searchPage.getNoResultsText().should('contain', searchData.noResultsText)
  })

  it('TC39 - should show search box is visible and usable', () => {
    searchPage.getSearchBox().should('be.visible').and('have.attr', 'placeholder', 'Search')
  })

  it('TC40 - should keep previous search in box after submit', () => {
    searchPage.searchProduct(searchData.validProducts[0])
    searchPage.getSearchBox().should('have.value', searchData.validProducts[0])
  })
})
