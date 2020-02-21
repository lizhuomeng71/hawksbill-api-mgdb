var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CheckSchema = new Schema(
  {
    name: {type: String, required: true},
    status: {type: String, enum: ['NEW', 'DOING', 'BLOCK', 'DONE'], default: 'NEW'},
    parent_task: {type: Schema.Types.ObjectId, ref: 'Check'},
    created_date:{type: Date},
    update_date:{type: Date},
  }
);

// Virtual for author's URL
CheckSchema
.virtual('url')
.get(function () {
  return '/check/' + this._id;
});

//Export model
export default mongoose.model('Check', CheckSchema);
