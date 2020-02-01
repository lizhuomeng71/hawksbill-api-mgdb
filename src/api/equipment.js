import resource from 'resource-router-middleware';
import Equipment from '../models/equipment';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'equipment',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		Equipment.findOne({_id:id}).exec(callback);
	},


	/** GET / - List all entities */
	index({ query }, res) {
		Equipment.find(query, function (err, equipments) {
        res.json(equipments);
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		var equipment = new Equipment(body);
		equipment.save(function(err, equipment){
			res.json(equipment);
		});
	},

	/** GET /:id - Return a given entity */
	read({equipment}, res) {
		res.json(equipment);
	},

	/** PUT /:id - Update a given entity */
	update({ equipment, body }, res) {
		Object.assign(equipment, body);
		equipment.save();
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({equipment}, res) {
		equipment.remove((err, equipment) => {
			res.sendStatus(200);
		});
	}
});
