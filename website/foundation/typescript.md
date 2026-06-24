# TypeScript 学习文档

> 目标：从“能写 TS”到“能用类型系统构建可靠、可维护的大型前端应用”。

---

## 核心要点（TL;DR）

- TypeScript 的静态类型系统在编译期捕获错误、辅助重构，并充当团队协作的“活文档”。
- `interface` 适合描述对象/类并支持声明合并，`type` 更灵活，可表达联合、交叉、条件与映射类型。
- 泛型让类型像函数一样参数化，配合约束与默认值可实现高复用的类型抽象。
- 严格模式（`strict: true`、`noImplicitAny`、`strictNullChecks`）是大型项目类型安全的底线。
- 避免滥用 `any`，用 `unknown` + 类型收窄、可辨识联合与类型驱动开发保障编译时与运行时的一致。

## 学习时长与前置知识

- **建议学习时长**：2-3 周（每周投入 6-8 小时）
- **前置知识**：JavaScript 语言基础

## 一、TypeScript 是什么？为什么需要它？

TypeScript 是 JavaScript 的超集，它在 JS 的基础上增加了**静态类型系统**和基于类型的编程能力，最终会被编译成纯 JavaScript。

可以把 TypeScript 理解为：

- **开发时的脚手架**：在写代码时就发现类型错误，而不是在运行时让用户发现。
- **活的文档**：类型注解让代码的输入、输出、结构一目了然。
- **重构的安全网**：大型项目中改一个接口，类型检查能立刻告诉你哪些地方需要同步修改。

> 生活化比喻：JavaScript 像口头约定，TypeScript 像签合同。合同不能阻止你违约，但能在你违约前大声提醒。

## 二、类型系统基础：从原子类型开始

### 2.1 原始类型与类型注解

```ts
let name: string = "Alice";
let age: number = 25;
let isStudent: boolean = false;
let nothing: null = null;
let notDefined: undefined = undefined;
let sym: symbol = Symbol("id");
let big: bigint = 100n;
```

**最佳实践**：
- 简单类型尽量让 TS 自动推断，不需要到处写 `: string`。
- 函数参数、返回值、复杂结构建议显式注解。

### 2.2 any、unknown、never

```ts
let anything: any = 4;
anything.foo(); // 编译不报错，运行可能报错

let unknownValue: unknown = 4;
// unknownValue.toFixed(); // 报错，必须先做类型收窄
if (typeof unknownValue === "number") {
  unknownValue.toFixed();
}

function throwError(): never {
  throw new Error("boom");
}
```

- `any`：关闭类型检查，尽量不用。
- `unknown`：类型安全的 any，使用前必须收窄。
- `never`：表示不可能存在的值，常用于穷尽性检查。

### 2.3 数组与元组

```ts
let arr: number[] = [1, 2, 3];
let tuple: [string, number, boolean] = ["Alice", 25, true];
```

元组适合表示固定长度、固定类型的组合，比如坐标 `[number, number]`。

### 2.4 对象类型

```ts
interface User {
  name: string;
  age?: number;        // 可选属性
  readonly id: number; // 只读属性
}

const user: User = { name: "Alice", id: 1 };
// user.id = 2; // 报错
```

## 三、接口（interface）与类型别名（type）

### 3.1 接口：描述对象形状

```ts
interface Person {
  name: string;
  greet(): void;
}

class Student implements Person {
  name: string;
  constructor(name: string) { this.name = name; }
  greet() { console.log(`Hi, I'm ${this.name}`); }
}
```

### 3.2 类型别名：更灵活

```ts
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;
```

### 3.3 interface 与 type 的核心区别

| 特性 | interface | type |
|------|-----------|------|
| 可声明合并 | ✅ 同名 interface 自动合并 | ❌ 同名 type 报错 |
| 扩展方式 | `extends` | `&`（交叉类型） |
| 可表示非对象 | ❌ 主要用于对象/类 | ✅ 可表示任意类型 |
| 条件类型/映射类型 | ❌ | ✅ |

**最佳实践**：
- 描述对象结构、类实现优先用 `interface`。
- 联合类型、工具类型、条件类型用 `type`。

## 四、泛型：类型的“函数”

泛型让类型像函数参数一样可复用。

```ts
function identity<T>(arg: T): T {
  return arg;
}
identity<string>("hello"); // 显式传入
identity("hello");         // 类型推断
```

### 4.1 泛型约束

```ts
interface HasLength {
  length: number;
}
function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}
logLength("hello");
logLength([1, 2, 3]);
// logLength(123); // 报错，number 没有 length
```

### 4.2 泛型默认值

```ts
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
```

### 4.3 泛型在类与接口中的应用

```ts
interface Repository<T> {
  findById(id: string): T | undefined;
  save(item: T): void;
}

