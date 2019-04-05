var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
    loginEmail: { type: String, required: true, trim: true, default: '' },
    // userName: { type: String,  trim: true, default: '' },
    firstName:  {type: String, trim: true, default: '' },
    lastName: { type: String, trim: true, default: '' },
    password: { type: String, select: false, default: '' },
    role: { type: String, trim: true, default: '' },
    gender: { type: Boolean, default: 0 },
    birthday: { type: Date, default: Date.now() },
    country: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    job: { type: String, trim: true, default: '' },
    subscribe: { type: Boolean, default: false },
    registeredAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() },
    activated: { type: Boolean, default: false },
    token: { type: ObjectId, default: function () {
        return new mongoose.Types.ObjectId()
    }},
    avatarUrl: { type: String, trim: true, default: '' },
    // profilePictureUrl: { type: String, trim: true, default: '' },
    previousPasswords: { type: Array, select: false, default: [] }
});


UserSchema.set("toJSON", {virtuals: true});
UserSchema.set("toObject", {virtuals: true});
// Export the model
module.exports = mongoose.model('User', UserSchema);