import fs from 'fs';
import path from 'path';

const dir = 'src/content/articles';
const files = fs.readdirSync(dir);
const validSpoiler = ['NONE', 'MILD', 'MAJOR', 'FULL'];
const validStatus = ['CONFIRMED', 'REPORTED', 'RUMORED', 'UNVERIFIED', 'DEBUNKED', 'BREAKING', 'LEAK', 'COMMUNITY'];
const validCategories = [
  'NEWS', 'RUMOR', 'LEAK', 'REPORT', 'BREAKING', 'ANALYSIS', 'THEORY',
  'EXPLAINER', 'CASTING', 'PRODUCTION', 'SET PHOTO', 'SET_PHOTO', 'VIDEO', 'BOX_OFFICE', 'COMMUNITY'
];

let fixes = 0;
files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf-8');
  let changed = false;

  const spMatch = content.match(/spoilerLevel:\s*["']?([^"'\r\n]+)["']?/);
  if (spMatch && !validSpoiler.includes(spMatch[1].trim())) {
    console.log('Fixing spoilerLevel in', f, 'was:', spMatch[1]);
    const orig = spMatch[1].trim();
    const val = orig.toUpperCase() === 'MODERATE' ? 'MILD' : (validSpoiler.includes(orig.toUpperCase()) ? orig.toUpperCase() : 'MILD');
    content = content.replace(/spoilerLevel:\s*["']?[^"'\r\n]+["']?/, `spoilerLevel: "${val}"`);
    changed = true;
    fixes++;
  }

  const stMatch = content.match(/status:\s*["']?([^"'\r\n]+)["']?/);
  if (stMatch && !validStatus.includes(stMatch[1].trim())) {
    console.log('Invalid status in', f, 'was:', stMatch[1]);
  }

  const catMatch = content.match(/category:\s*["']?([^"'\r\n]+)["']?/);
  if (catMatch && !validCategories.includes(catMatch[1].trim())) {
    console.log('Invalid category in', f, 'was:', catMatch[1]);
  }

  if (changed) {
    fs.writeFileSync(p, content, 'utf-8');
  }
});
console.log(`Scan complete. Fixed ${fixes} items.`);
