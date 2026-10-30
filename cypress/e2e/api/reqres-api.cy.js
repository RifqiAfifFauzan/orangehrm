describe('ReqRes API Automation Testing - 12 Requests', () => {

  // 1. GET - List Users
  it('01. GET - List Users', () => {
    cy.request('GET', 'https://reqres.in/api/users?page=2').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('page', 2);
      expect(response.body.data).to.be.an('array');
    });
  });

  // 2. GET - Single User
  it('02. GET - Single User', () => {
    cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('id', 2);
      expect(response.body.data.email).to.include('@reqres.in');
    });
  });

  // 3. GET - Single User Not Found
  it('03. GET - Single User Not Found', () => {
    cy.request({ method: 'GET', url: 'https://reqres.in/api/users/23', failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.deep.eq({});
    });
  });

  // 4. GET - List Resource (Unknown)
  it('04. GET - List Resource', () => {
    cy.request('GET', 'https://reqres.in/api/unknown').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('per_page', 6);
      expect(response.body.support).to.have.property('text');
    });
  });

  // 5. GET - Single Resource
  it('05. GET - Single Resource', () => {
    cy.request('GET', 'https://reqres.in/api/unknown/2').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('id', 2);
      expect(response.body.data).to.have.property('name', 'fuchsia rose');
    });
  });

  // 6. GET - Single Resource Not Found
  it('06. GET - Single Resource Not Found', () => {
    cy.request({ method: 'GET', url: 'https://reqres.in/api/unknown/23', failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // 7. POST - Create User
  it('07. POST - Create User', () => {
    cy.request('POST', 'https://reqres.in/api/users', {
      name: 'Rifqi Afif',
      job: 'Frontend Developer'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'Rifqi Afif');
      expect(response.body).to.have.property('job', 'Frontend Developer');
      expect(response.body).to.have.property('id');
    });
  });

  // 8. PUT - Update User
  it('08. PUT - Update User', () => {
    cy.request('PUT', 'https://reqres.in/api/users/2', {
      name: 'Rifqi Afif Fauzan',
      job: 'IT Specialist'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Rifqi Afif Fauzan');
      expect(response.body).to.have.property('job', 'IT Specialist');
      expect(response.body).to.have.property('updatedAt');
    });
  });

  // 9. PATCH - Update User
  it('09. PATCH - Update User', () => {
    cy.request('PATCH', 'https://reqres.in/api/users/2', {
      job: 'Senior Frontend Developer'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('job', 'Senior Frontend Developer');
      expect(response.body).to.have.property('updatedAt');
    });
  });

  // 10. DELETE - User
  it('10. DELETE - User', () => {
    cy.request('DELETE', 'https://reqres.in/api/users/2').then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  // 11. POST - Register Successful
  it('11. POST - Register Successful', () => {
    cy.request('POST', 'https://reqres.in/api/register', {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });

  // 12. POST - Login Successful
  it('12. POST - Login Successful', () => {
    cy.request('POST', 'https://reqres.in/api/login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token', 'QpwL5tke4Pnpja7X4');
    });
  });

});