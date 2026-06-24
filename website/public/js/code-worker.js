self.onmessage = function (e) {
  const { userCode, testScript } = e.data;
  const results = [];

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || '断言失败');
    }
  }

  function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object' || a === null || b === null) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  function test(name, fn) {
    try {
      fn();
      results.push({ name, pass: true });
    } catch (err) {
      results.push({ name, pass: false, error: err.message });
    }
  }

  function sleep(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {}
  }

  try {
    const fullCode = testScript.replace('{{USER_CODE}}', () => userCode);
    eval(fullCode);
  } catch (err) {
    results.push({ name: '代码执行', pass: false, error: err.message });
    self.postMessage({ pass: false, results });
    return;
  }

  const failed = results.filter(r => !r.pass).length;
  self.postMessage({
    pass: failed === 0,
    results,
  });
};
