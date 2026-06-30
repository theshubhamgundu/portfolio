const https = require('https');
const fs = require('fs');

const names = ['git', 'github', 'react', 'nextdotjs', 'typescript', 'nodedotjs', 'tailwindcss', 'python'];
let count = names.length;
let results = [];

names.forEach(name => {
  https.get(`https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${name}.svg`, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      results.push(`${name}::${data}`);
      count--;
      if (count === 0) {
        fs.writeFileSync('dev_icons.txt', results.join('\n'));
        console.log('done');
      }
    });
  });
});
