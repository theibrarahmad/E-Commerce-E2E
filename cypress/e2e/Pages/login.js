class LoginPage {
  visitHomePage() {
    cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
  }

  openLoginPage() {
    cy.get('.list-inline > .dropdown > .dropdown-toggle').click()
    cy.get('.dropdown-menu > :nth-child(2) > a').click()
  }

  enterEmail(email) {
    cy.get('#input-email').type(email)
  }

  enterPassword(password) {
    cy.get('#input-password').type(password)
  }

  submitLogin() {
    cy.get('form > .btn').click()
  }
}

export default LoginPage
