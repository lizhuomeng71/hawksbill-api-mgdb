var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MaterialSchema = new Schema(
  {
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
  }
);

// Virtual for author's URL
MaterialSchema
.virtual('url')
.get(function () {
  return '/material/' + this._id;
});

//Export model
export default mongoose.model('Material', MaterialSchema);;
