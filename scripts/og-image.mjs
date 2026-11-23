// Gera static/og-image.png (1200x630) para Open Graph / Twitter. Rodar: bun scripts/og-image.mjs
import sharp from 'sharp';
const W = 1200, H = 630;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#f6f5f2"/>
  <text x="72" y="190" font-family="Outfit, Poppins, sans-serif" font-size="34" fill="#555">Hi, I'm Gustavo Lara</text>
  <text x="72" y="290" font-family="Outfit, Poppins, sans-serif" font-size="84" font-weight="300" fill="#111">Software Architect</text>
  <text x="72" y="385" font-family="Outfit, Poppins, sans-serif" font-size="84" font-weight="300" fill="#111">&amp; Tech Lead</text>
  <text x="72" y="470" font-family="Poppins, sans-serif" font-size="24" fill="#666">Legacy modernization · Distributed systems · AI</text>
  <text x="72" y="560" font-family="Poppins, sans-serif" font-size="26" fill="#111">gustavolara.pro</text>
</svg>`;
const avatar = await sharp('static/assets/img/avatar/perfil-transparente.png')
  .resize({ height: 560, width: 440, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();
await sharp(Buffer.from(svg))
  .composite([{ input: avatar, left: W - 440 - 40, top: H - 560 }])
  .png({ compressionLevel: 9 })
  .toFile('static/og-image.png');
console.log('static/og-image.png gerado');
