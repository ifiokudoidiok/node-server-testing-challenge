const Users = require("./db-model");
const db = require("./db-config");

beforeEach(() => {
  return db("users").truncate();
});

describe("users model", () => {
  describe("insert function", () => {
    it("should insert a hobbit", async () => {
      await Users.register({
        username: "user5",
        password: "1234",
        department: "finance"
      });
      await Users.register({
        username: "paco",
        password: "1234",
        department: "accounts"
      });

      const users = await db("users");
      expect(users).toHaveLength(2);
    });

    it("should not post user with an existing name", async () => {
        try {
          await Users.register({
            username: "paco",
            password: "1234",
            department: "accounts"
          });
          await Users.register({
        username: "paco",
        password: "1234g",
        department: "accounts"
      });
        } catch (error) {
          expect(error.code).toBe('SQLITE_CONSTRAINT');
        }
      });
  });
});
