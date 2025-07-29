class SearchPage {
  visitHomePage() {
    cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
  }

  getSearchBox() {
    return cy.get('.form-control')
  }

  searchProduct(productName) {
    this.getSearchBox().click().type(productName)
    cy.get('.input-group-btn > .btn').click()
  }

  getFirstProductImage() {
    return cy.get(':nth-child(1) > .product-thumb > .image > a > .img-responsive')
  }

  getSecondProductImage() {
    return cy.get(':nth-child(2) > .product-thumb > .image > a > .img-responsive')
  }

  getNoResultsText() {
    return cy.get('#content p')
  }
}

export default SearchPage
