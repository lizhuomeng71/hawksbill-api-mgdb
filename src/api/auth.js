import resource from 'resource-router-middleware';
import Auth from '../models/auth';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'auth',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		Auth.findOne({_id:id}).exec(callback);
	},


	/** GET / - List all entities */
	index({ query }, res) {
		Auth.find(query, function (err, auths) {
        res.json(auths);
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		console.log(body)
		var auth = new Auth(body);
		auth.save(function(err, auth){
			res.json(auth);
		});
	},

	/** GET /:id - Return a given entity */
	read({auth}, res) {
		res.json(auth);
	},

	/** PUT /:id - Update a given entity */
	update({ auth, body }, res) {
		console.log(auth)
		console.log(body)
		Object.assign(auth, body);
		console.log(auth)
		auth.save()
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({auth}, res) {
		auth.remove((err, auth) => {
			res.sendStatus(200);
		});
	}
});
