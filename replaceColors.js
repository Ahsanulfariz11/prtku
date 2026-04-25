const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The Ocean Breeze Palette Mapping
// #F5F5DC (Base background) -> #F0F9FF (Sky 50)
// #2F3E34 (Dark main text) -> #0F172A (Slate 900)
// #4F8A6E (Secondary text / Hover bg)
// #6BAF92 (Primary button / bold accent) -> #0EA5E9 (Sky 500)
// #A8D5BA (Light accent / blobs / subtle borders) -> #BAE6FD (Sky 200)

let newContent = content
  // Safely replace #F5F5DC with #F0F9FF globally (case-insensitive for hex)
  .replace(/#F5F5DC/gi, '#F0F9FF')
  // #2F3E34 -> #0F172A
  .replace(/#2F3E34/gi, '#0F172A')
  // #6BAF92 -> #0EA5E9
  .replace(/#6BAF92/gi, '#0EA5E9')
  // #A8D5BA -> #BAE6FD
  .replace(/#A8D5BA/gi, '#BAE6FD');

// For #4F8A6E, we have to distinguish between 'bg-' / 'hover:bg-' vs 'text-' / 'border-'
newContent = newContent.replace(/text-\[#4F8A6E\]/gi, 'text-[#334155]');
newContent = newContent.replace(/hover:bg-\[#4F8A6E\]/gi, 'hover:bg-[#0284C7]');
newContent = newContent.replace(/bg-\[#4F8A6E\]/gi, 'bg-[#0284C7]');
newContent = newContent.replace(/border-\[#4F8A6E\]/gi, 'border-[#0284C7]');
newContent = newContent.replace(/"#4F8A6E"/gi, '"#334155"'); // In case it's in JS code

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Colors replaced successfully!');
