const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The Ocean Breeze Palette Mapping
let newContent = content
  .replace(/#F5F5DC/gi, '#F0F9FF')
  .replace(/#2F3E34/gi, '#0F172A')
  .replace(/#6BAF92/gi, '#0EA5E9')
  .replace(/#A8D5BA/gi, '#BAE6FD');

newContent = newContent.replace(/text-\[#4F8A6E\]/gi, 'text-[#334155]');
newContent = newContent.replace(/hover:bg-\[#4F8A6E\]/gi, 'hover:bg-[#0284C7]');
newContent = newContent.replace(/bg-\[#4F8A6E\]/gi, 'bg-[#0284C7]');
newContent = newContent.replace(/border-\[#4F8A6E\]/gi, 'border-[#0284C7]');
newContent = newContent.replace(/"#4F8A6E"/gi, '"#334155"'); 

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Colors replaced successfully!');
