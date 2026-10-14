import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('DRIFT Cover Art Resilience & Theme System Verification', async (t) => {
  // Test 1: All Curated Catalog Albums have artwork URLs
  await t.test('Catalog albums have non-empty artwork URLs', () => {
    const catalogPath = path.resolve('src/services/curatedCatalog.ts');
    const content = fs.readFileSync(catalogPath, 'utf8');
    const regex = /title:\s*'([^']+)'[\s\S]*?artist:\s*'([^']+)'[\s\S]*?coverArtUrl:\s*'([^']*)'/g;
    let match;
    let count = 0;
    const emptyUrls = [];

    while ((match = regex.exec(content)) !== null) {
      count++;
      if (!match[3] || match[3].trim() === '') {
        emptyUrls.push(`${match[2]} - ${match[1]}`);
      }
    }

    assert.ok(count >= 50, `Expected at least 50 curated albums, found ${count}`);
    assert.equal(emptyUrls.length, 0, `Albums with empty URLs: ${emptyUrls.join(', ')}`);
  });

  // Test 2: CSS dual theming defines both dark (:root) and light (.light) variables
  await t.test('CSS defines dual-theming tokens for dark and light modes', () => {
    const cssPath = path.resolve('src/index.css');
    const css = fs.readFileSync(cssPath, 'utf8');

    assert.ok(css.includes(':root'), 'CSS must define :root tokens');
    assert.ok(css.includes('.light'), 'CSS must define .light mode tokens');
    assert.ok(css.includes('--canvas-bg'), 'CSS must define --canvas-bg');
    assert.ok(css.includes('--panel-obsidian'), 'CSS must define --panel-obsidian');
    assert.ok(css.includes('--electric-blue'), 'CSS must define --electric-blue');
    assert.ok(css.includes('--purple-soft'), 'CSS must define --purple-soft');
  });

  // Test 3: Zero-Emoji Invariant across entire UI source tree
  await t.test('Strict Zero-Emoji Invariant across all source components', () => {
    const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;

    function walk(dir) {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(walk(file));
        else if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
      });
      return results;
    }

    const files = walk('src');
    const violations = [];

    files.forEach(f => {
      const text = fs.readFileSync(f, 'utf8');
      if (emojiRegex.test(text)) {
        violations.push(f);
      }
    });

    assert.equal(violations.length, 0, `Zero-emoji violations found in: ${violations.join(', ')}`);
  });

  // Test 4: GenerativeVinylCover component exists and exports component
  await t.test('GenerativeVinylCover component exists and is exported', () => {
    const compPath = path.resolve('src/components/crate/GenerativeVinylCover.tsx');
    assert.ok(fs.existsSync(compPath), 'GenerativeVinylCover.tsx must exist');
    const content = fs.readFileSync(compPath, 'utf8');
    assert.ok(content.includes('export const GenerativeVinylCover'), 'Must export GenerativeVinylCover component');
    assert.ok(content.includes('<svg'), 'Must render SVG element');
    assert.ok(content.includes('palette'), 'Must use harmonic genre palettes');
  });
});
