const request = require("supertest");
const app = require("../index");

describe("Beer Styles API", () => {
  it("should return all beer styles", async () => {
    const res = await request(app).get("/styles");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(6);
  });

  it("should return a single beer style", async () => {
    const res = await request(app).get("/styles/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("Pilsen");
  });

  it("should return 404 if beer style not found", async () => {
    const res = await request(app).get("/styles/10");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Style not found");
  });

  it("should create a new beer style", async () => {
    const newStyle = {
      name: "Test Style",
      minTemp: -2,
      maxTemp: 4,
    };
    const res = await request(app).post("/styles").send(newStyle);
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toEqual(7);
    expect(res.body.name).toEqual(newStyle.name);
  });

  it("should update an existing beer style", async () => {
    const updatedStyle = {
      name: "Updated Style",
      minTemp: -5,
      maxTemp: 5,
    };
    const res = await request(app).put("/styles/1").send(updatedStyle);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(updatedStyle.name);
    expect(res.body.minTemp).toEqual(updatedStyle.minTemp);
    expect(res.body.maxTemp).toEqual(updatedStyle.maxTemp);
  });

  it("should return 404 if trying to update a non-existent beer style", async () => {
    const updatedStyle = {
      name: "Updated Style",
      minTemp: -5,
      maxTemp: 5,
    };
    const res = await request(app).put("/styles/10").send(updatedStyle);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Style not found");
  });

  it("should return 400 if request body is empty when trying to update a beer style", async () => {
    const res = await request(app).put("/styles/1").send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Bad request");
  });

  it("should delete an existing beer style", async () => {
    const res = await request(app).delete("/styles/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Style deleted");
  });

  it("should return 404 if trying to delete a non-existent beer style", async () => {
    const res = await request(app).delete("/styles/10");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Style not found");
  });
});
