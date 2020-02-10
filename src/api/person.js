import resource from 'resource-router-middleware';
import Person from '../models/person';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'person',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		Person.findOne({_id:id}).exec(callback);
	},


	/** GET / - List all entities */
	index({ query }, res) {
		Person.find(query, function (err, persons) {
        res.json(persons);
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		var person = new Person(body);
		person.save(function(err, person){
			res.json(person);
		});
	},

	/** GET /:id - Return a given entity */
	read({person}, res) {
		res.json(person);
	},

	/** PUT /:id - Update a given entity */
	update({ person, body }, res) {
		console.log(person)
		console.log(body)
		Object.assign(person, body);
		console.log(person)
		person.save()
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({person}, res) {
		person.remove((err, person) => {
			res.sendStatus(200);
		});
	}
});
