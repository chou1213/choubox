const nunjucks = require('nunjucks');
const path = require('path');
nunjucks.configure(path.resolve(__dirname, '../src/demo'), { autoescape: true })
var res = nunjucks.render('./config.js', { dir: 'James', date: `${new Date().getFullYear()}` });
console.log(res);
// fs.writeFileSync(path.resolve(path.resolve(__dirname, '../src/demo/config.js'), './config.js'), res)