import resource from 'resource-router-middleware';
import Review from '../models/review';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'review',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		Review.findOne({_id:id}).exec(callback);
	},


	/** GET / - List all entities */
	index({ query }, res) {
		Review.find(query).populate('assigned_user').exec(function (err, reviews) {
        res.json(reviews);
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		var review = new Review(body);
		review.save(function(err, review){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				res.status(201);
				res.json(review);
			}

		});
	},

	/** GET /:id - Return a given entity */
	read({review}, res) {
		res.json(review);
	},

	/** PUT /:id - Update a given entity */

	update({ review, body }, res) {
		Object.assign(review, body);
		review.save()
		res.sendStatus(204);
	},


	/** DELETE /:id - Delete a given entity */
	delete({review}, res) {
		review.remove((err, review) => {
			res.status(200);
			res.json(review);
		});
	}
}).get('/:id/sub_review', function(req,res) {
	Review.find({parent_review : req.params.id}, function (err, reviews) {
			res.json(reviews);
	})
}).put('/:id/start', function(req,res) {
	Review.findOne({_id:req.params.id}, function (err, review){
		Review.find({_id : {$in: review.proceeding_reviews}, status: {$ne: "DONE" }}, function (err, reviews) {
			if(err){
				res.status(400);
				res.json(err);
			}else if(reviews){
				res.status(400);
				res.json(reviews);
			}else{
				review.status = "DOING";
				review.save();
				res.json(review);
			}
		})
	})
}).put('/:id/force_start', function(req,res) {
		Review.findOne({_id:req.params.id}, function (err, review){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				review.status = "DOING";
				review.save();
				res.sendStatus(200);
			}
		})
}).put('/:id/done', function(req,res) {
	Review.findOne({_id:req.params.id}, function (err, review){
		Review.find({parent_review : review._id, status: {$ne: "DONE" }}, function (err, reviews) {
			if(err){
				res.status(400);
				res.json(err);
			}else if(reviews){
				res.status(400);
				res.json(reviews);
			}else{
				review.status = "DONE";
				review.save();
				res.json(review);
			}
		})
	})
}).put('/:id/force_done', function(req,res) {
		Review.findOne({_id:req.params.id}, function (err, review){
			if(err){
				res.status(400);
				res.json(err);
			}else{
				review.status = "DONE";
				review.save();
				res.sendStatus(200);
			}
		})
})
