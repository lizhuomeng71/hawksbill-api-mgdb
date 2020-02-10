var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PersonSchema = new Schema(
  {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    date_of_birth: {type: Date},
    department: {type: Schema.Types.ObjectId, ref: 'Department'},
    role: {type: Schema.Types.ObjectId, ref: 'Role'}
  }
);

// Virtual for author's URL
PersonSchema
.virtual('url')
.get(function () {
  return '/person/' + this._id;
});

//Export model
export default mongoose.model('Person', PersonSchema);
