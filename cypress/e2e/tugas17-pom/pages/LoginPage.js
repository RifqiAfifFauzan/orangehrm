import loginData from '../data/loginData.js';

class LoginPage {

  get usernameInput() {
    return cy.get('input[name="username"]', { timeout: 15000 });
  }

  get passwordInput() {
    return cy.get('input[name="password"]');
  }

  get loginButton() {
    return cy.get('button[type="submit"]');
  }

  get alertError() {
    return cy.get('.oxd-alert-content-text');
  }

  get fieldError() {
    return cy.get('.oxd-input-field-error-message');
  }

  get forgotLink() {
    return cy.get('.orangehrm-login-forgot-header');
  }

  get forgotTitle() {
    return cy.get('.orangehrm-forgot-password-title');
  }

  // ===== Action =====
  visit() {
    cy.visit(loginData.url);
    this.usernameInput.should('be.visible');
  }

  typeUsername(username) {
    this.usernameInput.type(username);
  }

  typePassword(password) {
    this.passwordInput.type(password);
  }

  clickLogin() {
    this.loginButton.click();
  }

  login(username, password) {
    if (username) {
      this.typeUsername(username);
    }
    if (password) {
      this.typePassword(password);
    }
    this.clickLogin();
  }

  clickForgotPassword() {
    this.forgotLink.click();
  }


  verifyDashboard() {
    cy.url().should('include', '/dashboard');
  }

  verifyInvalidCredentials() {
    this.alertError.should('contain', loginData.message.invalid);
  }

  verifyRequiredMessage(jumlah) {
    this.fieldError
      .should('have.length', jumlah)
      .and('contain', loginData.message.required);
  }

  verifyPasswordMasked() {
    this.passwordInput.should('have.attr', 'type', 'password');
  }

  verifyForgotPasswordPage() {
    cy.url().should('include', '/requestPasswordResetCode');
    this.forgotTitle.should('contain', loginData.message.forgotTitle);
  }
}

export default new LoginPage();