class UserRepo implements Repository<User> {
  findById(id: string) { /* ... */ }
  save(item: User) { /* ... */ }
}
```

## 五、类型推断：让 TS 自动工作

TypeScript 能根据上下文推断类型，减少冗余注解。

```ts
let x = 10;           // 推断为 number
let arr = [1, "a"];   // 推断为 (string | number)[]

function add(a: number, b: number) {
  return a + b;       // 推断返回 number
}
```

**最佳实践**：
- 优先利用推断，不要写无意义的类型。
- 当推断结果不符合预期（如 `{}` 被推断为 `any`）时，显式注解。

## 六、类型收窄：从宽类型到窄类型

类型收窄是把大类型变小的过程。

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

常见收窄方式：
- `typeof`、`instanceof`
- 真值检查
- `in` 操作符
- 自定义类型保护函数
- `as const` 与字面量类型

### 6.1 自定义类型保护

```ts
interface Fish { swim(): void; }
interface Bird { fly(): void; }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

## 七、高级类型：类型系统的“高阶函数”

### 7.1 联合类型与交叉类型

```ts
type A = { a: number };
type B = { b: string };
type AorB = A | B;   // 联合：可以是 A 或 B
type AandB = A & B;  // 交叉：同时是 A 和 B

const obj: AandB = { a: 1, b: "hello" };
```

### 7.2 索引类型与索引访问

```ts
interface User {
  name: string;
  age: number;
}

type UserKeys = keyof User;           // "name" | "age"
type UserNameType = User["name"];     // string
```

### 7.3 条件类型

条件类型像三目运算符：

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;  // true
type B = IsString<123>;      // false
```

### 7.4 映射类型

映射类型可以基于旧类型生成新类型：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### 7.5 模板字面量类型

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"
```

## 八、类型体操常用技巧

“类型体操”指用 TS 类型系统解决复杂类型问题，常见于库开发和复杂业务类型推导。

### 8.1 常用工具类型手写

```ts
type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never;

type MyParameters<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => any ? P : never;

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

### 8.2 infer 的使用

`infer` 用于在条件类型中推断类型：

```ts
type ArrayElement<T> = T extends (infer E)[] ? E : never;
type Num = ArrayElement<number[]>; // number
```

### 8.3 递归类型

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

**注意事项**：类型体操很酷，但不要为了炫技而过度使用。业务代码以可读性优先。

## 九、编译配置：tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

关键配置：
- `strict: true`：开启所有严格类型检查，强烈推荐。
- `noImplicitAny`：禁止隐式 any。
- `strictNullChecks`：更严格的 null/undefined 检查。
- `esModuleInterop`：兼容 CommonJS 模块的默认导出。

## 十、类型安全实践

### 10.1 避免滥用 any

每使用一次 `any`，就失去一部分类型安全。替代方案：
- 用 `unknown` + 类型收窄。
- 用泛型保留类型信息。
- 为第三方库写类型声明（`.d.ts`）。

### 10.2 善用 discriminated union（可辨识联合）

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(s: Shape) {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "square": return s.side ** 2;
    default: const _exhaustive: never = s; // 穷尽检查
  }
}
```

### 10.3 类型声明与实现分离

大型项目中，把公共类型抽到独立的 `types.ts` 或 `api.types.ts` 中，避免类型分散在各处。

### 10.4 类型驱动开发

先定义数据结构和 API 类型，再写实现。这能强迫你思考边界情况和错误处理。

## 十一、与 JavaScript 的互操作

### 11.1 声明文件 .d.ts

为没有类型的 JS 库补充类型：

```ts
// lodash.d.ts
declare module "lodash" {
  export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    wait: number
  ): T;
}
```

### 11.2 类型声明与类型断言

```ts
const input = document.getElementById("name") as HTMLInputElement;
// 或使用更安全的尖括号语法（JSX 中不可用）
const input2 = <HTMLInputElement>document.getElementById("name");
```

## 十二、`satisfies`：让类型推断更聪明

### 12.1 为什么需要 `satisfies`？

TypeScript 4.9 引入 `satisfies` 操作符，解决了一个常见痛点：我们希望一个变量满足某个类型约束，同时又不想失去它的具体类型信息。

