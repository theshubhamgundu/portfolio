const fs = require('fs');
const data = fs.readFileSync('dev_icons.txt', 'utf8');
let out = '';
data.trim().split('\n').forEach(line => {
  const [name, svg] = line.split('::');
  const CompName = name.charAt(0).toUpperCase() + name.slice(1).replace('dot', '.') + 'Logo';
  const safeName = CompName.replace('.', '');
  const modifiedSvg = svg.replace('<svg ', '<svg fill="currentColor" {...props} ');
  out += `\nexport const ${safeName} = (props: React.SVGProps<SVGSVGElement>) => (\n  ${modifiedSvg}\n);\n`;
});
fs.appendFileSync('apps/docs/components/logos.tsx', out);
