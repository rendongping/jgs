function Q(type, level, title, tags, duration, frequency, desc, answer, scoring, mistakes, oral) {
  return { type, level, title, tags, duration, frequency, desc, answer, scoring, mistakes, oral };
}

const tsExtra = [
  Q('CO', 'B', 'TypeScript 中 enum 与 const enum 有什么区别？',
    ['enum', 'const enum', '编译产物', '性能'], '3-5 分钟', '中频',
    '请说明普通枚举和常量枚举在编译产物、使用场景上的差异。',
    `普通 enum 会生成运行时对象和反向映射，占用打包体积。const enum 在编译阶段完全内联，不生成运行时对象，但跨模块编译且 isolatedModules 开启时会报错。

    enum Status { Pending, Done }
    const enum Role { Admin, User }
    const r = Role.Admin; // 编译后替换为 0`,
    [['enum 编译产物', '40%', '运行时对象与反向映射'], ['const enum', '40%', '编译时内联'], ['使用注意', '20%', 'isolatedModules 报错']],
    ['const enum 导出到公共 API 导致消费方报错',
     '在需要运行时对象时用 const enum',
     '忽略 enum 对打包体积的影响'],
    'enum 生成运行时对象，const enum 编译时内联；const enum 不宜用于公共 API，isolatedModules 下会报错。'),
  Q('CO', 'A', 'TypeScript 中类型断言 `as` 与尖括号语法有什么区别？',
    ['类型断言', 'as', '尖括号', 'JSX'], '3-5 分钟', '中频',
    '请说明两种语法形式的差异及在 JSX 中为什么推荐用 as。',
    `as 语法：value as Type。尖括号语法：<Type>value。两者功能相同，但在 TSX/JSX 中尖括号会与 JSX 标签冲突，因此必须使用 as。

    const len = (someValue as string).length;
    const len2 = (<string>someValue).length; // 非 JSX 可用`,
    [['语法差异', '40%', 'as vs 尖括号'], ['JSX 限制', '40%', '尖括号冲突'], ['推荐做法', '20%', '统一使用 as']],
    ['在 TSX 中使用尖括号导致解析错误',
     '把类型断言当成类型转换在运行时生效',
     '用 as 绕过类型检查而不加注释说明'],
    'as 和尖括号类型断言功能相同，TSX 中尖括号与 JSX 冲突，推荐统一使用 as。'),
];

const browserExtra = [
  Q('CO', 'B', '什么是 Paint Holding 与 First Paint？',
    ['First Paint', 'Paint Holding', 'FCP', '渲染'], '3-5 分钟', '低频',
    '请说明 First Paint、First Contentful Paint 和 Paint Holding 的关系。',
    `First Paint 是浏览器首次将像素渲染到屏幕的时间点；First Contentful Paint 是首次渲染文本、图片等 DOM 内容。Paint Holding 是 Chrome 为同站导航引入的机制，延迟绘制直到新页面内容准备好，减少白屏闪烁。

FCP 是更贴近用户体验的指标。`,
    [['FP', '30%', '首次像素绘制'], ['FCP', '30%', '首次内容绘制'], ['Paint Holding', '40%', '同站导航减少白屏']],
    ['把 FP 和 FCP 混为一谈',
     '认为 Paint Holding 会延长真实加载时间',
     '忽略 FCP 作为核心 Web Vital 的重要性'],
    'FP 是首次像素绘制，FCP 是首次内容绘制，Paint Holding 用于同站导航减少白屏。'),
  Q('CO', 'A', 'Chrome Lighthouse 性能评分机制是怎样的？',
    ['Lighthouse', '性能评分', '指标权重', '审计'], '5-8 分钟', '中频',
    '请说明 Lighthouse Performance Score 的计算方式和核心指标权重。',
    `Lighthouse 6+ 使用加权几何平均计算性能分数。核心指标：FCP、SI（Speed Index）、LCP、TTI、TBT、CLS。权重随版本调整，目前 LCP 和 CLS 占比较高。

分数 90-100 为优秀，50-89 需改进，0-49 较差。应结合实际 RUM 数据而非仅看实验室分数。`,
    [['指标', '40%', 'FCP/SI/LCP/TTI/TBT/CLS'], ['加权几何平均', '30%', '计算方式'], ['应用', '30%', '实验室数据与 RUM 结合']],
    ['只看总分不分析具体指标',
     '忽视 Lighthouse 版本变化导致指标权重不同',
     '把实验室分数直接等同于真实用户体验'],
    'Lighthouse 通过加权几何平均计算性能分，核心指标包括 FCP、LCP、CLS 等，应结合 RUM 数据评估。'),
];

