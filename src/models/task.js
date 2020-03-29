var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String},
    status: {type: String, enum: ['NEW', 'DOING', 'BLOCK', 'DONE'], default: 'NEW'},
    parent_task: {type: Schema.Types.ObjectId, ref: 'Task'},
    proceeding_tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    assigned_user: {type: Schema.Types.ObjectId, ref: 'User'},
    materials:[{type: Schema.Types.ObjectId, ref: 'material'}],
    equipments:[{type: Schema.Types.ObjectId, ref: 'Equipment'}],
    users:[{type: Schema.Types.ObjectId, ref: 'User'}],
    created_date:{type: Date},
    update_date:{type: Date},
    start_date:{type: Date},
    due_date:{type: Date},
    end_date:{type: Date}
  }
);

// Virtual for author's URL
TaskSchema
.virtual('url')
.get(function () {
  return '/task/' + this._id;
});

//Export model
export default mongoose.model('Task', TaskSchema);
