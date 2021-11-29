"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/joke-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
}

class JokeAbl {
    constructor() {
      this.validator = Validator.load();
      this.jokesMainDao = DaoFactory.getDao("jokesMain");
      this.jokeDao = DaoFactory.getDao("joke");
    }

    async create(uri, dtoIn, session, uuAppErrorMap = {}) {
        const awid = uri.getAwid();
        // HDS 1 
        const uuJokes = await this.jokesMainDao.getByAwid(awid)
        if(!uuJokes){
            throw new Errors.Create.jokesDoesNotExist({uuAppErrorMap}, {awid})
        }

        if (uuJokes.state !== 'active'&& uuJokes.state !== 'underConstruction') {
            throw new Errors.Create.jokesIsNotInCorrectState({uuAppErrorMap},
                 {expectedStateList: ['active', 'underConstruction'], actualState: uuJokes.state})
        }

        // HDS 2 
        const validationResult = this.validator.validate("jokeCreateDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        WARNINGS.createUnsupportedKeys.code,
        Errors.Create.invalidDtoIn
        );

        // HDS 3
        //  Checks if the dtoIn is filled.
        // 1- dtoIn.image
        // 2- calls the createBinary method

        // HDS 4
        // categoryIdList 

        // HDS 5
        const uuObject = { ...dtoIn, awid, averageRating: 0, ratingCount: 0,
            visibility: false, uuIdentity: session.getIdentity().getUuIdentity(),
            uuIdentityName: session.getIdentity().getName()};
     
        let joke = null;
         try {
           joke = await this.jokeDao.create(uuObject);
         } catch (err) {
           throw new Errors.Create.jokeDaoCreateFailed({ uuAppErrorMap }, err);
         }
     
        // HDS6
        return {
            ...joke,
            uuAppErrorMap
        }
    }

    async get(uri, dtoIn, session, uuAppErrorMap = {}) {
        const awid = uri.getAwid();

        // HDS 1 
        const uuJokes = await this.jokesMainDao.getByAwid(awid)
        if(!uuJokes){
            throw new Errors.Get.jokesDoesNotExist({uuAppErrorMap}, {awid})
        }
  
        if (uuJokes.state !== 'active'&& uuJokes.state !== 'underConstruction') {
            throw new Errors.Get.jokesIsNotInCorrectState({uuAppErrorMap},
                {expectedStateList: ['active', 'underConstruction'], actualState: uuJokes.state})
        }

        // HDS 2
        const validationResult = this.validator.validate("jokeGetDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        WARNINGS.createUnsupportedKeys.code,
        Errors.Get.invalidDtoIn
        );

        // HDS 3
        const uuJoke = await this.jokeDao.get(awid, dtoIn.id)
        if(!uuJoke){
            throw new Errors.Get.jokeDoesNotExist({ uuAppErrorMap },{joke: dtoIn.id})
        }

        // HDS 4
        return{
            ...uuJoke,
            uuAppErrorMap
        }

    }


}

module.exports = new JokeAbl();