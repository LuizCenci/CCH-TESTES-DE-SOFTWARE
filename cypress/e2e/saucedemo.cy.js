describe('Testes e2e no site SauceDemo', () => {

  const user = 'standard_user'
  const pass = 'secret_sauce'

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('Login com sucesso', () => {
    cy.get('#user-name').type(user)
    cy.get('#password').type(pass)
    cy.get('#login-button').click()

    cy.url().should('include', '/inventory.html')
    cy.contains('Products')
  })

  it('Adicionar produto ao carrinho', () => {
    cy.login(user, pass)

    cy.contains('Add to cart').first().click()
    cy.get('.shopping_cart_badge').should('contain', '1')
  })

  it('Checkout completo (compra)', () => {
    cy.login(user, pass)

    cy.contains('Add to cart').first().click()
    cy.get('.shopping_cart_link').click()

    cy.contains('Checkout').click()

    cy.get('#first-name').type('Luiz')
    cy.get('#last-name').type('Cenci')
    cy.get('#postal-code').type('12345')
    cy.contains('Continue').click()

    cy.contains('Finish').click()

    cy.contains('Thank you for your order').should('be.visible')
  })

  it('Validar ordenação por menor preço', () => {
    cy.login(user, pass)

    cy.get('.product_sort_container').select('lohi')

    cy.get('.inventory_item_price').then(($prices) => {
      const valores = [...$prices].map(price => 
        parseFloat(price.innerText.replace('$', ''))
      )
      const ordenado = [...valores].sort((a, b) => a - b)

      expect(valores).to.deep.equal(ordenado)
    })
  })

  it('Logout do sistema', () => {
    cy.login(user, pass)

    cy.get('#react-burger-menu-btn').click()
    cy.contains('Logout').click()

    cy.url().should('include', 'saucedemo.com')
    cy.get('#login-button').should('be.visible')
  })
  
  it('Validação proposital para gerar erro', () => {
    cy.visit('https://www.saucedemo.com/')

    // Validação impossível: exige um texto inexistente
    cy.contains('ESTE TEXTO NAO EXISTE NO SITE').should('be.visible')
  })

})

// Comando customizado Cypress
Cypress.Commands.add('login', (user, pass) => {
  cy.visit('https://www.saucedemo.com/')
  cy.get('#user-name').type(user)
  cy.get('#password').type(pass)
  cy.get('#login-button').click()
})
