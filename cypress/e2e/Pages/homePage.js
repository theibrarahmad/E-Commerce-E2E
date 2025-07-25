// homePage.js
class HomePage {
  visitHomePage(url) {
    cy.visit(url)
  }

  getLogo() {
    return cy.get('#logo > a > .img-responsive')
  }

  getSearchBar() {
    return cy.get('.form-control')
  }

  getMenu() {
    return cy.get('#menu')
  }

  getSlideshowImage() {
    return cy.get('#slideshow0 > .swiper-wrapper > .swiper-slide-active > .img-responsive')
  }

  getAltSlideImage() {
    return cy.get('.swiper-slide-active > a > .img-responsive')
  }

  getHeadings() {
    return cy.get('h3')
  }

  getCarousel() {
    return cy.get('.carousel')
  }

  getFooter() {
    return cy.get('footer')
  }

  getFooterLinks() {
    return this.getFooter().find('a')
  }
}

export default HomePage
