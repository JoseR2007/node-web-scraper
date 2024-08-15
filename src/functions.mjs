import path from 'node:path';
import { firefox } from 'playwright';
import { writeFile, readdir, mkdir } from 'node:fs';
import pc from 'picocolors';

const browser = await firefox.launch();
const page = await browser.newPage();

const processName = (name) => {
  if (!name.includes(' ')) return name.toLowerCase();
  const processedName = name.toLowerCase().replace(/ /g, '_');

  return processedName;
};

function createDir (root) {
  readdir(root, (err, files) => {
    const fullPath = path.join(root, 'saved');
    if (err) console.log(err);
    if (!files.includes('saved')) {
      mkdir(fullPath, (err) => {
        if (err) console.log(err);
      });
      console.log(`${pc.yellow('Warning:')} Save directory not found \n${pc.green('A new one has been created...')}\n`);
    }
  });
}

export async function extrator (url, root) {
  createDir(root);
  console.log('Extracting the HTML from a page can take a long time depending on its size...\n');
  await page.goto(url);
  const htmlPromise = page.content();
  const domian = processName(await page.title());
  const fullpath = path.join(root, 'saved', `${domian}.html`);

  const html = await htmlPromise;
  await writeFile(fullpath, html, (err) => {
    if (err) console.log(err);
  });
  await browser.close();
  console.log({ web: domian, webUrl: url, action: 'extract html', finish: true });
}

export async function screenshot (url, root) {
  createDir(root);
  await page.goto(url);

  const domain = processName(await page.title());
  const fullpath = path.join(root, 'saved', `${domain}.png`);
  await page.screenshot({ path: fullpath, fullPage: true });

  await browser.close();
  console.log({ web: domain, webUrl: url, action: 'take screeshot', finish: true });
}