生活化比喻：你去餐厅点菜，菜单（类型）限制了你能点什么，但服务员（`satisfies`）会在下单后记住你具体点了哪道菜，而不是只记住“这是一道菜”。

### 12.2 对比三种声明方式

```ts
// 方式一：显式注解，会丢失具体字面量类型
const config1: Record<string, string | number> = {
  host: "localhost",
  port: 3000
};
config1.host; // string | number，失去了 "localhost" 的具体类型

// 方式二：不注解，推断为具体类型，但无法约束结构
const config2 = {
  host: "localhost",
  port: 3000
};
// 如果有人把 port 写成字符串，TS 不会报错

// 方式三：satisfies，既约束结构，又保留具体类型
const config3 = {
  host: "localhost",
  port: 3000
} satisfies Record<string, string | number>;

config3.host; // "localhost"
config3.port; // 3000
```

### 12.3 实战场景：颜色配置

```ts
type ColorKey = "primary" | "secondary" | "danger";
type HexColor = `#${string}`;

const palette = {
  primary: "#007bff",
  secondary: "#6c757d",
  danger: "#dc3545"
} satisfies Record<ColorKey, HexColor>;

// palette.primary 推断为 "#007bff"，而不是 string
// 如果漏写 danger，TS 会报错
```

### 12.4 `satisfies` vs `as` vs 类型注解

| 方式 | 约束结构 | 保留具体类型 | 安全性 |
|------|---------|-------------|--------|
| 类型注解 `:T` | ✅ | ❌ 会被放宽到 T | 安全 |
| `as T` | ❌ 可能断言错误类型 | ✅ | 不安全 |
| `satisfies T` | ✅ | ✅ | 安全 |

---

## 十三、装饰器：给类和方法加“外挂”

### 13.1 什么是装饰器？

装饰器（Decorator）是一种特殊类型的声明，可以附加到类、方法、属性或参数上，用来修改它们的行为。TypeScript 5.0 完整支持了 ECMAScript 装饰器标准。

生活化比喻：装饰器像手机壳。手机本身功能不变，但套上手机壳后，它变得更防摔、更好看、更好握持。

### 13.2 类装饰器

```ts
function Logger<T extends new (...args: any[]) => any>(constructor: T) {
  return class extends constructor {
    createdAt = new Date();
  };
}

@Logger
class User {
  constructor(public name: string) {}
}

const u = new User("Tom") as User & { createdAt: Date };
console.log(u.createdAt); // Date 实例
```

### 13.3 方法装饰器

```ts
function measure(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = original.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} 耗时 ${(end - start).toFixed(2)}ms`);
    return result;
  };
}

class Calculator {
  @measure
  heavyCompute(n: number) {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += i;
    return sum;
  }
}
```

### 13.4 装饰器的使用边界

装饰器虽然强大，但会增加代码的“魔法感”。在业务代码中应谨慎使用，更适合框架开发、工具库、AOP 日志、权限控制等场景。

---

## 十四、Branded Type：给原始类型打“防伪标签”

### 14.1 为什么需要 Branded Type？

在大型系统中，我们经常用 `string` 表示用户 ID、订单 ID、商品 ID。但这样容易出现“把用户 ID 当订单 ID 传”的 bug，因为它们的类型都是 `string`。

Branded Type 通过交叉类型给原始类型打一个不可见的“标签”，让它们在类型系统中成为不同的类型。

生活化比喻：同样是塑料卡，银行卡和门禁卡外观差不多，但刷卡机只认对应的卡。Branded Type 就是给类型加上的“芯片”。

### 14.2 实现方式

```ts
type UserId = string & { __brand: "UserId" };
type OrderId = string & { __brand: "OrderId" };

function createUserId(id: string): UserId {
  return id as UserId;
}

function queryOrder(orderId: OrderId) {
  // ...
}

const uid = createUserId("u123");
queryOrder(uid); // ❌ 报错：类型 UserId 不能赋给 OrderId
```

运行时 `UserId` 和 `OrderId` 仍然是普通字符串，但编译期它们是不同的类型。

### 14.3 与 Newtype 模式的对比

| 方案 | 运行时开销 | 类型安全 | 适用场景 |
|------|----------|---------|---------|
| 原始 string/number | 无 | 低 | 简单脚本 |
| Branded Type | 无 | 高 | 大型 TS 项目 |
| 包装类/对象 | 有 | 高 | 需要运行时区分的场景 |

---

## 十五、类型声明文件工程化

### 15.1 什么情况下需要 `.d.ts`？

- 为没有类型的第三方 JS 库补充类型。
- 把公共类型抽到独立文件，减少业务代码中的类型噪音。
- 发布 npm 包时提供类型声明，让使用者获得类型提示。

