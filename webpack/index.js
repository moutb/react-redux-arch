import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import base from '../src/base/';
import env from './env/';

const config = require('./index.babel');

const compiler = webpack(config);

new webpackDevServer(compiler, config.devServer)
  .listen(env.port, env.host, (err) => {
    if (err) {
      base.console.error(err);
    }
  });

let initialCompilation = true;

compiler.plugin('done', () => {
  if (initialCompilation) {
    setTimeout(() => {
      base.console.info('✓ The bundle is now ready for serving!\n');
      base.console.info(' Open in iframe mode:\t\x1b[33mhttp://' + env.host + ':' + env.port + '/webpack-dev-server/\x1b[0m');
      base.console.info(' Open in inline mode:\t\x1b[33mhttp://' + env.host + ':' + env.port + '/\x1b[0m\n');
      base.console.info(' \x1b[33mHMR is active\x1b[0m. The bundle will automatically rebuild and live-update on changes.')
    }, 350);
  }
  initialCompilation = false;
})
