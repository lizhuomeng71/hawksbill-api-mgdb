import resource from 'resource-router-middleware';
import User from '../models/user';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'user',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		User.findOne({_id:id}).exec(callback);
	},


	/** GET / - List all entities */
	index({ query }, res) {
		User.find(query, function (err, users) {
        res.json(users);
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		console.log(body)
		var user = new User(body);
		user.save(function(err, user){
			res.json(user);
		});
	},

	/** GET /:id - Return a given entity */
	read({user}, res) {
		res.json(user);
	},

	/** PUT /:id - Update a given entity */
	update({ user, body }, res) {
		console.log(user)
		console.log(body)
		Object.assign(user, body);
		console.log(user)
		user.save()
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({user}, res) {
		user.remove((err, user) => {
			res.sendStatus(200);
		});
	}
});
