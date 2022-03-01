describe("TodosPage", () => {
  before(() => {
    cy.visit("http://localhost:8080");
    cy.request("POST", "http://localhost:8080/api/testing/resetUsers");
    cy.request("POST", "http://localhost:8080/api/testing/resetTodos");
    cy.createTestUser();
  });

  //Should do before every test because localStorage gets cleared after all of them
  beforeEach(() => {
    cy.loginWithTestUser();
  });

  describe("Ui tests", () => {
    it("FrontPage can be opened", () => {
      cy.contains("Todo App");
    });

    it("Dark mode can be enabled", () => {
      cy.get("button[title='Toogle theme']").click();
      cy.get("body").should("have.class", "dark");
      cy.get("#app").should("have.css", "background-color", "rgb(31, 41, 55)");
    });

    describe("UiModals", () => {
      before(() => {
        cy.loginWithTestUser();
        cy.addTodo({
          title: "cypress-mock-todo",
          description: "test-description",
        });
      });

      it("Modal AddTodo can be opened", () => {
        cy.get("button[title='Add todo']").click();
        cy.get("form").within(() => {
          cy.get("button[title='Add todo']");
        });
      });

      it("Modal EditTodo can be opened", () => {
        cy.get("button[title='Edit todo']").click();
        cy.get("form").within(() => {
          cy.get("button[title='Edit todo']");
        });
      });

      it("Modal DeleteTodo can be opened", () => {
        cy.get("button[title='Delete todo']").click();
        cy.get("div").within(() => {
          cy.get("button[title='Delete todo']");
        });
      });

      after(() => {
        cy.request("POST", "http://localhost:8080/api/testing/resetTodos");
      });

      afterEach(() => {
        cy.get("body").type("{esc}");
      });
    });
  });

  describe("Todo actions tests", () => {
    describe("Without todo added", () => {
      it("Todo add fails if there is no data", () => {
        cy.get("button[title='Add todo']").click();
        cy.get("form").within(() => {
          cy.get("button[title='Add todo']").click();
          cy.get("p")
            .should("contain", "Title required")
            .should("contain", "Description required");
        });
      });

      it("Todo can be added", () => {
        const todoContent = {
          title: "New test todo",
          description: "new test description",
        };

        cy.get("button[title='Add todo']").click();
        cy.get("form").within(() => {
          cy.get("[placeholder='Title...']").type(todoContent.title);
          cy.get("[placeholder='Description...']").type(
            todoContent.description
          );
          cy.get("button[title='Add todo']").click();
        });

        cy.get("ul[class='flex flex-col']")
          .should("have.length", 1)
          .and(($list) => {
            expect($list.get(0).textContent, "first item").to.contain(
              todoContent.title
            );
          });
      });
    });

    describe("With todo added", () => {
      beforeEach(() => {
        cy.request("POST", "http://localhost:8080/api/testing/resetTodos");
        cy.addTodo({
          title: "cypress-mock-todo",
          description: "test-description",
        });
        cy.get("ul[class='flex flex-col']").find("li").should("have.length", 1);
      });

      it("Todo can be done", () => {
        cy.get("div[title='Do todo']").click().as("theTodo");
        cy.get("@theTodo").should(
          "have.class",
          "dark:bg-gray-400 bg-gray-400 transition-all"
        );
      });

      it("Todo can be undone", () => {
        cy.get("@idNewTodo").then((id) => {
          cy.doTodo(id);
        });

        cy.get("div[title='Undo todo']").click().as("theTodo");
        cy.get("@theTodo").should(
          "not.have.class",
          "dark:bg-gray-400 bg-gray-400 transition-all"
        );
      });

      it("Todo can be edited", () => {
        const todoEditData = {
          title: "New test todo",
          description: "new test description",
        };

        cy.get("button[title='Edit todo']").click();
        cy.get("form").within(() => {
          cy.get("[placeholder='Title...']").clear().type(todoEditData.title);
          cy.get("[placeholder='Description...']")
            .clear()
            .type(todoEditData.description);
          cy.get("button[title='Edit todo']").click();
        });

        cy.contains("li", todoEditData.title);
      });

      it("Todo can be deleted", () => {
        cy.get("button[title='Delete todo']").click();
        cy.get("button[title='Confirm delete']").click();

        cy.get("ul[class='flex flex-col']").find("li").should("have.length", 0);
      });
    });
  });
});
