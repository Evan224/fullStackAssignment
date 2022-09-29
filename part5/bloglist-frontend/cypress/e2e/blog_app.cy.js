describe('Note app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    // cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // ...
      cy.get('#username').type('evan222')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      // ...
      cy.get('#username').type('evan222')
      cy.get('#password').type('password22')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('evan222')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.contains('create').click()
      cy.get('#title').type('This is the new title you like')
      cy.get('#author').type('by cypress!')
      cy.get('#username').type('username!!!')
      cy.get('#create-button').click()
      // cy.contains('save').click()
      cy.contains('This is the new title you like')
    })

    it('a blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('a blog can be deleted', function() {
      cy.get('.blog').filter(':contains("This is the new title you like")').find('button')
        .click({ multiple: true })

      cy.get('.blog').filter(':contains("This is the new title you like")').contains('DELETE')
        .click({ multiple: true })

      // cy.contains('DELETE').click()

      cy.contains('This is the new title you like').should('not.exist')
    })
  })
})