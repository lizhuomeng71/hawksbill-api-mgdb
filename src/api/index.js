import { version } from '../../package.json';
import { Router } from 'express';
import task from './task';
import user from './user';
import department from './department';
import role from './role';
import equipment from './equipment';
import material from './material';


export default ({ config, db }) => {
	let api = Router();

	// mount the task resource
	api.use('/task', task({ config, db }));
	api.use('/user', user({ config, db }));
	api.use('/department', department({ config, db }));
	api.use('/role', role({ config, db }));
	api.use('/equipment', role({ config, db }));
	api.use('/material', role({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
