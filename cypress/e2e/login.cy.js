describe('OrangeHRM - Quiz 3 - Fitur Login', () => {
  
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  // LG-001
  it('LG-001: Login dengan username & password valid', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
  });

  // LG-002
  it('LG-002: Login dengan username & password huruf kecil semua', () => {
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
  });

  // LG-003
  it('LG-003: Login dengan kombinasi huruf besar-kecil pada username', () => {
    cy.get('input[name="username"]').type('aDmin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
  });

  // LG-004
  it('LG-004: Login dengan username salah, password benar', () => {
    cy.get('input[name="username"]').type('Admin1');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  // LG-005
  it('LG-005: Login dengan username benar, password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah123');
    cy.get('button[type="submit"]').click();
    
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

// LG-006
  it('TC-06: Reset password melalui menu Forgot your password?', () => {
    cy.get('.orangehrm-login-forgot').click();
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password link sent successfully');
  });

  // LG-007
  it('LG-007: Login dengan username & password dikosongkan', () => {
    cy.get('button[type="submit"]').click();
    
    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
      .and('contain', 'Required');
  });

  // LG-008
  it('LG-008: Login dengan username dikosongkan', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required');
  });

  // LG-009
  it('LG-009: Login dengan password dikosongkan', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required');
  });

  // LG-010
  it('TC-10: Password bersifat case sensitive', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();
    
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  // LG-011
  it('TC-11: Login dengan username & password sama-sama salah', () => {
    cy.get('input[name="username"]').type('user123');
    cy.get('input[name="password"]').type('pass123');
    cy.get('button[type="submit"]').click();
    
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  // LG-012
  it('TC-12: Karakter pada field Password disamarkan (masked)', () => {
    cy.get('input[name="password"]').type('admin123');

    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

});