import fs from 'fs';
let html = fs.readFileSync('index.html', 'utf8');
const svgBase64 = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="transparent" /><text x="10" y="76" font-family="Arial, sans-serif" font-weight="900" font-size="72" fill="#111827">L</text><text x="52" y="76" font-family="Arial, sans-serif" font-weight="900" font-size="72" fill="#16a34a">B</text></svg>`).toString('base64');

html = html.replace(/<link\s+rel="icon"[^>]+>/g, '');
html = html.replace('</title>', '</title>\n  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,' + svgBase64 + '" />');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html');
