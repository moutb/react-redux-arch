import fs from 'fs';
import path from 'path';
import console from '../../../src/base/console';

export default class fileHashPlugin {

  constructor(options) {
    this.options = options;
  }

  write(data) {
    try {
      fs.writeFileSync(path.resolve(this.options.path, this.options.fileName), data, 'utf8');
      console.success(`${this.options.filename} hash file generated correctly!`);
    }
    catch (ex) {
      console.error(ex);
    }
  }

  apply(compiler) {
    compiler.plugin('done', (stats) => {
      const assets = stats.toJson();
      this.write(JSON.stringify({
        hash: assets.hash,
        files: assets.assetsByChunkName
      }));
    });
  }
}
