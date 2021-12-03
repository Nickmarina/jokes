const { TestHelper } = require("uu_appg01_server-test");
const CMD = "joke/get";
afterEach(async () => {
    await TestHelper.dropDatabase();
    await TestHelper.teardown();

})

beforeEach(async () => {
    await TestHelper.setup();
    await TestHelper.initUuSubAppInstance();
    await TestHelper.createUuAppWorkspace();
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    let dtoIn = {
        uuAppProfileAuthorities: "urn:uu:GGALL",
    };
    let result = await TestHelper.executePostCommand("sys/uuAppWorkspace/init", dtoIn, session);
});


describe("Testing the joke/get...", () => {

test("Test - JokesIsNotInCorrectState", async () => {
    let session = await TestHelper.login("Authorities", false, false);
    const filter = `{awid: "${TestHelper.awid}"}`;
    const params = `{$set: ${JSON.stringify({ state: `test` })}}`;
    await TestHelper.executeDbScript(`db.jokesMain.findOneAndUpdate(${filter}, ${params});`);
    let expectedError = {
      code: `${CMD}/jokesIsNotInCorrectState`,
      message: "jokes is not in correct state.",
      paramMap: { awid: TestHelper.awid, expectedState: "active" },
    };
    expect.assertions(3);
    try {
      await TestHelper.executeGetCommand("joke/get", { name:"Joke name" },session);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual(expectedError.message);

      if (error.paramMap && expectedError.paramMap) {
        expect(error.paramMap).toEqual(expectedError.paramMap);
      }
    }
  });
  test("Test - joke main does not exist", async () => {
    let session = await TestHelper.login("Authorities", false, false);
    const filter = `{awid: "${TestHelper.awid}"}`;
    const params = `{$set: ${JSON.stringify({ awid: `test` })}}`;
    await TestHelper.executeDbScript(`db.jokesMain.findOneAndUpdate(${filter}, ${params});`);
    let expectedError = {
      code: `${CMD}/jokesMainDoesNotExist`,
      message: "jokes does not exist",
      paramMap: { awid: TestHelper.awid },
    };
    expect.assertions(3);
    try {
      await TestHelper.executeGetCommand("joke/get", { name:"Joke name" },session);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual(expectedError.message);

      if (error.paramMap && expectedError.paramMap) {
        expect(error.paramMap).toEqual(expectedError.paramMap);
      }
    }
  });
});


