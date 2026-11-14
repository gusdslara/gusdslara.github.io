import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
const dir = 'static/assets/img/apps/';
const desktop = await sharp(await readFile(dir + 'homestream-real-desktop.png')).png().toBuffer();
const mobile = await sharp(await readFile(dir + 'homestream-real-mobile.png')).png().toBuffer();
const d = await sharp(desktop).metadata();
const m = await sharp(mobile).metadata();
const embed = (data,x,y,w,h) => `<image href="data:image/png;base64,${data.toString('base64')}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
const desktopFrame = `<rect x="0" y="0" width="${d.width+24}" height="${d.height+28}" rx="18" fill="#202522"/>${embed(desktop,12,12,d.width,d.height)}<rect x="${d.width/2-50}" y="${d.height+28}" width="124" height="65" fill="#343c36"/><rect x="${d.width/2-150}" y="${d.height+85}" width="324" height="12" rx="6" fill="#202522"/>`;
const mobileFrame = `<rect width="${m.width+24}" height="${m.height+52}" rx="36" fill="#202522"/><defs><clipPath id="phone-screen"><rect x="12" y="26" width="${m.width}" height="${m.height}" rx="23"/></clipPath></defs><g clip-path="url(#phone-screen)">${embed(mobile,12,26,m.width,m.height)}</g><rect x="${m.width/2-30}" y="9" width="84" height="5" rx="3" fill="#748078"/>`;
async function save(name,content,w,h){await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${content}</svg>`)).png().toFile(dir+name+'.png');}
await save('homestream-desktop',desktopFrame,d.width+24,d.height+98);
await save('homestream-mobile',mobileFrame,m.width+24,m.height+52);
await save('homestream-library',`<g transform="translate(0 40)">${desktopFrame}</g><g transform="translate(${d.width-115} 0)">${mobileFrame}</g>`,d.width+m.width-90,Math.max(d.height+138,m.height+52));
console.log('Framed real HomeStream screenshots with transparent canvas.');

await writeFile(dir+'homestream-real-desktop.png',desktop);
await writeFile(dir+'homestream-real-mobile.png',mobile);
