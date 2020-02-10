var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authSchema = new Schema(
  {
    name: {type: String},
  }
);

// Virtual for author's URL
authSchema
.virtual('url')
.get(function () {
  return '/auth/' + this._id;
});

//Export model
export default mongoose.model('auth', authSchema);
