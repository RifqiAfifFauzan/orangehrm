import LoginPage from './pages/LoginPage.js';
import loginData from './data/loginData.js';

describe('OrangeHRM - Tugas 17 - Fitur Login (POM)', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    LoginPage.visit();
  });

  // LG-001
  it('LG-001: Login dengan username & password valid', () => {
    LoginPage.login(loginData.valid.username, loginData.valid.password);
    LoginPage.verifyDashboard();
  });

  // LG-002
  it('LG-002: Login dengan username & password huruf kecil semua', () => {
    LoginPage.login(loginData.lowercase.username, loginData.lowercase.password);
    LoginPage.verifyDashboard();
  });

  // LG-003
  it('LG-003: Login dengan kombinasi huruf besar-kecil pada username', () => {
    LoginPage.login(loginData.mixedCase.username, loginData.mixedCase.password);
    LoginPage.verifyDashboard();
  });

  // LG-004
  it('LG-004: Login dengan username salah, password benar', () => {
    LoginPage.login(loginData.wrongUsername.username, loginData.wrongUsername.password);
    LoginPage.verifyInvalidCredentials();
  });

  // LG-005
  it('LG-005: Login dengan username benar, password salah', () => {
    LoginPage.login(loginData.wrongPassword.username, loginData.wrongPassword.password);
    LoginPage.verifyInvalidCredentials();
  });

  // LG-006
  it('LG-006: Membuka halaman Forgot your password?', () => {
    LoginPage.clickForgotPassword();
    LoginPage.verifyForgotPasswordPage();
  });

  // LG-007
  it('LG-007: Login dengan username & password dikosongkan', () => {
    LoginPage.login('', '');
    LoginPage.verifyRequiredMessage(2);
  });

  // LG-008
  it('LG-008: Login dengan username dikosongkan', () => {
    LoginPage.login('', loginData.valid.password);
    LoginPage.verifyRequiredMessage(1);
  });

  // LG-009
  it('LG-009: Login dengan password dikosongkan', () => {
    LoginPage.login(loginData.valid.username, '');
    LoginPage.verifyRequiredMessage(1);
  });

  // LG-010
  it('LG-010: Password bersifat case sensitive', () => {
    LoginPage.login(loginData.upperPassword.username, loginData.upperPassword.password);
    LoginPage.verifyInvalidCredentials();
  });

  // LG-011
  it('LG-011: Login dengan username & password sama-sama salah', () => {
    LoginPage.login(loginData.bothWrong.username, loginData.bothWrong.password);
    LoginPage.verifyInvalidCredentials();
  });

  // LG-012
  it('LG-012: Karakter pada field Password disamarkan (masked)', () => {
    LoginPage.typePassword(loginData.valid.password);
    LoginPage.verifyPasswordMasked();
  });
});
