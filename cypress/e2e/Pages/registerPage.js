class RegisterPage {
  visitHomePage() {
    cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
  }

  openRegisterPage() {
    cy.get('.list-inline > .dropdown > .dropdown-toggle').click()
    cy.get('.dropdown-menu > :nth-child(1) > a').click()
  }

  fillRegistrationForm(data) {
    if (data.firstName !== undefined) {
      cy.get('#input-firstname').clear().type(data.firstName)
    }
    if (data.lastName !== undefined) {
      cy.get('#input-lastname').clear().type(data.lastName)
    }
    if (data.email !== undefined) {
      cy.get('#input-email').clear().type(data.email)
    }
    if (data.telephone !== undefined) {
      cy.get('#input-telephone').clear().type(data.telephone)
    }
    if (data.password !== undefined) {
      cy.get('#input-password').clear().type(data.password)
    }
    if (data.confirmPassword !== undefined) {
      cy.get('#input-confirm').clear().type(data.confirmPassword)
    }
  }

  agreeToPolicy() {
    cy.get('[type="checkbox"]').check()
  }

  submitForm() {
    cy.get('input[type="submit"][value="Continue"]').click()
  }
}

export default RegisterPage