### 15.2 为第三方库写声明

```ts
// lodash.d.ts
declare module "lodash" {
  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait?: number,
    options?: { leading?: boolean; trailing?: boolean }
  ): T & { cancel(): void };

  export function throttle<T extends (...args: any[]) => any>(
    func: T,
    wait?: number
  ): T;
}
```

### 15.3 全局声明与模块声明

```ts
// global.d.ts
declare global {
  interface Window {
    myAppConfig: { env: "dev" | "prod" };
  }
}

// 扩展已有模块
declare module "vue" {
  export interface ComponentCustomProperties {
    $api: typeof api;
  }
}
```

### 15.4 类型声明文件工程化最佳实践

1. **集中管理**：把全局类型、业务类型、第三方类型分别放到 `types/global.d.ts`、`types/api.ts`、`types/third-party.d.ts`。
2. **避免 `any` 泛滥**：为第三方库写声明时尽量精确，不要用太多 `any`。
3. **版本对齐**：声明文件应与库版本保持一致，否则类型可能与实际行为脱节。
4. **使用 `typeVersions`**：在 npm 包的 `package.json` 中用 `types` / `typesVersions` 指定类型入口。
5. **自动生成**：大型项目可用 `dts-bundle-generator` 或 `api-extractor` 从源码生成声明文件。

---

## 十六、TypeScript 编译性能优化

### 16.1 为什么 TS 会越来越慢？

项目变大后，TypeScript 类型检查可能变得很慢，原因包括：

- 类型推断过深或出现无限递归类型。
- 滥用 `any` 导致类型信息丢失，反而触发更多推断。
- 大型联合类型、交叉类型、条件类型增加编译负担。
- `tsconfig.json` 配置不合理，`include` 范围过大。
- 第三方库类型复杂或存在循环依赖。

### 16.2 项目层面优化

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "isolatedModules": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "coverage"]
}
```

关键优化配置：

- `skipLibCheck: true`：跳过 `.d.ts` 文件的类型检查，大幅减少大型项目编译时间。
- `isolatedModules: true`：确保每个文件可以独立编译，配合 Babel/swc 使用。
- `moduleResolution: bundler`：现代打包器推荐，提升解析速度。
- 合理设置 `include` / `exclude`，避免 TS 扫描无关文件。

### 16.3 代码层面优化

| 反模式 | 优化建议 |
|--------|---------|
| 深层嵌套的条件类型 | 拆分为多个简单类型别名 |
| 巨型联合类型 | 使用接口 + `kind` 做可辨识联合 |
| `ReturnType<typeof fn>` 滥用 | 显式定义返回类型 |
| 递归类型无终止条件 | 设置递归深度上限 |
| 泛型约束过于宽松 | 使用更具体的约束，减少推断范围 |

### 16.4 工具层面优化

- **增量编译**：`tsc --incremental` 或 `tsc --build`（Project References）。
- **Project References**：把大项目拆分为多个子项目，独立编译。
- **类型检查与转译分离**：用 swc、esbuild 做转译，用 `tsc --noEmit` 做类型检查。
- **fork-ts-checker-webpack-plugin**：在 Webpack 构建中并行进行类型检查。

生活化比喻：TypeScript 编译像工厂质检。项目大了之后，不能每件产品都全量拆开检查，而是要分车间（Project References）、用流水线（swc/esbuild 转译）、抽检关键工序（tsc --noEmit），才能又快又好。

---

## 总结

TypeScript 的核心价值不是“让代码多写几行类型注解”，而是：

1. 在编码阶段捕获错误。
2. 提供可维护的代码结构。
3. 让重构更安全。
4. 作为团队协作的活文档。

深入掌握 `satisfies`、装饰器、Branded Type、类型声明文件工程化和编译性能优化，能让我们在大型前端项目中写出既类型安全又高效的代码。学习 TypeScript 要循序渐进：先掌握基础类型和接口，再理解泛型，最后根据项目需要深入学习高级类型和类型体操。记住：**类型服务于代码，而不是代码服务于类型**。

---

**延伸阅读**：
- TypeScript 官方文档（typescriptlang.org）
- TypeScript 5.0 装饰器提案
- 《TypeScript 编程》
- type-challenges（GitHub 类型体操题库）

---

> **领域编号**：F02 TypeScript 类型系统  
> **最后更新**：2026-06-24


---

## 本领域学习进度

<MarkComplete domainId="typescript" />
<ProgressTracker />
