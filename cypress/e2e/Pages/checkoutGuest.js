class CartPage {
  visitHomePage() {
    cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
  }

  searchProduct(productName) {
    cy.get('.form-control').click().type(productName)
    cy.get('.input-group-btn > .btn').click()
  }

  openFirstProductFromSearch() {
    cy.get(':nth-child(1) > .product-thumb > .image > a > .img-responsive').click()
  }

  addToCart() {
    cy.get('#button-cart').click()
  }

  goToCart() {
    cy.get('.alert > [href$="checkout/cart"]').click()
  }

  proceedToCheckout() {
    cy.get('.pull-right > .btn').click()
  }

  selectRegisterAccount() {
    cy.get('.row > :nth-child(1) > :nth-child(4) > label').click()
  }

  clickContinueOnAccountStep() {
    cy.get('#button-account').click()
  }

  fillRegisterBillingForm(data) {
    cy.get('#input-payment-firstname').type(data.firstName)
    cy.get('#input-payment-lastname').type(data.lastName)
    cy.get('#input-payment-email').type(data.email)
    cy.get('#input-payment-telephone').type(data.telephone)
    cy.get('#input-payment-address-1').type(data.address1)
    cy.get('#input-payment-city').type(data.city)
    cy.get('#input-payment-postcode').type(data.postcode)
    cy.get('#input-payment-country').select(data.country)
    cy.get('#input-payment-zone').select(data.region)
  }

  submitRegistration() {
    cy.get('#button-guest').click()
  }
}

export default CartPage
