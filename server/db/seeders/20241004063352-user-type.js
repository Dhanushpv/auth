const user_model = require('../models/user_type')

'use strict';

module.exports = {
  up: (models, mongoose) => {
    
     
      return models.usertype.insertMany([
        {
          _id :"66ff8d3814f6bc1a2e416949",
          user_type :'Admin'
        },
        {
          _id :"66ff8dd014f6bc1a2e41694a",
          user_type :'employee'
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {

     
      return models.usertype.deleteMany({
      _id:{
        $in : [
          "66ff8d3814f6bc1a2e416949",
          "66ff8dd014f6bc1a2e41694a"
        ]
      }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    
  }
};
