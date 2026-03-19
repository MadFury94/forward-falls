// ─────────────────────────────────────────────────────────────
// lib/cms/index.ts
// Single entry point for CMS access across the app.
// To swap backends, change the import below — nothing else changes.
// ─────────────────────────────────────────────────────────────

import { WordPressAdapter } from './wordpress';
import type { ICMSAdapter } from './adapter';

export type { ICMSAdapter, CMSPost, CMSCategory, CMSTeamMember, CMSMedia, CMSAccount, CMSPageContent, FetchPostsParams } from './adapter';

let _adapter: ICMSAdapter | null = null;

export function getCMSAdapter(): ICMSAdapter {
    if (!_adapter) _adapter = new WordPressAdapter();
    return _adapter;
}
