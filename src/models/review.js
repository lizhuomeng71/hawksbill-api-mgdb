var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReviewSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String},
    status: {type: String, enum: ['NOT READY', 'READY', 'IN PROGRESS', 'DONE'], default: 'NOT READY'},
    assigned_user: {type: Schema.Types.ObjectId, ref: 'Person'},
    parent_task: {type: Schema.Types.ObjectId, ref: 'Task'},
    proceeding_reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    created_date:{type: Date},
    update_date:{type: Date},
    start_date:{type: Date},
    due_date:{type: Date},
    end_date:{type: Date}
  }
);

// Virtual for author's URL
ReviewSchema
.virtual('url')
.get(function () {
  return '/review/' + this._id;
});

//Export model
export default mongoose.model('Review', ReviewSchema);
