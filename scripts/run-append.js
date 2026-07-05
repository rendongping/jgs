#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { processDomain } = require('./append-ib-questions.js');
const specs = require('./new-specs.js');

const IB_DIR = path.resolve(__dirname, '..', 'interview-bank', 'by-domain');
const DOMAIN_SLUG = {
  '01': 'javascript',
  '02': 'typescript',
  '03': 'browser',
  '04': 'network',
  '05': 'security',
  '06': 'html-css',
  '07': 'a11y',
  '08': 'algorithms',
  '09': 'design-patterns',
};

function getExistingTitles(domain) {
  const filePath = path.join(IB_DIR, `${domain}-${DOMAIN_SLUG[domain]}.md`);
  if (!fs.existsSync(filePath)) return new Set();
  const text = fs.readFileSync(filePath, 'utf8');
  const titles = [...text.matchAll(/^### FB-[^：]+：(.+)$/gm)].map(m => m[1]);
  return new Set(titles);
}

const plan = [
  { domain: '01', list: specs.jsSpecs },
  { domain: '02', list: specs.tsSpecs },
  { domain: '03', list: specs.browserSpecs },
  { domain: '04', list: specs.networkSpecs },
  { domain: '05', list: specs.securitySpecs },
  { domain: '06', list: specs.htmlCssSpecs },
  { domain: '07', list: specs.a11ySpecs },
  { domain: '08', list: specs.algorithmSpecs },
  { domain: '09', list: specs.designPatternSpecs },
];

const summary = [];

for (const { domain, list } of plan) {
  const existing = getExistingTitles(domain);
  const unique = [];
  const duplicates = [];
  for (const spec of list) {
    if (existing.has(spec.title)) {
      duplicates.push(spec.title);
    } else {
      unique.push(spec);
      existing.add(spec.title);
    }
  }
  if (duplicates.length) {
    console.log(`[${domain}] 跳过 ${duplicates.length} 个重复标题：`, duplicates.slice(0, 5));
  }
  processDomain(domain, unique);
  summary.push({ domain, added: unique.length, skipped: duplicates.length });
}

console.log('\n=== 追加结果汇总 ===');
let totalAdded = 0;
for (const s of summary) {
  totalAdded += s.added;
  console.log(`${s.domain}: 新增 ${s.added} 题，跳过 ${s.skipped} 题`);
}
console.log(`总计新增: ${totalAdded} 题`);
