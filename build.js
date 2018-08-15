const { promisify } = require('util');
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);
const copyFile = promisify(require('fs').copyFile);
const mkdir = promisify(require('fs').mkdir);
const readdir = promisify(require('fs').readdir);

const template = require('./template.js');

const COLORS = {
  GREEN: '\x1b[32m',
  BLUE: '\x1b[34m',
};

const log = color => string => console.log(COLORS[color], string);
const info = log('BLUE');
const done = log('GREEN');

const build = async () => {
  const htmlPromise = readFile('./README.md', 'utf-8');
  const stylesPromise = readFile('./style.css', 'utf-8');

  info('📄  Reading README.md');
  info('💅  Reading style.css');
  const [html, styles] = await Promise.all([htmlPromise, stylesPromise]);

  info('🏗  Building index.html');
  const cv = template({ html, styles });

  try {
    await readdir('./dist');
    info('📂  Found dist/ directory');
  } catch (_) {
    info('📂  Creating dist/ directory');
    await mkdir('dist'); // create dist/ if it didn't exist
  }

  await copyFile('./sprite.svg', './dist/sprite.svg');
  info('✨  Copying sprite.svg');
  await writeFile('./dist/index.html', cv, 'utf-8');
  done('🎉  CV built in dist/');
};

build();
