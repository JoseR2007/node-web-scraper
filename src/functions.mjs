import path from 'node:path';
import { firefox } from 'playwright';
import { writeFile } from 'node:fs';
import pc from 'picocolors';

const browser = await firefox.launch();
const page = await browser.newPage();

const processName = (name) => {
  if (!name.includes(' ')) return name.toLowerCase();
  const processedName = name.toLowerCase().replace(/ /g, '_');

  return processedName;
};

export async function extrator (url, root) {
  console.log('Extracting the HTML from a page can take a long time depending on its size...');
  await page.goto(url);
  const htmlPromise = page.content();
  const domian = processName(await page.title());
  const fullpath = path.join(root, 'saved', `${domian}.html`);

  const html = await htmlPromise;
  await writeFile(fullpath, html, (err) => {
    if (err) console.log(err);
  });
  await browser.close();
  console.log('>', pc.green('finish'));
}

export async function screenshot (url, root) {
  await page.goto(url);

  const domain = processName(await page.title());
  const fullpath = path.join(root, 'saved', `${domain}.png`);
  await page.screenshot({ path: fullpath, fullPage: true });

  await browser.close();
  console.log('>', pc.green('Finish'));
}
