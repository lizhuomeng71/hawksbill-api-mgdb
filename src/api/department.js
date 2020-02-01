import resource from 'resource-router-middleware';
import Department from '../models/department';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'department',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		Department.findOne({_id:id}).exec(callback);
	},


	/** GET / - List all entities */
	index({ query }, res) {
		Department.find(query, function (err, departments) {
        res.json(departments);
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		var department = new Department(body);
		department.save(function(err, department){
			res.json(department);
		});
	},

	/** GET /:id - Return a given entity */
	read({department}, res) {
		res.json(department);
	},

	/** PUT /:id - Update a given entity */
	update({ department, body }, res) {
		Object.assign(department, body);
		department.save();
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({department}, res) {
		department.remove((err, department) => {
			res.sendStatus(200);
		});
	}
});
