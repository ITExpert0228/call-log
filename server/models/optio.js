var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var OptioSchema = new Schema({
    oUser: {type: ObjectId, required: true, default: null},
    oCImage:  {type: String, trim: true, default: ''},
    oLMedia: {type: ObjectId, default: null},
    oRMedia: {type: ObjectId, default: null},
    // oCategory: {type: ObjectId, default: null},
    oCreate: { type: Date, default: Date.now() }
});


OptioSchema.set("toJSON", {virtuals: true});
OptioSchema.set("toObject", {virtuals: true});
// Export the model
module.exports = mongoose.model('Optio', OptioSchema);