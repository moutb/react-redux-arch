import { env } from '../../src/base/';

import * as development from './dev';
import * as production from './prod';

module.exports = (env === 'development') ? development : production;
