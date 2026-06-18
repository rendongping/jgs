# TypeScript 练习册

> 每道题后附答案与解析，建议先独立完成再对照。

---

## 一、选择题

### 第 1 题

以下哪个类型表示“任意类型，但使用前必须进行类型检查”？

A. `any`  
B. `unknown`  
C. `never`  
D. `void`

**答案：B**

**解析**：`unknown` 是类型安全的 `any`，不能直接调用方法或赋值给具体类型，必须先收窄。`any` 完全关闭检查；`never` 表示不可能值；`void` 表示无返回值。

---

### 第 2 题

以下代码会报错吗？

```ts
interface Animal {
  name: string;
}
interface Animal {
  age: number;
}
const a: Animal = { name: "Cat", age: 2 };
```

A. 会报错，因为重复定义接口  
B. 不会报错，interface 会自动声明合并  
C. 会报错，因为属性顺序不对  
D. 会报错，因为缺少 readonly

**答案：B**

**解析**：`interface` 支持声明合并（declaration merging），同名的多个 interface 会自动合并为一个。`type` 则不允许同名声明。

---

### 第 3 题

下面泛型函数调用后，`result` 的类型是什么？

```ts
function wrap<T>(value: T): { value: T } {
  return { value };
}
const result = wrap(123);
```

A. `{ value: any }`  
B. `{ value: number }`  
C. `{ value: 123 }`  
D. `{ value: string }`

**答案：B**

**解析**：TypeScript 会根据传入参数 `123` 推断 `T` 为 `number`，因此返回类型为 `{ value: number }`。如果传入 `123 as const`，则可能推断为字面量类型 `123`。

---

### 第 4 题

以下代码的输出/类型结果是什么？

```ts
type A = string | number;
type B = number | boolean;
type C = A & B;
```

A. `C` 是 `string | number | boolean`  
B. `C` 是 `number`  
C. `C` 是 `never`  
D. 代码报错

**答案：B**

**解析**：`A & B` 是交叉类型，取交集。`A` 包含 string 和 number，`B` 包含 number 和 boolean，交集只有 number。

---

### 第 5 题

以下哪个写法能正确限制 `value` 只能是 `"left"`、`"right"`、`"center"`？

A. `type Align = string;`  
B. `type Align = "left" | "right" | "center";`  
C. `interface Align { value: string; }`  
D. `enum Align { LEFT, RIGHT, CENTER }`

**答案：B**

**解析**：联合字面量类型 `type Align = "left" | "right" | "center"` 可以精确限制字符串取值。枚举虽然也能限制，但底层是数字/字符串映射，语义不同。

---

## 二、填空题

### 第 6 题

补全以下代码，使 `user` 的 `id` 属性只读。

```ts
interface User {
  readonly id: number;
  name: string;
}
const user: User = { id: 1, name: "Tom" };
user.name = "Jerry";
// user.id = 2; // 应报错
```

横线处应填入：`readonly id`

**解析**：`readonly` 修饰的属性只能在初始化时赋值，之后不能重新赋值。注意 `readonly` 只影响属性引用，对象内部属性如果是引用类型仍可修改。

---

### 第 7 题

补全类型，使 `getValue` 可以安全地从对象中取值。

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { name: "Alice", age: 25 };
getValue(user, "name"); // 类型为 string
```

横线处应填入：`K extends keyof T`

**解析**：`keyof T` 获取对象 `T` 的所有键的联合类型，`K extends keyof T` 约束 `K` 必须是 `T` 的键，`T[K]` 表示属性值类型。

---

### 第 8 题

写出下面条件类型的结果。

```ts
type IsArray<T> = T extends any[] ? true : false;
type R1 = IsArray<number[]>; // ______
type R2 = IsArray<string>;   // ______
```

**答案：`true`、`false`**

**解析**：条件类型 `T extends any[] ? true : false` 判断 `T` 是否为数组类型。`number[]` 满足，`string` 不满足。

---

### 第 9 题

补全映射类型，使 `Optional<T>` 的所有属性变为可选。

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

横线处应填入：`[K in keyof T]?: T[K]`

**解析**：映射类型遍历 `T` 的每个键 `K`，通过 `?:` 将其变为可选属性，值类型保持 `T[K]`。

---

### 第 10 题

补全以下类型保护函数。

```ts
interface Cat { meow(): void; }
interface Dog { bark(): void; }

function isCat(animal: Cat | Dog): animal is Cat {
  return typeof (animal as Cat).meow === "function";
}
```

横线处应填入：`animal is Cat`

**解析**：自定义类型保护函数的返回类型必须是 `parameter is Type` 形式，这样 TypeScript 才能在 if 分支中正确收窄类型。

---

## 三、代码分析题

### 第 11 题

分析以下代码是否会报错，并说明原因。

```ts
interface User {
  name: string;
  age?: number;
}
const u: User = { name: "Alice", age: undefined };
```

**答案**：取决于 `strictNullChecks` 配置。

**解析**：
- 当 `strictNullChecks` 为 `true` 时，`age?: number` 表示 age 可以是 `number | undefined`，显式赋 `undefined` 是允许的。
- 如果 `strictNullChecks` 为 `false`，则 `undefined` 可以赋给任何类型，也不会报错。
- 但若写成 `age: number` 且 `strictNullChecks: true`，则不能赋 `undefined`。

---

### 第 12 题

分析以下类型结果。

```ts
type Person = {
  name: string;
  age: number;
  address: {
    city: string;
  };
};

