const mongoose = require('mongoose');

const adminschema = new mongoose.Schema({
    admin : {
        type : String
    }
});

module.exports = mongoose.model("admin", adminschema);