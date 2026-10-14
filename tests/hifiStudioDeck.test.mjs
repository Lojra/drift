import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('DRIFT Hi-Fi Studio Deck & Redesign Verification', () => {
  const studioDeckPath = path.resolve(process.cwd(), 'src/components/studio/HiFiStudioDeck.tsx');
  const appPath = path.resolve(process.cwd(), 'src/App.tsx');
  const headerPath = path.resolve(process.cwd(), 'src/components/layout/Header.tsx');

  it('HiFiStudioDeck component exists and conforms to Zero-Emoji Invariant', () => {
    assert.strictEqual(fs.existsSync(studioDeckPath), true, 'HiFiStudioDeck.tsx must exist');
    const content = fs.readFileSync(studioDeckPath, 'utf8');

    // Strict regex checking for emoji code points
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/u;
    assert.strictEqual(emojiRegex.test(content), false, 'HiFiStudioDeck.tsx must contain zero emojis');
  });

  it('HiFiStudioDeck implements Direct-Drive Turntable mechanics and Tonearm', () => {
    const content = fs.readFileSync(studioDeckPath, 'utf8');
    assert.ok(content.includes('STUDIO DIRECT-DRIVE MK-IV'), 'Must declare Studio Direct-Drive title');
    assert.ok(content.includes('vinyl-grooves'), 'Must apply vinyl grooves texture');
    assert.ok(content.includes('tonearm') || content.includes('Tonearm'), 'Must implement tonearm assembly');
    assert.ok(content.includes('CUE RECORD') || content.includes('LIFT NEEDLE'), 'Must feature needle cue/lift controls');
  });

  it('HiFiStudioDeck integrates Analog Stereo VU Meters and CRT Oscilloscope', () => {
    const content = fs.readFileSync(studioDeckPath, 'utf8');
    assert.ok(content.includes('CH-L') && content.includes('CH-R'), 'Must include Left and Right VU meter channels');
    assert.ok(content.includes('canvasRef'), 'Must declare canvas ref for CRT oscilloscope');
    assert.ok(content.includes('requestAnimationFrame'), 'Must drive oscilloscope with requestAnimationFrame');
  });

  it('HiFiStudioDeck implements 3D Horizontal Crate Flipper Rack', () => {
    const content = fs.readFileSync(studioDeckPath, 'utf8');
    assert.ok(content.includes('CRATE RACK // FLIP RECORD SLEEVES'), 'Must include Crate Rack title');
    assert.ok(content.includes('ChevronLeft') && content.includes('ChevronRight'), 'Must provide navigation arrows');
    assert.ok(content.includes('onSelectAlbum'), 'Must handle album drop on turntable when sleeve is clicked');
  });

  it('App and Header support View Mode Toggle preserving original CrateGrid', () => {
    const appContent = fs.readFileSync(appPath, 'utf8');
    const headerContent = fs.readFileSync(headerPath, 'utf8');

    assert.ok(appContent.includes('HiFiStudioDeck'), 'App.tsx must import and render HiFiStudioDeck');
    assert.ok(appContent.includes('CrateGrid'), 'App.tsx must preserve original CrateGrid');
    assert.ok(appContent.includes('viewMode'), 'App.tsx must manage viewMode state');
    assert.ok(headerContent.includes('onToggleViewMode'), 'Header.tsx must provide onToggleViewMode prop');
  });
});
