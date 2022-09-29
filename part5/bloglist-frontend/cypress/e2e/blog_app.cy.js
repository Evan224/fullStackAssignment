describe('Note app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    // cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('user can login', function () {
    cy.get('#username').type('evan222')
    cy.get('#password').type('password2')
    cy.get('#login-button').click()
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('evan222')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('create').click()
      cy.get('#title').type('This is the new title you like')
      cy.get('#author').type('by cypress!')
      cy.get('#username').type('username!!!')
      cy.get('#create-button').click()
      // cy.contains('save').click()
      cy.contains('This is the new title you like')
    })
  })
})