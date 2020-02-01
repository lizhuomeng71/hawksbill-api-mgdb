var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DepartmentSchema = new Schema(
  {
    name: {type: String, required: true},
  }
);

// Virtual for author's URL
DepartmentSchema
.virtual('url')
.get(function () {
  return '/user/' + this._id;
});

//Export model
export default mongoose.model('Department', DepartmentSchema);;
