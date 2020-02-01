var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoleSchema = new Schema(
  {
    name: {type: String, required: true},
    department: {type: Schema.Types.ObjectId, ref: 'Department', required: true}
  }
);

// Virtual for author's URL
RoleSchema
.virtual('url')
.get(function () {
  return '/user/' + this._id;
});

//Export model
export default mongoose.model('Role', RoleSchema);;
