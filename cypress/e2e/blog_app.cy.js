describe('Blog app', function() {

  beforeEach(function() {
    this.username = 'cypress_e2e'
    this.password = 'admin'
    this.name = 'Cypress Tester'
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { 'username':this.username, 'password':this.password, 'name':this.name })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.findByTestId('login_form').should('be.visible')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.findByTestId('username').type(this.username)
      cy.findByTestId('password').type(this.password)
      cy.findByTestId('login_button').click()
      cy.findByTestId('notification')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.text', 'Login successful')
    })

    it('fails with wrong credentials', function() {
      cy.findByTestId('username').type(this.username)
      cy.findByTestId('password').type('wabalabadubdub')
      cy.findByTestId('login_button').click()
      cy.findByTestId('notification')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.text', 'Request failed with status code 401')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: this.username, password: this.password })
    })

    it.only('A blog can be created', function() {
      const title = 'Title'
      const author = 'Author'
      const url = 'localhost:3000'
      cy.contains('new note').click()
      cy.findByTestId('title_input').type(title)
      cy.findByTestId('author_input').type(author)
      cy.findByTestId('url_input').type(url)
      cy.findByTestId('create_button').click()
      cy.findByTestId('notification')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.text', 'Blog created successfully')
      cy.findByTestId('blog_list').should('contain', `${title} ${author}`)
    })
  })
})
