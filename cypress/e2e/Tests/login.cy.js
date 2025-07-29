import LoginPage from '../Pages/login'
let loginData

before(() => {
  cy.fixture('loginData').then((data) => {
    loginData = data
  })
})

describe('Login Functionality', () => {
  it('TC20 - should login successfully with valid credentials', () => {
    const loginPage = new LoginPage()
    loginPage.visitHomePage()
    loginPage.openLoginPage()
    loginPage.enterEmail(loginData.validUser.email)
    loginPage.enterPassword(loginData.validUser.password)
    loginPage.submitLogin()

    cy.get('#content > :nth-child(1)').should('exist')
    cy.get('#content > :nth-child(3)').should('be.visible')
    cy.get('#column-right').should('be.visible')
  })

  it('TC21 - should show error for incorrect password', () => {
    const loginPage = new LoginPage()
    loginPage.visitHomePage()
    loginPage.openLoginPage()
    loginPage.enterEmail(loginData.validUser.email)
    loginPage.enterPassword('wrongPassword123')
    loginPage.submitLogin()

    cy.get('.alert-danger')
      .should('be.visible')
      .and('contain', 'Warning: No match for E-Mail Address and/or Password.')
  })

  it('TC22 - should show error for unregistered email', () => {
    const loginPage = new LoginPage()
    loginPage.visitHomePage()
    loginPage.openLoginPage()
    loginPage.enterEmail('unregistered' + Date.now() + '@example.com')
    loginPage.enterPassword(loginData.validUser.password)
    loginPage.submitLogin()

    cy.get('.alert-danger')
      .should('be.visible')
      .and('contain', 'Warning: No match for E-Mail Address and/or Password.')
  })

  it('TC23 - should show error when email is empty', () => {
    const loginPage = new LoginPage()
    loginPage.visitHomePage()
    loginPage.openLoginPage()
    loginPage.enterPassword(loginData.validUser.password)
    loginPage.submitLogin()

    cy.get('.alert-danger')
      .should('be.visible')
      .and('contain', 'Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.')
  })

  it('TC24 - should show error when password is empty', () => {
    const loginPage = new LoginPage()
    loginPage.visitHomePage()
    loginPage.openLoginPage()
    loginPage.enterEmail(loginData.validUser.email)
    loginPage.submitLogin()

    cy.get('.alert-danger')
      .should('be.visible')
      .and('contain', 'Warning: No match for E-Mail Address and/or Password.')
  })
})
