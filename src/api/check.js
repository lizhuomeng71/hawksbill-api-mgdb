import resource from 'resource-router-middleware';
import Check from '../models/check';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'check',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		Check.findOne({_id:id}).exec(callback);
	},


	/** GET / - List all entities */
	index({ query }, res) {
		Check.find(query).populate('assigned_user').exec(function (err, checks) {
        res.json(checks);
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		var check = new Check(body);
		check.save(function(err, check){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				res.status(201);
				res.json(check);
			}

		});
	},

	/** GET /:id - Return a given entity */
	read({check}, res) {
		res.json(check);
	},

	/** PUT /:id - Update a given entity */

	update({ check, body }, res) {
		Object.assign(check, body);
		check.save()
		res.sendStatus(204);
	},


	/** DELETE /:id - Delete a given entity */
	delete({check}, res) {
		check.remove((err, check) => {
			res.status(200);
			res.json(check);
		});
	}
}).get('/:id/sub_check', function(req,res) {
	Check.find({parent_check : req.params.id}, function (err, checks) {
			res.json(checks);
	})
}).put('/:id/start', function(req,res) {
	Check.findOne({_id:req.params.id}, function (err, check){
		Check.find({_id : {$in: check.proceeding_checks}, status: {$ne: "DONE" }}, function (err, checks) {
			if(err){
				res.status(400);
				res.json(err);
			}else if(checks){
				res.status(400);
				res.json(checks);
			}else{
				check.status = "DOING";
				check.save();
				res.json(check);
			}
		})
	})
}).put('/:id/force_start', function(req,res) {
		Check.findOne({_id:req.params.id}, function (err, check){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				check.status = "DOING";
				check.save();
				res.sendStatus(200);
			}
		})
}).put('/:id/done', function(req,res) {
	Check.findOne({_id:req.params.id}, function (err, check){
		Check.find({parent_check : check._id, status: {$ne: "DONE" }}, function (err, checks) {
			if(err){
				res.status(400);
				res.json(err);
			}else if(checks){
				res.status(400);
				res.json(checks);
			}else{
				check.status = "DONE";
				check.save();
				res.json(check);
			}
		})
	})
}).put('/:id/force_done', function(req,res) {
		Check.findOne({_id:req.params.id}, function (err, check){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				check.status = "DONE";
				check.save();
				res.sendStatus(200);
			}
		})
})