const algorithmExtra = [
  Q('CO', 'B', '如何理解前缀和与差分数组？',
    ['前缀和', '差分数组', '区间查询', '算法'], '3-5 分钟', '中频',
    '请说明前缀和与差分数组的定义、适用场景和相互关系。',
    `前缀和数组 sum[i] 表示原数组前 i 个元素之和，可 O(1) 查询区间和。差分数组 diff[i] 记录原数组相邻元素差值，可 O(1) 进行区间加减，最后通过前缀和还原原数组。

    const diff = [0,0,0,0,0];
    diff[l] += v; diff[r+1] -= v; // 区间 [l,r] 加 v`,
    [['前缀和', '40%', '区间和查询'], ['差分数组', '40%', '区间更新'], ['还原', '20%', '差分求前缀和']],
    ['前缀和数组下标从 0 和 1 混淆导致越界',
     '差分数组更新时忘记修改 r+1',
     '在不需要频繁区间查询的场景滥用前缀和增加空间'],
    '前缀和用于快速区间和查询，差分数组用于快速区间更新，两者可通过前缀和相互转换。'),
];

const designPatternExtra = [
  Q('CO', 'B', '工厂方法模式与简单工厂有什么区别？',
    ['工厂方法', '简单工厂', '创建型模式', '设计模式'], '3-5 分钟', '中频',
    '请比较工厂方法模式和简单工厂的结构与扩展性。',
    `简单工厂用一个工厂类根据参数创建不同产品，增加新产品需修改工厂类。工厂方法模式将创建逻辑延迟到子类，每个具体产品对应一个具体工厂，符合开闭原则。

    abstract class Factory { abstract createProduct(): Product; }
    class ConcreteFactoryA extends Factory { createProduct() { return new ProductA(); } }`,
    [['简单工厂', '40%', '单一工厂函数'], ['工厂方法', '40%', '子类实现创建'], ['开闭原则', '20%', '扩展性']],
    ['把工厂方法和抽象工厂混淆',
     '简单工厂产品类型过多导致工厂类臃肿',
     '为每个简单对象都创建工厂方法'],
    '简单工厂用一个函数创建对象，工厂方法把创建延迟到子类，扩展性更好。'),
  Q('CO', 'A', '什么是享元模式？在前端有哪些应用？',
    ['享元模式', 'Flyweight', '共享对象', '设计模式'], '3-5 分钟', '中频',
    '请说明享元模式的意图和前端应用场景。',
    `享元模式通过共享大量细粒度对象来减少内存占用。将对象状态分为内部状态（可共享）和外部状态（由调用方传入）。前端应用：虚拟列表中复用 DOM 节点、Canvas 粒子系统中共享相同属性的粒子对象、编辑器中共享样式节点。

    const flyweights = new Map();
    function getFlyweight(key) { if (!flyweights.has(key)) flyweights.set(key, new Flyweight(key)); return flyweights.get(key); }`,
    [['内部/外部状态', '40%', '可共享与可变分离'], ['减少内存', '30%', '对象复用'], ['前端场景', '30%', '虚拟列表、粒子、样式节点']],
    ['所有状态都放入享元对象导致无法复用',
     '忽略享元工厂的生命周期管理导致内存泄漏',
     '对象数量少时也强行使用享元模式'],
    '享元模式通过共享内部状态减少内存，前端可用于虚拟列表 DOM 复用、粒子系统等。'),
];

module.exports = {
  tsExtra,
  browserExtra,
  algorithmExtra,
  designPatternExtra,
};
