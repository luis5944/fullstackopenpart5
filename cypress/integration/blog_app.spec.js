describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const createUser = {
      username: "luis",
      password: "852456",
    };
    cy.request("POST", "http://localhost:3001/api/users", createUser);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("luis");
      cy.get("#password").type("852456");
      cy.get("button").click();
      cy.contains("luis logged in Logout");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("luís");
      cy.get("#password").type("852456");
      cy.get("button").click();
      cy.contains("Wrong Username or Password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "luis", password: "852456" });
    });

    it("User create blog", function () {
      cy.contains("Create New Blog").click();
      cy.get("#title").type("FirstBlog");
      cy.get("#author").type("Scorsese");
      cy.get("#url").type("www.dot.com");
      cy.get("#create-button").click();
    });

    it("User create blog and like a blog", function () {
      cy.contains("Create New Blog").click();
      cy.get("#title").type("Another Blog");
      cy.get("#author").type("Scorsese");
      cy.get("#url").type("www.dot.com");
      cy.get("#create-button").click();
      cy.get(".extended").click();
      cy.get(".updateBlog").click();

      cy.contains("1");
    });

    it("User delete a blog", function () {
      cy.contains("Create New Blog").click();
      cy.get("#title").type("Another Blogo");
      cy.get("#author").type("Scorsese");
      cy.get("#url").type("www.dot.com");
      cy.get("#create-button").click();
      cy.get(".extended").click();
      cy.get("#remove-button").click();

      cy.get("body").should("not.contain", "Another Blogo");
    });
  });

  describe.only("Blogs ordered by number of likes", function () {
    beforeEach(function () {
      cy.login({ username: "luis", password: "852456" });
      cy.createPostAndLike("Blog1");
      cy.createPostAndLike("Blog2");
      cy.createPostAndLike("Blog3");

      cy.contains("Blog1").parent().parent().as("one");
      cy.contains("Blog2").parent().parent().as("two");
      cy.contains("Blog3").parent().parent().as("three");
    });

    it("they are ordered by number of likes", function () {
      cy.get("@one").contains("like").as("like1");
      cy.get("@two").contains("like").as("like2");
      cy.get("@three").contains("like").as("like3");

      cy.get("@like1").click();
      cy.get("@like2").click();
      cy.get("@like2").click();
      cy.get("@like1").click();
      cy.get("@like2").click();

      cy.get(".blog").then((blogs) => {
        cy.wrap(blogs[0]).contains("2");
        cy.wrap(blogs[1]).contains("3");
        cy.wrap(blogs[2]).contains("0");
      });
    });
  });
});
