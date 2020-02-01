var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    date_of_birth: {type: Date},
    department: {type: Schema.Types.ObjectId, ref: 'Department'},
    role: {type: Schema.Types.ObjectId, ref: 'Role'}
  }
);

// Virtual for author's URL
UserSchema
.virtual('url')
.get(function () {
  return '/user/' + this._id;
});

//Export model
export default mongoose.model('User', UserSchema);;
