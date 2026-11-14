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
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">${background(light)}${content}</svg>`;
 await sharp(Buffer.from(svg)).webp({quality:90}).toFile(fileURLToPath(new URL(name+'.webp',out)));
}
await save('meutube-tv-phone',tv(player())+phone(remote()));
await save('meutube-guide',tv(guide())+phone(logo(25,71)+txt(25,134,'Playlists / Canais',23,'#fff',700)+['Clássicos','Anos 2000','Favoritos'].map((n,i)=>rect(23,163+i*132,272,115,'#131a26',14,'#2b394f')+txt(40,196+i*132,`00${i+1}  ${n}`,19,'#fff',600)+txt(40,226+i*132,i===1?'Scooby-Doo':'Tom & Jerry',16,'#94a3b8')+txt(40,254+i*132,'▶ Sintonizar canal',15,'#38bdf8')).join('')));
await save('meutube-parental',tv(parental())+phone(logo(25,71)+txt(25,143,'Configurações dos Pais',21,'#fff',700)+rect(23,173,272,155,'#131a26',14,'#2b394f')+txt(40,210,'Trava da TV',20,'#fff',600)+txt(40,246,'●   ●   ●   ●',25,'#38bdf8')+btn(40,268,236,'Destravar (PIN)')+txt(25,377,'Playlists / Canais',20,'#fff',600)+btn(24,400,270,'+ Novo Canal / Playlist')));

const green='#355d49', ink='#25332c', muted='#889087';
function homeScreen(pair=false) {
 let s=rect(0,0,1110,650,'#f8f9f6',0)+rect(0,0,225,650,'#f0f2eb',0)+rect(22,25,30,30,green,10)+play(33,30)+txt(61,48,'homestream.',23,ink,700)+txt(25,89,'● SUA CASA ESTÁ ONLINE',10,green,600);
 ['Início','Filmes e vídeos','Músicas','Fotos','Coleções'].forEach((n,i)=>s+=rect(15,132+i*48,195,40,i===0?'#e1e7db':'#f0f2eb',9)+txt(34,158+i*48,n,16,i===0?green:ink,i===0?600:400));
 s+=txt(28,442,'DO SEU JEITO',11,muted,600)+txt(30,479,'● Desenhos clássicos',14,green)+txt(30,514,'● Anos 2000',14,green)+txt(28,597,'Armazenamento local',13,muted)+rect(28,611,165,4,'#dfe3d7',2)+rect(28,611,57,4,green,2)+txt(254,43,'Minha casa  ›  Visão geral',13,muted)+txt(928,43,'● 100% local',13,green)+txt(260,101,'SEU PEQUENO UNIVERSO',11,muted,600)+txt(260,148,'Tudo o que é seu, aqui.',34,ink,600)+txt(260,180,'Um lugar para tudo o que vale guardar.',16,muted)+rect(879,108,201,42,green,10)+txt(895,135,'+ Adicionar arquivos',15,'#fff',600)+txt(260,242,'Continuar assistindo',21,ink,600);
 for(let i=0;i<3;i++) s+=image(i,260+i*277,263,253,143)+txt(260+i*277,434,i===1?'Scooby-Doo · Anos 2000':'Tom & Jerry · Clássicos',15,ink,600)+rect(260+i*277,402,253,4,'#d8ded2',0)+rect(260+i*277,402,90,4,green,0);
 s+=txt(260,501,'Suas coleções',21,ink,600)+rect(260,523,393,85,'#e6ebdf',12)+txt(280,561,'Desenhos clássicos',21,ink,600)+txt(280,586,'Vídeos · Biblioteca pessoal',13,muted)+rect(675,523,393,85,'#e9e5da',12)+txt(695,561,'Anos 2000',21,ink,600)+txt(695,586,'Vídeos · Biblioteca pessoal',13,muted);
 if(pair) s+=rect(0,0,1110,650,'#17251e99',0)+rect(334,97,510,455,'#fff',22)+txt(372,152,'Parear tela',28,ink,600)+txt(372,188,'Autorizar um novo dispositivo',16,muted)+txt(372,260,'Código de pareamento',14,ink)+rect(372,280,433,62,'#f3f5ee',10,'#dce1d4')+txt(402,322,'4  8  2  6  1  9',30,ink,600)+rect(372,371,433,51,green,10)+txt(521,404,'Autorizar',18,'#fff',600)+txt(372,471,'A tela usará as permissões do seu perfil.',14,muted);
 return s;
}
const monitor = content => `<g transform="translate(58 120)">`+rect(0,0,1138,682,'#252a28',20,'#7a8277')+`<g transform="translate(14 14)">${content}</g>`+rect(500,680,138,58,'#3e4540',4)+rect(405,728,328,13,'#252a28',6)+`</g>`;
const homePhone=phone(txt(24,91,'▶ homestream.',24,ink,700)+txt(25,143,'Minha biblioteca',23,ink,600)+txt(25,174,'● 100% local',13,green)+image(0,24,199,270,152)+txt(25,381,'Tom & Jerry',21,ink,600)+txt(25,409,'Desenhos clássicos',15,muted)+rect(24,438,270,48,green,12)+txt(103,469,'▶ Assistir',18,'#fff',600)+txt(25,536,'Suas coleções',20,ink,600)+txt(25,575,'Desenhos clássicos   ›',16,green),true);
await save('homestream-library',monitor(homeScreen())+homePhone,true);
await save('homestream-pairing',monitor(homeScreen(true))+phone(txt(24,91,'▶ homestream.',24,ink,700)+txt(25,166,'Parear esta tela',25,ink,600)+txt(25,206,'Código de pareamento',16,muted)+rect(24,240,270,90,'#e6ebdf',14)+txt(44,296,'482 619',43,green,600)+txt(25,375,'Aguardando autorização…',17,ink)+txt(25,413,'O código expira em 5 minutos.',14,muted)+rect(24,469,270,48,green,12)+txt(93,500,'Novo código',17,'#fff',600),true),true);
await writeFile(new URL('media-showcase-sources.json',out), JSON.stringify({type:'UI simulations based on local project source',videos:ids.map(id=>({url:`https://www.youtube.com/watch?v=${id}`,thumbnail:`https://i.ytimg.com/vi/${id}/hqdefault.jpg`,channel:'WB Kids'}))},null,2));
console.log('Created five device-framed UI showcase images.');
