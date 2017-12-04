import { env } from '../src/base/';

import * as development from './webpack.dev.config';
import * as production from './webpack.prod.config';

//console.log('***** ENVIRONMENT: ' + env + ' *********')

module.exports = (env === 'development') ? development : production;
