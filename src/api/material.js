import resource from 'resource-router-middleware';
import Material from '../models/material';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'material',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		Material.findOne({_id:id}).populate('assigned_material').exec(callback);
	},


	/** GET / - List all entities */
	index({ query }, res) {
		Material.find(query, function (err, materials) {
        res.json(materials);
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		console.log(body)
		var material = new Material(body);
		material.save(function(err, material){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				res.status(201);
				res.json(material);
			}

		});
	},

	/** GET /:id - Return a given entity */
	read({material}, res) {
		res.json(material);
	},

	/** PUT /:id - Update a given entity */

	update({ material, body }, res) {
		Object.assign(material, body);
		material.save()
		res.sendStatus(204);
	},


	/** DELETE /:id - Delete a given entity */
	delete({material}, res) {
		material.remove((err, material) => {
			res.sendStatus(200);
		});
	}
}).get('/:id/sub_material', function(req,res) {
	Material.find({parent_material : req.params.id}, function (err, materials) {
			res.json(materials);
	})
}).put('/:id/start', function(req,res) {
	Material.findOne({_id:req.params.id}, function (err, material){
		Material.find({_id : {$in: material.proceeding_materials}, status: {$ne: "DONE" }}, function (err, materials) {
			if(err){
				res.status(400);
				res.json(err);
			}else if(materials){
				res.status(400);
				res.json(materials);
			}else{
				material.status = "DOING";
				material.save();
				res.json(material);
			}
		})
	})
}).put('/:id/force_start', function(req,res) {
		Material.findOne({_id:req.params.id}, function (err, material){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				material.status = "DOING";
				material.save();
				res.sendStatus(200);
			}
		})
}).put('/:id/done', function(req,res) {
	Material.findOne({_id:req.params.id}, function (err, material){
		Material.find({parent_material : material._id, status: {$ne: "DONE" }}, function (err, materials) {
			if(err){
				res.status(400);
				res.json(err);
			}else if(materials){
				res.status(400);
				res.json(materials);
			}else{
				material.status = "DONE";
				material.save();
				res.json(material);
			}
		})
	})
}).put('/:id/force_done', function(req,res) {
		Material.findOne({_id:req.params.id}, function (err, material){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				material.status = "DONE";
				material.save();
				res.sendStatus(200);
			}
		})
})
