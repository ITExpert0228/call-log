var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var OptioSchema = new Schema({
    oUser: {type: ObjectId, required: true, default: null},
    oLMedia: {type: ObjectId, ref: 'Media'},
    oRMedia: {type: ObjectId, ref: 'Media'},
    // oCategory: {type: ObjectId, ref: 'Category'},
    oCreate: { type: Date, default: Date.now() },
    oChoice: { type: Array, default: []}
});


OptioSchema.set("toJSON", {virtuals: true});
OptioSchema.set("toObject", {virtuals: true});
// Export the model
module.exports = mongoose.model('Optio', OptioSchema);