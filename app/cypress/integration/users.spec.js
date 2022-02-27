describe.only("Users", () => {
  describe("Register tests", () => {
    beforeEach(() => {
      cy.request("POST", "http://localhost:8080/api/testing/resetUsers");
      cy.visit("http://localhost:3000/register");
      cy.get("[placeholder='Name...']").clear();
      cy.get("[placeholder='Lastname...']").clear();
      cy.get("[placeholder='Email...']").clear();
      cy.get("[placeholder='Password...']").clear();
    });

    it("Register fails if forms data is empty", () => {
      cy.get("button[title='Register button']").click();

      cy.get("p")
        .should("contain", "Name is required")
        .should("contain", "Lastname is required")
        .should("contain", "Email is required")
        .should("contain", "Password is required");
    });

    it("Register fails if format data is invalid", () => {
      cy.get("[placeholder='Name...']").type("12345");
      cy.get("[placeholder='Lastname...']").type("12345");
      cy.get("[placeholder='Email...']").type("12345");
      cy.get("[placeholder='Password...']").type("12345");

      cy.get("button[title='Register button']").click();

      cy.get("p")
        .should(
          "contain",
          "Name should be more than 6 and less than 30 characters"
        )
        .should(
          "contain",
          "Lastname should be more than 6 and less than 30 characters"
        )
        .should(
          "contain",
          "Email should be more than 6 and less than 30 characters"
        )
        .should(
          "contain",
          "Password should be more than 6 and less than 30 characters"
        );

      cy.get("[placeholder='Email...']").type("6");
      cy.get("p").should("contain", "Email should be valid");
    });

    it("Register fails if email is already in use", () => {
      cy.createTestUser();
      cy.fixture("testUser").then(({ name, lastName, email, password }) => {
        cy.get("[placeholder='Name...']").type(name);
        cy.get("[placeholder='Lastname...']").type(lastName);
        cy.get("[placeholder='Email...']").type(email);
        cy.get("[placeholder='Password...']").type(password);
        cy.get("button[title='Register button']").click();
      });

      cy.get("button[title='Register button']").click();

      cy.get("p").should("contain", "Email already registered");
    });

    it("User can register successfully", () => {
      cy.fixture("testUser").then(({ name, lastName, email, password }) => {
        cy.get("[placeholder='Name...']").type(name);
        cy.get("[placeholder='Lastname...']").type(lastName);
        cy.get("[placeholder='Email...']").type(email);
        cy.get("[placeholder='Password...']").type(password);
        cy.get("button[title='Register button']").click();

        cy.get("div").contains("User successfully registered!");
      });
    });

    it("If user registered is redirected to login with correct credentials", () => {
      cy.fixture("testUser").then(({ name, lastName, email, password }) => {
        cy.get("[placeholder='Name...']").type(name);
        cy.get("[placeholder='Lastname...']").type(lastName);
        cy.get("[placeholder='Email...']").type(email);
        cy.get("[placeholder='Password...']").type(password);
        cy.get("button[title='Register button']").click();

        cy.get("div").contains("User successfully registered!");

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
          .location()
          .should((loc) => {
            expect(loc.pathname).to.eq("/login");
          });

        cy.get("[placeholder='Email...']").should("have.value", email);
      });
    });
  });

  describe.only("Login tests", () => {
    before(() => {
      cy.request("POST", "http://localhost:8080/api/testing/resetUsers");
      cy.createTestUser();
    });

    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.intercept({
        method: "POST",
        url: "http://localhost:8080/api/users/login",
      }).as("login");
      cy.get("[placeholder='Email...']").clear();
      cy.get("[placeholder='Password...']").clear();
    });

    it("Login fails if forms data is empty", () => {
      cy.get("button[title='Login button']").click();

      cy.get("p")
        .should("contain", "Email is required")
        .should("contain", "Password is required");
    });

    it("Login fails if format data is invalid", () => {
      cy.get("[placeholder='Email...']").type("12345");
      cy.get("[placeholder='Password...']").type("12345");

      cy.get("button[title='Login button']").click();

      cy.get("p")
        .should(
          "contain",
          "Email should be more than 6 and less than 30 characters"
        )
        .should(
          "contain",
          "Password should be more than 6 and less than 30 characters"
        );

      cy.get("[placeholder='Email...']").type("6");
      cy.get("p").should("contain", "Email should be valid");
    });

    it("User can't login with wrong credentials", () => {
      const invalidDataLogin = {
        email: "wrongEmail@email.com",
        password: "wrongPassword",
      };

      cy.get("[placeholder='Email...']").type(invalidDataLogin.email);
      cy.get("[placeholder='Password...']").type(invalidDataLogin.password);
      cy.get("button[title='Login button']").click();

      cy.get("p").should("contain", "Wrong credentials");
    });

    it("User can login with registered user", () => {
      cy.fixture("testUser").then(({ email, password }) => {
        cy.get("[placeholder='Email...']").type(email);
        cy.get("[placeholder='Password...']").type(password);
        cy.get("button[title='Login button']").click();

        cy.wait("@login").then((userinfo) => {
          cy.window().then((win) => {
            cy.location().should((loc) => {
              const userEmailResponse = userinfo.response.body.user.email;
              const userEmailClient =
                win.queryClient.getQueryData("user").email;

              expect(email).to.eq(userEmailResponse).to.eq(userEmailClient);
              expect(loc.pathname).to.eq("/");
            });
          });
        });
      });
    });

    it.only("When user logged infoCard data is correct", () => {
      cy.loginWithTestUser();

      cy.window().then((win) => {
        const { email, name, lastName } = win.queryClient.getQueryData("user");

        cy.get("#userInfoCard").should("be.visible");
        cy.get(`<p data-test-id='${email}'></p>`);
        cy.get(`<p data-test-id='${name}'></p>`);
        cy.get(`<p data-test-id='${lastName}'></p>`);
      });
    });

    it("User can logout", () => {
      cy.loginWithTestUser();

      cy.get("button[title='Logout']").click();

      cy.window().then((win) => {
        cy.location().should((loc) => {
          const userDataClient = win.queryClient.getQueryData("user");
          const token = localStorage.getItem("token");

          expect(token).to.eq(null);
          expect(userDataClient).to.eq(undefined);
          expect(loc.pathname).to.eq("/login");
        });
      });
    });
  });
});
