var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EquipmentSchema = new Schema(
  {
    name: {type: String, required: true},
  }
);

// Virtual for author's URL
EquipmentSchema
.virtual('url')
.get(function () {
  return '/equipment/' + this._id;
});

//Export model
export default mongoose.model('Equipment', EquipmentSchema);;
