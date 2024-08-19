import { fileURLToPath } from 'node:url';
import path from 'node:path';
import inquirer from 'inquirer';
import { screenshot, extrator, extractElementsHtml } from './src/functions.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async function main () {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Insert URL:'
    },
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: ['extract-html', 'screenshot', 'extract-element']
    }
  ]);

  if (answer.action === 'screenshot') {
    screenshot(answer.url, __dirname);
  } else if (answer.action === 'extract-html') {
    extrator(answer.url, __dirname);
  } else if (answer.action === 'extract-element') {
    const questionElements = await inquirer.prompt([
      {
        type: 'input',
        name: 'extractElments',
        message: 'What element do you want to extract?'
      }
    ]);
    extractElementsHtml(answer.url, __dirname, questionElements.extractElments);
  }
}());
