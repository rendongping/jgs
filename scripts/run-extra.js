#!/usr/bin/env node
const extras = require('./extra-specs.js');
const { processDomain } = require('./append-ib-questions.js');

const plan = [
  { domain: '02', list: extras.tsExtra },
  { domain: '03', list: extras.browserExtra },
  { domain: '08', list: extras.algorithmExtra },
  { domain: '09', list: extras.designPatternExtra },
];

for (const { domain, list } of plan) {
  processDomain(domain, list);
}
