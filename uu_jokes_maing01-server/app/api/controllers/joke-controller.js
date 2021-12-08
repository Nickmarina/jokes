"use strict";
const JokeAbl = require("../../abl/joke-abl.js");

class JokeController {

  create(ucEnv) {
    return JokeAbl.create(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  get(ucEnv) {
    return JokeAbl.get(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  delete(ucEnv) {
    return JokeAbl.delete(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  async getImageData(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let dtoOut = await JokeAbl.getImageData(ucEnv.getUri().getAwid(), dtoIn);
    return ucEnv.setBinaryDtoOut(dtoOut, dtoIn.contentDisposition);
  }

  update(ucEnv) {
    return JokeAbl.update(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  } 

  list(ucEnv) {
    return JokeAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new JokeController();