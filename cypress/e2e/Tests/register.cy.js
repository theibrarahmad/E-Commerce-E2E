import RegisterPage from '../Pages/registerPage'

const registerPage = new RegisterPage()
let registerData

before(() => {
  cy.fixture('registerData').then((data) => {
    const timestamp = Date.now()
    data.validUser.email = `ibrar${timestamp}@gmail.com`
    registerData = data
  })
})

describe('User Registration - Positive Test', () => {
  it('TC01 - should register a new user successfully', () => {
    registerPage.visitHomePage()
    registerPage.openRegisterPage()
    registerPage.fillRegistrationForm(registerData.validUser)
    registerPage.agreeToPolicy()
    registerPage.submitForm()

    cy.contains('Your Account Has Been Created!').should('be.visible')
  })
})

describe('User Registration - Negative Test Cases', () => {
  beforeEach(() => {
    registerPage.visitHomePage()
    registerPage.openRegisterPage()
  })

  it('TC02 - should show error when first name is empty', () => {
    registerPage.fillRegistrationForm(registerData.validUser)
    cy.get('#input-firstname').clear()
    registerPage.agreeToPolicy()
    registerPage.submitForm()

    cy.get('#input-firstname + .text-danger')
      .should('be.visible')
      .and('contain', 'First Name must be between 1 and 32 characters!')
  })

  it('TC03 - should show error when last name is empty', () => {
    registerPage.fillRegistrationForm(registerData.validUser)
    cy.get('#input-lastname').clear()
    registerPage.agreeToPolicy()
    registerPage.submitForm()

    cy.get('#input-lastname + .text-danger')
      .should('be.visible')
      .and('contain', 'Last Name must be between 1 and 32 characters!')
  })

  it('TC04 - should show error when email is empty', () => {
    registerPage.fillRegistrationForm(registerData.validUser)
    cy.get('#input-email').clear()
    registerPage.agreeToPolicy()
    registerPage.submitForm()

    cy.get('#input-email + .text-danger')
      .should('be.visible')
      .and('contain', 'E-Mail Address does not appear to be valid!')
  })


  it('TC05 - should show error when telephone is empty', () => {
    registerPage.fillRegistrationForm(registerData.validUser)
    cy.get('#input-telephone').clear()
    registerPage.agreeToPolicy()
    registerPage.submitForm()

    cy.get('#input-telephone + .text-danger')
      .should('be.visible')
      .and('contain', 'Telephone must be between 3 and 32 characters!')
  })

  it('TC06 - should show error when password is empty', () => {
    registerPage.fillRegistrationForm(registerData.validUser)
    cy.get('#input-password').clear()
    cy.get('#input-confirm').clear()
    registerPage.agreeToPolicy()
    registerPage.submitForm()

    cy.get('#input-password + .text-danger')
      .should('be.visible')
      .and('contain', 'Password must be between 4 and 20 characters!')
  })

  it('TC07 - should show error when confirm password does not match', () => {
    registerPage.fillRegistrationForm({ ...registerData.validUser, confirmPassword: 'mismatch123' })
    registerPage.agreeToPolicy()
    registerPage.submitForm()

    cy.get('#input-confirm + .text-danger')
      .should('be.visible')
      .and('contain', 'Password confirmation does not match password!')
  })

  it('TC08 - should show error when privacy policy is not accepted', () => {
    registerPage.fillRegistrationForm(registerData.validUser)
    // Don't check the checkbox
    registerPage.submitForm()

    cy.get('.alert-danger')
      .should('be.visible')
      .and('contain', 'Warning: You must agree to the Privacy Policy!')
  })
})
