const { promisify } = require('util');
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);
const copyFile = promisify(require('fs').copyFile);
const mkdir = promisify(require('fs').mkdir);
const readdir = promisify(require('fs').readdir);
const { watch } = require('fs');
const { exec } = require('child_process');

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
  const spritePromise = readFile('./sprite.svg', 'utf-8');

  info('📄  Reading README.md');
  info('💅  Reading style.css');
  info('✨  Reading sprite.svg');
  const [html, styles, sprite] = await Promise.all([
    htmlPromise,
    stylesPromise,
    spritePromise,
  ]);

  info('🏗  Building index.html');
  const cv = template({ html, sprite, styles });

  try {
    await readdir('./dist');
    info('📂  Found dist/ directory');
  } catch (_) {
    info('📂  Creating dist/ directory');
    await mkdir('dist'); // create dist/ if it didn't exist
  }

  await writeFile('./dist/index.html', cv, 'utf-8');
  done('🎉  CV built in dist/');
  // exec('open dist/index.html');
};

build();
// watch('./README.md', build);
// watch('./style.css', build);
