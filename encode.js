const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="transparent" />
  <text x="10" y="76" font-family="Arial, sans-serif" font-weight="900" font-size="72" fill="#111827">L</text>
  <text x="52" y="76" font-family="Arial, sans-serif" font-weight="900" font-size="72" fill="#16a34a">B</text>
</svg>`;
console.log(Buffer.from(svg).toString('base64'));
