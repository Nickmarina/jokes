const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class JokeMongo extends UuObjectDao {
    async createSchema() {}
  
    async create(uuObject) {
      return await super.insertOne(uuObject);
    }
  
    async get(awid, id) {
      let filter = {
        awid: awid,
        id: id,
      };
      return await super.findOne(filter);
    }

    async update(uuObject) {
      let filter = {
        awid: uuObject.awid,
        id: uuObject.id,
      };
      return await super.findOneAndUpdate(filter, uuObject, "NONE");
    }

    async list (awid){
      return await super.find({awid});
  }
  }
  
  module.exports = JokeMongo;