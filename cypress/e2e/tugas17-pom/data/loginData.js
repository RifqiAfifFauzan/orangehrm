// Data uji untuk fitur Login OrangeHRM
const loginData = {
  url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',

  valid: {
    username: 'Admin',
    password: 'admin123',
  },
  lowercase: {
    username: 'admin',
    password: 'admin123',
  },
  mixedCase: {
    username: 'aDmin',
    password: 'admin123',
  },
  wrongUsername: {
    username: 'Admin1',
    password: 'admin123',
  },
  wrongPassword: {
    username: 'Admin',
    password: 'salah123',
  },
  upperPassword: {
    username: 'Admin',
    password: 'ADMIN123',
  },
  bothWrong: {
    username: 'user123',
    password: 'pass123',
  },

  message: {
    invalid: 'Invalid credentials',
    required: 'Required',
    forgotTitle: 'Reset Password',
  },
};

export default loginData;
