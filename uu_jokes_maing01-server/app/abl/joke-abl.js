"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/joke-error.js");
const {BinaryStoreError} = require("uu_appg01_binarystore");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  getImageDataUnsupportedKeys: {
    code: `${Errors.GetImageData.UC_CODE}unsupportedKeys`
  },

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  jokeUnsupportedKeys:{
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  }
}

class JokeAbl {
    constructor() {
      this.validator = Validator.load();
      this.jokesMainDao = DaoFactory.getDao("jokesMain");
      this.jokeDao = DaoFactory.getDao("joke");
      // this.jokeDao.createSchema();
      this.jokeImageDao = DaoFactory.getDao("jokeImage");
      // this.jokeImageDao.createSchema();   
    }

    async create(uri, dtoIn, session, uuAppErrorMap = {}) {
        const awid = uri.getAwid();
        // HDS 1 
        const uuJokes = await this.jokesMainDao.getByAwid(awid)
        if(!uuJokes){
            throw new Errors.Create.jokesDoesNotExist({uuAppErrorMap}, {awid})
        }

        if (uuJokes?.state !== 'underConstruction' && uuJokes?.state !== 'active') {
          throw new Errors.Create.jokesIsNotInCorrectState({uuAppErrorMap}, {awid, expectedState: "active" })
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

        // hds 2
      let jokeImage;
      if (dtoIn.image) {
        try {
          jokeImage = await this.jokeImageDao.create({awid}, dtoIn.image);
        } catch (e) {
          if (e instanceof BinaryStoreError) { // A3
            throw new Errors.Create.JokeImageDaoCreateFailed({uuAppErrorMap}, e);
          }
          throw e;
        }
      dtoIn.image = jokeImage.code;
    }


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
  
        if (uuJokes?.state !== 'underConstruction' && uuJokes?.state !== 'active') {
          throw new Errors.Get.jokesIsNotInCorrectState({uuAppErrorMap}, {awid, expectedState: "active" })
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

    async getImageData(awid, dtoIn) {
      
      // hds 1
      // hds 1.1
      let validationResult = this.validator.validate("jokeGetImageDataDtoInType", dtoIn);
      // hds 1.2, 1.3 // A1, A2
      let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
        WARNINGS.getImageDataUnsupportedKeys.code, Errors.GetImageData.InvalidDtoIn);
  
      // hds 2
      let dtoOut;
      try {
        dtoOut = await this.jokeImageDao.getDataByCode(awid, dtoIn.image);
      } catch (e) {
        if (e.code === "uu-app-binarystore/objectNotFound") { // A3
          throw new Errors.GetImageData.JokeImageDoesNotExist({uuAppErrorMap}, {image: dtoIn.image});
        }
        throw e;
      }
  
      // hds 3
      dtoOut.uuAppErrorMap = uuAppErrorMap;
      return dtoOut;
    }

    async list(awid, dtoIn, uuAppErrorMap) {
      // HDS 1
      const validationResult = this.validator.validate("listListDtoInType", dtoIn);
      uuAppErrorMap = ValidationHelper.processValidationResult(
          dtoIn,
          validationResult,
          WARNINGS.listUnsupportedKeys.code,
          Errors.List.InvalidDtoIn
      ); 
  
      // HDS 3
      const  itemList = await this.jokeDao.list(awid)
  
      // HDS 4
      return{
        ...itemList,
        uuAppErrorMap
      }
    }

    async update(uri, dtoIn, session, uuAppErrorMap = {}) {
      const awid = uri.getAwid();
       // HDS 1
       const validationResult = this.validator.validate("jokeUpdateDtoInType", dtoIn);
       uuAppErrorMap = ValidationHelper.processValidationResult(
           dtoIn,
           validationResult,
           WARNINGS.jokeUnsupportedKeys.code,
           Errors.Update.InvalidDtoIn
       ); 
   
      const joke = await this.jokeDao.get(awid, dtoIn.id)
      if(!joke){
          throw new Errors.Update.jokeDoesNotExist({ uuAppErrorMap },{joke: dtoIn.id})
      }
      const uuObject = {...dtoIn, awid}
      let updatedJoke  = null;
      try {
        updatedJoke =  await this.jokeDao.update(uuObject);
      } catch (err) {
        throw new Errors.Update.jokeDaoUpdateFailed({ uuAppErrorMap }, err);
      }

 
      return{
          ...updatedJoke,
          uuAppErrorMap
      }

  }
    
}

module.exports = new JokeAbl();