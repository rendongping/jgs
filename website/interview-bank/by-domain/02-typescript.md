# TypeScript 面试题

> 本文件收录 TypeScript 相关面试题，目标题量 200 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题。
> 难度覆盖：基础、进阶、深入、架构。

## 目录

- [基础题](#基础题)
- [进阶题](#进阶题)
- [深入题](#深入题)
- [架构题](#架构题)

---

## 基础题

### FB-02-CO-B-001：TypeScript 与 JavaScript 的关系是什么？为什么要使用 TypeScript？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：typescript、javascript、静态类型、编译、类型安全
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 TypeScript 与 JavaScript 的关系，并列举使用 TypeScript 的主要优势。

**参考答案**：

- TypeScript 是 JavaScript 的超集（superset），在 JS 基础上添加了静态类型系统、接口、泛型、装饰器等特性。
- TS 代码需编译为 JS 才能在浏览器或 Node.js 中运行，编译器为 `tsc`。
- 任何有效的 JS 代码都是合法的 TS 代码（默认情况下）。

主要优势：

1. **静态类型检查**：在编译期发现类型错误，减少运行时异常。
2. **更好的 IDE 支持**：自动补全、跳转定义、重构、智能提示。
3. **可读性与可维护性**：类型即文档，便于大型团队协作。
4. **更安全的重构**：修改接口后，依赖方会立即收到编译错误。
5. **现代特性提前使用**：可使用最新 ECMAScript 提案，编译为兼容目标环境的 JS。

```ts
// 编译期即可发现错误
function add(a: number, b: number) {
  return a + b;
}
add(1, '2'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

**评分维度**：
- 解释清楚超集关系（30%）
- 说明编译流程（20%）
- 列举 3 个以上实际优势（50%）

**常见错误**：
- 认为 TypeScript 会改变 JavaScript 的运行时行为
- 把 TypeScript 说成一门完全独立的语言
- 忽略 TypeScript 也需要编译才能运行

**延伸追问**：
- TypeScript 的类型系统会在运行时做检查吗？为什么？
- TS 编译后的代码是否包含类型信息？

**参考资源**：
- [TypeScript 官方文档 - TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

---

### FB-02-CO-B-002：TypeScript 有哪些基础类型？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：基础类型、primitive、any、unknown、never
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列出 TypeScript 的基础类型，并说明 `any`、`unknown`、`never` 的区别。

**参考答案**：

TypeScript 基础类型包括：

- 原始类型：`string`、`number`、`boolean`、`bigint`、`symbol`、`null`、`undefined`
- 对象类型：`object`（包括 Object、Array、Function 等更具体的类型）
- 特殊类型：`any`、`unknown`、`never`、`void`
- 复合类型：`array`、`tuple`、`enum`、`union`、`intersection`

`any`、`unknown`、`never` 区别：

| 类型 | 含义 | 可赋值 | 可调用/访问属性 | 使用场景 |
|------|------|--------|----------------|----------|
| `any` | 任意类型，关闭类型检查 | 可赋给任何类型 | 允许任意操作 | 临时兼容旧代码，不推荐滥用 |
| `unknown` | 未知类型，类型安全版 any | 只能赋给 unknown/any | 使用前必须收窄 | 需要类型守卫后使用 |
| `never` | 永不存在的类型 | 不能赋给任何类型（除 never） | 无 | 表示不可能到达的分支，或空联合 |

```ts
let a: any = 1;
a.toFixed(); // 不报错，但运行可能出错

let u: unknown = 1;
// u.toFixed(); // Error: Object is of type 'unknown'
if (typeof u === 'number') {
  u.toFixed(); // OK
}

function throwError(): never {
  throw new Error('error');
}
```

**评分维度**：
- 完整列出基础类型（40%）
- 准确区分 any/unknown/never（40%）
- 能举例说明使用场景（20%）

**常见错误**：
- 认为 `unknown` 和 `any` 完全相同
- 把 `never` 等同于 `void`
- 不理解 `never` 在穷尽性检查中的作用

**延伸追问**：
- 为什么应该尽量用 `unknown` 替代 `any`？
- `void` 和 `undefined` 在函数返回值类型上有什么区别？

**参考资源**：
- [TypeScript 官方文档 - Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

---

### FB-02-CO-B-003：什么是类型注解（Type Annotation）和类型推断（Type Inference）？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：类型注解、类型推断、显式类型、隐式类型
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 TypeScript 中类型注解和类型推断的区别，并说明各自的使用场景。

**参考答案**：

- **类型注解**：显式地为变量、参数、返回值等声明类型。
- **类型推断**：TypeScript 编译器根据赋值或上下文自动推导出类型。

```ts
// 类型注解
let count: number = 0;
function greet(name: string): string {
  return `Hello, ${name}`;
}

// 类型推断
let count2 = 0; // 推断为 number
let greeting = greet('Tom'); // 推断为 string
```

使用场景：

- 优先使用类型推断，保持代码简洁。
- 在函数参数、返回值、复杂对象或需要明确语义时使用类型注解。
- 导出 API、库接口、配置文件等公共契约必须显式注解。

**评分维度**：
- 说清两者定义（40%）
- 各举一例（30%）
- 说明使用场景与最佳实践（30%）

**常见错误**：
- 所有变量都写类型注解，导致代码冗长
- 函数参数不写注解，依赖推断导致类型拓宽为 any
- 混淆类型推断与动态类型

**延伸追问**：
- 如果声明 `let x = null`，TypeScript 会推断为什么类型？
- `const` 和 `let` 在类型推断上有什么区别？

**相关题目**：
- [FB-02-CA-B-001 any、unknown、never 的区别](#FB-02-CA-B-001)

---

### FB-02-CO-B-004：Interface 的作用是什么？如何定义可选属性和只读属性？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：interface、可选属性、readonly、对象类型
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中 `interface` 的作用，并说明如何定义可选属性和只读属性。

**参考答案**：

`interface` 用于定义对象的结构契约，描述对象应该有哪些属性、类型和方法。它支持继承、实现、合并声明等特性。

```ts
interface User {
  id: number;           // 必填属性
  name: string;         // 必填属性
  email?: string;       // 可选属性（?）
  readonly createdAt: Date; // 只读属性
}

const user: User = {
  id: 1,
  name: 'Tom',
  createdAt: new Date()
};

user.name = 'Jerry';      // OK
// user.createdAt = new Date(); // Error: cannot assign to 'createdAt' because it is a read-only property
```

- 可选属性：属性名后加 `?`，表示该属性可以不存在。
- 只读属性：属性前加 `readonly`，表示初始化后不能重新赋值（但对对象属性的深层修改不生效）。

**评分维度**：
- 解释 interface 作用（30%）
- 正确使用可选属性语法（30%）
- 正确使用只读属性语法（30%）
- 说明 readonly 的浅层只读限制（10%）

**常见错误**：
- 把 `readonly` 等同于深度不可变
- 可选属性与 `| undefined` 混淆
- 在 interface 中使用 `=` 赋值语法

**延伸追问**：
- `readonly` 和 `const` 有什么区别？
- 如何实现深度只读？

**参考资源**：
- [TypeScript 官方文档 - Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

---

### FB-02-CO-B-005：Type Alias（类型别名）是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：type alias、类型别名、联合类型、交叉类型
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 TypeScript 中 `type` 关键字的作用，并说明类型别名可以定义哪些类型。

**参考答案**：

`type` 用于创建类型别名（Type Alias），为任意类型起一个名字，提高可读性和复用性。

类型别名可以定义：

- 原始类型别名：`type UserID = string`
- 对象类型：`type User = { name: string }`
- 联合类型：`type Status = 'pending' | 'success' | 'error'`
- 交叉类型：`type AdminUser = User & { role: 'admin' }`
- 元组类型：`type Point = [number, number]`
- 函数类型：`type Handler = (event: Event) => void`

```ts
type ID = string | number;
type Status = 'loading' | 'success' | 'error';

type Response<T> = {
  data: T;
  status: Status;
};

const res: Response<User> = {
  data: { name: 'Tom' },
  status: 'success'
};
```

**评分维度**：
- 说清 type alias 作用（40%）
- 列举 3 种以上可定义的类型（40%）
- 能写出示例（20%）

**常见错误**：
- 认为 type alias 会创建新类型（只是别名）
- 用 type 定义 class 并尝试 `implements`
- 混淆 type 与 interface 的使用场景

**延伸追问**：
- type 和 interface 都能定义对象类型，应该选择哪个？
- type 是否支持声明合并？

**相关题目**：
- [FB-02-CO-B-006 Interface 与 Type Alias 的区别](#FB-02-CO-B-006)

---

### FB-02-CO-B-006：Interface 与 Type Alias 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：02 TypeScript
**标签**：interface、type alias、声明合并、扩展、交叉类型
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请比较 TypeScript 中 `interface` 和 `type`（类型别名）的区别，并说明各自更适合的场景。

**参考答案**：

| 特性 | Interface | Type Alias |
|------|-----------|------------|
| 定义对象类型 | ✅ 推荐 | ✅ 可以 |
| 联合/交叉/元组/函数类型 | ❌ 不能直接定义联合类型 | ✅ 更灵活 |
| 声明合并（Declaration Merging） | ✅ 支持同名合并 | ❌ 不支持 |
| 扩展方式 | `extends` | `&` 交叉类型 |
| 性能 | 通常更优（对象类型） | 复杂类型可能更慢 |
| 报错信息 | 更友好 | 嵌套复杂类型时较差 |

```ts
// interface 支持声明合并
interface User {
  name: string;
}
interface User {
  age: number;
}
// 合并为 { name: string; age: number }

// type 支持联合类型
type Status = 'success' | 'error';
type Response = { data: unknown } & { status: Status };
```

建议：

- 定义对象结构、类实现、需要声明合并时优先使用 `interface`。
- 需要联合类型、交叉类型、元组、映射类型、条件类型时使用 `type`。

**评分维度**：
- 说出 3 个以上核心区别（50%）
- 正确举例说明声明合并（25%）
- 给出选择建议（25%）

**常见错误**：
- 认为 interface 完全不能表达 type 的能力
- 在需要联合类型时仍坚持使用 interface
- 不了解声明合并的应用场景

**延伸追问**：
- 第三方库为什么会用声明合并扩展全局类型？
- `interface extends` 和 `type &` 在错误处理上有何差异？

**参考资源**：
- [TypeScript 官方文档 - Interfaces vs Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

---

### FB-02-CO-B-007：Union Types 和 Intersection Types 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：union、intersection、联合类型、交叉类型、类型组合
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中联合类型（Union Types）和交叉类型（Intersection Types）的区别，并举例说明。

**参考答案**：

- **联合类型 `A | B`**：表示值可以是 A 或 B 中的任意一种类型。
- **交叉类型 `A & B`**：表示值同时满足 A 和 B 两种类型的结构。

```ts
// 联合类型
function printId(id: string | number) {
  console.log(id);
}
printId('abc');
printId(123);

// 交叉类型
type Person = { name: string };
type Employee = { employeeId: number };
type Staff = Person & Employee;

const staff: Staff = {
  name: 'Tom',
  employeeId: 1
};
```

注意：

- 联合类型访问共有属性才安全，访问非共有属性需要类型收窄。
- 交叉类型如果存在同名但不同类型属性，会生成 `never`。

```ts
type A = { x: string };
type B = { x: number };
type C = A & B; // { x: never }
```

**评分维度**：
- 说清两者语义差异（40%）
- 各举一例（30%）
- 提到联合类型需要类型收窄（20%）
- 提到同名属性冲突可能产生 never（10%）

**常见错误**：
- 把联合类型理解为"同时拥有多种类型"
- 直接访问联合类型的非共有属性
- 不理解交叉类型在基本类型上的行为（如 `string & number` 为 `never`）

**延伸追问**：
- 如何对联合类型进行安全的属性访问？
- `string | number` 和 `string & number` 分别代表什么？

**参考资源**：
- [TypeScript 官方文档 - Union and Intersection Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

---

### FB-02-CO-B-008：Enum 枚举类型有什么特点？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：enum、枚举、常量枚举、const enum
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中 `enum` 的作用，并说明数字枚举、字符串枚举和常量枚举的区别。

**参考答案**：

`enum` 用于定义一组有名字的常量集合。

```ts
// 数字枚举（默认自增）
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

// 字符串枚举
enum Status {
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR'
}

// 常量枚举（编译时内联，不生成反向映射）
const enum Permission {
  Read = 1,
  Write = 2
}
const p = Permission.Read; // 编译为 const p = 1;
```

特点：

- 数字枚举支持反向映射：`Direction[0] === 'Up'`。
- 字符串枚举不支持反向映射，调试信息更友好。
- `const enum` 在编译阶段完全内联，不会生成运行时对象，性能更好，但无法在运行时访问。

**评分维度**：
- 解释 enum 作用（30%）
- 区分数字/字符串/常量枚举（40%）
- 说明反向映射和内联特性（20%）
- 提到 enum 的争议（10%）

**常见错误**：
- 在字符串枚举中尝试反向映射
- 混淆 `const enum` 和普通 enum 的运行时行为
- 不了解 enum 编译后会产生额外对象

**延伸追问**：
- 为什么很多项目推荐用联合字面量类型替代 enum？
- enum 和 object as const 有什么区别？

**参考资源**：
- [TypeScript 官方文档 - Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

---

### FB-02-CA-B-001：分析以下代码的类型行为

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：any、unknown、never、类型收窄、类型安全
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```ts
let a: any = 'hello';
let b: unknown = 'hello';
let c: never;

a.toUpperCase();
b.toUpperCase();

function fn(x: string | number) {
  if (typeof x === 'string') {
    console.log(x.toUpperCase());
  } else {
    console.log(x.toFixed(2));
  }
}
```

请指出哪些代码会报错，并解释原因。

**参考答案**：

- `a.toUpperCase()`：不报错。`any` 关闭类型检查，任何操作都被允许，但运行可能出错。
- `b.toUpperCase()`：报错。`unknown` 是类型安全的 any，使用前必须先做类型检查/收窄。
- `let c: never`：声明本身不报错，但 `never` 类型无法被赋值（除 never 本身）。
- `fn` 函数内部不报错。通过 `typeof` 类型守卫，TypeScript 在分支中正确收窄了 `x` 的类型。

正确写法：

```ts
if (typeof b === 'string') {
  b.toUpperCase(); // OK
}
```

**评分维度**：
- 正确判断 any 的行为（25%）
- 正确判断 unknown 需要收窄（35%）
- 正确判断 never 的含义（20%）
- 解释类型守卫收窄机制（20%）

**常见错误**：
- 认为 unknown 和 any 行为相同
- 忽略 `typeof` 类型守卫的作用
- 认为 `let c: never` 声明会报错

**延伸追问**：
- 如何为 unknown 编写自定义类型守卫？
- `any` 类型会污染周围的类型推断吗？

**相关题目**：
- [FB-02-CO-B-002 TypeScript 有哪些基础类型](#FB-02-CO-B-002)

---

### FB-02-CA-B-002：分析可选属性与默认值的类型行为

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：可选属性、默认值、undefined、函数参数
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：

```ts
interface Config {
  host?: string;
  port?: number;
}

function createServer(config: Config = {}) {
  const host = config.host ?? 'localhost';
  const port = config.port ?? 3000;
  return { host, port };
}

createServer();
createServer({ host: 'example.com' });
createServer({ port: '8080' });
```

请分析上述代码的类型检查情况。

**参考答案**：

- `createServer()`：合法，使用默认空对象 `{}`。
- `createServer({ host: 'example.com' })`：合法，port 保持可选。
- `createServer({ port: '8080' })`：报错。`port` 类型为 `number | undefined`，不能传入字符串 `'8080'`。

关键点：

- 可选属性等价于 `T | undefined`，但传入对象时该属性可以省略。
- 函数默认参数 `{}` 允许无参调用。
- 默认值与可选属性是不同概念：默认值处理运行时的值，可选属性是类型层面的约束。

**评分维度**：
- 正确分析无参调用（20%）
- 正确分析部分属性调用（20%）
- 正确识别类型错误（40%）
- 解释可选属性与默认值的区别（20%）

**常见错误**：
- 认为可选属性不能是 undefined
- 混淆函数参数默认值与对象属性默认值
- 认为 `{}` 不能赋值给可选属性对象

**延伸追问**：
- `config: Config = {}` 和 `config?: Config` 有什么区别？
- 如何为 interface 中所有可选属性设置默认值？

---

### FB-02-CO-B-009：Tuple 元组类型是什么？与数组有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：tuple、元组、数组、固定长度、类型位置
**出现频率**：中频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 TypeScript 中 Tuple 元组类型，并说明它与数组类型的区别。

**参考答案**：

- **数组类型**：元素类型相同，长度可变。`number[]`
- **元组类型**：元素类型和长度都固定。`[string, number]`

```ts
// 数组
const arr: number[] = [1, 2, 3];
arr.push(4); // OK

// 元组
const tuple: [string, number] = ['Tom', 20];
// tuple[0].toFixed(); // Error: string 没有 toFixed
// tuple.push(true);   // Error: 类型不匹配（但 push 在元组上有特殊处理）

// 可选元组元素
const optional: [string, number?] = ['Tom'];

// 剩余元素
const rest: [string, ...number[]] = ['Tom', 1, 2, 3];
```

元组常用于表示固定结构的数据，如坐标点、函数返回值、React 的 useState 返回结果等。

**评分维度**：
- 说清数组和元组的区别（50%）
- 各举一例（30%）
- 提到可选元素和剩余元素（20%）

**常见错误**：
- 把元组当成普通数组使用，不固定长度
- 混淆 `[string, number]` 和 `(string | number)[]`
- 不了解元组 push 的行为限制

**延伸追问**：
- React `useState` 的返回类型为什么是元组？
- 如何用元组表示函数的多个返回值？

---

### FB-02-CD-B-001：手写一个类型安全的通用函数

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：函数类型、泛型、类型安全、参数校验
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请用 TypeScript 实现一个 `mapArray` 函数，接收一个数组和一个映射函数，返回映射后的新数组。要求类型安全，支持任意输入类型和输出类型。

**参考答案**：

```ts
function mapArray<T, U>(arr: T[], fn: (item: T, index: number) => U): U[] {
  const result: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i));
  }
  return result;
}

// 使用示例
const numbers = [1, 2, 3];
const strings = mapArray(numbers, (n) => n.toString()); // string[]

const users = [{ name: 'Tom' }, { name: 'Jerry' }];
const names = mapArray(users, (u) => u.name); // string[]
```

要点：

- 使用泛型 `T` 表示输入数组元素类型。
- 使用泛型 `U` 表示映射函数返回值类型。
- 返回类型为 `U[]`，与映射函数返回值一致。
- 保持原数组不变，不修改输入。

**评分维度**：
- 正确使用泛型定义输入输出类型（40%）
- 函数签名类型正确（30%）
- 实现逻辑正确（20%）
- 能给出使用示例（10%）

**常见错误**：
- 使用 `any[]` 作为返回类型
- 混淆数组元素类型与索引类型
- 泛型参数命名不规范

**延伸追问**：
- 如何让 mapArray 支持 readonly 输入数组？
- 如果映射函数可能是异步的，应该如何修改类型？

**相关题目**：
- [FB-02-CO-A-001 泛型约束](#FB-02-CO-A-001)

---

### FB-02-CO-B-010：Type Assertion（类型断言）是什么？与类型转换有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：类型断言、as、类型转换、类型收窄
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请解释 TypeScript 中的类型断言，并说明它与类型转换的区别。

**参考答案**：

- **类型断言**：告诉编译器"我知道这个值的具体类型"，只在编译时生效，不影响运行时行为。
- **类型转换**：运行时改变值的实际类型，如 `String(123)`、`Number('123')`。

```ts
const value: unknown = 'hello world';

// 类型断言
const len = (value as string).length;

// 类型转换
const num = Number('123'); // 运行时真的转换
```

两种断言语法：

- 尖括号语法：`<string>value`（在 TSX 中不推荐，会与 JSX 冲突）
- `as` 语法：`value as string`（推荐）

注意：

- 类型断言不能改变值的实际运行时类型，滥用可能导致运行时错误。
- 优先使用类型守卫等安全收窄方式。

**评分维度**：
- 说清类型断言只在编译期生效（40%）
- 区分类型断言和类型转换（30%）
- 知道 as 语法和尖括号语法（20%）
- 提到滥用风险（10%）

**常见错误**：
- 认为类型断言会进行运行时转换
- 在 TSX 中使用尖括号断言导致解析错误
- 用断言绕过类型检查而不做验证

**延伸追问**：
- `as const` 和 `as` 有什么区别？
- 什么时候应该使用类型断言而不是类型守卫？

---

### FB-02-CA-B-003：分析联合类型的类型收窄行为

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：联合类型、类型收窄、类型守卫、typeof、in
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```ts
type Animal = { name: string; bark: () => void };
type Plant = { name: string; photosynthesize: () => void };
type Entity = Animal | Plant;

function describe(entity: Entity) {
  console.log(entity.name);

  if ('bark' in entity) {
    entity.bark();
  } else {
    entity.photosynthesize();
  }
}
```

请分析这段代码的类型检查行为，并说明 `in` 操作符在这里的作用。

**参考答案**：

- `entity.name`：合法。`name` 是 `Animal` 和 `Plant` 的共有属性。
- `if ('bark' in entity)`：这是 `in` 操作符类型守卫。如果为 true，TypeScript 将 `entity` 收窄为 `Animal`。
- `entity.bark()`：在 `if` 分支内合法，因为类型已收窄为 `Animal`。
- `entity.photosynthesize()`：在 `else` 分支内合法，因为 `Entity` 中不含有 `bark` 的只可能是 `Plant`。

```ts
// 等价于
type Entity =
  | { name: string; bark: () => void }
  | { name: string; photosynthesize: () => void };
```

`in` 类型守卫适用于通过属性存在性区分的联合类型。

**评分维度**：
- 正确解释共有属性访问（20%）
- 正确解释 in 类型守卫作用（40%）
- 正确分析两个分支的类型（30%）
- 提到 in 守卫的适用场景（10%）

**常见错误**：
- 认为可以直接访问联合类型的非共有属性
- 不了解 `in` 操作符可以作为类型守卫
- 混淆 `in` 与 `typeof`、`instanceof`

**延伸追问**：
- `in` 类型守卫与自定义类型守卫有什么区别？
- 如果 Animal 和 Plant 有更多重叠属性，如何设计可辨识联合？

**相关题目**：
- [FB-02-CO-A-002 类型保护](#FB-02-CO-A-002)

---

### FB-02-CD-B-002：手写一个类型安全的 identity 函数

**题型**：手写代码题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：02 TypeScript
**标签**：泛型、identity、类型推断、泛型参数
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请用 TypeScript 实现一个 `identity` 函数，它接收一个参数并原样返回。要求类型安全，调用时返回值类型与参数类型一致。

**参考答案**：

```ts
function identity<T>(arg: T): T {
  return arg;
}

// 显式指定类型参数
const num = identity<number>(42); // number

// 类型推断
const str = identity('hello'); // string
const arr = identity([1, 2, 3]); // number[]
```

要点：

- 使用泛型参数 `T` 捕获调用时传入的具体类型。
- 返回类型与参数类型相同，都是 `T`。
- 调用时通常可以省略类型参数，让编译器自动推断。

**评分维度**：
- 正确定义泛型函数（50%）
- 返回类型与参数类型一致（30%）
- 能展示显式和推断两种调用方式（20%）

**常见错误**：
- 使用 `any` 作为参数和返回类型
- 返回类型写成 `unknown`
- 泛型参数位置错误

**延伸追问**：
- 如果要求 identity 只能接受对象类型，应该怎么改？
- 泛型函数的类型参数在编译后会保留吗？

**参考资源**：
- [TypeScript 官方文档 - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

---

## 进阶题

### FB-02-CO-A-001：什么是泛型约束（Generic Constraints）？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：泛型、约束、extends、关键字
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中泛型约束的作用，并举例说明如何使用。

**参考答案**：

泛型约束用于限制泛型参数必须满足某些条件，确保在泛型内部可以安全访问特定属性或方法。

```ts
// 约束 T 必须有 length 属性
function logLength<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello'); // OK，string 有 length
logLength([1, 2, 3]); // OK，array 有 length
// logLength(123); // Error: number 没有 length
```

常见约束形式：

- 属性约束：`T extends { id: number }`
- 构造函数约束：`T extends new (...args: any[]) => any`
- 联合类型约束：`T extends string | number`
- 多个约束：通过交叉类型 `T extends A & B`

**评分维度**：
- 解释泛型约束作用（40%）
- 正确写出 extends 语法（30%）
- 举例说明约束应用场景（30%）

**常见错误**：
- 在泛型内部直接访问未约束的属性
- 约束条件写得过于宽泛或过于严格
- 混淆泛型约束与类的 extends

**延伸追问**：
- 如何约束泛型参数必须是某个类的子类？
- `keyof` 和泛型约束如何配合使用？

**相关题目**：
- [FB-02-CD-B-001 手写 mapArray](#FB-02-CD-B-001)

---

### FB-02-CD-A-001：手写一个类型安全的 get 工具函数

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：泛型、keyof、索引访问、对象属性、工具函数
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请实现一个类型安全的 `get` 函数，根据对象和路径字符串获取嵌套属性值。要求路径字符串必须是对象中存在的有效路径。

进阶：支持嵌套路径，如 `get(obj, 'a.b.c')`。

**参考答案**：

基础版（单层路径）：

```ts
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Tom', age: 20 };
const n = get(user, 'name'); // string
// const x = get(user, 'email'); // Error: 'email' 不存在
```

进阶版（嵌套路径）：

```ts
type PathValue<T, P extends string> =
  P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? PathValue<T[K], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;

function get<T extends Record<string, any>, P extends string>(
  obj: T,
  path: P
): PathValue<T, P> {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

const obj = { a: { b: { c: 1 } } };
const val = get(obj, 'a.b.c'); // number
// get(obj, 'a.b.x'); // 简单版可能无法完全约束嵌套路径，取决于实现
```

**评分维度**：
- 基础版类型正确（30%）
- 使用 keyof 约束 key（30%）
- 进阶版使用模板字面量类型推导路径（30%）
- 处理边界情况（10%）

**常见错误**：
- key 参数类型为 string，失去类型安全
- 返回值类型为 any
- 模板字面量类型推导错误

**延伸追问**：
- 如何支持数组索引路径，如 `get(obj, 'users.0.name')`？
- 如何处理可选属性路径，使返回类型包含 undefined？

---

### FB-02-CO-A-002：TypeScript 中有哪些内置的类型保护（Type Guards）？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：类型保护、type guard、typeof、instanceof、in
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举 TypeScript 中常见的类型保护方式，并说明它们如何收窄联合类型。

**参考答案**：

类型保护是在运行时检查值，同时帮助 TypeScript 编译器收窄类型的机制。

常见类型保护：

1. **`typeof` 守卫**：用于基本类型（`string`、`number`、`boolean`、`symbol`、`undefined`、`function`、`bigint`）。
2. **`instanceof` 守卫**：用于判断对象是否是某个类的实例。
3. **`in` 守卫**：检查对象是否含有某个属性。
4. **字面量相等判断**：`===`、`==`、`!==`、`switch`。
5. **可辨识联合（Discriminated Unions）**：通过共有字面量属性区分。
6. **自定义类型保护**：返回 `value is Type` 的函数。

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number };

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2; // 收窄为 circle
    default:
      return shape.side ** 2; // 收窄为 square
  }
}
```

**评分维度**：
- 列举 4 种以上类型保护（50%）
- 说明各自适用场景（30%）
- 举例说明可辨识联合（20%）

**常见错误**：
- `typeof` 对 `null` 返回 `'object'`，不能用来区分 null
- `instanceof` 不能用于接口类型（接口只在编译期存在）
- 对联合类型直接访问非共有属性

**延伸追问**：
- `typeof []` 返回什么？如何用类型保护区分数组和对象？
- 自定义类型保护函数和普通布尔函数有什么区别？

**相关题目**：
- [FB-02-CD-A-002 手写自定义类型保护](#FB-02-CD-A-002)

---

### FB-02-CD-A-002：手写一个自定义类型保护函数

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：自定义类型保护、is、类型守卫、运行时检查
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请实现一个自定义类型保护函数 `isUser`，用于判断一个 `unknown` 值是否是符合 `User` 接口的对象。要求返回类型为 `value is User`。

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}
```

**参考答案**：

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    typeof (value as Record<string, unknown>).id === 'number' &&
    typeof (value as Record<string, unknown>).name === 'string' &&
    ('email' in value === false ||
      typeof (value as Record<string, unknown>).email === 'string')
  );
}

// 使用
function greetUser(input: unknown) {
  if (isUser(input)) {
    console.log(input.name); // 类型已收窄为 User
  }
}
```

要点：

- 返回类型标注为 `value is User`。
- 运行时检查必须足够严格，避免误判。
- 对于可选属性需要特殊处理。

**评分维度**：
- 正确使用 `value is Type` 语法（30%）
- 运行时检查逻辑完整（40%）
- 处理 null 和可选属性（20%）
- 能说明类型保护的优势（10%）

**常见错误**：
- 返回类型写成 `boolean`
- 只做 `typeof value === 'object'` 检查，不判断 null
- 不检查必填属性的类型

**延伸追问**：
- 如何生成更健壮的运行时类型检查？
- 类型保护函数和 zod/yup 等 schema 验证库有什么区别？

**参考资源**：
- [TypeScript 官方文档 - Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

---

### FB-02-CO-A-003：什么是 Mapped Types（映射类型）？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：mapped types、映射类型、keyof、in、工具类型
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中的映射类型，并举例说明如何基于已有类型生成新类型。

**参考答案**：

映射类型允许基于已有类型的键生成新类型，通过索引签名语法遍历 `keyof` 得到的键集合。

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

映射类型支持修饰符：

- `readonly` / `-readonly`：添加或移除只读
- `?` / `-?`：添加或移除可选

```ts
// 移除所有 readonly
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// 移除所有可选
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

**评分维度**：
- 解释映射类型语法（40%）
- 举例说明如何生成新类型（30%）
- 说明 readonly 和 ? 修饰符（30%）

**常见错误**：
- 把映射类型理解为运行时遍历
- 混淆 `in` 在映射类型和 `for...in` 中的含义
- 不会使用 `-readonly` 和 `-?` 移除修饰符

**延伸追问**：
- 如何实现 `Pick<T, K>` 和 `Omit<T, K>`？
- 映射类型中的 `as` 关键字有什么作用？

**相关题目**：
- [FB-02-CO-A-005 TypeScript 内置工具类型](#FB-02-CO-A-005)

---

### FB-02-CO-A-004：什么是 Conditional Types（条件类型）？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：conditional types、条件类型、extends、三元类型
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中的条件类型，并举例说明其用法。

**参考答案**：

条件类型根据类型关系选择类型，语法类似三元运算符：`T extends U ? X : Y`。

```ts
// 如果 T 是 string，返回 number，否则返回 boolean
type IsString<T> = T extends string ? true : false;

type A = IsString<'hello'>; // true
type B = IsString<123>;     // false
```

应用场景：

- 根据类型是否 assignable 到另一类型做分支。
- 结合 `infer` 提取类型的一部分。
- 实现工具类型如 `Exclude`、`Extract`、`NonNullable`。

```ts
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;

type C = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
type D = Extract<'a' | 'b' | 'c', 'a' | 'd'>; // 'a'
```

**评分维度**：
- 解释条件类型语法（40%）
- 举例基本用法（30%）
- 提到与工具类型的关系（30%）

**常见错误**：
- 把条件类型理解为运行时条件
- 不理解 distributive conditional types（分配条件类型）
- 不会用 `never` 过滤联合类型

**延伸追问**：
- 什么是分配条件类型？如何用 `[]` 关闭分配？
- 条件类型中的 `never` 有什么特殊行为？

**相关题目**：
- [FB-02-CO-P-001 infer 关键字](#FB-02-CO-P-001)

---

### FB-02-CO-A-005：TypeScript 有哪些常用内置工具类型？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：utility types、Partial、Required、Readonly、Pick、Omit、Record
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请列举并解释 TypeScript 中常用的内置工具类型，如 `Partial`、`Required`、`Readonly`、`Pick`、`Omit`、`Record`。

**参考答案**：

常用内置工具类型：

| 工具类型 | 作用 |
|----------|------|
| `Partial<T>` | 将 T 的所有属性变为可选 |
| `Required<T>` | 将 T 的所有属性变为必填 |
| `Readonly<T>` | 将 T 的所有属性变为只读 |
| `Pick<T, K>` | 从 T 中挑选 K 指定的属性 |
| `Omit<T, K>` | 从 T 中排除 K 指定的属性 |
| `Record<K, T>` | 创建键类型为 K、值类型为 T 的对象类型 |
| `Exclude<T, U>` | 从 T 中排除可赋值给 U 的类型 |
| `Extract<T, U>` | 从 T 中提取可赋值给 U 的类型 |
| `NonNullable<T>` | 从 T 中排除 null 和 undefined |
| `ReturnType<T>` | 获取函数 T 的返回类型 |
| `Parameters<T>` | 获取函数 T 的参数类型元组 |

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

type UserPreview = Pick<User, 'id' | 'name'>;
type UserForm = Partial<Omit<User, 'id'>>;
type UserMap = Record<number, User>;
```

**评分维度**：
- 列举 6 个以上工具类型（50%）
- 准确解释每个作用（30%）
- 能写出使用示例（20%）

**常见错误**：
- 混淆 `Pick` 和 `Omit`
- 不清楚 `Record` 的使用场景
- 不会组合使用多个工具类型

**延伸追问**：
- `Partial<T>` 和 `T | undefined` 有什么区别？
- 如何自己实现 `DeepPartial<T>`？

**相关题目**：
- [FB-02-CD-A-003 手写 DeepReadonly](#FB-02-CD-A-003)

---

### FB-02-CO-A-006：Index Signatures（索引签名）是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：index signature、索引签名、Record、动态键、字符串索引
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中的索引签名，并说明它与 `Record` 的区别和使用场景。

**参考答案**：

索引签名用于描述对象中动态键的类型结构。

```ts
interface StringDictionary {
  [key: string]: string;
}

const dict: StringDictionary = {
  name: 'Tom',
  role: 'admin'
};
```

索引签名类型：

- `[key: string]: T`：字符串键索引
- `[key: number]: T`：数字键索引（数组常用）
- `[key: symbol]: T`：symbol 键索引

限制：

- 索引签名返回值类型必须是所有已知属性类型的公共父类型。
- 不能同时使用 `string` 和 `number` 索引签名，除非 number 返回类型是 string 返回类型的子类型。

```ts
interface Mixed {
  [key: string]: number | string;
  [key: number]: number; // OK，number 是 number | string 的子类型
}
```

`Record<K, T>` 是索引签名的类型安全替代，要求键类型明确。

**评分维度**：
- 解释索引签名语法（40%）
- 说明与具体属性的兼容性（30%）
- 区分索引签名和 Record（20%）
- 提到 string/number 索引签名限制（10%）

**常见错误**：
- 索引签名返回类型与具体属性类型冲突
- 用索引签名代替 interface 的明确属性定义
- 混淆 `Record<string, T>` 和 `{ [key: string]: T }`

**延伸追问**：
- 如何限制对象的键只能是特定的字符串联合？
- 索引签名与 `Object.keys()` 的类型有什么关系？

---

### FB-02-CO-A-007：Function Overloads（函数重载）是什么？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：function overloads、函数重载、签名、多态
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中的函数重载，并说明它与联合类型参数的区别。

**参考答案**：

函数重载允许一个函数根据传入参数的不同类型返回不同的类型，提供多个函数签名。

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number | string, b: number | string): number | string {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  return String(a) + String(b);
}

const n = add(1, 2);       // number
const s = add('a', 'b');   // string
```

与联合类型参数的区别：

- 函数重载：调用时返回类型更精确。
- 联合类型参数：返回类型通常是联合类型，调用后需要进一步收窄。

**评分维度**：
- 解释重载语法和作用（40%）
- 正确写出重载示例（30%）
- 区分重载与联合参数（30%）

**常见错误**：
- 重载签名与实现签名不匹配
- 重载顺序不当（更具体的签名应在前）
- 用重载替代更简单的泛型或联合类型

**延伸追问**：
- 重载函数的实现签名对外可见吗？
- 类的方法可以重载吗？

**参考资源**：
- [TypeScript 官方文档 - Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)

---

### FB-02-CA-A-001：分析以下泛型代码的推断结果

**题型**：代码分析题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：泛型、类型推断、条件类型、infer、返回类型
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：

```ts
function createPair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const pair = createPair('hello', 42);

// ---

type Return<T> = T extends (...args: any[]) => infer R ? R : never;

function fetchUser() {
  return { id: 1, name: 'Tom' };
}

type FetchUserReturn = Return<typeof fetchUser>;
```

请分析 `pair` 和 `FetchUserReturn` 的类型分别是什么。

**参考答案**：

- `pair` 的类型是 `[string, number]`。
  - `T` 被推断为 `'hello'`，再拓宽（widening）为 `string`。
  - `U` 被推断为 `42`，再拓宽为 `number`。
  - 返回类型为 `[string, number]`。

- `FetchUserReturn` 的类型是 `{ id: number; name: string; }`。
  - `typeof fetchUser` 是函数类型 `() => { id: number; name: string }`。
  - 条件类型 `T extends (...args: any[]) => infer R ? R : never` 匹配函数签名，推断 `R` 为返回类型。
  - 因此最终类型为 `{ id: number; name: string }`。

**评分维度**：
- 正确推断 pair 类型（30%）
- 正确解释泛型推断过程（25%）
- 正确推断 FetchUserReturn 类型（25%）
- 解释 infer 在条件类型中的作用（20%）

**常见错误**：
- 认为 pair 是 `['hello', 42]` 字面量类型
- 不理解 `infer` 关键字的含义
- 混淆 `typeof` 在值和类型上下文中的用法

**延伸追问**：
- 如何让 `pair` 保持字面量类型 `['hello', 42]`？
- `ReturnType<T>` 和上面的 `Return<T>` 有什么区别？

**相关题目**：
- [FB-02-CO-P-001 infer 关键字](#FB-02-CO-P-001)

---

### FB-02-CO-A-008：`keyof` 和 `typeof` 操作符在类型上下文中有什么作用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：keyof、typeof、索引类型、类型查询、类型操作符
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中 `keyof` 和 `typeof` 操作符的作用，并举例说明它们如何配合使用。

**参考答案**：

- **`keyof T`**：获取类型 T 的所有公共属性键的联合类型。
- **`typeof v`**：在类型上下文中，获取变量 v 的类型。

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

type UserKeys = keyof User; // 'id' | 'name' | 'age'

const user = {
  id: 1,
  name: 'Tom'
};

type UserType = typeof user; // { id: number; name: string }
type UserKey = keyof typeof user; // 'id' | 'name'
```

常见组合：

- `keyof typeof obj`：获取对象字面量的键联合。
- `T[K]`：索引访问类型，获取 T 中 K 对应的属性类型。

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

**评分维度**：
- 准确解释 keyof 作用（35%）
- 准确解释 typeof 在类型上下文中的作用（35%）
- 能举例说明组合使用（30%）

**常见错误**：
- 在值上下文中误用 `keyof`
- 混淆 JS 的 `typeof` 和 TS 的 `typeof`（后者在类型上下文中）
- 认为 `keyof` 可以获取私有属性

**延伸追问**：
- `keyof any` 的结果是什么？
- 如何获取一个数组的元素类型？

**相关题目**：
- [FB-02-CD-A-001 手写类型安全的 get 函数](#FB-02-CD-A-001)

---

### FB-02-CO-A-009：TypeScript 类的访问修饰符有哪些？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：class、访问修饰符、public、private、protected、readonly
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中类的访问修饰符 `public`、`private`、`protected` 和 `readonly` 的区别。

**参考答案**：

| 修饰符 | 作用 |
|--------|------|
| `public` | 默认修饰符，任何地方都可访问 |
| `private` | 只能在类内部访问（编译期检查，运行时可通过如 `#` 以外的手段访问） |
| `protected` | 类内部及子类中可访问 |
| `readonly` | 只能在声明时或构造函数中赋值，之后只读 |

```ts
class Animal {
  public name: string;
  private age: number;
  protected species: string;
  readonly id: number;

  constructor(name: string, age: number, species: string, id: number) {
    this.name = name;
    this.age = age;
    this.species = species;
    this.id = id;
  }
}

class Dog extends Animal {
  bark() {
    console.log(this.species); // OK，protected 可在子类访问
    // console.log(this.age);    // Error，private 不可在子类访问
  }
}
```

注意：

- TS 的 `private` 是编译期概念，JS 私有字段应使用 `#field`。
- 构造函数参数上加修饰符可自动创建同名属性。

**评分维度**：
- 区分 4 种修饰符（60%）
- 能举例说明访问范围（30%）
- 提到 private 与 JS #field 的区别（10%）

**常见错误**：
- 认为 private 在运行时也能完全隔离访问
- 混淆 protected 和 private
- 不知道构造函数参数修饰符语法

**延伸追问**：
- `private` 和 `#private` 在 JS/TS 中有什么区别？
- 抽象类中的 abstract 方法和 protected 有什么关系？

---

### FB-02-SC-A-001：如何用 TypeScript 设计一个可辨识联合（Discriminated Union）处理业务状态？

**题型**：场景设计题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：discriminated union、可辨识联合、状态机、类型收窄
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
假设有一个异步加载状态的业务场景，包含 idle、loading、success、error 四种状态。请用 TypeScript 设计类型，使得在每种状态下都能安全访问对应的数据。

**参考答案**：

使用可辨识联合，通过共有字段 `status` 区分不同状态：

```ts
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function render<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'idle':
      return 'Ready to load';
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Data: ${state.data}`; // 安全访问 data
    case 'error':
      return `Error: ${state.error.message}`; // 安全访问 error
    default:
      // 穷尽性检查
      const _exhaustive: never = state;
      return _exhaustive;
  }
}
```

设计要点：

1. 每个分支有唯一的字面量 tag（如 `status`）。
2. 分支专属数据只在该分支中存在。
3. 配合 `switch` 或 `if` 做类型收窄。
4. 使用 `never` 做穷尽性检查，防止遗漏状态。

**评分维度**：
- 正确定义可辨识联合（40%）
- 分支数据隔离设计合理（30%）
- 使用 switch 收窄并访问专属数据（20%）
- 使用 never 穷尽性检查（10%）

**常见错误**：
- 所有数据都放在一个类型里，导致可选属性泛滥
- 不使用字面量 tag，无法用 switch 收窄
- 忘记做穷尽性检查

**延伸追问**：
- 如果新增一种状态但没有更新 switch，TypeScript 会如何提示？
- 可辨识联合和 Redux action 设计有什么关系？

**参考资源**：
- [TypeScript 官方文档 - Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)

---

### FB-02-CD-A-003：手写一个 DeepReadonly 类型

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：02 TypeScript
**标签**：递归类型、DeepReadonly、映射类型、工具类型
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请实现一个 `DeepReadonly<T>` 类型，使对象的所有层级属性都变为只读，包括数组和嵌套对象。

**参考答案**：

```ts
type DeepReadonly<T> = T extends (infer R)[]
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

// 使用
interface User {
  name: string;
  address: {
    city: string;
  };
  tags: string[];
}

type ReadonlyUser = DeepReadonly<User>;

const user: ReadonlyUser = {
  name: 'Tom',
  address: { city: 'Beijing' },
  tags: ['admin']
};

// user.address.city = 'Shanghai'; // Error
// user.tags.push('guest');        // Error
```

要点：

- 使用条件类型判断是否为数组，避免数组方法被递归为对象键。
- 使用映射类型递归处理对象属性。
- 基本类型保持不变。

**评分维度**：
- 正确处理对象属性递归（40%）
- 正确处理数组类型（30%）
- 基本类型保持不变（20%）
- 能写出使用示例（10%）

**常见错误**：
- 直接用 `Readonly<T>`，只处理第一层
- 数组被当成普通对象处理，导致 `length` 等属性也递归
- 没有处理函数、Map、Set 等特殊类型

**延伸追问**：
- 如何处理函数类型，使其也被 DeepReadonly 忽略？
- 如果 T 是 Promise 或 Map，应该如何处理？

---

## 深入题

### FB-02-CO-P-001：`infer` 关键字的作用是什么？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：infer、条件类型、类型提取、类型推断、类型编程
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中 `infer` 关键字的作用，并举例说明如何使用它从复杂类型中提取子类型。

**参考答案**：

`infer` 关键字用于在条件类型中声明一个类型变量，让 TypeScript 从待推断的类型中提取某一部分。

```ts
// 提取数组元素类型
type ElementType<T> = T extends (infer E)[] ? E : never;

type A = ElementType<number[]>; // number
type B = ElementType<string>;   // never

// 提取函数返回类型
type Return<T> = T extends (...args: any[]) => infer R ? R : never;

function fn() {
  return { a: 1 };
}

type R = Return<typeof fn>; // { a: number }

// 提取 Promise 的泛型参数
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type C = UnwrapPromise<Promise<string>>; // string
```

`infer` 只能在条件类型的 `extends` 子句中使用，不能在其他地方声明类型变量。

**评分维度**：
- 解释 infer 的基本作用（40%）
- 举例提取数组/函数/Promise 类型（40%）
- 说明 infer 的使用位置限制（20%）

**常见错误**：
- 在条件类型外使用 infer
- 不理解 infer 只能推断一个候选类型
- 不会处理 infer 失败的情况

**延伸追问**：
- 如何从函数参数类型中提取第二个参数类型？
- `infer` 在多个候选类型时会如何选择？

**相关题目**：
- [FB-02-CO-A-004 条件类型](#FB-02-CO-A-004)

---

### FB-02-CO-P-002：什么是 Template Literal Types（模板字面量类型）？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：template literal types、模板字面量类型、字符串操作、类型编程
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中的模板字面量类型，并举例说明其应用场景。

**参考答案**：

模板字面量类型允许使用字符串模板在类型层面构造新的字符串类型，语法与 JS 模板字符串类似。

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<'click'>; // 'onClick'
type HoverEvent = EventName<'hover'>; // 'onHover'
```

应用场景：

1. **生成事件名**：
   ```ts
   type Events = 'click' | 'change';
   type Handlers = `on${Capitalize<Events>}`; // 'onClick' | 'onChange'
   ```

2. **CSS 变量名**：
   ```ts
   type ThemeKey = 'primary' | 'secondary';
   type CSSVar = `--color-${ThemeKey}`; // '--color-primary' | '--color-secondary'
   ```

3. **对象键转换**：
   ```ts
   type Getters<T> = {
     [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
   };
   ```

模板字面量类型常与 `as` 重映射、条件类型、infer 结合使用。

**评分维度**：
- 解释模板字面量类型语法（40%）
- 举例说明应用场景（40%）
- 提到与映射类型 as 重映射的结合（20%）

**常见错误**：
- 把模板字面量类型等同于运行时模板字符串
- 不了解 `Capitalize`、`Uppercase` 等内置字符串操作类型
- 在模板中错误拼接非 string 类型

**延伸追问**：
- 如何从模板字面量类型中提取变量部分？
- 模板字面量类型在大规模联合类型上会有什么性能问题？

**参考资源**：
- [TypeScript 官方文档 - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

---

### FB-02-CD-P-001：手写一个类型安全的 Promise.all

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：泛型、tuple、Promise、类型推断、递归类型
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请实现一个类型安全的 `all` 函数，接收一个 Promise 数组或元组，返回的 Promise 解析为对应的结果数组或元组类型。

**参考答案**：

```ts
type PromiseTuple<T extends readonly unknown[]> = {
  -readonly [P in keyof T]: Promise<Awaited<T[P]>> | T[P];
};

async function all<T extends readonly unknown[]>(
  values: PromiseTuple<T>
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> {
  return Promise.all(values) as any;
}

// 使用
const result = await all([
  Promise.resolve(1),
  Promise.resolve('hello'),
  Promise.resolve(true)
]);
// result 类型为 [number, string, boolean]

const names = await all(['a', 'b']); // string[]
```

要点：

- 使用泛型 `T extends readonly unknown[]` 捕获输入元组类型。
- 使用 `Awaited<T[P]>`（TS 4.5+）递归解开 Promise 嵌套。
- 输出保持元组结构。

**评分维度**：
- 正确捕获输入元组类型（30%）
- 正确推断输出元组类型（30%）
- 使用 Awaited 处理 Promise 嵌套（25%）
- 处理数组和元组两种情况（15%）

**常见错误**：
- 返回类型写成 `Promise<T[]>`，丢失元组结构
- 不处理 Promise 中的 Promise（嵌套 Promise）
- 使用 any 作为返回类型

**延伸追问**：
- 如果输入数组长度不固定，如何设计返回类型？
- 如何处理输入中的非 Promise 值？

---

### FB-02-CO-P-003：什么是 Recursive Types（递归类型）？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：recursive types、递归类型、树、JSON、深度类型
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中的递归类型，并举例说明如何使用递归类型定义树形结构或 JSON 类型。

**参考答案**：

递归类型是指在类型定义中引用自身的类型，用于表达嵌套、树形或自相似结构。

```ts
// 树节点
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

const tree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [{ value: 4, children: [] }] }
  ]
};

// JSON 类型
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const data: JSONValue = {
  name: 'Tom',
  scores: [90, 85],
  meta: { active: true }
};
```

注意：

- TS 4.1 之前对递归类型有较多限制，现在已大幅改善。
- 递归类型过深可能导致类型实例化过深错误（Type instantiation is excessively deep）。

**评分维度**：
- 解释递归类型的概念（40%）
- 举例定义树形结构（30%）
- 举例定义 JSON 类型（20%）
- 提到递归深度的限制（10%）

**常见错误**：
- 递归类型没有终止条件
- 在递归映射类型中导致无限递归
- 不了解 TS 版本对递归类型的支持差异

**延伸追问**：
- 递归类型在编译时有什么性能风险？
- 如何用递归类型实现 DeepPartial？

**相关题目**：
- [FB-02-CD-A-003 手写 DeepReadonly](#FB-02-CD-A-003)

---

### FB-02-CO-P-004：什么是 Branded Types（品牌类型）？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：branded types、品牌类型、名义类型、类型安全、newtype
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中的 Branded Types，并说明它与基于结构类型的普通类型有什么区别。举例说明其应用场景。

**参考答案**：

TypeScript 默认是结构类型系统（structural typing），只要结构相同就视为兼容。Branded Types 通过在类型中添加一个不可见的标记属性，模拟名义类型（nominal typing），使相同结构但语义不同的类型不兼容。

```ts
type UserID = string & { __brand: 'UserID' };
type OrderID = string & { __brand: 'OrderID' };

function createUserID(id: string): UserID {
  return id as UserID;
}

function queryUser(id: UserID) {
  // ...
}

const userId = createUserID('123');
const orderId = '123' as OrderID;

queryUser(userId); // OK
// queryUser(orderId); // Error: OrderID 不能赋值给 UserID
```

应用场景：

- 区分不同业务含义的 ID（UserID、OrderID、ProductID）。
- 区分不同单位（米、厘米、像素）。
- 防止不同语义但结构相同的值被混用。

**评分维度**：
- 解释结构类型与名义类型的区别（30%）
- 说明 Branded Types 的实现原理（35%）
- 举例应用场景（25%）
- 提到运行时 brand 不存在（10%）

**常见错误**：
- 认为 brand 属性在运行时存在
- 直接 `as UserID` 而不通过工厂函数
- 把 brand 类型设计得过于复杂

**延伸追问**：
- Branded Types 和私有构造函数类有什么区别？
- 如何在 JSON 序列化中保留 Branded Types 的语义？

**参考资源**：
- [TypeScript 官方文档 - Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)

---

### FB-02-CO-P-005：什么是 Declaration Merging（声明合并）？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：declaration merging、声明合并、interface、namespace、扩展
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中的声明合并，并举例说明 interface、namespace 和 enum 的合并行为。

**参考答案**：

声明合并是指 TypeScript 编译器将多个同名声明合并为一个声明的特性，主要用于扩展类型定义。

```ts
// interface 合并
interface User {
  name: string;
}
interface User {
  age: number;
}

const user: User = { name: 'Tom', age: 20 }; // 合并为 { name: string; age: number }

// namespace 与函数合并
function greet(name: string) {
  console.log(`Hello, ${name}`);
}
namespace greet {
  export let version = '1.0';
}

greet('Tom');
console.log(greet.version);

// namespace 与 class 合并
class Album {
  label!: Album.AlbumLabel;
}
namespace Album {
  export class AlbumLabel {
    name!: string;
  }
}
```

注意：

- 只有 `interface`、`namespace`、`enum` 支持声明合并。
- `type` 别名不支持声明合并。
- 合并的成员必须是唯一且不冲突的。

**评分维度**：
- 解释声明合并概念（30%）
- 举例 interface 合并（30%）
- 举例 namespace 与函数/class 合并（30%）
- 说明 type 不支持合并（10%）

**常见错误**：
- 试图合并 type 别名
- 合并 interface 时出现同名但不同类型的属性
- 不了解声明合并的实际应用场景

**延伸追问**：
- 声明合并和模块增强（Module Augmentation）有什么关系？
- 为什么第三方库扩展全局类型时常用 interface 合并？

**相关题目**：
- [FB-02-CO-P-006 模块增强](#FB-02-CO-P-006)

---

### FB-02-CO-P-006：什么是 Module Augmentation（模块增强）？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：module augmentation、模块增强、declare module、扩展第三方库
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中的模块增强，并说明如何为第三方库扩展类型定义。

**参考答案**：

模块增强用于在不修改第三方库源码的情况下，扩展其导出的类型或模块声明。

```ts
// 为 axios 扩展自定义 config 字段
declare module 'axios' {
  export interface AxiosRequestConfig {
    customHeader?: string;
    retryCount?: number;
  }
}

// 之后使用时
transport.get('/api', { customHeader: 'xxx', retryCount: 3 });
```

要点：

- 使用 `declare module 'module-name' { ... }`。
- 内部使用 `interface` 进行声明合并，扩展原有类型。
- 模块增强文件需要被 TS 编译器包含（在 tsconfig 的 include 中）。

常见场景：

- 为 Vue 的 ComponentCustomProperties 添加全局属性。
- 为 Express 的 Request 添加自定义字段。
- 为 styled-components 扩展 theme 类型。

**评分维度**：
- 解释模块增强概念（30%）
- 正确写出 declare module 语法（30%）
- 举例说明扩展第三方类型（30%）
- 说明文件需要被包含在编译中（10%）

**常见错误**：
- 使用 type 而不是 interface 进行扩展
- 模块增强文件未被 tsconfig 包含
- 在 declare module 中重复定义原有属性导致冲突

**延伸追问**：
- 模块增强和全局类型声明（declare global）有什么区别？
- 如何为第三方库新增一个全新的导出？

**参考资源**：
- [TypeScript 官方文档 - Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)

---

### FB-02-CO-P-007：什么是 Variance（型变）？请解释协变、逆变、双变和不变。

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：variance、协变、逆变、双变、不变、类型兼容性
**出现频率**：中频
**预计回答时长**：5-10 分钟

**题目描述**：
请解释 TypeScript 中的型变（Variance）概念，包括协变（Covariance）、逆变（Contravariance）、双变（Bivariance）和不变（Invariance），并举例说明。

**参考答案**：

型变描述的是复合类型（如函数参数、返回值、数组元素）与子类型关系之间的方向。

设 `Dog extends Animal`：

| 型变 | 含义 | TypeScript 行为 | 示例 |
|------|------|-----------------|------|
| **协变 Covariant** | 子类型关系方向相同 | 返回值、对象属性、数组元素 | `Dog[]` 是 `Animal[]` 的子类型 |
| **逆变 Contravariant** | 子类型关系方向相反 | 函数参数（strictFunctionTypes 开启时） | `(animal: Animal) => void` 是 `(dog: Dog) => void` 的子类型 |
| **双变 Bivariant** | 同时允许协变和逆变 | 函数参数（strictFunctionTypes 关闭时） | 兼容性更宽松 |
| **不变 Invariant** | 只允许完全相同类型 | 可变数据结构、泛型参数 | `Array<Dog>` 与 `Array<Animal>` 在不安全操作时不兼容 |

```ts
interface Animal { name: string }
interface Dog extends Animal { breed: string }

// 协变：返回值
type GetAnimal = () => Animal;
type GetDog = () => Dog;
const getDog: GetDog = () => ({ name: 'Tom', breed: 'Husky' });
const getAnimal: GetAnimal = getDog; // OK，返回值协变

// 逆变：参数（strictFunctionTypes 下）
type FeedAnimal = (animal: Animal) => void;
type FeedDog = (dog: Dog) => void;
const feedAnimal: FeedAnimal = (a) => console.log(a.name);
const feedDog: FeedDog = feedAnimal; // OK，参数逆变
// feedAnimal = feedDog; // Error
```

**评分维度**：
- 准确解释四种型变概念（50%）
- 能举例说明协变和逆变（30%）
- 提到 strictFunctionTypes 的影响（20%）

**常见错误**：
- 混淆协变和逆变的方向
- 认为 TypeScript 中所有地方都是协变
- 不理解为什么函数参数是逆变

**延伸追问**：
- `strictFunctionTypes` 关闭时为什么会有双变？这有什么风险？
- TypeScript 中泛型参数默认是什么型变？

**参考资源**：
- [TypeScript 官方文档 - Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)

---

### FB-02-CO-P-008：TypeScript 的类型兼容性是基于名义类型还是结构类型？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：structural typing、类型兼容性、名义类型、duck typing
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 的类型兼容性是基于结构类型（Structural Typing）还是名义类型（Nominal Typing），并说明其优缺点。

**参考答案**：

TypeScript 主要基于**结构类型**（structural typing），即类型的兼容性由结构（属性和方法）决定，而不是由声明名称决定。

```ts
interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const p3d: Point3D = { x: 1, y: 2, z: 3 };
const p2d: Point2D = p3d; // OK，Point3D 结构满足 Point2D
```

优点：

1. 灵活性高，便于接口替换和 mocking。
2. 更适合 JavaScript 的动态特性。
3. 代码复用和测试更方便。

缺点：

1. 可能意外兼容语义不同的类型。
2. 需要 Branded Types 等技巧模拟名义类型。
3. 大型重构时，同名但不同义的类型可能混用。

例外：

- 类中的 `private`/`protected` 成员会让类型带有名义类型特征。
- `enum` 在不同模块中同名但被视为不同。

**评分维度**：
- 说清结构类型定义（40%）
- 举例说明兼容性判断（30%）
- 说明优缺点（20%）
- 提到例外情况（10%）

**常见错误**：
- 认为 TypeScript 是名义类型系统
- 不理解结构类型与 duck typing 的关系
- 忽略 private/protected 的名义类型特征

**延伸追问**：
- 如何用 TypeScript 实现名义类型效果？
- 结构类型在跨模块共享接口时有什么风险？

**相关题目**：
- [FB-02-CO-P-004 Branded Types](#FB-02-CO-P-004)

---

### FB-02-CO-P-009：`tsconfig.json` 中的 `strict` 模式包含哪些选项？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：tsconfig、strict、严格模式、编译选项、类型安全
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 `tsconfig.json` 中 `strict: true` 会开启哪些编译选项，并解释其中几个关键选项的作用。

**参考答案**：

`strict: true` 是严格模式的总开关，会开启以下选项：

| 选项 | 作用 |
|------|------|
| `noImplicitAny` | 禁止隐式 any，未注解的变量/参数必须能推断出类型 |
| `strictNullChecks` | 开启后，null 和 undefined 不能赋值给其他类型 |
| `strictFunctionTypes` | 函数参数使用逆变检查，方法参数使用双变 |
| `strictBindCallApply` | bind/call/apply 必须有正确的类型 |
| `strictPropertyInitialization` | 类属性必须在声明或构造函数中初始化 |
| `noImplicitThis` | 禁止 this 为隐式 any |
| `alwaysStrict` | 在编译结果中开启 "use strict" |
| `useUnknownInCatchVariables` | catch 块中的变量类型为 unknown 而不是 any |

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

建议：

- 新项目始终开启 `strict: true`。
- 老项目迁移时可逐项开启，逐步修复类型问题。

**评分维度**：
- 列出 strict 包含的主要选项（40%）
- 解释 noImplicitAny、strictNullChecks、strictFunctionTypes（40%）
- 说明严格模式的工程价值（20%）

**常见错误**：
- 只开启 strict 但不了解具体子选项
- 认为 strict 会降低开发效率而完全关闭
- 混淆 `strictNullChecks` 和 `noImplicitReturns`

**延伸追问**：
- 老项目从非严格模式迁移到严格模式有哪些策略？
- `strictFunctionTypes` 对方法声明和函数声明的处理为什么不同？

**参考资源**：
- [TypeScript 官方文档 - strict](https://www.typescriptlang.org/tsconfig#strict)

---

### FB-02-CD-P-002：手写一个类型安全的事件总线（Event Bus）

**题型**：手写代码题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：event bus、类型安全、泛型、事件系统、键值映射
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请用 TypeScript 实现一个类型安全的事件总线，支持根据事件名约束监听回调的参数类型和触发时的参数类型。

**参考答案**：

```ts
interface EventMap {
  login: { userId: number; username: string };
  logout: { userId: number };
  message: { content: string; timestamp: number };
}

class EventBus<Events extends Record<string, any>> {
  private listeners: {
    [K in keyof Events]?: Array<(payload: Events[K]) => void>;
  } = {};

  on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
    return () => this.off(event, listener);
  }

  off<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void) {
    const list = this.listeners[event];
    if (list) {
      this.listeners[event] = list.filter((l) => l !== listener) as any;
    }
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    const list = this.listeners[event];
    if (list) {
      list.forEach((listener) => listener(payload));
    }
  }
}

const bus = new EventBus<EventMap>();

bus.on('login', ({ userId, username }) => {
  console.log(userId, username);
});

// bus.emit('login', { userId: 1 }); // Error: 缺少 username
// bus.on('message', (payload: string) => {}); // Error: 参数类型不匹配
```

要点：

- 使用泛型 `Events` 描述事件名到负载类型的映射。
- `on`/`off`/`emit` 都通过 `keyof Events` 约束事件名。
- 监听器参数类型根据事件名自动推断。

**评分维度**：
- 正确设计 EventMap 泛型（30%）
- on/off/emit 类型约束正确（40%）
- 能展示类型错误的示例（20%）
- 内存泄漏与取消订阅处理（10%）

**常见错误**：
- 事件名参数类型为 string，失去类型安全
- 监听器参数类型为 any
- 不处理重复订阅或取消订阅

**延伸追问**：
- 如何支持通配符事件监听（如 `*`）？
- 如何实现一次订阅（once）？

---

### FB-02-CO-P-010：Declaration Files（.d.ts）的作用是什么？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：02 TypeScript
**标签**：declaration files、d.ts、类型声明、类型定义、@types
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 TypeScript 中 `.d.ts` 声明文件的作用，并说明它与 `.ts` 文件的区别。

**参考答案**：

`.d.ts` 文件只包含类型声明，不包含运行时逻辑。它用于：

1. 为没有类型的 JavaScript 库提供类型定义。
2. 声明全局变量、函数、模块。
3. 通过 `declaration: true` 为 TS 库生成发布用的类型声明。

```ts
// math.d.ts
declare function add(a: number, b: number): number;
declare const PI: number;
```

与 `.ts` 文件的区别：

| 特性 | .ts | .d.ts |
|------|-----|-------|
| 包含运行时代码 | ✅ | ❌ |
| 可被编译为 JS | ✅ | ❌ |
| 只提供类型信息 | ❌ | ✅ |
| 用于库类型发布 | 间接（生成 .d.ts） | 直接 |

`@types` 包就是社区维护的 `.d.ts` 声明文件集合。

**评分维度**：
- 解释 .d.ts 作用（40%）
- 区分 .ts 和 .d.ts（30%）
- 说明声明文件的应用场景（20%）
- 提到 @types（10%）

**常见错误**：
- 在 .d.ts 中写运行时逻辑
- 不理解 declare 关键字的作用
- 混淆 .d.ts 与 .ts 的编译行为

**延伸追问**：
- `declare module` 和 `declare global` 有什么区别？
- 如何为一个 JS 库手写类型声明文件？

**参考资源**：
- [TypeScript 官方文档 - Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

---
