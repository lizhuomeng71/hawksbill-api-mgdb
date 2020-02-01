import resource from 'resource-router-middleware';
import Task from '../models/task';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'task',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		Task.findOne({_id:id}).populate('assigned_task').exec(callback);
	},


	/** GET / - List all entities */
	index({ query }, res) {
		Task.find(query, function (err, tasks) {
        res.json(tasks);
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		console.log(body)
		var task = new Task(body);
		task.save(function(err, task){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				res.status(201);
				res.json(task);
			}

		});
	},

	/** GET /:id - Return a given entity */
	read({task}, res) {
		res.json(task);
	},

	/** PUT /:id - Update a given entity */

	update({ task, body }, res) {
		Object.assign(task, body);
		task.save()
		res.sendStatus(204);
	},


	/** DELETE /:id - Delete a given entity */
	delete({task}, res) {
		task.remove((err, task) => {
			res.sendStatus(200);
		});
	}
}).get('/:id/sub_task', function(req,res) {
	Task.find({parent_task : req.params.id}, function (err, tasks) {
			res.json(tasks);
	})
}).put('/:id/start', function(req,res) {
	Task.findOne({_id:req.params.id}, function (err, task){
		Task.find({_id : {$in: task.proceeding_tasks}, status: {$ne: "DONE" }}, function (err, tasks) {
			if(err){
				res.status(400);
				res.json(err);
			}else if(tasks){
				res.status(400);
				res.json(tasks);
			}else{
				task.status = "DOING";
				task.save();
				res.json(task);
			}
		})
	})
}).put('/:id/force_start', function(req,res) {
		Task.findOne({_id:req.params.id}, function (err, task){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				task.status = "DOING";
				task.save();
				res.sendStatus(200);
			}
		})
}).put('/:id/done', function(req,res) {
	Task.findOne({_id:req.params.id}, function (err, task){
		Task.find({parent_task : task._id, status: {$ne: "DONE" }}, function (err, tasks) {
			if(err){
				res.status(400);
				res.json(err);
			}else if(tasks){
				res.status(400);
				res.json(tasks);
			}else{
				task.status = "DONE";
				task.save();
				res.json(task);
			}
		})
	})
}).put('/:id/force_done', function(req,res) {
		Task.findOne({_id:req.params.id}, function (err, task){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				task.status = "DONE";
				task.save();
				res.sendStatus(200);
			}
		})
})
