var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AssignmentSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String},
  }
);

// Virtual for author's URL
AssignmentSchema
.virtual('url')
.get(function () {
  return '/assignment/' + this._id;
});

//Export model
export default mongoose.model('Assignment', AssignmentSchema);;
