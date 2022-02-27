Cypress.Commands.add("createTestUser", () => {
  cy.fixture("testUser").then((user) => {
    cy.request("POST", "http://localhost:8080/api/users", user);
  });
});

Cypress.Commands.add("loginWithTestUser", () => {
  cy.fixture("testUser").then(({ email, password }) => {
    cy.request("POST", "http://localhost:8080/api/users/login", {
      email,
      password,
    }).then((response) => {
      const { token, user } = response.body;
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());

      cy.window().then((win) => {
        win.queryClient.setQueryData("user", () => user);
      });
    });
  });
});

Cypress.Commands.add("addTodo", ({ title, description }) => {
  cy.window().then((win) => {
    const userId = win.queryClient.getQueryData("user").uid;

    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/todos",
      headers: { token: localStorage.getItem("token") },
      body: { title, description, userId },
    }).then((response) => {
      const { data: newTodo } = response.body;

      cy.wrap(newTodo._id).as("idNewTodo");

      win.queryClient.setQueryData(["todos", userId], (oldQueryData) => {
        const { pages } = oldQueryData;
        pages[0].data = [newTodo, ...oldQueryData.pages[0].data];

        return {
          ...oldQueryData,
          pages,
        };
      });
    });
  });
});

Cypress.Commands.add("doTodo", (todoId) => {
  cy.window().then((win) => {
    const userId = win.queryClient.getQueryData("user").uid;

    cy.request({
      method: "PUT",
      url: `http://localhost:8080/api/todos/${todoId}`,
      headers: { token: localStorage.getItem("token") },
      body: { done: true },
    }).then((response) => {
      const { data: editedTodo } = response.body;

      win.queryClient.setQueryData(["todos", userId], (oldQueryData) => {
        let { pages } = oldQueryData;
        pages = pages.map((pagesUnity) => ({
          ...pagesUnity,
          data: pagesUnity.data.map((page) => {
            if (page._id === editedTodo._id) {
              return editedTodo;
            }

            return page;
          }),
        }));

        return {
          ...oldQueryData,
          pages,
        };
      });
    });
  });
});
