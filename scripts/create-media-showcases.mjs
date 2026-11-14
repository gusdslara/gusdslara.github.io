import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// UI compositions based on the local Meutube and HomeStream implementations.
// No captions outside devices. The downloaded images remain inside UI screens.
const out = new URL('../static/assets/img/apps/', import.meta.url);
await mkdir(out, { recursive: true });
const ids = ['t0Q2otsqC4I', '_t8hJ9j-zXA', 'w3Wluvzoggg'];
const pics = await Promise.all(ids.map(async id => {
  const response = await fetch(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
  if (!response.ok) throw new Error(`Thumbnail ${id}: ${response.status}`);
  const data = await sharp(Buffer.from(await response.arrayBuffer())).resize(640, 360, { fit: 'cover' }).jpeg().toBuffer();
  return `data:image/jpeg;base64,${data.toString('base64')}`;
}));
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const rect = (x,y,w,h,fill,r=12,stroke='none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const txt = (x,y,s,size=18,color='#f1f5f9',weight=400) => `<text x="${x}" y="${y}" font-family="Segoe UI, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`;
const image = (i,x,y,w,h) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 640 360"><image href="${pics[i]}" width="640" height="360"/></svg>`;
const play = (x,y,c='#fff') => `<path d="M${x} ${y}l0 20 17-10z" fill="${c}"/>`;
const cast = (x,y,c='#38bdf8') => `<g transform="translate(${x} ${y})" fill="none" stroke="${c}" stroke-width="3"><path d="M2 10V2h30v22H20M2 16a8 8 0 018 8M2 22a2 2 0 012 2"/></g>`;
const btn = (x,y,w,label,fill='#0c4a6e',color='#7dd3fc') => rect(x,y,w,42,fill,10)+txt(x+16,y+27,label,16,color,600);
const logo = (x,y) => rect(x,y,34,26,'#f43f5e',7)+play(x+13,y+4)+txt(x+44,y+22,'Meutube',25,'#f1f5f9',700);
function phone(content, light=false) {
 return `<g transform="translate(1170 175)">`+rect(0,0,318,662,'#151922',44,'#596273')+rect(9,9,300,644,light?'#f8f9f6':'#0b0f17',36)+rect(107,18,104,22,'#151922',14)+txt(30,41,'9:41',13,light?'#25332c':'#fff',600)+txt(250,41,'▰',15,light?'#25332c':'#fff')+content+rect(112,642,94,4,light?'#25332c':'#e2e8f0',2)+`</g>`;
}
function tv(content) {
 return `<g transform="translate(80 130)">`+rect(0,0,1050,620,'#171b23',22,'#465264')+rect(12,12,1026,587,'#0b0f17',12)+`<g transform="translate(36 36)">${content}</g>`+`<circle cx="525" cy="610" r="3" fill="#38bdf8"/>`+`<path d="M210 620l-50 50h80l50-50M830 620l50 50h-80l-50-50" fill="#242a35"/></g>`;
}
function guide() {
 let s=logo(0,0)+txt(780,21,'● TV conectada',16,'#4ade80')+txt(0,79,'Playlists / Canais',26,'#f1f5f9',700);
 ['Clássicos','Anos 2000','Favoritos'].forEach((name,i)=>{
   const y=103+i*142;
   s+=rect(0,y,974,126,i===0?'#0c2639':'#131a26',16,i===0?'#38bdf8':'#2b394f')+image(i,14,y+13,174,98)+txt(211,y+35,`00${i+1}  ${name}`,22,'#f1f5f9',600)+txt(211,y+66,i===1?"O que há de novo, Scooby-Doo?":'Tom & Jerry',18,'#94a3b8')+btn(731,y+42,218,'▶  Sintonizar canal');
 }); return s;
}
function player() {
 return logo(0,0)+txt(757,22,'● TV conectada',16,'#4ade80')+image(0,0,49,974,414)+rect(0,421,974,95,'#0b0f17',0)+txt(22,453,'001  Clássicos',22,'#f1f5f9',700)+txt(22,482,'Tom & Jerry',18,'#94a3b8')+btn(582,447,172,'Canal −')+btn(768,447,172,'Canal +')+rect(22,502,920,4,'#2b394f',2)+rect(22,502,284,4,'#38bdf8',2);
}
function remote() {
 return logo(25,71)+rect(23,116,272,42,'#123526',10)+txt(38,143,'● Conectado à TV',16,'#86efac',600)+cast(243,125)+image(0,23,175,272,153)+txt(25,361,'Tom & Jerry',22,'#f1f5f9',700)+txt(25,388,'001 · Clássicos',16,'#94a3b8')+btn(24,416,270,'Ⅱ              ◀        ▶')+btn(24,472,128,'Canal −')+btn(165,472,130,'Canal +')+txt(26,554,'Programação',18,'#f1f5f9',600)+txt(26,585,'A seguir · Tom & Jerry',15,'#94a3b8');
}
function parental() {
 let s=logo(0,0)+txt(0,91,'Configurações dos Pais (TV)',30,'#f1f5f9',700)+rect(0,128,974,315,'#131a26',20,'#2b394f')+txt(28,175,'Senha e Trava da TV',24,'#f1f5f9',600)+txt(28,212,'PIN dos pais',18,'#94a3b8')+txt(28,268,'●   ●   ●   ●',30,'#38bdf8')+btn(28,313,205,'Alterar senha')+btn(253,313,225,'Ativar Trava na TV');
 return s;
}
const background = (light=false) => `<defs><radialGradient id="bg"><stop stop-color="${light?'#e3eadb':'#1d374d'}"/><stop offset="1" stop-color="${light?'#f4f2eb':'#0a121e'}"/></radialGradient></defs><rect width="1600" height="1000" fill="url(#bg)"/><ellipse cx="790" cy="847" rx="690" ry="30" fill="${light?'#b7bbae':'#000'}" opacity=".22"/>`;
async function save(name, content, light=false) {
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">${content}</svg>`;
 await sharp(Buffer.from(svg)).trim().png().toFile(fileURLToPath(new URL(name+'.png',out)));
}
await save('meutube-tv-phone',tv(player())+phone(remote()));
await save('meutube-guide',tv(guide())+phone(logo(25,71)+txt(25,134,'Playlists / Canais',23,'#fff',700)+['Clássicos','Anos 2000','Favoritos'].map((n,i)=>rect(23,163+i*132,272,115,'#131a26',14,'#2b394f')+txt(40,196+i*132,`00${i+1}  ${n}`,19,'#fff',600)+txt(40,226+i*132,i===1?'Scooby-Doo':'Tom & Jerry',16,'#94a3b8')+txt(40,254+i*132,'▶ Sintonizar canal',15,'#38bdf8')).join('')));
await save('meutube-parental',tv(parental())+phone(logo(25,71)+txt(25,143,'Configurações dos Pais',21,'#fff',700)+rect(23,173,272,155,'#131a26',14,'#2b394f')+txt(40,210,'Trava da TV',20,'#fff',600)+txt(40,246,'●   ●   ●   ●',25,'#38bdf8')+btn(40,268,236,'Destravar (PIN)')+txt(25,377,'Playlists / Canais',20,'#fff',600)+btn(24,400,270,'+ Novo Canal / Playlist')));


await save('meutube-desktop', tv(player()));
await save('meutube-mobile', phone(remote()));
