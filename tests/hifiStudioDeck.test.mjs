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

  it('HiFiStudioDeck implements Braun PS-500 Direct-Drive Transcription Turntable & Interactive Stylus Needle Drop', () => {
    const content = fs.readFileSync(studioDeckPath, 'utf8');
    assert.ok(content.includes('BRAUN // DRIFT PS-500') || content.includes('PS-500 HI-FI TRANSCRIPTION PLATTER'), 'Must declare Braun PS-500 transcription platter');
    assert.ok(content.includes('strobe-ring'), 'Must apply strobe-ring pattern');
    assert.ok(content.includes('vinyl-surface'), 'Must apply vinyl surface micro-grooves');
    assert.ok(content.includes('Diamond Stylus') || content.includes('Stylus Needle'), 'Must implement tonearm assembly with diamond stylus');
    assert.ok(content.includes('CLICK NEEDLE TO DROP') && content.includes('CLICK NEEDLE TO LIFT'), 'Must feature interactive needle drop and lift prompts');
    assert.ok(content.includes('MOTOR RUN') && content.includes('MOTOR STOP'), 'Must feature motor run and stop control');
  });

  it('HiFiStudioDeck implements Two-Pane Split Console with 10-LP vertical crate rack and purged bottom carousel', () => {
    const content = fs.readFileSync(studioDeckPath, 'utf8');
    assert.ok(content.includes('Physical Archive Crate'), 'Must declare Physical Archive Crate left pane');
    assert.ok(content.includes('ON DECK'), 'Must indicate on-deck record mounted on platter');
    assert.ok(content.includes('onSelectAlbum'), 'Must mount selected album from vertical crate');
    // Ensure simulated oscilloscope canvas and bottom carousel are purged
    assert.strictEqual(content.includes('CRATE RACK // FLIP RECORD SLEEVES'), false, 'Horizontal bottom carousel must be purged');
    assert.strictEqual(content.includes('canvasRef'), false, 'Simulated oscilloscope canvas must be purged');
  });

  it('HiFiStudioDeck implements Dual Dynamic Tables (Music Info Table & Music Test Table)', () => {
    const content = fs.readFileSync(studioDeckPath, 'utf8');
    assert.ok(content.includes('Music Info Table'), 'Must feature Music Info Table switcher');
    assert.ok(content.includes('Music Test Table'), 'Must feature Music Test Table switcher');
    assert.ok(content.includes('Gatefold Technical Specifications'), 'Must include Gatefold specs in Info Table');
    assert.ok(content.includes('24-BIT/96kHz PCM'), 'Must include master bitrate in Info Table');
    assert.ok(content.includes('180G VIRGIN VINYL'), 'Must include pressing in Info Table');
    assert.ok(content.includes('Stepped Rating Attenuator'), 'Must include Stepped Rating Attenuator in Test Table');
    assert.ok(content.includes('Sonic Reaction Stamps'), 'Must include Sonic Reaction Stamps in Test Table');

    // Verify 4 explicit reaction stamps from specification
    assert.ok(content.includes('Loved rhythm'), 'Must declare Loved rhythm stamp');
    assert.ok(content.includes('Loved atmosphere'), 'Must declare Loved atmosphere stamp');
    assert.ok(content.includes('Too repetitive'), 'Must declare Too repetitive stamp');
    assert.ok(content.includes('Not my vibe'), 'Must declare Not my vibe stamp');

    // Verify Lateral Drift Vector Explanation rules card
    assert.ok(content.includes('Lateral Drift Vector Shift Engine'), 'Must declare Lateral Drift Vector Engine header');
    assert.ok(content.includes('LATERAL SUBGENRE PIVOT'), 'Must explain rating >= 7.0 lateral pivot');
    assert.ok(content.includes('VECTOR DIVERGENCE DAMPING'), 'Must explain rating < 5.0 divergence damping');
  });

  it('HiFiStudioDeck enforces calibrated tonearm needle tracking and progress scaling', () => {
    const content = fs.readFileSync(studioDeckPath, 'utf8');
    // Ensure needle progress is correctly scaled (not multiplying 0-100 by 100)
    assert.ok(content.includes('Math.round(progress)}%'), 'Needle prompt must format progress as 0-100%');
    assert.ok(content.includes('progress / 100'), 'Tonearm rotation must scale progress fractionally');
    assert.strictEqual(content.includes('progress * 10}deg'), false, 'Tonearm rotation must not multiply raw percentage by 10');
    assert.strictEqual(content.includes('progress * 100}deg'), false, 'Tonearm rotation must not multiply raw percentage by 100');
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
