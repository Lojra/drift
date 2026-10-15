import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('DRIFT Vinyl Shelf, Needle Drop & Dual Tables Verification', () => {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/u;

  const sidebarPath = path.resolve(process.cwd(), 'src/components/layout/Sidebar.tsx');
  const studioDeckPath = path.resolve(process.cwd(), 'src/components/studio/HiFiStudioDeck.tsx');
  const headerPath = path.resolve(process.cwd(), 'src/components/layout/Header.tsx');
  const inspectorPath = path.resolve(process.cwd(), 'src/components/inspector/InspectorDrawer.tsx');

  it('All components strictly conform to Zero-Emoji Invariant', () => {
    [sidebarPath, studioDeckPath, headerPath, inspectorPath].forEach((filePath) => {
      assert.strictEqual(fs.existsSync(filePath), true, `${filePath} must exist`);
      const content = fs.readFileSync(filePath, 'utf8');
      assert.strictEqual(emojiRegex.test(content), false, `${path.basename(filePath)} must contain zero emojis`);
    });
  });

  it('Sidebar implements physical 10-LP Vinyl Shelf with hover pop-out mechanics', () => {
    const content = fs.readFileSync(sidebarPath, 'utf8');
    assert.ok(content.includes('VINYL SHELF // 10-LP RACK'), 'Must implement 10-LP Vinyl Shelf section');
    assert.ok(content.includes('POPOUT ON HOVER'), 'Must note popout on hover mechanics');
    assert.ok(content.includes('group-hover/slot:opacity-100'), 'Must reveal popped sleeve on slot hover');
    assert.ok(content.includes('group-hover/slot:translate-x-4') || content.includes('group-hover/slot:translate-x-'), 'Must slide vinyl disc out on hover');
    assert.ok(content.includes('CLICK TO DROP ON TURNTABLE'), 'Must feature direct turntable cue trigger');
  });

  it('HiFiStudioDeck implements interactive clickable Needle Drop and Lift mechanics', () => {
    const content = fs.readFileSync(studioDeckPath, 'utf8');
    assert.ok(content.includes('CLICK NEEDLE TO DROP') && content.includes('CLICK NEEDLE TO LIFT'), 'Must display needle drop and lift prompts');
    assert.ok(content.includes('group/needle'), 'Must style needle assembly with interactive hover group');
    assert.ok(content.includes('handleTogglePlayback'), 'Needle click must trigger playback');
    assert.ok(content.includes('Diamond Stylus') || content.includes('Stylus Needle'), 'Must render physical diamond stylus cantilever');
  });

  it('Header implements Dual Shelf Table triggers (INFO TABLE and TEST TABLE)', () => {
    const content = fs.readFileSync(headerPath, 'utf8');
    assert.ok(content.includes('INFO TABLE'), 'Header must contain INFO TABLE shelf button');
    assert.ok(content.includes('TEST TABLE'), 'Header must contain TEST TABLE shelf button');
    assert.ok(content.includes('onToggleDrawerTable'), 'Header must support toggling shelf tables');
  });

  it('InspectorDrawer supports both Music Info Table and Music Test Table views', () => {
    const content = fs.readFileSync(inspectorPath, 'utf8');
    assert.ok(content.includes('MUSIC INFO TABLE'), 'Inspector must provide MUSIC INFO TABLE mode');
    assert.ok(content.includes('MUSIC TEST TABLE'), 'Inspector must provide MUSIC TEST TABLE mode');
    assert.ok(content.includes('onSwitchTable'), 'Inspector must allow switching between tables');
    assert.ok(content.includes('ACOUSTIC TELEMETRY GAUGES'), 'Test table must feature acoustic telemetry gauges');
    assert.ok(content.includes('DRIFT VECTOR SHIFT RULES'), 'Test table must explain drift recommendation rules');
  });
});
