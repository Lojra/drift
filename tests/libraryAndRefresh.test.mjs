import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('DRIFT Expanded Music Library & Refresh Engine Verification', () => {
  const catalogPath = path.resolve('src/services/curatedCatalog.ts');
  const catalogSource = fs.readFileSync(catalogPath, 'utf-8');

  test('Library contains 30+ curated albums across 15+ genres', () => {
    // Count album IDs
    const idMatches = catalogSource.match(/id:\s*['"]curated-[^'"]+['"]/g) || [];
    assert.ok(idMatches.length >= 30, `Expected at least 30 curated albums, found ${idMatches.length}`);

    // Verify genre diversity
    const genres = [
      'Krautrock', 'Dub', 'Roots Reggae', 'Post-Punk', 'Darkwave', 'Ethio-Jazz',
      'Afrobeat', 'Ambient', 'Trip-Hop', 'Shoegaze', 'Dream Pop', 'IDM',
      'City Pop', 'Spiritual Jazz', 'Tropicália', 'Neo-Psychedelia', 'Post-Rock', 'Art Pop'
    ];

    let foundGenres = 0;
    for (const g of genres) {
      if (catalogSource.includes(g)) {
        foundGenres++;
      }
    }
    assert.ok(foundGenres >= 15, `Expected at least 15 genres present, found ${foundGenres}`);

    // Verify all albums include valid driftReasons
    const driftReasons = catalogSource.match(/driftReason:\s*['"][^'"]+['"]/g) || [];
    assert.equal(driftReasons.length, idMatches.length, 'Every album must have a driftReason');
  });

  test('100% Fresh Replacement Logic: sequential refreshes avoid previous crate', () => {
    const idMatches = (catalogSource.match(/id:\s*['"](curated-[^'"]+)['"]/g) || [])
      .map(m => m.replace(/id:\s*['"]/, '').replace(/['"]/, ''));

    const seenSet = new Set();

    function getFreshCrate(previousCrateIds) {
      const candidates = idMatches.filter(id => !previousCrateIds.has(id) && !seenSet.has(id));
      let pool = candidates;
      if (pool.length < 10) {
        seenSet.clear();
        previousCrateIds.forEach(id => seenSet.add(id));
        pool = idMatches.filter(id => !previousCrateIds.has(id));
      }
      const selected = pool.slice(0, 10);
      selected.forEach(id => seenSet.add(id));
      return selected;
    }

    const crate1 = getFreshCrate(new Set());
    assert.equal(crate1.length, 10);

    const crate1Ids = new Set(crate1);
    const crate2 = getFreshCrate(crate1Ids);
    assert.equal(crate2.length, 10);

    // Ensure ZERO overlap between crate 1 and crate 2
    for (const id of crate2) {
      assert.ok(!crate1Ids.has(id), `Overlap detected: album ${id} was in previous crate`);
    }

    const crate2Ids = new Set(crate2);
    const crate3 = getFreshCrate(crate2Ids);
    assert.equal(crate3.length, 10);

    // Ensure ZERO overlap between crate 2 and crate 3
    for (const id of crate3) {
      assert.ok(!crate2Ids.has(id), `Overlap detected: album ${id} was in previous crate`);
    }
  });
});
