import resource from 'resource-router-middleware';
import Role from '../models/role';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'role',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		Role.findOne({_id:id}).exec(callback);
	},


	/** GET / - List all entities */
	index({ query }, res) {
		Role.find(query, function (err, roles) {
        res.json(roles);
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		var role = new Role(body);
		role.save(function(err, role){
			res.json(role);
		});
	},

	/** GET /:id - Return a given entity */
	read({role}, res) {
		res.json(role);
	},

	/** PUT /:id - Update a given entity */
	update({ role, body }, res) {
		Object.assign(role, body);
		role.save()
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({role}, res) {
		role.remove((err, role) => {
			res.sendStatus(200);
		});
	}
});
