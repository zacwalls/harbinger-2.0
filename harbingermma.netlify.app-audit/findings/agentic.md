# Agent readiness (AI Search Readiness) - staging https://harbingermma.netlify.app/
Checked 2026-10-12. Vendor-matrix facts dated 2026-09-23.

**Category score: 88/100** (judgement; not the Lighthouse fraction and not the Agent-UX score).

## Measurements
- Lighthouse Agentic Browsing: **unavailable**. PSI returned HTTP 429 (daily quota) for mobile and desktop. No X/N reported. Re-run with a Google API key.
- Agent-UX heuristic (separate from Lighthouse), status complete: / 100, /schedule/ 100, /pricing/ 100. Unnamed interactive nodes 0 on all three. Heuristic only, not proof of agent task success.
- Server rendering: pass (450 words without JS on home).

## Access policy (robots.txt: `User-agent: *` / `Allow: /`, no named groups, no Content-Signal)
- Training crawlers (GPTBot, ClaudeBot, Google-Extended, etc.): allowed by default (fall through to *).
- Search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot): allowed.
- User-triggered agents: ChatGPT-User may not apply robots; Claude-User honours; Perplexity-User and Google-Agent generally ignore robots.txt. Nothing blocked.
- Sitemap line points to apex harbingermma.com (intentional for staging).

## What works
- Static HTML, content readable without JS; real 404s; native buttons/anchors (schedule: 7 buttons, 28 links); landmarks present; 0 div-onclick widgets.
- Single form is a real `<form method=POST name=trial-signup>` with labelled inputs (inputs_without_label 0).

## Findings
### Medium - Schedule: 6 of 8 images lack alt (P1)
- Evidence: /schedule/ `<img>` tags for checkmark-2, striking, grappling, dumbell, mma, yoga icons have no alt (filter button icons). Source: src/components/WeeklySchedule.tsx line ~74 (`<img className=... src={filterOption.icon.src}` with no alt). The accessibility tree still showed 0 unnamed interactive nodes, so the buttons have text names; the icons are decorative duplicates.
- Fix: add `alt=""` (decorative, since the button text names the filter) in WeeklySchedule.tsx.
- Failure check: crawl shows 0 images missing alt on /schedule/.

### Low - Pricing/home: 5 inputs without aria attributes (P2)
- Evidence: inputs_without_aria 5 on / and /pricing/ (labels exist). Source: the trial-signup form component. Fix: add aria-describedby/required/autocomplete where relevant. Failure check: agent_ux_check inputs_without_aria 0.

### Info - No named AI groups / Content-Signal (P0 info, P1 info)
- Current policy is allow-all. If the gym wants search and answers but no training, add groups in src/pages/robots.txt.ts and optionally `Content-Signal: search=yes, ai-input=yes, ai-train=no`. Content-Signal is a Cloudflare CC0 policy plus an expired IETF draft (expired 2026-04-04); a preference, not enforcement; Google does not act on it (checked 2026-09-23).

### Opportunities (not defects)
- llms.txt: 404. Lighthouse drops the audit from the fraction when absent; a valid file would add a counted pass. Community spec; Google Search ignores it. Low value for a local gym; if added, H1, ">" summary, Markdown links to /classes/, /schedule/, /pricing/, /coaches/ via a src/pages/llms.txt.ts endpoint.
- Markdown delivery: none (Accept: text/markdown returns HTML; /index.md 404). No consumer agent confirmed to request it.
- WebMCP: no registerTool calls; the one form (trial-signup) is unannotated. W3C Community Group draft, not a standard; Chrome origin trial M149-M156; WebKit opposes (checked 2026-09-23). Optional: a read-only tool for schedule/pricing; only annotate the lead form if safe for agents to submit.
- ai-catalog.json (ARD draft), API catalog, OAuth, A2A, UCP, Web Bot Auth: all 404 / not applicable; nothing to publish since the site operates no such services. Web Bot Auth is an IETF draft (-00, 2026-09-01).

## Pre-launch note
These results are for the staging host; re-run on harbingermma.com after DNS cutover, since the old Webflow/Cloudflare site's robots.txt and bot rules currently govern production.

## Structured findings (audit-data.json, AI Search Readiness)
[
 {"title":"Schedule filter icons missing alt (6 of 8 images)","severity":"Medium","description":"/schedule/ filter button icons render <img> with no alt (WeeklySchedule.tsx).","recommendation":"Add alt=\"\" since button text names the filter."},
 {"title":"Lighthouse Agentic Browsing not measured","severity":"Info","description":"PSI HTTP 429 quota exceeded on mobile and desktop.","recommendation":"Configure a Google API key and re-run."},
 {"title":"robots.txt allows all AI agents with no stated policy","severity":"Info","description":"Single * group, no Content-Signal.","recommendation":"Decide training vs search vs user-agent policy in robots.txt.ts."},
 {"title":"No llms.txt, Markdown delivery or WebMCP","severity":"Info","description":"Optional drafts/community practices; absent.","recommendation":"Optional; no ranking or traffic effect promised."}
]