type NameOrAge = Person["name" | "age"];
type AddressCity = Person["address"]["city"];
```

**答案**：

- `NameOrAge` 是 `string | number`。
- `AddressCity` 是 `string`。

**解析**：索引访问类型 `Person["name" | "age"]` 可以同时获取多个属性的类型，结果为联合类型。链式索引访问 `Person["address"]["city"]` 可以深入获取嵌套属性类型。

---

### 第 13 题

下面代码会报错吗？为什么？

```ts
function logLength<T>(arg: T): void {
  console.log(arg.length);
}
logLength("hello");
logLength(123);
```

**答案**：`logLength(123)` 会报错。

**解析**：没有约束的泛型 `T` 可以是任意类型，TypeScript 不能保证 `arg` 一定有 `length` 属性。应使用泛型约束：

```ts
function logLength<T extends { length: number }>(arg: T): void {
  console.log(arg.length);
}
```

---

### 第 14 题

分析以下代码的输出/类型。

```ts
type EventMap = {
  click: { x: number; y: number };
  keydown: { key: string };
};

type EventPayload<T extends keyof EventMap> = EventMap[T];

const p: EventPayload<"click"> = { x: 1, y: 2 };
```

**答案**：`EventPayload<"click">` 是 `{ x: number; y: number }`。

**解析**：`keyof EventMap` 得到 `"click" | "keydown"`，通过泛型参数 `T` 索引 `EventMap`，可以动态获取事件对应的负载类型。这种模式常用于事件系统、路由参数映射。

---

## 四、编程实践题

### 第 15 题

实现一个 `DeepPartial<T>`，使嵌套对象的所有属性都变为可选。

**参考答案**：

```ts
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

**解析**：
- 遍历 `T` 的每个属性，将其变为可选 `?:`。
- 如果属性值是对象类型，则递归应用 `DeepPartial`。
- 注意：数组也是 object，会递归到数组元素类型。

---

### 第 16 题

实现 `MyReturnType<T>`，提取函数返回值类型。

**参考答案**：

```ts
type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never;
```

**解析**：
- 约束 `T` 为函数类型。
- 使用 `infer R` 推断返回值类型。
- 如果 `T` 不是函数（理论上不会发生），返回 `never`。

---

### 第 17 题

实现 `MyOmit<T, K>`，从类型 `T` 中剔除属性 `K`。

**参考答案**：

```ts
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
// 或使用现有工具类型组合
type MyOmit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

**解析**：
- 方法一：使用键重映射 `as P extends K ? never : P`，把要剔除的键映射为 `never`。
- 方法二：用 `Exclude` 从 `keyof T` 中排除 `K`，再用 `Pick` 选取剩余属性。

---

### 第 18 题

实现一个类型安全的 `EventEmitter`。

**参考答案**：

```ts
type EventMap = {
  click: { x: number; y: number };
  keydown: { key: string };
};

class TypedEventEmitter<Events extends Record<string, any>> {
  private listeners: { [K in keyof Events]?: Array<(payload: Events[K]) => void> } = {};

  on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    this.listeners[event]?.forEach(l => l(payload));
  }
}

const emitter = new TypedEventEmitter<EventMap>();
emitter.on("click", e => console.log(e.x, e.y));
emitter.emit("click", { x: 1, y: 2 });
```

**解析**：
- 使用泛型 `Events` 描述事件映射。
- `on` 和 `emit` 的 `K extends keyof Events` 保证事件名和负载类型一致。
- 这样可以在编译期防止事件名拼写错误和负载类型不匹配。

---

### 第 19 题

实现 `Flatten<T>`，将二维数组类型拍平为一维数组类型。

**参考答案**：

```ts
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : [];

type R = Flatten<[[1, 2], [3, 4], 5]>; // [1, 2, 3, 4, 5]
```

**解析**：
- 使用递归条件类型 + 变长元组推断。
- 如果当前元素是数组，递归拍平；否则直接保留。
- 这是较高级的类型体操，适合理解元组类型的模式匹配。

---

### 第 20 题

为以下 JavaScript 函数编写完整的 TypeScript 类型定义。

```js
function fetchUser(userId, options) {
  return fetch(`/api/users/${userId}`, options).then(r => r.json());
}
```

**参考答案**：

```ts
interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: BodyInit;
}

interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(userId: number, options?: FetchOptions): Promise<User> {
  return fetch(`/api/users/${userId}`, options).then(r => r.json());
}
```

**解析**：
- 为参数和返回值添加类型。
- `options` 可选。
- `fetch` 的第二个参数类型可以直接复用 `RequestInit`，这里为了演示自定义接口使用了 `FetchOptions`。

---

## 练习建议

1. 在 TS Playground 中实时验证类型推导结果。
2. 类型体操适可而止，优先保证业务代码可读。
3. 多阅读优秀库（如 Vue、React、RxJS）的类型定义，学习实战技巧。

---

> **领域编号**：F02 TypeScript  
> **最后更新**：2026-06-18
