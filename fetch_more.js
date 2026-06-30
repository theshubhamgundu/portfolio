const https = require('https');
const fs = require('fs');

const names = ['docker', 'vercel', 'prisma', 'figma', 'supabase', 'amazonaws'];
let count = names.length;
let out = '';

names.forEach(name => {
  https.get(`https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${name}.svg`, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const CompName = name.charAt(0).toUpperCase() + name.slice(1).replace('dot', '.') + 'Logo';
      const safeName = CompName.replace('.', '');
      const modifiedSvg = data.replace('<svg ', '<svg fill="currentColor" {...props} ');
      out += `\nexport const ${safeName} = (props: React.SVGProps<SVGSVGElement>) => (\n  ${modifiedSvg}\n);\n`;
      
      count--;
      if (count === 0) {
        fs.appendFileSync('apps/docs/components/logos.tsx', out);
        console.log('done');
      }
    });
  });
});
