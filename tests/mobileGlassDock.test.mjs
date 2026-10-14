import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('DRIFT iOS Liquid Glass Mobile Navigation & Dock Verification', () => {
  const mobileTabBarPath = path.resolve('src/components/navigation/MobileTabBar.tsx');
  const content = fs.readFileSync(mobileTabBarPath, 'utf8');

  it('MobileTabBar implements floating capsule layout with high backdrop blur', () => {
    assert.match(content, /rounded-full/, 'Must use rounded-full capsule geometry');
    assert.match(content, /backdrop-blur-2xl/, 'Must employ deep backdrop-blur-2xl glass physics');
    assert.match(content, /fixed bottom-4/, 'Must float 16px (bottom-4) above the viewport');
  });

  it('MobileTabBar includes specular highlight reflections', () => {
    assert.match(content, /bg-gradient-to-r/, 'Must have specular gradient light reflection');
    assert.match(content, /shadow-\[inset_0_1px_1px/, 'Must have inner specular rim light shadow');
  });

  it('MobileTabBar enforces WCAG touch targets >= 48px', () => {
    assert.match(content, /min-h-\[48px\]/, 'Touch targets must be at least 48px tall');
    assert.match(content, /aria-label="Mobile Navigation"/, 'Must have accessible navigation aria-label');
  });

  it('MobileTabBar provides glowing active tab capsule', () => {
    assert.match(content, /bg-electric-blue\/15/, 'Must highlight active Crate tab with electric blue');
    assert.match(content, /bg-purple-soft\/15/, 'Must highlight active Archive tab with soft purple');
  });
});
