var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MediaSchema = new Schema({
    mName: { type: String, required: true, trim: true, default: ''},
    mUser: {type: ObjectId, required: true, default: null},
    mImage:  {type: String, trim: true, default: ''},
    mCategory: {type: ObjectId, ref: 'Category'},
    mCreate: { type: Date, default: Date.now() }
});


MediaSchema.set("toJSON", {virtuals: true});
MediaSchema.set("toObject", {virtuals: true});
// Export the model
module.exports = mongoose.model('Media', MediaSchema);