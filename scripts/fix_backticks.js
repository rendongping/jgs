const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'fill_gaps.js');
const outputPath = path.join(__dirname, 'fill_gaps_fixed.js');

const src = fs.readFileSync(inputPath, 'utf8');

const fields = ['answer', 'desc', 'oral', 'scoring', 'mistakes', 'follow', 'related', 'resources'];

let result = '';
let i = 0;
while (i < src.length) {
  let matchedField = null;
  for (const field of fields) {
    const prefix = `${field}:\\s*\``;
    const re = new RegExp(`^${prefix}`);
    const substr = src.substring(i);
    if (re.test(substr)) {
      matchedField = field;
      break;
    }
  }
  
  if (matchedField) {
    // Copy field prefix including opening backtick
    const prefixLen = matchedField.length + 3; // "answer: `"
    result += src.substring(i, i + prefixLen);
    i += prefixLen;
    
    // Now we're inside the template literal. Find the closing backtick.
    // The closing backtick is one that is followed by optional whitespace and then , or } or ]
    while (i < src.length) {
      const btIdx = src.indexOf('`', i);
      if (btIdx === -1) break;
      
      // Look at what follows the backtick
      const after = src.substring(btIdx + 1, btIdx + 20);
      const isClosing = /^\s*[},\]]/.test(after);
      
      if (isClosing) {
        // This is the closing backtick
        result += src.substring(i, btIdx + 1);
        i = btIdx + 1;
        break;
      } else {
        // This is an inner backtick, escape it
        result += src.substring(i, btIdx) + '\\`';
        i = btIdx + 1;
      }
    }
  } else {
    result += src[i];
    i++;
  }
}

fs.writeFileSync(outputPath, result);
console.log('Fixed file written to', outputPath);
