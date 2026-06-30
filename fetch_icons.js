const https = require('https');

const names = ['openai', 'microsoft', 'gmail', 'notion', 'airtable', 'n8n'];
let count = names.length;

names.forEach(name => {
  https.get(`https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${name}.svg`, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`${name}::${data}`);
      count--;
    });
  });
});
