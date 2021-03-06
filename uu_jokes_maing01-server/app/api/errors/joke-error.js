"use strict";
const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");
const JOKE_ERROR_PREFIX = `${JokesMainUseCaseError.ERROR_PREFIX}joke/`;

const Create = {
  UC_CODE: `${JOKE_ERROR_PREFIX}create/`,

  invalidDtoIn: class extends JokesMainUseCaseError {
      constructor() {
          super(...arguments);
          this.code = `${Create.UC_CODE}invalidDtoIn`;
          this.message = "DtoIn is not valid.";
      }
    },

    jokesDoesNotExist: class extends JokesMainUseCaseError {
      constructor() {
          super(...arguments);
          this.code = `${Create.UC_CODE} jokesDoesNotExist`;
          this.message = "jokes does not exist";
      }
    },

    
    jokesIsNotInCorrectState: class extends JokesMainUseCaseError {
      constructor() {
          super(...arguments);
          this.code = `${Create.UC_CODE}jokesIsNotInCorrectState`;
          this.message = "jokes is not in correct state.";
      }
    },

    jokeDaoCreateFailed: class extends JokesMainUseCaseError {
  constructor() {
        super(...arguments);
        this.code = `${Create.UC_CODE}jokeDaoCreateFailed`;
        this.message = "Create joke by joke DAO create failed.";
    }
  },

  JokeImageDaoCreateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokeImageDaoCreateFailed`;
      this.message = "Create of jokeImage by jokeImage Dao create failed.";
    }
  },
}

const Get = {
  UC_CODE: `${JOKE_ERROR_PREFIX}get/`,

  jokesDoesNotExist: class extends JokesMainUseCaseError {
    constructor() {
        super(...arguments);
        this.code = `${Get.UC_CODE}jokesDoesNotExist`;
        this.message = "jokes does not exist";
    }
  },

  jokesIsNotInCorrectState: class extends JokesMainUseCaseError {
    constructor() {
        super(...arguments);
        this.code = `${Get.UC_CODE}jokesIsNotInCorrectState`;
        this.message = "jokes is not in correct state.";
    }
  },

  invalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
        super(...arguments);
        this.code = `${Get.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
    }
  },

  
  jokeDoesNotExist: class extends JokesMainUseCaseError {
    constructor() {
        super(...arguments);
        this.code = `${Get.UC_CODE}jokeDoesNotExist`;
        this.message = "Joke does not exist.";
    }
  },

}

const GetImageData = {
  UC_CODE: `${JOKE_ERROR_PREFIX}getImageData/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetImageData.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeImageDoesNotExist: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetImageData.UC_CODE}jokeImageDoesNotExist`;
      this.message = "Object jokeImage does not exist.";
    }
  }
};

const List = {
  UC_CODE: `${JOKE_ERROR_PREFIX}list/`,

  invalidDtoIn: class extends JokesMainUseCaseError {
      constructor() {
          super(...arguments);
          this.code = `${List.UC_CODE}invalidDtoIn`;
          this.message = "DtoIn is not valid.";
      }
    },
  }

  const Update = {
    UC_CODE: `${JOKE_ERROR_PREFIX}update/`,

    invalidDtoIn: class extends JokesMainUseCaseError {
      constructor() {
          super(...arguments);
          this.code = `${Update.UC_CODE}invalidDtoIn`;
          this.message = "DtoIn is not valid.";
      }
    },
  
    jokeDaoUpdateFailed: class extends JokesMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Update.UC_CODE}jokeDaoUpdateFailed`;
            this.message = "joke Dao Update Failed.";
        }
      },

      jokeDoesNotExist: class extends JokesMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Update.UC_CODE}jokeDoesNotExist`;
            this.message = "Joke does not exist.";
        }
      },
    }

    const Delete = {
      UC_CODE: `${JOKE_ERROR_PREFIX}delete/`,
      InvalidDtoIn: class extends JokesMainUseCaseError {
        constructor() {
          super(...arguments);
          this.code = `${Delete.UC_CODE}invalidDtoIn`;
          this.message = "DtoIn is not valid.";
        }
      },

      
      jokeDoesNotExist: class extends JokesMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Delete.UC_CODE}jokeDoesNotExist`;
            this.message = "Joke does not exist.";
        }
      },
    }

      

module.exports = {
  Create,
  Get,
  GetImageData,
  List,
  Update,
  Delete
};
