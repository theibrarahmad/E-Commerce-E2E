import CartPage from '../Pages/checkoutGuest'

const cartPage = new CartPage()
let checkoutGuestData

before(() => {
  cy.fixture('checkoutCartGuest').then((data) => {
    checkoutGuestData = data
  })
})

describe('Guest Checkout - Positive Flow', () => {
  it('TC01 - should complete checkout successfully', () => {
    cartPage.visitHomePage()
    cartPage.searchProduct(checkoutGuestData.productName)
    cartPage.openFirstProductFromSearch()
    cartPage.addToCart()
    cartPage.goToCart()
    cartPage.proceedToCheckout()
    cartPage.selectRegisterAccount()
    cartPage.clickContinueOnAccountStep()
    cartPage.fillRegisterBillingForm(checkoutGuestData.validUser)

    cartPage.submitRegistration()
  })
  describe('Guest Checkout - Negative Register Flow', () => {
    it('TC02 - should show error when first name is empty', () => {
      cartPage.visitHomePage()
      cartPage.searchProduct(checkoutGuestData.productName)
      cartPage.openFirstProductFromSearch()
      cartPage.addToCart()
      cartPage.goToCart()
      cartPage.proceedToCheckout()
      cartPage.selectRegisterAccount()
      cartPage.clickContinueOnAccountStep()

      // Fill all fields except first name
      cy.get('#input-payment-firstname').clear() // leave empty intentionally
      cy.get('#input-payment-lastname').type(checkoutGuestData.validUser.lastName)
      cy.get('#input-payment-email').type(checkoutGuestData.validUser.email)
      cy.get('#input-payment-telephone').type(checkoutGuestData.validUser.telephone)
      cy.get('#input-payment-address-1').type(checkoutGuestData.validUser.address1)
      cy.get('#input-payment-city').type(checkoutGuestData.validUser.city)
      cy.get('#input-payment-postcode').type(checkoutGuestData.validUser.postcode)
      cy.get('#input-payment-country').select(checkoutGuestData.validUser.country)
      cy.get('#input-payment-zone').select(checkoutGuestData.validUser.region)

      cartPage.submitRegistration()

      cy.get('#input-payment-firstname + .text-danger')
        .should('be.visible')
        .and('contain', 'First Name must be between 1 and 32 characters!')
    })


    it('TC03 - should show error when email format is invalid', () => {
      cartPage.visitHomePage()
      cartPage.searchProduct(checkoutGuestData.productName)
      cartPage.openFirstProductFromSearch()
      cartPage.addToCart()
      cartPage.goToCart()
      cartPage.proceedToCheckout()
      cartPage.selectRegisterAccount()
      cartPage.clickContinueOnAccountStep()

      cartPage.fillRegisterBillingForm({ ...checkoutGuestData.validUser, email: 'invalidEmail' })
      cartPage.submitRegistration()

      cy.get('#input-payment-email + .text-danger')
        .should('be.visible')
        .and('contain', 'E-Mail address does not appear to be valid!')
    })

    it('TC04 - should show error when telephone number is too short', () => {
      cartPage.visitHomePage()
      cartPage.searchProduct(checkoutGuestData.productName)
      cartPage.openFirstProductFromSearch()
      cartPage.addToCart()
      cartPage.goToCart()
      cartPage.proceedToCheckout()
      cartPage.selectRegisterAccount()
      cartPage.clickContinueOnAccountStep()

      cartPage.fillRegisterBillingForm({ ...checkoutGuestData.validUser, telephone: '12' })
      cartPage.submitRegistration()

      cy.get('#input-payment-telephone + .text-danger')
        .should('be.visible')
        .and('contain', 'Telephone must be between 3 and 32 characters!')
    })

    it('TC05 - should show error when region is not selected', () => {
      cartPage.visitHomePage()
      cartPage.searchProduct(checkoutGuestData.productName)
      cartPage.openFirstProductFromSearch()
      cartPage.addToCart()
      cartPage.goToCart()
      cartPage.proceedToCheckout()
      cartPage.selectRegisterAccount()
      cartPage.clickContinueOnAccountStep()

      cartPage.fillRegisterBillingForm({ ...checkoutGuestData.validUser, region: '' })
      cartPage.submitRegistration()

      cy.get('#input-payment-zone + .text-danger')
        .should('be.visible')
        .and('contain', 'Please select a region / state!')
    })
      it('TC06 - should show error when telephone is empty', () => {
    cartPage.visitHomePage()
    cartPage.searchProduct(checkoutGuestData.productName)
    cartPage.openFirstProductFromSearch()
    cartPage.addToCart()
    cartPage.goToCart()
    cartPage.proceedToCheckout()
    cartPage.selectRegisterAccount()
    cartPage.clickContinueOnAccountStep()

    cy.get('#input-payment-firstname').type(checkoutGuestData.validUser.firstName)
    cy.get('#input-payment-lastname').type(checkoutGuestData.validUser.lastName)
    cy.get('#input-payment-email').type(checkoutGuestData.validUser.email)
    cy.get('#input-payment-telephone').clear() // empty
    cy.get('#input-payment-address-1').type(checkoutGuestData.validUser.address1)
    cy.get('#input-payment-city').type(checkoutGuestData.validUser.city)
    cy.get('#input-payment-postcode').type(checkoutGuestData.validUser.postcode)
    cy.get('#input-payment-country').select(checkoutGuestData.validUser.country)
    cy.get('#input-payment-zone').select(checkoutGuestData.validUser.region)

    cartPage.submitRegistration()

    cy.get('#input-payment-telephone + .text-danger')
      .should('be.visible')
      .and('contain', 'Telephone must be between 3 and 32 characters!')
  })

  it('TC07 - should show error when last name is empty', () => {
    cartPage.visitHomePage()
    cartPage.searchProduct(checkoutGuestData.productName)
    cartPage.openFirstProductFromSearch()
    cartPage.addToCart()
    cartPage.goToCart()
    cartPage.proceedToCheckout()
    cartPage.selectRegisterAccount()
    cartPage.clickContinueOnAccountStep()

    cy.get('#input-payment-firstname').type(checkoutGuestData.validUser.firstName)
    cy.get('#input-payment-lastname').clear()
    cy.get('#input-payment-email').type(checkoutGuestData.validUser.email)
    cy.get('#input-payment-telephone').type(checkoutGuestData.validUser.telephone)
    cy.get('#input-payment-address-1').type(checkoutGuestData.validUser.address1)
    cy.get('#input-payment-city').type(checkoutGuestData.validUser.city)
    cy.get('#input-payment-postcode').type(checkoutGuestData.validUser.postcode)
    cy.get('#input-payment-country').select(checkoutGuestData.validUser.country)
    cy.get('#input-payment-zone').select(checkoutGuestData.validUser.region)

    cartPage.submitRegistration()

    cy.get('#input-payment-lastname + .text-danger')
      .should('be.visible')
      .and('contain', 'Last Name must be between 1 and 32 characters!')
  })

  it('TC08 - should show error when Address 1 is empty', () => {
    cartPage.visitHomePage()
    cartPage.searchProduct(checkoutGuestData.productName)
    cartPage.openFirstProductFromSearch()
    cartPage.addToCart()
    cartPage.goToCart()
    cartPage.proceedToCheckout()
    cartPage.selectRegisterAccount()
    cartPage.clickContinueOnAccountStep()

    cy.get('#input-payment-firstname').type(checkoutGuestData.validUser.firstName)
    cy.get('#input-payment-lastname').type(checkoutGuestData.validUser.lastName)
    cy.get('#input-payment-email').type(checkoutGuestData.validUser.email)
    cy.get('#input-payment-telephone').type(checkoutGuestData.validUser.telephone)
    cy.get('#input-payment-address-1').clear()
    cy.get('#input-payment-city').type(checkoutGuestData.validUser.city)
    cy.get('#input-payment-postcode').type(checkoutGuestData.validUser.postcode)
    cy.get('#input-payment-country').select(checkoutGuestData.validUser.country)
    cy.get('#input-payment-zone').select(checkoutGuestData.validUser.region)

    cartPage.submitRegistration()

    cy.get('#input-payment-address-1 + .text-danger')
      .should('be.visible')
      .and('contain', 'Address 1 must be between 3 and 128 characters!')
  })

  it('TC09 - should show error when city is empty', () => {
    cartPage.visitHomePage()
    cartPage.searchProduct(checkoutGuestData.productName)
    cartPage.openFirstProductFromSearch()
    cartPage.addToCart()
    cartPage.goToCart()
    cartPage.proceedToCheckout()
    cartPage.selectRegisterAccount()
    cartPage.clickContinueOnAccountStep()

    cy.get('#input-payment-firstname').type(checkoutGuestData.validUser.firstName)
    cy.get('#input-payment-lastname').type(checkoutGuestData.validUser.lastName)
    cy.get('#input-payment-email').type(checkoutGuestData.validUser.email)
    cy.get('#input-payment-telephone').type(checkoutGuestData.validUser.telephone)
    cy.get('#input-payment-address-1').type(checkoutGuestData.validUser.address1)
    cy.get('#input-payment-city').clear()
    cy.get('#input-payment-postcode').type(checkoutGuestData.validUser.postcode)
    cy.get('#input-payment-country').select(checkoutGuestData.validUser.country)
    cy.get('#input-payment-zone').select(checkoutGuestData.validUser.region)

    cartPage.submitRegistration()

    cy.get('#input-payment-city + .text-danger')
      .should('be.visible')
      .and('contain', 'City must be between 2 and 128 characters!')
  })

  it('TC10 - should show error when country is not selected', () => {
    cartPage.visitHomePage()
    cartPage.searchProduct(checkoutGuestData.productName)
    cartPage.openFirstProductFromSearch()
    cartPage.addToCart()
    cartPage.goToCart()
    cartPage.proceedToCheckout()
    cartPage.selectRegisterAccount()
    cartPage.clickContinueOnAccountStep()

    cy.get('#input-payment-firstname').type(checkoutGuestData.validUser.firstName)
    cy.get('#input-payment-lastname').type(checkoutGuestData.validUser.lastName)
    cy.get('#input-payment-email').type(checkoutGuestData.validUser.email)
    cy.get('#input-payment-telephone').type(checkoutGuestData.validUser.telephone)
    cy.get('#input-payment-address-1').type(checkoutGuestData.validUser.address1)
    cy.get('#input-payment-city').type(checkoutGuestData.validUser.city)
    cy.get('#input-payment-postcode').type(checkoutGuestData.validUser.postcode)
    cy.get('#input-payment-country').select('') // No country
    // cy.get('#input-payment-zone').select(checkoutGuestData.validUser.region)

    cartPage.submitRegistration()

    cy.get('#input-payment-country + .text-danger')
      .should('exist')
  })
  })

})
