import fs from 'fs';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="transparent" />
  <text x="10" y="76" font-family="Arial, sans-serif" font-weight="900" font-size="72" fill="#111827">L</text>
  <text x="52" y="76" font-family="Arial, sans-serif" font-weight="900" font-size="72" fill="#16a34a">B</text>
</svg>`;
const base64 = Buffer.from(svg).toString('base64');
let html = fs.readFileSync('index.html', 'utf8');

if (html.includes('<link rel="icon"')) {
    html = html.replace(/<link rel="icon"[^>]*>/g, `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${base64}" />`);
} else {
    html = html.replace('</title>', '</title>\n    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,' + base64 + '" />');
}

fs.writeFileSync('index.html', html);
console.log('Modified index.html correctly');
