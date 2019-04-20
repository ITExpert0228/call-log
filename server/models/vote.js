var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var VoteSchema = new Schema({
    vOptio: {type: ObjectId, required: true, ref: 'Optio'},
    vMedia: {type: ObjectId, ref: 'Media'},
    vKey: {type: String, default: 'yes'},
    vValue: {type: Boolean, default: false},
    vUser: {type: ObjectId, ref: 'User', default: null},
    vUserIP: {type: String, default: null},
    vCreate: { type: Date, default: Date.now() }
});

VoteSchema.set("toJSON", {virtuals: true});
VoteSchema.set("toObject", {virtuals: true});
// Export the model
module.exports = mongoose.model('Vote', VoteSchema);