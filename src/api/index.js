import { version } from '../../package.json';
import { Router } from 'express';
import task from './task';
import review from './review';
import person from './person';
import department from './department';
import role from './role';
import equipment from './equipment';
import material from './material';
import auth from './auth';


export default ({ config, db }) => {
	let api = Router();

	// mount the task resource
	api.use('/tasks', task({ config, db }));
	api.use('/reviews', review({ config, db }));
	api.use('/persons', person({ config, db }));
	api.use('/departments', department({ config, db }));
	api.use('/role', role({ config, db }));
	api.use('/equipment', equipment({ config, db }));
	api.use('/material', material({ config, db }));
	api.use('/auth', auth({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
