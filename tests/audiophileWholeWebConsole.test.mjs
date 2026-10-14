import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('DRIFT Audiophile Whole-Web Hi-Fi Console Verification', () => {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/u;

  it('Sidebar implements audiophile rack rails, illuminated switches, and tube pre-amp stage', () => {
    const sidebarPath = path.resolve('src/components/layout/Sidebar.tsx');
    assert.ok(fs.existsSync(sidebarPath), 'Sidebar.tsx must exist');
    const content = fs.readFileSync(sidebarPath, 'utf8');

    assert.equal(emojiRegex.test(content), false, 'Sidebar.tsx must contain zero emojis');
    assert.ok(content.includes('CONSOLE BUS SELECTOR'), 'Must declare console bus selector');
    assert.ok(content.includes('TURNTABLE CRATE'), 'Must label turntable crate bus');
    assert.ok(content.includes('WAX ARCHIVE'), 'Must label wax archive bus');
    assert.ok(content.includes('RADAR EQ'), 'Must label radar EQ bus');
    assert.ok(content.includes('TUBE STAGE 12AX7'), 'Must implement vacuum tube pre-amp module');
    assert.ok(content.includes('audiophile-chassis'), 'Must apply audiophile chassis styling');
  });

  it('RatedArchive implements 12-inch physical vinyl vault with slipping disc peek and master seals', () => {
    const archivePath = path.resolve('src/components/archive/RatedArchive.tsx');
    assert.ok(fs.existsSync(archivePath), 'RatedArchive.tsx must exist');
    const content = fs.readFileSync(archivePath, 'utf8');

    assert.equal(emojiRegex.test(content), false, 'RatedArchive.tsx must contain zero emojis');
    assert.ok(content.includes('AUDIOPHILE VINYL VAULT'), 'Must declare audiophile vinyl vault header');
    assert.ok(content.includes('MASTER PRESSING'), 'Must feature Master Pressing certification seal');
    assert.ok(content.includes('AUDIOPHILE CUT'), 'Must feature Audiophile Cut certification seal');
    assert.ok(content.includes('vinyl-grooves'), 'Must render physical grooved vinyl disc slipping from sleeve');
    assert.ok(content.includes('vinyl-sleeve-gloss'), 'Must render Mylar poly-sleeve glare');
  });

  it('TasteVectorView implements CRT Polar Acoustic Radar and 6-Band Parametric Fader Rack', () => {
    const tastePath = path.resolve('src/components/taste/TasteVectorView.tsx');
    assert.ok(fs.existsSync(tastePath), 'TasteVectorView.tsx must exist');
    const content = fs.readFileSync(tastePath, 'utf8');

    assert.equal(emojiRegex.test(content), false, 'TasteVectorView.tsx must contain zero emojis');
    assert.ok(content.includes('POLAR ACOUSTIC RADAR'), 'Must declare polar acoustic radar scope');
    assert.ok(content.includes('PARAMETRIC EQ FADER RACK'), 'Must implement parametric EQ fader rack');
    assert.ok(content.includes('canvasRef'), 'Must drive CRT radar with canvas');
    assert.ok(content.includes('fader-cap-knurled'), 'Must style fader caps with knurled metallic finish');
    assert.ok(content.includes('MAGNETIC TAPE BIAS ANCHORS'), 'Must display magnetic bias anchors');
  });

  it('InspectorDrawer implements 12-inch gatefold sleeve easel with matrix codes and stepped attenuator', () => {
    const inspectorPath = path.resolve('src/components/inspector/InspectorDrawer.tsx');
    const ratingWidgetPath = path.resolve('src/components/inspector/RatingWidget.tsx');
    assert.ok(fs.existsSync(inspectorPath), 'InspectorDrawer.tsx must exist');
    assert.ok(fs.existsSync(ratingWidgetPath), 'RatingWidget.tsx must exist');

    const inspectorContent = fs.readFileSync(inspectorPath, 'utf8');
    const ratingContent = fs.readFileSync(ratingWidgetPath, 'utf8');

    assert.equal(emojiRegex.test(inspectorContent), false, 'InspectorDrawer.tsx must contain zero emojis');
    assert.equal(emojiRegex.test(ratingContent), false, 'RatingWidget.tsx must contain zero emojis');

    assert.ok(inspectorContent.includes('GATEFOLD INSPECTOR'), 'Must declare Gatefold Inspector header');
    assert.ok(inspectorContent.includes('180g VIRGIN WAX'), 'Must declare 180g virgin wax badge');
    assert.ok(inspectorContent.includes('vinyl-grooves'), 'Must render spinning vinyl disc slipping out of jacket');
    assert.ok(inspectorContent.includes('HALF-SPEED'), 'Must include half-speed mastering specification');
    assert.ok(ratingContent.includes('PHONO EVALUATION ATTENUATOR'), 'Must implement phono evaluation attenuator');
  });

  it('Header and AlbumCard deliver studio master clock and gatefold vinyl jackets', () => {
    const headerPath = path.resolve('src/components/layout/Header.tsx');
    const cardPath = path.resolve('src/components/crate/AlbumCard.tsx');

    const headerContent = fs.readFileSync(headerPath, 'utf8');
    const cardContent = fs.readFileSync(cardPath, 'utf8');

    assert.equal(emojiRegex.test(headerContent), false, 'Header.tsx must contain zero emojis');
    assert.equal(emojiRegex.test(cardContent), false, 'AlbumCard.tsx must contain zero emojis');

    assert.ok(headerContent.includes('MASTER CLOCK // 192kHz'), 'Must include master word clock badge');
    assert.ok(cardContent.includes('vinyl-grooves'), 'Album card must include vinyl grooves on hover');
    assert.ok(cardContent.includes('vinyl-sleeve-gloss'), 'Album card must include Mylar outer sleeve sheen');
  });
});
