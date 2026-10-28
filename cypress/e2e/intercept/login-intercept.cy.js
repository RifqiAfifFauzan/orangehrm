describe('OrangeHRM - Tugas 16 - Fitur Login (Dengan Intercept)', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.intercept('GET', '**/core/i18n/messages').as('i18nData');
  });

  // LG-001
  it('LG-001: Login dengan username & password valid', () => {
    cy.intercept('GET', '**/dashboard/index').as('dashboardPage');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@dashboardPage').its('response.statusCode').should('be.oneOf', [200, 304]);
    cy.url().should('include', '/dashboard');
  });

  // LG-002
  it('LG-002: Login dengan username & password huruf kecil semua', () => {
    cy.intercept('GET', '**/time-at-work**').as('timeAtWork');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@timeAtWork').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');
  });

  // LG-003
  it('LG-003: Login dengan kombinasi huruf besar-kecil pada username', () => {
    cy.intercept('GET', '**/action-summary**').as('actionSummary');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="username"]').type('aDmin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');
  });

  // LG-004
  it('LG-004: Login dengan username salah, password benar', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValidateMethod');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="username"]').type('Admin1');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginValidateMethod').its('request.method').should('eq', 'POST');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  // LG-005
  it('LG-005: Login dengan username benar, password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValidateStatus');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginValidateStatus').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  // LG-006
  it('TC-06: Reset password melalui menu Forgot your password?', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('resetCodePage');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData');
    cy.get('.orangehrm-login-forgot', { timeout: 10000 }).should('be.visible');

    cy.get('.orangehrm-login-forgot').click();

    cy.wait('@resetCodePage').its('response.statusCode').should('be.oneOf', [200, 304]);
    cy.get('input[name="username"]', { timeout: 10000 }).type('Admin');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/sendPasswordReset');
  });

  // LG-007
  it('LG-007: Login dengan username & password dikosongkan', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValidate');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData');
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message').should('have.length', 2).and('contain', 'Required');
    cy.get('@loginValidate.all').should('have.length', 0);
  });

  // LG-008
  it('LG-008: Login dengan username dikosongkan', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValidate');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData');
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message').should('have.length', 1).and('contain', 'Required');
    cy.get('@loginValidate.all').should('have.length', 0);
  });

  // LG-009
  it('LG-009: Login dengan password dikosongkan', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData').its('response.statusCode').should('be.oneOf', [200, 304]);
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message').should('have.length', 1).and('contain', 'Required');
  });

  // LG-010
  it('TC-10: Password bersifat case sensitive', () => {
    cy.intercept('POST', '**/auth/validate').as('validateUrlCheck');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();

    cy.wait('@validateUrlCheck').its('request.url').should('include', '/auth/validate');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  // LG-011
  it('TC-11: Login dengan username & password sama-sama salah', () => {
    cy.intercept('POST', '**/auth/validate').as('validateBodyCheck');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait('@i18nData');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="username"]').type('user123');
    cy.get('input[name="password"]').type('pass123');
    cy.get('button[type="submit"]').click();

    cy.wait('@validateBodyCheck').then((interception) => {
      expect(interception.request.body).to.include('username=user123');
    });
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  // LG-012
  it('TC-12: Karakter pada field Password disamarkan (masked)', () => {
    cy.intercept('GET', '**/auth/login').as('loginPageLoad');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.wait('@loginPageLoad').its('request.method').should('eq', 'GET');
    cy.wait('@i18nData');
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible');

    cy.get('input[name="password"]').type('admin123');
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

});