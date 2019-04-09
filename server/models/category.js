var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
    cName: { type: String, required: true, trim: true, default: '' },
    cParent:  {type: ObjectId, default: null },
    cImage:  {type: ObjectId, default: null },
    cIsTopic: { type: Boolean, default: false }
});


CategorySchema.set("toJSON", {virtuals: true});
CategorySchema.set("toObject", {virtuals: true});
// Export the model
module.exports = mongoose.model('Category', CategorySchema);