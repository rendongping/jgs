# Flutter 面试题

> 本题库共收录 **55** 道面试题（基础 12 / 进阶 18 / 深入 12 / 架构 13）。
> 本文件收录 Flutter 相关面试题，目标题量 30 道。
> 题型覆盖：概念题、代码分析题、手写代码题、场景设计题、系统设计题、框架原理题、性能优化题、工程化题、综合开放题。
> 难度覆盖：基础、进阶、深入、架构。
> 每道题除标准参考答案外，另附**口头回答版**，便于面试时快速组织语言。

## 目录

- [基础题](#basic)
- [进阶题](#advanced)
- [深入题](#proficient)
- [架构题](#architect)

---

## 基础题（8 道）{#basic}

### FB-47-CO-B-001：Dart 的 null safety 是什么？`?`、`!`、`late` 分别怎么用？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：47 Flutter
**标签**：Dart、null safety、late、可空类型、类型系统
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Dart sound null safety 的核心思想，并说明 `?`、`!`、`late` 三个关键符号的使用场景与区别。

**参考答案**：

Dart 2.12 引入的 sound null safety 让类型默认是非空的，编译器可以在编译期排除大部分空指针异常，从而提升代码安全性和运行时性能。

- `T?`：声明可空类型。变量可以存 `T` 或 `null`。
- `!`：空断言操作符。告诉编译器“我确定这个可空表达式此刻不为 null”，如果判断错误会在运行时抛异常。
- `late`：延迟初始化。用于非空变量无法在声明时赋值，但会在使用前完成初始化；如果访问时仍未初始化会抛 `LateInitializationError`。

代码示例：

```dart
String name = 'Flutter';          // 非空，不能赋 null
String? nickname;                 // 可空，默认为 null
String display = nickname ?? name;// 空合并运算符

String sure(String? input) {
  return input!;                  // 断言 input 不为 null
}

late String config;
void init() {
  config = 'ready';               // 使用前完成初始化
}
```

最佳实践：
- 优先使用非空类型，减少 `!`。
- 用 `??`、`?.`、`??=` 等安全操作符处理可空值。
- `late` 只用于依赖注入、异步初始化等确实会延迟赋值的场景，避免滥用。

**评分维度**：
- 能说明 null safety 默认非空的语义（40%）
- 能正确区分 `?`、`!`、`late` 的使用场景（40%）
- 能给出安全操作符或代码示例（20%）

**常见错误**：
- 认为 `String?` 和 `String` 可以任意互换。
- 滥用 `!` 导致运行时空异常。
- 把 `late` 当成可空类型使用。

**延伸追问**：
- `late` 修饰的变量如果未初始化就被访问会发生什么？
- `List<int?>` 和 `List<int>?` 有什么区别？

**相关题目**：
- [FB-47-CO-B-005 StatefulWidget 的 setState](#FB-47-CO-B-005)
- [FB-47-CD-A-006 BLoC 计数器实现](#FB-47-CD-A-006)

**参考资源**：
- [Dart 官方文档 - Null safety](https://dart.dev/null-safety)
- [Flutter 官方文档 - Sound null safety](https://docs.flutter.dev/resources/bootstrap-into-dart#null-safety)

**口头回答版**：
> Dart 的 null safety 就是类型默认不能为空，编译器会帮我们排查空指针。`?` 表示这个变量可以是 null，比如 `String?`；`!` 是我们跟编译器保证“这里一定不是 null”，错了会崩溃；`late` 表示这个非空变量现在不初始化，但用之前一定会初始化。平时要少用 `!`，多用 `??`、`?.` 这些安全写法。

---

### FB-47-CO-B-002：StatelessWidget 和 StatefulWidget 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：47 Flutter
**标签**：Flutter、Widget、StatelessWidget、StatefulWidget、状态
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请对比 `StatelessWidget` 和 `StatefulWidget`，说明它们各自的特点、生命周期和适用场景。

**参考答案**：

- **StatelessWidget**：无内部状态， once built，除非父级重建或传入的 props 变化，否则不会主动更新。适用于纯展示型组件，如文本、图标、按钮。
- **StatefulWidget**：由 `StatefulWidget` 配置和 `State` 对象两部分组成。`State` 保存可变状态，调用 `setState` 后会触发重建。适用于需要交互或动画的组件。

生命周期差异：

| 阶段 | StatelessWidget | StatefulWidget |
|------|-----------------|----------------|
| 创建 | `constructor` → `build` | `createState` → `initState` → `build` |
| 更新 | 父级重建时重新 `build` | `didUpdateWidget` → `build` / `setState` → `build` |
| 销毁 | 随 Element 卸载 | `dispose` 中释放资源 |

示例：

```dart
class Greeting extends StatelessWidget {
  final String name;
  const Greeting({super.key, required this.name});

  @override
  Widget build(BuildContext context) {
    return Text('Hello $name');
  }
}

class Counter extends StatefulWidget {
  const Counter({super.key});
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => setState(() => count++),
      child: Text('Count: $count'),
    );
  }
}
```

最佳实践：
- 优先使用 `StatelessWidget`，将状态上提到真正需要它的地方。
- 在 `dispose` 里释放动画控制器、监听器、流订阅等资源。

**评分维度**：
- 能说明两者在状态持有上的核心区别（40%）
- 能列出主要生命周期节点（30%）
- 能给出典型使用场景或代码示例（30%）

**常见错误**：
- 在 `StatelessWidget` 里试图维护可变状态。
- 把 `StatefulWidget` 类本身当成状态存储位置（实际在 `State` 中）。
- 在 `build` 方法中执行副作用。

**延伸追问**：
- 为什么 `StatefulWidget` 要拆成 Widget 和 State 两个类？
- 一个 `StatefulWidget` 被移除后再插入，State 会复用吗？

**相关题目**：
- [FB-47-CO-B-005 StatefulWidget 的 setState](#FB-47-CO-B-005)
- [FB-47-FS-A-001 Flutter 三棵树与渲染流程](#FB-47-FS-A-001)

**参考资源**：
- [Flutter 官方文档 - StatefulWidget](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html)
- [Flutter 官方文档 - StatelessWidget](https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html)

**口头回答版**：
> StatelessWidget 没有内部状态，build 一次后只有父组件重建才会更新，适合纯展示。StatefulWidget 分两部分：Widget 本身负责配置，State 对象保存可变状态，调用 setState 会重新 build。StatefulWidget 有 initState、didUpdateWidget、dispose 等生命周期。优先用 StatelessWidget，需要交互和动画再用 StatefulWidget。

---

### FB-47-CO-B-003：Flutter 中 `Key` 的作用是什么？什么时候需要用 `Key`？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：47 Flutter
**标签**：Flutter、Key、Widget、Element、Diff
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 Flutter 中 `Key` 的作用，并说明 `LocalKey`、`GlobalKey`、`ValueKey` 等常见 Key 的使用场景。

**参考答案**：

`Key` 是 Widget 的标识，用于帮助 Framework 在更新时判断：当前位置的 Widget 是新创建的还是可以复用已有的 Element，从而决定是更新、移动还是销毁重建。

常见 Key 类型：

| Key 类型 | 说明 | 典型场景 |
|----------|------|----------|
| `ValueKey` | 用某个值做标识 | 列表项，如 `ValueKey(item.id)` |
| `ObjectKey` | 用整个对象做标识 | 数据项本身有唯一身份 |
| `UniqueKey` | 每次创建都唯一 | 强制重建，测试或动画切换 |
| `GlobalKey` | 全局唯一，可跨树访问 | 表单校验、获取 RenderBox、页面跳转 |
| `PageStorageKey` | 保存滚动位置 | 页面切换后恢复列表滚动位置 |

示例：

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      key: ValueKey(items[index].id),
      title: Text(items[index].title),
    );
  },
)
```

什么时候需要用 Key：
- 列表增删改、排序时，避免状态错位。
- 需要保持某个 StatefulWidget 状态跨父级重建。
- 需要跨组件树访问 State 或 RenderObject 时使用 `GlobalKey`。

最佳实践：
- 列表优先使用数据中稳定唯一的字段生成 `ValueKey`。
- 避免滥用 `UniqueKey`，因为它会导致每次都被重建。

**评分维度**：
- 能说明 Key 用于 Element 复用决策（40%）
- 能区分 ValueKey/GlobalKey 的使用场景（40%）
- 能指出列表中 Key 的重要性（20%）

**常见错误**：
- 认为 Key 只是为了消除警告。
- 用数组下标作为 ValueKey 的值。
- 滥用 GlobalKey 导致性能下降和类型耦合。

**延伸追问**：
- 两个同类型 Widget 的 Key 相同会发生什么？
- GlobalKey 为什么比普通 Key 开销大？

**相关题目**：
- [FB-47-CO-B-002 StatelessWidget 和 StatefulWidget](#FB-47-CO-B-002)
- [FB-47-FS-A-001 Flutter 三棵树与渲染流程](#FB-47-FS-A-001)

**参考资源**：
- [Flutter 官方文档 - Keys](https://docs.flutter.dev/ui/widgets-intro#keys)
- [Flutter 官方视频 - Widgets 101: Key](https://www.youtube.com/watch?v=kn0EOS-ZiIc)

**口头回答版**：
> Key 是 Widget 的身份证，Flutter 在更新时靠 Key 判断这个 Widget 是复用原来的 Element 还是重新创建。列表里用 ValueKey 最好绑定唯一 id，不要拿 index 当 Key，否则排序删除时状态会错位。GlobalKey 可以跨树访问 State 或拿 RenderBox，适合表单校验、页面跳转，但比较重，不要滥用。

---

### FB-47-CO-B-004：Hot Reload 和 Hot Restart 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：47 Flutter
**标签**：Flutter、Hot Reload、Hot Restart、开发效率、Dart VM
**出现频率**：高频
**预计回答时长**：2-3 分钟

**题目描述**：
请说明 Flutter 中 Hot Reload 和 Hot Restart 的区别、实现原理和适用场景。

**参考答案**：

- **Hot Reload（热重载）**：将更新后的 Dart 代码注入正在运行的 Dart VM，保留应用状态，触发受影响 Widget 重建。适合 UI 调整、逻辑小改动，几乎秒级反馈。
- **Hot Restart（热重启）**：重新启动应用，重新加载代码，但不需要重新编译 native 层，应用状态会被重置。适合需要重新执行 `main()`、初始化逻辑或修复全局状态污染时。

对比：

| 维度 | Hot Reload | Hot Restart |
|------|------------|-------------|
| 状态保留 | 保留 | 重置 |
| 启动入口 | 不重新执行 main | 重新执行 main |
| 耗时 | 通常 < 1s | 通常 2-5s |
| 适用场景 | UI 调整、局部逻辑 | 全局状态、初始化代码 |

限制：
- Hot Reload 不会重新执行 `initState`，因此新增的状态初始化可能不生效。
- 修改 `main()`、全局变量初始化、枚举、泛型签名等可能需要 Hot Restart。
- Native 代码（Android/iOS）改动必须重新编译安装。

最佳实践：
- 优先使用 Hot Reload 快速验证 UI。
- 当界面表现异常或状态不一致时尝试 Hot Restart。

**评分维度**：
- 能说明两者在状态保留上的区别（40%）
- 能说明各自适用场景（30%）
- 能指出 Hot Reload 的限制（30%）

**常见错误**：
- 认为 Hot Reload 会重新执行所有初始化代码。
- 修改原生插件后不重新编译，只依赖 Hot Reload。
- 在 initState 里写测试代码后困惑为什么 Hot Reload 没生效。

**延伸追问**：
- 修改了 `main()` 函数后为什么必须 Hot Restart？
- Hot Reload 在 Dart VM 层面是怎么实现的？

**相关题目**：
- [FB-47-CO-B-002 StatelessWidget 和 StatefulWidget](#FB-47-CO-B-002)
- [FB-47-FS-P-006 StatefulWidget 生命周期与 Element 复用](#FB-47-FS-P-006)

**参考资源**：
- [Flutter 官方文档 - Hot Reload](https://docs.flutter.dev/tools/hot-reload)
- [Flutter 官方文档 - Hot Restart](https://docs.flutter.dev/tools/hot-reload#hot-restart)

**口头回答版**：
> Hot Reload 是改完 Dart 代码后快速注入到正在运行的 VM，保留当前状态，UI 秒级刷新；Hot Restart 是重新启动应用，状态会重置，但不需要重新编 native 层。平时调 UI 用热重载，改 main 或者全局初始化、状态乱了就用热重启。注意原生代码改了必须重新编译安装。

---

### FB-47-CO-B-005：StatefulWidget 中 `setState` 做了什么？使用时有何注意？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：47 Flutter
**标签**：Flutter、setState、State、重建、状态管理
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请解释 `setState` 的作用、执行流程，并说明使用中的注意事项。

**参考答案**：

`setState` 是 `State` 类的方法，用于通知 Framework 当前 State 对象发生了改变，需要重新调度 `build` 方法生成新的 Widget 树。

执行流程：
1. 调用 `setState(() { /* 更新状态 */ })`。
2. Framework 将当前 Element 标记为 dirty。
3. 在下一帧绘制前，Framework 会对 dirty Element 调用 `build`。
4. 新的 Widget 树与旧树对比，进行 Element 复用或重建，最终更新 RenderObject。

注意事项：
- `setState` 只能写在 State 的生命周期或事件回调中，不能在 `build` 中调用，否则会导致无限循环。
- 应将状态修改逻辑放在 `setState` 回调内，虽然直接写在外面也可能生效，但语义不清晰。
- 避免在 `setState` 中执行耗时操作；应该提前计算好，再更新状态。

示例：

```dart
class _CounterState extends State<Counter> {
  int count = 0;

  void increment() {
    setState(() {
      count++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: increment,
      child: Text('Count: $count'),
    );
  }
}
```

最佳实践：
- 只把真正变化的局部状态放在 `StatefulWidget` 中。
- 对于跨组件共享状态，考虑 Provider、Riverpod、BLoC 等方案。

**评分维度**：
- 能说明 setState 通知 Framework 重建（40%）
- 能指出不能在 build 中调用（30%）
- 能给出正确使用示例（30%）

**常见错误**：
- 在 `build` 里调用 `setState` 导致栈溢出。
- 把异步请求直接写在 `setState` 回调里。
- 认为 `setState` 会立即同步调用 build。

**延伸追问**：
- 连续调用三次 `setState` 会触发三次重建吗？
- 如何只重建 Widget 树的一部分？

**相关题目**：
- [FB-47-CA-B-006 下面代码点击后 count 是多少](#FB-47-CA-B-006)
- [FB-47-FS-A-004 Provider 与 InheritedWidget](#FB-47-FS-A-004)

**参考资源**：
- [Flutter 官方文档 - setState](https://api.flutter.dev/flutter/widgets/State/setState.html)
- [Flutter 官方文档 - State 生命周期](https://docs.flutter.dev/ui/widgets-intro#stateful-widgets)

**口头回答版**：
> setState 就是告诉 Flutter：我的状态变了，下一帧帮我重新 build。调用后当前 Element 会被标记为 dirty，等 VSync 到来时重新调用 build。注意不能在 build 里调 setState，会死循环；也别把异步操作塞进去。状态比较小就在 StatefulWidget 里用 setState，复杂共享状态要上状态管理方案。

---

### FB-47-CA-B-006：下面代码点击按钮后 count 的值是多少？为什么？

**题型**：代码分析题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：47 Flutter
**标签**：Flutter、setState、闭包、异步、状态更新
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：

```dart
class Counter extends StatefulWidget {
  const Counter({super.key});
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  void increment() async {
    await Future.delayed(const Duration(milliseconds: 100));
    setState(() {
      count = count + 1;
    });
    setState(() {
      count = count + 1;
    });
    setState(() {
      count = count + 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: increment,
      child: Text('Count: $count'),
    );
  }
}
```

点击一次按钮后，`count` 的值是多少？为什么？

**参考答案**：

点击一次按钮后，`count` 会从 0 增加到 3。

原因：

1. `setState` 虽然是异步调度 build，但状态赋值本身是同步立即执行的。
2. 三次 `setState` 连续调用，Dart 会按顺序同步执行回调中的 `count = count + 1`。
3. 每次读取的 `count` 都是内存中最新的值，因此最终 `count` 为 3。
4. 三次 `setState` 会把同一个 Element 标记为 dirty，但 Framework 在同一帧内只会对这个 Element 执行一次 build。

与 React 的 `setState` 不同，Flutter 的 `setState` 没有“合并多个增量”的语义；`count` 是普通 Dart 字段，读取时总是当前值。

最佳实践：
- 如果只是基于当前值计算，可直接赋值；若依赖最新状态，也可拆成独立计算。
- 连续 `setState` 不会多次 rebuild，但应尽量减少不必要的状态更新，保持代码清晰。

**评分维度**：
- 正确判断最终 count 为 3（30%）
- 能解释 setState 回调同步执行（40%）
- 能说明同一帧内只会 build 一次（30%）

**常见错误**：
- 受 React 影响，认为多次 setState 会合并成一次 +1。
- 以为每次 setState 都会立即重新 build。
- 忽略 `await` 导致的状态读取时机，但本题 await 后 count 仍为 0，不影响结果。

**延伸追问**：
- 如果在 setState 中执行异步操作，会出现什么问题？
- 如何在异步回调中安全地更新状态？

**相关题目**：
- [FB-47-CO-B-005 StatefulWidget 中 setState](#FB-47-CO-B-005)
- [FB-47-CD-A-006 BLoC 计数器实现](#FB-47-CD-A-006)

**参考资源**：
- [Flutter 官方文档 - setState](https://api.flutter.dev/flutter/widgets/State/setState.html)
- [Flutter 官方文档 - StatefulWidget 生命周期](https://docs.flutter.dev/ui/widgets-intro#stateful-widgets)

**口头回答版**：
> 点一下按钮，count 会变成 3。Flutter 的 setState 回调是同步执行的，虽然 rebuild 是异步调度的，但 `count = count + 1` 每次都能读到最新值，所以三次加 1 就是 3。注意同一个 Element 在同一帧里只会 build 一次，不会重建三次。这跟 React 的 setState 合并不一样。

---

### FB-47-CO-B-007：`pubspec.yaml` 在 Flutter 项目中的作用是什么？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：47 Flutter
**标签**：Flutter、pubspec、依赖管理、资源、包管理
**出现频率**：中频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 `pubspec.yaml` 的主要作用，并列举常见的配置项。

**参考答案**：

`pubspec.yaml` 是 Flutter/Dart 项目的核心配置文件，由 `pub` 工具读取，用于管理包元数据、依赖、资源、字体、版本约束等。

常见配置项：

| 配置项 | 说明 |
|--------|------|
| `name` | 包名，必须是合法的 Dart 标识符 |
| `version` | 包版本，遵循语义化版本 |
| `description` | 包描述 |
| `environment` | Dart/Flutter SDK 版本约束，如 `sdk: '>=3.0.0 <4.0.0'` |
| `dependencies` | 生产依赖 |
| `dev_dependencies` | 开发依赖，如测试、代码生成工具 |
| `dependency_overrides` | 覆盖依赖版本，用于本地调试 |
| `flutter` → `assets` | 静态资源目录或文件 |
| `flutter` → `fonts` | 自定义字体配置 |
| `flutter` → `uses-material-design` | 是否使用 Material 图标字体 |

示例：

```yaml
name: my_app
description: A sample Flutter project.
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/config.json
  fonts:
    - family: CustomFont
      fonts:
        - asset: assets/fonts/CustomFont-Regular.ttf
```

最佳实践：
- 使用 `^x.y.z` 允许兼容的次版本/补丁更新，避免锁死版本。
- 不要把敏感信息放进 `assets` 中直接发布。
- 更新 `pubspec.yaml` 后运行 `flutter pub get`。

**评分维度**：
- 能说明 pubspec.yaml 是项目核心配置（30%）
- 能列举 dependencies、assets、fonts 等关键配置（40%）
- 能给出版本约束或资源示例（30%）

**常见错误**：
- 把资源路径写错，如忘记末尾 `/` 表示目录。
- 把测试依赖放到 `dependencies` 中。
- 版本约束写得太松，导致依赖冲突。

**延伸追问**：
- `pubspec.lock` 和 `pubspec.yaml` 有什么区别？
- 如何管理多环境配置（如 dev/prod API 地址）？

**相关题目**：
- [FB-47-EN-R-005 Flutter CI/CD 与 Flavor 管理](#FB-47-EN-R-005)
- [FB-47-PE-R-002 Flutter 包体积优化](#FB-47-PE-R-002)

**参考资源**：
- [Flutter 官方文档 - Pubspec](https://docs.flutter.dev/tools/pubspec)
- [Dart 官方文档 - Pub dependencies](https://dart.dev/tools/pub/dependencies)

**口头回答版**：
> pubspec.yaml 是 Flutter 项目的配置文件，管包名、版本、依赖、资源、字体这些。dependencies 放生产依赖，dev_dependencies 放测试和 lint 工具，assets 配置静态资源，fonts 配置自定义字体。写完后要 flutter pub get。版本约束一般用 `^` 来允许兼容更新。

---

### FB-47-CO-B-008：请简述 Flutter 的 Widget Tree、Element Tree 和 Render Tree 之间的关系。

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级 / 高级
**面试知识域**：47 Flutter
**标签**：Flutter、Widget、Element、RenderObject、三棵树
**出现频率**：高频
**预计回答时长**：3-5 分钟

**题目描述**：
请说明 Flutter 中 Widget Tree、Element Tree 和 Render Tree（RenderObject Tree）各自的职责，以及它们之间的关系。

**参考答案**：

Flutter 使用“三棵树”来组织界面：

- **Widget Tree**：由不可变的配置对象组成，描述 UI 长什么样。每次状态变化都会生成新的 Widget 树。
- **Element Tree**：Widget 的实例化产物，是连接 Widget 和 RenderObject 的桥梁，持有可变状态。Element 是可变的，Framework 会尽量复用它。
- **Render Tree（RenderObject Tree）**：负责真正的布局、绘制和命中测试。每个 RenderObject 都对应屏幕上的视觉元素。

关系：

| 树 | 主要职责 | 生命周期 |
|----|----------|----------|
| Widget Tree | 描述 UI 配置 | 每次重建都产生新对象 |
| Element Tree | 管理状态、连接 Widget 与 RenderObject | 跨帧复用 |
| Render Tree | 布局、绘制、事件命中 | 可复用，必要时重建 |

`Widget` 是 “Blueprint（蓝图）”，`Element` 是 “Instance（实例）”，`RenderObject` 是 “Painter（画师）”。

示例对应关系：

```dart
Text('Hello');           // Widget
TextElement              // 内部 Element，开发者通常不直接使用
RenderParagraph          // RenderObject，负责绘制文本
```

最佳实践：
- 通过 const 构造 Widget 减少 Widget 对象创建。
- 使用 Key 帮助 Element 在兄弟节点中正确复用。

**评分维度**：
- 能说明三棵树各自的职责（50%）
- 能说明 Widget 不可变、Element 可变可复用（30%）
- 能给出对应关系示例（20%）

**常见错误**：
- 认为 Widget Tree 直接被绘制到屏幕。
- 混淆 Element 和 RenderObject。
- 认为每次 setState 都会重建所有 RenderObject。

**延伸追问**：
- StatefulWidget 的状态保存在哪棵树上？
- `RenderObject` 什么时候会被销毁？

**相关题目**：
- [FB-47-CO-B-003 Flutter 中 Key 的作用](#FB-47-CO-B-003)
- [FB-47-FS-A-001 Flutter 三棵树与渲染流程](#FB-47-FS-A-001)

**参考资源**：
- [Flutter 官方文档 - The Widget Tree](https://docs.flutter.dev/resources/architectural-overview#widget-tree)
- [Flutter 官方视频 - Flutter's Rendering Pipeline](https://www.youtube.com/watch?v=UUfXWzp0-DU)

**口头回答版**：
> Flutter 里有三棵树：Widget Tree 是配置，每次 setState 都会产生新的 Widget；Element Tree 是 Widget 的实例，保存状态，尽量复用；Render Tree 是真正负责布局、绘制和点击测试的。可以把 Widget 当蓝图，Element 当实例，RenderObject 当画师。 StatefulWidget 的状态就保存在 Element 上。

---

## 进阶题（8 道）{#advanced}

### FB-47-FS-A-001：请详细描述 Flutter 的渲染流程：从 Widget 到屏幕像素经历了哪些阶段？

**题型**：框架原理题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：47 Flutter
**标签**：Flutter、渲染、Widget、Element、RenderObject、Pipeline
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请从 Widget 创建开始，说明 Flutter 是如何把它最终绘制到屏幕上的，涉及哪些核心对象和阶段。

**参考答案**：

Flutter 渲染可概括为：构建（Build）→ 布局（Layout）→ 绘制（Paint）→ 合成（Composite）→ 光栅化（Rasterize）。

核心对象与阶段：

1. **Widget**：不可变的配置对象，描述 UI 结构。`State.build()` 或 `RenderObjectWidget` 返回 Widget 树。
2. **Element**：`Widget.createElement()` 生成。`Element` 持有可变状态，负责将 Widget 的变化同步到 `RenderObject`。
3. **RenderObject**：由 `RenderObjectWidget.createRenderObject()` 创建，负责布局约束、尺寸计算、绘制和命中测试。
4. **Layer**：绘制结果的层级抽象，`RenderObject` 通过 `PaintingContext` 将内容绘制到 `PictureLayer` 等图层上。
5. **Scene / Engine**：`SceneBuilder` 将 Layer Tree 构建为 `Scene`，提交给 GPU 线程光栅化。

流程图：

```text
Widget Tree
    ↓ createElement / update
Element Tree
    ↓ createRenderObject / updateRenderObject
RenderObject Tree
    ↓ layout → paint
Layer Tree
    ↓ composite
Scene → GPU Rasterization → Screen Pixels
```

关键说明：
- `build` 阶段只生成配置，不直接操作屏幕。
- `layout` 采用约束-尺寸（constraints-go-down, sizes-go-up）的单次/多次遍历。
- `paint` 采用深度优先，子节点通常在父节点裁剪和变换后绘制。
- 合成阶段把多个 Layer 合并，减少重绘区域。

最佳实践：
- 使用 `const` 构造 Widget，减少不必要的 build。
- 使用 `RepaintBoundary` 将复杂但稳定的子树隔离，避免重绘扩散。

**评分维度**：
- 能说出 Build → Layout → Paint → Composite → Rasterize 五个阶段（40%）
- 能说明 Widget/Element/RenderObject 的职责分工（30%）
- 能提到 Layer、Scene 或约束-尺寸模型（30%）

**常见错误**：
- 认为 Widget 直接被绘制。
- 混淆 Layout 和 Paint 的触发时机。
- 认为 setState 一定会触发 Layout 和 Paint。

**延伸追问**：
- RenderObject 的 `performLayout` 和 `paint` 分别在什么时候调用？
- 什么是 Relayout Boundary 和 Repaint Boundary？

**相关题目**：
- [FB-47-CO-B-008 Widget/Element/Render Tree 关系](#FB-47-CO-B-008)
- [FB-47-FS-A-002 Skia 与 Impeller 渲染引擎](#FB-47-FS-A-002)

**参考资源**：
- [Flutter 官方文档 - Inside Flutter](https://docs.flutter.dev/resources/inside-flutter)
- [Flutter 官方文档 - Rendering](https://docs.flutter.dev/resources/architectural-overview#rendering)

**口头回答版**：
> Flutter 渲染分五步：build 生成 Widget 树，然后创建或更新 Element，再创建或更新 RenderObject；RenderObject 做 layout 和 paint，把结果画到 Layer 上；最后把 Layer Tree 合成 Scene 交给 GPU 光栅化，输出到屏幕。Widget 只是配置，Element 保存状态，RenderObject 真正负责布局和绘制。

---

### FB-47-FS-A-002：Skia 和 Impeller 有什么区别？Impeller 解决了什么问题？

**题型**：框架原理题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：47 Flutter
**标签**：Flutter、Skia、Impeller、渲染引擎、着色器、性能
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Flutter 的两个渲染后端 Skia 和 Impeller，说明 Impeller 的设计目标和解决的问题。

**参考答案**：

- **Skia**：Google 的 2D 图形库，Flutter 早期使用 Skia 作为渲染后端。它在运行时将高级绘制指令编译为 GPU 着色器（shader），在低端设备或首次启动时容易产生“着色器编译卡顿”（shader compilation jank）。
- **Impeller**：Flutter 自研的渲染引擎，目标是消除运行时着色器编译带来的卡顿。它在编译期预编译绝大多数着色器，运行时主要做简单的着色器组合和 tessellation（三角化）。

对比：

| 维度 | Skia | Impeller |
|------|------|----------|
| 着色器编译 | 运行时 JIT/解释 | 编译期预编译 |
| 渲染模型 | 通用 2D 库 | 为 Flutter 量身定制 |
| 启动性能 | 可能存在 shader warm-up 阶段 | 首次帧更稳定 |
| 内存占用 | 依赖运行时缓存 | 预编译产物略有增加 |
| 平台支持 | 全平台 | iOS 默认，Android 逐步默认 |

Impeller 的核心改进：
1. **预编译 Pipelines**：Metal/Vulkan 的渲染管线在构建时确定，减少运行时状态切换。
2. ** tessellation 几何处理**：将矢量图形拆分为三角形，避免依赖 GPU 的复杂图元支持。
3. **统一着色器**：大部分效果通过统一着色器加 uniform 参数实现，不再临时编译。

启用方式：

```bash
# iOS 默认开启；Android 在 3.19+ 默认开启 Vulkan 后端
# 如需显式开关，可通过 flag：
flutter run --enable-impeller
```

最佳实践：
- 升级到较新 Flutter 版本，享受 Impeller 默认优化。
- 如果依赖自定义 Skia shader，需评估 Impeller 兼容性。

**评分维度**：
- 能说明 Skia 运行时编译 shader 导致卡顿（40%）
- 能说明 Impeller 预编译和 tessellation 思路（40%）
- 能指出平台默认开启状态（20%）

**常见错误**：
- 认为 Impeller 只是 Skia 的简单封装。
- 认为 Impeller 在所有平台所有设备都默认开启。
- 忽略 Impeller 对自定义 shader 的兼容性问题。

**延伸追问**：
- Impeller 的 Entity Pass 是什么？
- 如何监控和对比 Skia 与 Impeller 的帧率？

**相关题目**：
- [FB-47-FS-A-001 Flutter 渲染流程](#FB-47-FS-A-001)
- [FB-47-PE-P-004 Flutter 性能调优实战](#FB-47-PE-P-004)

**参考资源**：
- [Flutter 官方文档 - Impeller](https://docs.flutter.dev/perf/impeller)
- [Flutter 团队博客 - Impeller 架构](https://medium.com/flutter/impeller-flutters-new-rendering-engine-f7d9b236d3d5)

**口头回答版**：
> Skia 是 Flutter 早期用的 2D 图形库，它会在运行时把绘制指令编译成 GPU 着色器，低端机上第一次运行容易卡。Impeller 是 Flutter 自研的渲染引擎，在编译期就把着色器预编译好，运行时主要做三角化和简单的管线切换，能显著减少 shader jank。现在 iOS 已经默认开启，Android 也在逐步默认。

---

### FB-47-CO-A-003：Navigator 1.0 和 Navigator 2.0 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：47 Flutter
**标签**：Flutter、Navigator、路由、声明式导航、深层链接
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Flutter 的 Navigator 1.0 与 Navigator 2.0，说明它们的适用场景和核心差异。

**参考答案**：

- **Navigator 1.0**：基于命令式 API，通过 `Navigator.push` / `pop` 管理路由栈。适合页面关系简单、深层链接需求弱的应用。
- **Navigator 2.0**：基于声明式 API，将路由状态作为应用状态的一部分，通过 `Router` + `RouteInformationParser` + `RouterDelegate` + `BackButtonDispatcher` 来同步 URL 与页面栈。适合需要浏览器回退、深层链接、复杂导航状态的应用。

对比：

| 维度 | Navigator 1.0 | Navigator 2.0 |
|------|---------------|---------------|
| API 风格 | 命令式 | 声明式 |
| URL 同步 | 需手动处理 | 原生支持 |
| 深层链接 | 较难 | 较容易 |
| 学习成本 | 低 | 高 |
| 状态管理 | 隐式在 Navigator 中 | 显式在 RouterDelegate 中 |

Navigator 1.0 示例：

```dart
Navigator.push(context, MaterialPageRoute(builder: (_) => DetailPage()));
Navigator.pop(context);
```

Navigator 2.0 简化结构：

```dart
MaterialApp.router(
  routerDelegate: MyRouterDelegate(),
  routeInformationParser: MyRouteInformationParser(),
  routeInformationProvider: PlatformRouteInformationProvider(...),
  backButtonDispatcher: RootBackButtonDispatcher(),
)
```

最佳实践：
- 小型 App 或没有 Web/深度链接需求的场景继续使用 Navigator 1.0。
- 需要与系统 URL、浏览器回退、深层链接对齐时使用 Navigator 2.0 或 go_router。
- 大多数项目推荐使用 `go_router` 等封装库，减少样板代码。

**评分维度**：
- 能说明命令式与声明式的核心差异（40%）
- 能列出 Navigator 2.0 的核心角色（30%）
- 能给出适用场景或示例（30%）

**常见错误**：
- 认为 Navigator 2.0 完全替代了 1.0。
- 在 Navigator 2.0 中仍然大量使用 `Navigator.push` 而不同步路由状态。
- 混淆 `RouteInformationParser` 和 `RouterDelegate` 的职责。

**延伸追问**：
- `go_router` 是如何在 Navigator 2.0 基础上做简化的？
- 如何处理 Android 返回键与 Web 浏览器后退？

**相关题目**：
- [FB-47-FS-A-001 Flutter 渲染流程](#FB-47-FS-A-001)
- [FB-47-SD-R-001 Flutter 大型应用架构](#FB-47-SD-R-001)

**参考资源**：
- [Flutter 官方文档 - Navigation and routing](https://docs.flutter.dev/ui/navigation)
- [Flutter 官方文档 - Navigator 2.0](https://docs.flutter.dev/development/ui/navigation)

**口头回答版**：
> Navigator 1.0 是命令式导航，用 push/pop 管理页面栈，写法简单，适合普通 App。Navigator 2.0 是声明式导航，把路由状态当成应用状态的一部分，通过 Router、RouteInformationParser、RouterDelegate 来同步 URL 和页面栈，适合要做 Web、深层链接或者复杂导航状态的项目。现在一般直接用 go_router 封装，减少样板代码。

---

### FB-47-FS-A-004：Provider 是如何基于 InheritedWidget 工作的？

**题型**：框架原理题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：47 Flutter
**标签**：Flutter、Provider、InheritedWidget、状态管理、依赖注入
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 `InheritedWidget` 的作用，并说明 `Provider` 是如何利用 `InheritedWidget` 实现状态共享与依赖注入的。

**参考答案**：

`InheritedWidget` 是 Flutter Framework 提供的一种特殊 Widget，用于在 Widget Tree 中高效地向下传递数据。它的特点：
- 子节点可以通过 `dependOnInheritedWidgetOfExactType` 订阅它。
- 当 `InheritedWidget` 的 `updateShouldNotify` 返回 true 时，依赖它的子节点会被标记为 dirty 并重建。
- 数据流向是单向的：从上往下。

`Provider` 是对 `InheritedWidget` 的封装，提供了更友好的 API 和多种 Provider 类型：

| Provider 类型 | 说明 |
|---------------|------|
| `Provider` | 提供不可变对象或已有实例 |
| `ChangeNotifierProvider` | 提供 `ChangeNotifier`，监听通知后重建 |
| `ValueListenableProvider` | 监听 `ValueListenable` |
| `StreamProvider` / `FutureProvider` | 提供异步数据 |
| `MultiProvider` | 组合多个 Provider |

基本用法：

```dart
ChangeNotifierProvider(
  create: (_) => CounterModel(),
  child: MyApp(),
)

// 读取
context.watch<CounterModel>();    // 订阅变化，会重建
context.read<CounterModel>();     // 只读一次，不订阅
context.select<CounterModel, int>((m) => m.count); // 只监听部分字段
```

原理：
- `Provider` 内部使用 `InheritedProvider`（InheritedWidget 子类）存放数据。
- `context.watch<T>()` 会调用 `dependOnInheritedWidgetOfExactType<T>` 建立依赖关系。
- 当 `ChangeNotifier` 调用 `notifyListeners()`，`InheritedProvider` 的 `updateShouldNotify` 触发重建。

最佳实践：
- 用 `context.read` 获取只在事件回调中使用的对象，避免不必要重建。
- 用 `Selector` 或 `select` 精准订阅字段，减少重建范围。
- 不要把所有状态都塞进一个 Provider，按业务模块拆分。

**评分维度**：
- 能说明 InheritedWidget 向下传递数据和订阅机制（30%）
- 能说明 Provider 是 InheritedWidget 的封装（30%）
- 能区分 watch/read/select 的使用场景（40%）

**常见错误**：
- 在 build 中频繁 `context.read` 然后监听状态变化。
- 把 `ChangeNotifierProvider` 和 `Provider` 混用。
- 在一个巨大 Provider 里放所有状态，导致大范围重建。

**延伸追问**：
- `InheritedWidget` 和 `Notification` 有什么异同？
- Provider 的 `updateShouldNotify` 默认是怎么比较的？

**相关题目**：
- [FB-47-CO-A-005 Riverpod 与 Provider 的区别](#FB-47-CO-A-005)
- [FB-47-CD-A-006 BLoC 计数器实现](#FB-47-CD-A-006)

**参考资源**：
- [Flutter 官方文档 - InheritedWidget](https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html)
- [Provider 官方文档](https://pub.dev/packages/provider)

**口头回答版**：
> InheritedWidget 是 Flutter 原生用来在 Widget 树里向下传数据的机制，子节点可以订阅它，数据变了就会重建。Provider 本质上就是包了一层 InheritedWidget，让我们更方便地注入和读取状态。比如 ChangeNotifierProvider 内部存一个 ChangeNotifier，调用 notifyListeners 后会让依赖它的子树重建。读取时 context.watch 会订阅，context.read 只读不订阅，select 可以只监听某个字段，减少不必要的重建。

---

### FB-47-CO-A-005：Riverpod 与 Provider 相比有哪些核心改进？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：47 Flutter
**标签**：Flutter、Riverpod、Provider、状态管理、编译安全
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请对比 Riverpod 和 Provider，说明 Riverpod 解决了 Provider 的哪些痛点。

**参考答案**：

Riverpod 由 Provider 原作者开发，定位为 Provider 的继任者，核心改进：

1. **编译时安全**：Provider 依赖泛型 `T` 和 BuildContext，类型错误或作用域错误只能在运行时发现；Riverpod 使用代码生成或全局 Provider 声明，错误可以在编译期暴露。
2. **不依赖 BuildContext**：Riverpod 通过 `WidgetRef` 或 `ProviderContainer` 读取状态，可以在 UI 之外使用，例如在 `main()`、路由守卫、测试、 isolate 中。
3. **更细粒度的监听**：`ConsumerWidget`、`ConsumerStatefulWidget`、`ProviderScope`、`select` 等 API 让订阅范围更精确。
4. **自动内存管理**：Riverpod 自动处理 Provider 的创建、缓存和释放，减少内存泄漏风险。
5. **支持异步/派生状态原生化**：`FutureProvider`、`StreamProvider`、`StateProvider`、`StateNotifierProvider`、`AsyncValue` 等更贴合异步场景。
6. **作用域灵活**：通过 `ProviderScope` 可以覆盖 Provider 值，实现多环境、测试隔离等。

对比：

| 维度 | Provider | Riverpod |
|------|----------|----------|
| BuildContext | 必需 | 不强制依赖 |
| 编译安全 | 较弱 | 较强（配合代码生成） |
| 测试 | 依赖 BuildContext 或 MultiProvider | 可直接用 ProviderContainer |
| 异步处理 | FutureProvider / StreamProvider | AsyncValue 更统一 |
| 内存管理 | 手动 dispose | 自动 dispose |

示例：

```dart
// Riverpod 2.x
@riverpod
String greeting(GreetingRef ref) => 'Hello Riverpod';

class MyWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final text = ref.watch(greetingProvider);
    return Text(text);
  }
}
```

最佳实践：
- 新项目或已有 Provider 项目的大型重构可优先考虑 Riverpod。
- 配合 `riverpod_generator` + `build_runner` 实现编译安全。

**评分维度**：
- 能指出编译时安全和 BuildContext 解耦（40%）
- 能说明自动内存管理和 AsyncValue（30%）
- 能给出适用场景或代码示例（30%）

**常见错误**：
- 认为 Riverpod 只是 Provider 的语法糖。
- 在 Riverpod 中仍然到处传 BuildContext。
- 混淆 Provider Family 和普通 Provider 的使用。

**延伸追问**：
- `ref.watch` 和 `ref.read` 有什么区别？
- Riverpod 的 `ProviderScope` 如何实现覆盖和测试隔离？

**相关题目**：
- [FB-47-FS-A-004 Provider 与 InheritedWidget](#FB-47-FS-A-004)
- [FB-47-CP-P-002 Flutter 状态管理方案选型](#FB-47-CP-P-002)

**参考资源**：
- [Riverpod 官方文档](https://riverpod.dev/)
- [Riverpod vs Provider](https://riverpod.dev/docs/from_provider/quickstart)

**口头回答版**：
> Riverpod 是 Provider 原作者写的下一代状态管理库。最大改进是编译期更安全，不再强依赖 BuildContext，可以在 main 或测试里直接读取状态；另外自动管理 Provider 生命周期，异步状态用 AsyncValue 统一处理。新项目我倾向直接上 Riverpod，老项目如果规模大、痛点明显也可以逐步迁移。

---

### FB-47-CD-A-006：请手写一个基于 BLoC 的计数器，并说明其核心设计。

**题型**：手写代码题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：47 Flutter
**标签**：Flutter、BLoC、状态管理、Stream、事件驱动
**出现频率**：高频
**预计回答时长**：5-10 分钟

**题目描述**：
请手写一个最简单的 BLoC（Business Logic Component）计数器，包含 Event、State、Bloc 三个部分，并说明数据流向。

**参考答案**：

BLoC 模式的核心思想是：把业务逻辑从 UI 中抽离，UI 通过 Event 驱动 Bloc，Bloc 内部处理后输出 State，UI 监听 State 重建。

代码示例：

```dart
// 1. 定义 Event
abstract class CounterEvent {}
class CounterIncrementPressed extends CounterEvent {}
class CounterDecrementPressed extends CounterEvent {}

// 2. 定义 State
class CounterState {
  final int count;
  const CounterState(this.count);
}

// 3. 定义 Bloc
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(const CounterState(0)) {
    on<CounterIncrementPressed>((event, emit) {
      emit(CounterState(state.count + 1));
    });
    on<CounterDecrementPressed>((event, emit) {
      emit(CounterState(state.count - 1));
    });
  }
}
```

UI 层使用：

```dart
class CounterPage extends StatelessWidget {
  const CounterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => CounterBloc(),
      child: Scaffold(
        body: BlocBuilder<CounterBloc, CounterState>(
          builder: (context, state) {
            return Center(child: Text('Count: ${state.count}'));
          },
        ),
        floatingActionButton: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            FloatingActionButton(
              onPressed: () {
                context.read<CounterBloc>().add(CounterIncrementPressed());
              },
              child: const Icon(Icons.add),
            ),
          ],
        ),
      ),
    );
  }
}
```

数据流向：

```text
UI Event → Bloc.on<Event> → 业务逻辑 → emit(State) → UI rebuild
```

最佳实践：
- Event/State 用不可变对象，便于比较和调试。
- 复杂业务可用 `BlocListener` 处理副作用，如导航、弹 Toast。
- 用 `Equatable` 或 `freezed` 简化 State 相等性判断。

**评分维度**：
- 能拆分 Event/State/Bloc 三层（40%）
- 能正确写出 on/emit 逻辑（30%）
- 能在 UI 层正确 add Event 和 rebuild（30%）

**常见错误**：
- 在 Bloc 中直接操作 UI。
- State 是可变对象，emit 后发现 UI 不更新。
- 混淆 Bloc 和 Cubit 的用法。

**延伸追问**：
- BLoC 中的 State 为什么要不可变？
- Cubit 和 Bloc 有什么本质区别？

**相关题目**：
- [FB-47-CO-A-005 Riverpod 与 Provider 的区别](#FB-47-CO-A-005)
- [FB-47-CP-P-002 Flutter 状态管理方案选型](#FB-47-CP-P-002)

**参考资源**：
- [BLoC 官方文档](https://bloclibrary.dev/)
- [Flutter 官方文档 - State management](https://docs.flutter.dev/development/data-and-backend/state-mgmt)

**口头回答版**：
> BLoC 就是把业务逻辑从 UI 里抽出来。我们先定义 Event，比如加一、减一；再定义 State，比如计数值；然后 Bloc 里通过 on 监听事件，用 emit 发出新状态。UI 用 BlocBuilder 监听状态变化重建，按钮点击时通过 `context.read<CounterBloc>().add` 发送事件。State 最好做成不可变的，方便比较。

---

### FB-47-PE-A-007：Flutter 性能优化有哪些常用手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：47 Flutter
**标签**：Flutter、性能优化、重建、RepaintBoundary、ListView、DevTools
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请列举 Flutter 应用开发中常见的性能优化手段，并说明每种手段解决的问题。

**参考答案**：

Flutter 性能优化可从“减少 build 次数”、“降低 layout/paint 开销”、“减少 GPU/CPU 压力”三个层面入手。

常用手段：

| 优化手段 | 解决的问题 |
|----------|------------|
| `const` 构造 Widget | 减少 Widget 对象创建和 Element 比较 |
| `ListView.builder` / `GridView.builder` | 按需构建子项，避免一次性创建大量 Widget |
| `RepaintBoundary` | 隔离重绘区域，避免整屏重绘 |
| `setState` 最小化 | 只重建状态变化的最小子树 |
| `shouldRebuild` / `Selector` / `select` | 精准订阅，减少不必要重建 |
| 避免在 build 中做耗时计算 | 减少 UI 线程阻塞 |
| 图片缓存与压缩 | 减少内存和 GPU 纹理压力 |
| `Opacity` 替代 `AnimatedOpacity` 之外的方式 | 某些情况下使用 `FadeTransition` 更高效 |
| 使用 `compute` / isolate | 将耗时任务放到后台线程 |
| 减少 shader warm-up jank | 升级到 Impeller 或使用预编译缓存 |

代码示例：

```dart
// 使用 const 和 builder
ListView.builder(
  itemCount: 10000,
  itemBuilder: (context, index) {
    return const ListTile(
      leading: Icon(Icons.star),
      title: Text('Item'),
    );
  },
)

// 局部刷新
class _CounterState extends State<Counter> {
  int count = 0;
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Text('Static text'), // 不会因为 count 重建
        Text('Count: $count'),
      ],
    );
  }
}
```

最佳实践：
- 先用 DevTools 的 Performance、CPU Profiler、Memory 工具定位瓶颈，再优化。
- 不要过早优化，优先保证代码可读性。

**评分维度**：
- 能列举至少 5 个优化手段（40%）
- 能说明每个手段针对的问题（30%）
- 能提到 DevTools 或测量先行（30%）

**常见错误**：
- 所有 Widget 都包一层 `const` 但忽略动态依赖。
- 滥用 `RepaintBoundary`，导致 Layer 过多。
- 不在真机上测试，只在模拟器上判断性能。

**延伸追问**：
- 如何使用 Flutter DevTools 定位 rebuild 热点？
- `ListView.builder` 的 `findChildIndexCallback` 有什么作用？

**相关题目**：
- [FB-47-PE-P-004 Flutter 性能调优实战](#FB-47-PE-P-004)
- [FB-47-PE-R-002 Flutter 包体积优化](#FB-47-PE-R-002)

**参考资源**：
- [Flutter 官方文档 - Performance best practices](https://docs.flutter.dev/perf/best-practices)
- [Flutter 官方文档 - DevTools](https://docs.flutter.dev/tools/devtools)

**口头回答版**：
> Flutter 性能优化可以从减少重建、降低绘制开销、减少主线程阻塞这几方面做。常用手段有：const 构造 Widget、用 ListView.builder 懒加载、RepaintBoundary 隔离重绘、setState 只影响最小子树、用 Selector 精准监听、耗时计算放 isolate、图片压缩缓存。优化前先用 DevTools 看 CPU 和 Performance 找到真正的瓶颈，不要盲目优化。

---

### FB-47-CO-A-008：Flutter 平台通道（Platform Channel）有哪几种？它们分别适合什么场景？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：47 Flutter
**标签**：Flutter、Platform Channel、MethodChannel、EventChannel、原生通信
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 中三种 Platform Channel 的区别、数据流向及典型使用场景。

**参考答案**：

Flutter 通过 Platform Channel 与宿主平台（Android/iOS/macOS/Windows/Linux）通信。三种基本通道：

| Channel 类型 | 数据方向 | 典型场景 |
|--------------|----------|----------|
| `MethodChannel` | 双向异步调用 | 调用一次性的原生 API，如获取电池电量、扫码、支付 |
| `EventChannel` | 原生 → Flutter 持续事件流 | 监听传感器、GPS、蓝牙状态、网络状态 |
| `BasicMessageChannel` | 双向自定义编解码 | 需要自定义消息格式或二进制协议 |

通信流程：

```text
Dart MethodChannel.invokeMethod
        ↓
Flutter Engine (BinaryMessenger)
        ↓
Android: MethodChannel.setMethodCallHandler
iOS:     FlutterMethodChannel setMethodCallHandler
```

MethodChannel 示例：

```dart
// Dart 端
static const platform = MethodChannel('com.example/battery');
final int batteryLevel = await platform.invokeMethod('getBatteryLevel');
```

```kotlin
// Android 端
val channel = MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "com.example/battery")
channel.setMethodCallHandler { call, result ->
  if (call.method == "getBatteryLevel") {
    val level = getBatteryLevel()
    result.success(level)
  } else {
    result.notImplemented()
  }
}
```

最佳实践：
- Channel name 使用唯一域名风格字符串，避免冲突。
- 原生端处理完成后必须调用 `result.success/error/notImplemented`，否则 Dart 端会挂起。
- 复杂通信考虑封装成 Federated Plugin。

**评分维度**：
- 能区分三种 Channel 的适用场景（50%）
- 能说明 MethodChannel 的调用-响应流程（30%）
- 能提到 result 必须回调（20%）

**常见错误**：
- 在 UI 线程执行耗时原生调用，导致卡顿。
- 忘记处理 `result.notImplemented()`。
- 认为 Platform Channel 是同步调用。

**延伸追问**：
- 原生端如何主动给 Flutter 发消息？
- Platform Channel 的数据是如何编解码的？

**相关题目**：
- [FB-47-FS-P-005 Platform Channel 编解码与自定义 Codec](#FB-47-FS-P-005)
- [FB-47-SD-R-007 如何开发 Flutter 插件与 PlatformView](#FB-47-SD-R-007)

**参考资源**：
- [Flutter 官方文档 - Writing custom platform-specific code](https://docs.flutter.dev/platform/platform-channels)
- [Flutter 官方文档 - Host API](https://docs.flutter.dev/platform/android/platform-channels?tab=type-messages-kotlin)

**口头回答版**：
> Flutter 平台通道有三种：MethodChannel 做双向的方法调用，比如获取电量、扫码；EventChannel 让原生持续发事件给 Flutter，适合传感器、定位；BasicMessageChannel 用于自定义消息格式。调用是异步的，原生端处理完一定要调 result.success 或 error，否则 Dart 端会一直等。Channel 名字要用唯一域名风格，避免冲突。

---

## 深入题（7 道）{#proficient}

### FB-47-FS-P-001：Impeller 的渲染管线是怎样的？相比 Skia 在哪些环节做了优化？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：47 Flutter
**标签**：Flutter、Impeller、渲染管线、Metal、Vulkan、着色器
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请深入描述 Impeller 的渲染管线结构，并说明它在顶点处理、着色器、纹理管理等环节相比 Skia 做了哪些优化。

**参考答案**：

Impeller 的渲染管线核心目标是“预编译、预分配、运行时只做最少工作”。

主要结构：

1. **Aiks（高级 API 层）**：Flutter 的 DisplayList 调用 Aiks API，将绘制指令转换为 Impeller 的 Entity。
2. **Entity（绘制实体）**：每个 Entity 代表一次绘制操作，包含几何信息、变换、材质、混合模式等。
3. **Geometry / Tessellation**：将路径、圆角矩形等矢量图形拆分为三角形网格，避免运行时依赖 GPU 的复杂图元光栅化。
4. **Content Context & Pipeline**：管理渲染管线状态、着色器和纹理；管线状态在编译期基本固定，运行时只做绑定。
5. **Renderer / RenderTarget**：管理帧缓冲、Command Buffer 的提交。
6. **Backend（Metal / Vulkan / OpenGL）**： Impeller 目前主要面向 Metal（iOS）和 Vulkan（Android），未来也会支持 OpenGL ES。

相比 Skia 的优化：

| 环节 | Skia | Impeller |
|------|------|----------|
| Shader 编译 | 运行时根据绘制指令动态生成并编译 | 预编译为 shader library，运行时只做选择/组合 |
| 管线状态 | 运行时动态构建 | 编译期确定大部分 PSO（Pipeline State Object） |
| 矢量图形 | 依赖 GPU 路径填充或软件回退 | 预先生成三角形网格（tessellation） |
| CPU 端开销 | 较高，尤其是复杂路径和特效 | 更低，更多工作在 GPU 上并行 |
| 首帧稳定性 | 容易出现 shader warm-up jank | 更稳定 |

需要注意的 trade-off：
- 包体积会因预编译 shader 而增加。
- 某些高级 Skia 特效或自定义 shader 在 Impeller 上可能需要适配。

最佳实践：
- 使用 Flutter 稳定版并开启 Impeller，监控 FPS 和帧时间。
- 对自定义绘制，优先使用 Impeller 支持良好的 Canvas API。

**评分维度**：
- 能描述 Entity、Tessellation、Pipeline 等核心概念（40%）
- 能说明预编译 shader 和管线状态的优势（30%）
- 能指出 Impeller 的 trade-off（30%）

**常见错误**：
- 认为 Impeller 完全没有 shader。
- 把 Impeller 和 Flutter Engine 的线程模型混为一谈。
- 忽略 Impeller 在不同后端（Metal/Vulkan）上的差异。

**延伸追问**：
- Impeller 是如何处理文字的？
- 如果应用中使用了大量自定义 Shader，迁移 Impeller 要注意什么？

**相关题目**：
- [FB-47-FS-A-002 Skia 与 Impeller 渲染引擎](#FB-47-FS-A-002)
- [FB-47-PE-P-004 Flutter 性能调优实战](#FB-47-PE-P-004)

**参考资源**：
- [Impeller 设计文档](https://github.com/flutter/flutter/wiki/Impeller)
- [Flutter 官方文档 - Impeller 性能](https://docs.flutter.dev/perf/impeller)

**口头回答版**：
> Impeller 的渲染管线大致是：Flutter 的绘制指令先变成 Aiks 层的调用，再生成 Entity；每个 Entity 会把路径等矢量图形做三角化，然后绑定预编译好的管线和着色器，提交给 Metal 或 Vulkan。相比 Skia，Impeller 把着色器和管线状态在编译期就定好，运行时只做选择和绑定，所以首帧更稳定，CPU 开销更低。代价是包体积会大一点，某些自定义 shader 需要适配。

---

### FB-47-CP-P-002：Flutter 状态管理方案众多，Provider、Riverpod、BLoC、GetX 各适合什么场景？如何选型？

**题型**：综合开放题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：47 Flutter
**标签**：Flutter、状态管理、Provider、Riverpod、BLoC、GetX、选型
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请对比 Provider、Riverpod、BLoC、GetX 四种 Flutter 状态管理方案，并给出选型维度和建议。

**参考答案**：

选型维度：

| 维度 | 说明 |
|------|------|
| 学习曲线 | 团队熟悉成本 |
| 编译安全 | 能否在编译期发现作用域/类型错误 |
| 可测试性 | 是否容易单元测试、mock |
| 可维护性 | 代码结构是否清晰、是否易扩展 |
| 生态与社区 | 文档、插件、长期维护 |
| 性能 | 重建范围控制、内存管理 |

方案对比：

| 方案 | 核心思想 | 优点 | 缺点 | 适用场景 |
|------|----------|------|------|----------|
| **Provider** | 封装 InheritedWidget | 简单、文档丰富、生态成熟 | 依赖 BuildContext、运行时作用域错误 | 中小型项目、团队刚入门 |
| **Riverpod** | Provider 继任者，编译安全 | 不依赖 Context、自动内存管理、AsyncValue 统一 | 2.x 引入代码生成，学习成本略高 | 中大型项目、追求可维护性 |
| **BLoC** | Event → State 事件驱动 | 结构清晰、适合复杂业务、可预测 | 样板代码多、小项目显得笨重 | 复杂业务流、大型团队 |
| **GetX** | 响应式 + 路由 + DI 一体化 | 上手快、功能全、代码量少 | 耦合度高、测试困难、社区争议大 | 快速原型、个人项目 |

选型建议：
- 新手项目 / 小团队：Provider 或 Riverpod。
- 强调业务边界和可预测性：BLoC / Cubit。
- 需要快速交付、全栈一体化：可评估 GetX，但要警惕长期维护成本。
- 中大型项目推荐 **Riverpod + BLoC/Cubit 分层**：Riverpod 管依赖注入和异步数据，Cubit 管局部业务状态。

最佳实践：
- 状态管理只负责“状态”，不要把 UI 逻辑、路由、副作用都塞进去。
- 对全局状态分层：主题/语言、用户会话、页面级状态、局部 UI 状态分开管理。

**评分维度**：
- 能从多个维度对比四种方案（40%）
- 能指出各方案的优缺点（30%）
- 能给出具体选型建议而非仅罗列特性（30%）

**常见错误**：
- 只根据“流行”选型，不考虑团队现状。
- 认为一个项目只能用一种状态管理方案。
- 把 GetX 的所有功能混用，导致代码难以测试。

**延伸追问**：
- 如果团队已经用 Provider，迁移到 Riverpod 的成本和步骤是什么？
- 如何设计一个跨状态管理方案共享的全局状态？

**相关题目**：
- [FB-47-FS-A-004 Provider 与 InheritedWidget](#FB-47-FS-A-004)
- [FB-47-CD-A-006 BLoC 计数器实现](#FB-47-CD-A-006)
- [FB-47-SD-R-006 Flutter 大规模状态管理架构](#FB-47-SD-R-006)

**参考资源**：
- [Flutter 官方文档 - State management options](https://docs.flutter.dev/development/data-and-backend/state-mgmt/options)
- [Riverpod 官方文档](https://riverpod.dev/)
- [BLoC 官方文档](https://bloclibrary.dev/)

**口头回答版**：
> Provider 简单成熟，适合中小型项目，但依赖 BuildContext；Riverpod 是下一代，编译更安全，也不依赖 Context，适合中大型项目；BLoC 用事件驱动状态，结构清晰但样板代码多，适合复杂业务；GetX 一体化上手快，但耦合高、测试难，适合原型。选型要看团队熟悉度、项目规模和可维护性。我一般会推荐 Riverpod 或 BLoC，大型项目可以组合使用。

---

### FB-47-SC-P-003：在现有原生 App 中嵌入 Flutter（Add-to-App）有哪些技术方案和挑战？

**题型**：场景设计题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：47 Flutter
**标签**：Flutter、Add-to-App、混合开发、Flutter Engine、PlatformView
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计在现有 Android/iOS 原生应用中嵌入 Flutter 模块的方案，并分析可能遇到的性能、通信、路由、构建等方面的挑战。

**参考答案**：

核心方案：

1. **Flutter Module**：将 Flutter 代码作为 `flutter_module`，通过 AAR（Android）和 Framework/Pod（iOS）集成到原生项目。
2. **FlutterEngineGroup**：共享同一个 Dart VM 和多个 FlutterEngine，降低内存占用和启动时间。
3. **PlatformView**：在 Flutter 中嵌入原生 View（如地图、视频播放器）。
4. **Hybrid Composition / Texture**：处理 PlatformView 的渲染层级问题。

关键挑战与对策：

| 挑战 | 对策 |
|------|------|
| 启动耗时 | 使用 FlutterEngine 预热、延迟加载、复用 Engine |
| 内存占用 | 使用 FlutterEngineGroup 共享资源、及时销毁不用的 Engine |
| 路由统一 | 原生路由与 Flutter Navigator 对齐，使用 Channel 或共享路由状态 |
| 状态同步 | 通过 MethodChannel / EventChannel 同步登录态、主题等 |
| 构建集成 | 使用 `flutter build aar` / `flutter build ios-framework`，结合 CI 自动产出 |
| 返回手势/生命周期 | 桥接 Activity/ViewController 生命周期到 Flutter Engine |
| 包体积增大 | 启用 deferred components、裁剪 ABI、混淆压缩 |

架构示例：

```text
Native App
 ├─ Native Pages
 ├─ FlutterEngineGroup
 │   ├─ FlutterEngine (Home)
 │   └─ FlutterEngine (Profile)
 └─ FlutterFragment / FlutterViewController
```

最佳实践：
- 每个业务模块使用独立的 FlutterEngine，由 EngineGroup 管理。
- 对共享数据采用缓存 + Channel 同步，避免重复请求。
- 在原生层封装 Flutter 启动工具类，统一生命周期管理。

**评分维度**：
- 能说出 Flutter Module、EngineGroup、PlatformView 三种方案（40%）
- 能分析启动、内存、路由、通信等挑战（30%）
- 能给出可落地的架构或实现思路（30%）

**常见错误**：
- 每个页面都创建独立 Engine，导致内存爆炸。
- 忽略原生生命周期桥接，导致 Flutter 页面状态异常。
- 在 Flutter 和原生之间重复维护路由表。

**延伸追问**：
- 多个 FlutterEngine 之间如何共享 Dart 单例？
- PlatformView 在 Android 和 iOS 上的实现差异是什么？

**相关题目**：
- [FB-47-CO-A-008 Platform Channel 类型与场景](#FB-47-CO-A-008)
- [FB-47-SD-R-007 如何开发 Flutter 插件与 PlatformView](#FB-47-SD-R-007)

**参考资源**：
- [Flutter 官方文档 - Add Flutter to existing app](https://docs.flutter.dev/add-to-app)
- [Flutter 官方文档 - Multiple Flutters](https://docs.flutter.dev/add-to-app/multiple-flutters)

**口头回答版**：
> 在原生 App 里嵌入 Flutter 一般把 Flutter 代码打成 Module，然后用 FlutterEngineGroup 共享 Dart VM 和多个 Engine，既降低内存又加快启动。需要处理的问题包括：启动耗时要用预热、内存要用 EngineGroup、路由要在原生和 Flutter 之间对齐、状态用 Channel 同步、包体积用 deferred components 和裁剪 ABI。PlatformView 可以嵌入原生 View，但要注意层级和性能。

---

### FB-47-PE-P-004：Flutter 性能调优实战：如何定位并解决卡顿、掉帧、内存泄漏？

**题型**：性能优化题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：47 Flutter
**标签**：Flutter、性能优化、卡顿、掉帧、内存泄漏、DevTools
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请结合 Flutter DevTools 和实际案例，说明如何系统性地定位并解决 UI 卡顿、掉帧和内存泄漏问题。

**参考答案**：

性能问题通常分三类：UI 线程阻塞、Raster/GPU 线程阻塞、内存泄漏/内存过大。

**一、定位工具**

| 工具 | 用途 |
|------|------|
| Flutter Performance Overlay | 实时显示 UI/Raster 线程耗时 |
| DevTools Performance | 分析每一帧的 build/layout/paint 耗时 |
| DevTools CPU Profiler | 抓取 Dart 方法耗时火焰图 |
| DevTools Memory | 查看对象引用、泄漏、GC 情况 |
| DevTools Network | 检查网络请求耗时和并发 |

**二、卡顿/掉帧常见原因与对策**

1. **Build 耗时过长**
   - 现象：UI 线程黄色/红色条。
   - 对策：拆分 Widget、使用 const、避免在 build 中做复杂计算、ListView.builder 懒加载。

2. **Layout/Paint 耗时**
   - 现象：Raster 线程黄色/红色条。
   - 对策：减少 RepaintBoundary 滥用、避免复杂 Clip/Opacity 动画、升级到 Impeller。

3. **Shader Compilation Jank**
   - 现象：首屏/新页面偶发卡顿。
   - 对策：升级 Flutter 版本启用 Impeller；旧版本可用 `ShaderMask` 预热或缓存 sksl。

4. **主线程阻塞**
   - 现象：动画/滚动掉帧。
   - 对策：用 `compute` 或 isolate 处理 JSON 解析、图片编解码、大量计算。

**三、内存泄漏常见原因与对策**

1. **未释放监听器/控制器**：在 `dispose` 中 `removeListener`、`dispose` AnimationController、关闭 StreamSubscription。
2. **GlobalKey 或静态引用持有页面 State**：避免用静态 Map 缓存 State。
3. **图片缓存过大**：设置 `PaintingBinding.instance.imageCache.maximumSize`。
4. **PlatformView 资源未释放**：在页面销毁时同步释放原生资源。

示例：

```dart
class _MyPageState extends State<MyPage> {
  final _controller = AnimationController(vsync: this, duration: ...);
  StreamSubscription? _sub;

  @override
  void initState() {
    super.initState();
    _sub = stream.listen((_) {});
  }

  @override
  void dispose() {
    _sub?.cancel();
    _controller.dispose();
    super.dispose();
  }
}
```

最佳实践：
- 建立性能基线：在真机上记录关键页面 FPS、启动时间、内存峰值。
- 使用 `flutter run --profile` 或 `--trace-startup` 收集准确数据。
- 对长列表使用 `AutomaticKeepAliveClientMixin` 需谨慎，避免无限增长内存。

**评分维度**：
- 能区分 UI 线程和 Raster 线程瓶颈（30%）
- 能使用 DevTools 定位问题（30%）
- 能给出 build/layout/paint/内存的具体优化方案（40%）

**常见错误**：
- 只在模拟器上测试性能。
- 看到 rebuild 次数多就滥用 const，忽略动态数据依赖。
- 把 `RepaintBoundary` 当作万能优化手段。

**延伸追问**：
- 如何判断卡顿是来自 UI 线程还是 GPU 线程？
- 在 Flutter Web 上性能调优有什么特殊点？

**相关题目**：
- [FB-47-PE-A-007 Flutter 性能优化常用手段](#FB-47-PE-A-007)
- [FB-47-PE-R-002 Flutter 包体积优化](#FB-47-PE-R-002)

**参考资源**：
- [Flutter 官方文档 - Performance profiling](https://docs.flutter.dev/perf/ui-performance)
- [Flutter 官方文档 - Memory leaks](https://docs.flutter.dev/perf/memory)

**口头回答版**：
> 调优先用 Performance Overlay 看是 UI 线程卡还是 Raster 线程卡。UI 线程卡通常是 build 或计算太重，要拆 Widget、用 const、把耗时操作放 isolate；Raster 线程卡是绘制太重，要减少复杂 Clip/Opacity、用 RepaintBoundary 隔离、升级 Impeller。内存泄漏重点看 dispose 里有没有释放监听器、动画控制器、StreamSubscription，图片缓存也要设上限。所有性能测试最好在真机的 profile 模式下做。

---

### FB-47-FS-P-005：Platform Channel 的编解码机制是怎样的？如何实现自定义 Codec？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：47 Flutter
**标签**：Flutter、Platform Channel、Codec、BinaryMessenger、MessageCodec
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 Platform Channel 中的 MessageCodec、MethodCodec 的作用，并说明如何实现自定义编解码以传递复杂对象。

**参考答案**：

Platform Channel 的所有通信都通过 `BinaryMessenger` 传输二进制消息。为了把 Dart 类型和原生类型互相转换，Flutter 提供了 Codec 层：

- **MessageCodec**：负责单个消息的编码/解码。如 `StandardMessageCodec`、`JSONMessageCodec`、`BinaryCodec`。
- **MethodCodec**：在 MessageCodec 基础上封装方法调用格式，处理 `method`、`arguments`、`result`。如 `StandardMethodCodec`、`JSONMethodCodec`。

默认 StandardMessageCodec 支持的类型：

| Dart 类型 | Android 类型 | iOS 类型 |
|-----------|--------------|----------|
| null | null | nil |
| bool | Boolean | NSNumber |
| int | Integer/Long/BigInteger | NSNumber |
| double | Double | NSNumber |
| String | String | NSString |
| Uint8List | byte[] | FlutterStandardTypedData |
| List | List | NSArray |
| Map | Map | NSDictionary |

自定义 Codec 步骤：

1. 定义 Dart 端 `MessageCodec` 子类，实现 `encodeMessage` / `decodeMessage`。
2. Android 端实现 `MessageCodec` 接口。
3. iOS 端实现 `FlutterMessageCodec` 协议。
4. 用自定义 Codec 创建 `MethodChannel`。

Dart 示例：

```dart
class UserMessageCodec extends StandardMessageCodec {
  const UserMessageCodec();

  @override
  void writeValue(WriteBuffer buffer, dynamic value) {
    if (value is User) {
      buffer.putUint8(128); // 自定义类型标记
      writeValue(buffer, value.toMap());
    } else {
      super.writeValue(buffer, value);
    }
  }
}
```

最佳实践：
- 复杂对象优先使用 JSON/Protobuf，减少自定义 Codec 维护成本。
- 二进制大数据建议用 `BinaryCodec` 或共享文件/内存，避免频繁跨线程拷贝。

**评分维度**：
- 能说明 MessageCodec 与 MethodCodec 的分层（30%）
- 能列举 StandardMessageCodec 支持的类型（30%）
- 能给出自定义 Codec 的思路或代码（40%）

**常见错误**：
- 自定义类型未在两端实现对称的编解码。
- 在 Platform Channel 中频繁传输大对象。
- 忽略 Dart 端和原生端字节序或类型差异。

**延伸追问**：
- 为什么 Platform Channel 不直接支持自定义 Dart 类？
- EventChannel 使用哪种 Codec？

**相关题目**：
- [FB-47-CO-A-008 Platform Channel 类型与场景](#FB-47-CO-A-008)
- [FB-47-SD-R-007 如何开发 Flutter 插件与 PlatformView](#FB-47-SD-R-007)

**参考资源**：
- [Flutter 官方文档 - Platform Channel codecs](https://docs.flutter.dev/platform/platform-channels?tab=type-messages-kotlin)
- [Flutter API - MessageCodec](https://api.flutter.dev/flutter/services/MessageCodec-class.html)

**口头回答版**：
> Platform Channel 的消息最终都是二进制，通过 BinaryMessenger 传输。MessageCodec 负责单个消息的编解码，MethodCodec 再包一层方法调用格式。默认 StandardMessageCodec 支持 null、bool、int、double、String、List、Map 等基本类型。如果要传自定义对象，可以继承 StandardMessageCodec，给自定义类型打个标记，然后调用原生端也要实现对应的解析。复杂对象建议直接用 JSON 或 Protobuf，省事又稳定。

---

### FB-47-FS-P-006：StatefulWidget 的生命周期与 Element 的复用机制是怎样的？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：47 Flutter
**标签**：Flutter、StatefulWidget、生命周期、Element、复用、GlobalKey
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请深入描述 StatefulWidget 的完整生命周期，并结合 Element 的复用机制说明 `didUpdateWidget`、`deactivate`、`dispose` 的调用时机。

**参考答案**：

StatefulWidget 生命周期由 Widget、Element、State 三者协作完成。

完整生命周期：

```text
createState
  ↓
initState        // State 首次创建
  ↓
didChangeDependencies  // 依赖的 InheritedWidget 变化时也可能调用
  ↓
build
  ↓
didUpdateWidget  // 父级重建且 Widget 可复用时调用
  ↓
setState/build   // 状态变化触发重建
  ↓
deactivate       // Element 从树中移除，但可能复用
  ↓
dispose          // Element 被永久销毁
```

关键节点说明：

- `initState`：State 第一次创建时调用，只调用一次。适合初始化订阅、动画控制器。
- `didChangeDependencies`：在 `initState` 之后第一次 build 前调用；当依赖的 InheritedWidget 变化时也会调用。
- `didUpdateWidget`：当父级重建，新的 `StatefulWidget` 与旧的类型和 Key 相同，Element 会复用，调用此方法通知 State 配置已更新。
- `deactivate`：Element 从树中移除时调用，但如果带 GlobalKey 或相同 Key 被重新插入到别处，State 不会 dispose。
- `dispose`：Element 被永久销毁，释放资源。

Element 复用机制：

1. Framework 在更新时对比新旧 Widget 树。
2. 如果同一位置的新旧 Widget 类型相同且 Key 相同（或无 Key），对应的 Element 会被复用。
3. 复用时调用 `Element.update(newWidget)`，对于 StatefulElement 会触发 `didUpdateWidget`。
4. 如果 Widget 类型或 Key 不同，旧 Element 会被 `deactivate` 并 `dispose`，新 Element 创建。

代码示例：

```dart
class MyWidget extends StatefulWidget {
  final int id;
  const MyWidget({super.key, required this.id});

  @override
  State<MyWidget> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  @override
  void initState() {
    super.initState();
    print('initState ${widget.id}');
  }

  @override
  void didUpdateWidget(covariant MyWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.id != widget.id) {
      print('id changed from ${oldWidget.id} to ${widget.id}');
    }
  }

  @override
  void dispose() {
    print('dispose ${widget.id}');
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Text('id=${widget.id}');
}
```

最佳实践：
- 在 `didUpdateWidget` 中根据配置变化重置依赖，但要避免重复初始化。
- 在 `dispose` 中释放所有资源。
- 使用 GlobalKey 跨父级保留 State 时要清楚其内存和更新语义。

**评分维度**：
- 能完整列出生命周期节点（30%）
- 能解释 didUpdateWidget 和 dispose 的触发条件（30%）
- 能结合 Key 和 Element 复用机制说明（40%）

**常见错误**：
- 认为 `deactivate` 一定意味着 State 会被销毁。
- 在 `initState` 中读取未来会变化的 widget 属性，没有在 `didUpdateWidget` 中处理。
- 滥用 GlobalKey 保留 State，导致更新逻辑复杂化。

**延伸追问**：
- GlobalKey 为什么能跨树保留 State？
- `didChangeDependencies` 和 `build` 的调用顺序是怎样的？

**相关题目**：
- [FB-47-CO-B-002 StatelessWidget 和 StatefulWidget](#FB-47-CO-B-002)
- [FB-47-CO-B-003 Flutter 中 Key 的作用](#FB-47-CO-B-003)

**参考资源**：
- [Flutter 官方文档 - StatefulWidget 生命周期](https://docs.flutter.dev/ui/widgets-intro#stateful-widgets)
- [Flutter API - State](https://api.flutter.dev/flutter/widgets/State-class.html)

**口头回答版**：
> StatefulWidget 的生命周期是：createState 创建 State，initState 初始化，didChangeDependencies 在第一次 build 前和依赖的 InheritedWidget 变化时调用，然后 build。父级重建时如果 Widget 类型和 Key 没变，Element 会复用，调用 didUpdateWidget。Element 从树移除时调 deactivate，如果带 GlobalKey 被插到别处还能继续用；真正销毁时调 dispose。所以 dispose 里要释放资源，didUpdateWidget 里处理配置变化。

---

### FB-47-CO-P-007：Flutter 的测试体系是怎样的？Unit、Widget、Integration 测试各负责什么？

**题型**：概念题
**难度**：🔴 深入
**岗位层级**：高级 / 专家
**面试知识域**：47 Flutter
**标签**：Flutter、测试、Unit Test、Widget Test、Integration Test、Golden Test
**出现频率**：中频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 测试金字塔中的 Unit Test、Widget Test、Integration Test 各自的作用、运行环境和常用工具，并说明 Golden Test 的适用场景。

**参考答案**：

Flutter 测试金字塔：

```text
       /\
      /  \  Integration Test（集成测试）
     /____\
    /      \  Widget Test（组件测试）
   /________\
  /          \  Unit Test（单元测试）
 /____________\
```

| 类型 | 运行环境 | 关注点 | 速度 | 常用 API |
|------|----------|--------|------|----------|
| **Unit Test** | Dart VM | 业务逻辑、纯函数、模型、Repository | 最快 | `test` 包、`mockito` |
| **Widget Test** | Flutter Test 环境（无真实屏幕） | Widget 渲染、交互、查找、状态变化 | 中等 | `flutter_test` 包、`WidgetTester` |
| **Integration Test** | 真机/模拟器 | 端到端流程、原生交互、性能 | 最慢 | `integration_test` 包 |
| **Golden Test** | Flutter Test 环境 | UI 像素快照对比 | 中等 | `matchesGoldenFile` |

Widget Test 示例：

```dart
testWidgets('Counter increments', (WidgetTester tester) async {
  await tester.pumpWidget(const MaterialApp(home: Counter()));

  expect(find.text('0'), findsOneWidget);
  await tester.tap(find.byType(FloatingActionButton));
  await tester.pump();

  expect(find.text('1'), findsOneWidget);
});
```

Integration Test 示例：

```dart
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('login flow', (WidgetTester tester) async {
    app.main();
    await tester.pumpAndSettle();
    await tester.enterText(find.byKey(const Key('email')), 'a@b.com');
    await tester.tap(find.byType(ElevatedButton));
    await tester.pumpAndSettle();
    expect(find.text('Home'), findsOneWidget);
  });
}
```

Golden Test：
- 生成 UI 的像素基线图片，后续测试对比差异。
- 适合组件库、关键页面视觉回归。
- 注意不同平台字体/抗锯齿会导致差异，通常在 CI 的固定环境运行。

最佳实践：
- 核心逻辑优先写 Unit Test。
- 关键交互和边界 UI 写 Widget Test。
- 主流程冒烟测试用 Integration Test，控制在合理数量。
- CI 中运行 Golden Test 时固定 Flutter 版本和操作系统。

**评分维度**：
- 能区分三种测试的关注点和运行环境（40%）
- 能写出 Widget Test 或 Integration Test 基本结构（30%）
- 能说明 Golden Test 的适用场景和注意点（30%）

**常见错误**：
- 用 Integration Test 覆盖所有边界条件。
- Widget Test 中不 `pump()` 或 `pumpAndSettle()` 就断言。
- Golden Test 在不同机器上跑不通却归咎于代码。

**延伸追问**：
- 如何 mock 网络请求和 Platform Channel？
- Widget Test 中如何处理异步 FutureBuilder？

**相关题目**：
- [FB-47-CD-A-006 BLoC 计数器实现](#FB-47-CD-A-006)
- [FB-47-EN-R-005 Flutter CI/CD 与 Flavor 管理](#FB-47-EN-R-005)

**参考资源**：
- [Flutter 官方文档 - Testing](https://docs.flutter.dev/testing)
- [Flutter 官方文档 - Integration testing](https://docs.flutter.dev/testing/integration-tests)

**口头回答版**：
> Flutter 测试分三层：单元测试跑 Dart VM，测业务逻辑和纯函数，最快；Widget Test 在 Flutter 测试环境里测组件渲染和交互，用 tester.pump 和 find；集成测试在真机或模拟器上跑端到端流程，最慢但最接近真实。Golden Test 是做 UI 像素快照对比，适合组件库视觉回归，但要在固定环境跑。实际项目里要多写单元测试，核心交互写 Widget Test，主流程用少量集成测试。

---

## 架构题（32 道）{#architect}

### FB-47-SD-R-001：如何设计一个可维护、可扩展的 Flutter 大型应用架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：47 Flutter
**标签**：Flutter、架构、分层、模块化、Clean Architecture、DDD
**出现频率**：高频
**预计回答时长**：15-30 分钟

**题目描述**：
请设计一个 Flutter 大型应用的总体架构，包括分层、模块划分、状态管理、路由、依赖注入、网络/持久化等核心部分，并说明如此设计的理由。

**参考答案**：

大型 Flutter 应用推荐采用 **分层 + 模块化 + 领域驱动** 的思路。

一、分层架构

```text
presentation/        # UI 层：Pages、Widgets、ViewModels/Cubits
 ├─ pages/
 ├─ widgets/
 └─ blocs/           # 或 viewmodels

application/         # 应用服务层：用例（Use Cases）、Coordinator
 ├─ usecases/
 └─ services/

domain/              # 领域层：Entity、Repository 接口、Value Object
 ├─ entities/
 ├─ repositories/    # 抽象接口
 └─ failures/

data/                # 数据层：Repository 实现、Datasource、DTO、Mapper
 ├─ repositories/
 ├─ datasources/
 └─ models/

core/                # 基础设施：网络、本地化、日志、DI、路由
 ├─ di/
 ├─ networking/
 ├─ local_storage/
 └─ routing/
```

二、模块划分

- **Feature Module**：按业务功能拆分（如 auth、order、profile），每个模块内部有自己的 presentation/domain/data。
- **Core Module**：公共能力（网络、主题、路由、错误处理）。
- **Shared Module**：通用组件、扩展函数。
- 使用 `melos` 或 Pub workspace 管理多包仓库。

三、状态管理

- 全局状态：Riverpod / GetIt + ChangeNotifier / BLoC。
- 页面级状态：Cubit / Riverpod StateNotifier。
- 局部 UI 状态：StatefulWidget / ValueNotifier。

四、依赖注入

- 使用 `get_it` + `injectable` 或 Riverpod 自带的 Provider 容器。
- Repository 接口定义在 domain，实现在 data，注入时在 core/di 注册。

五、路由

- 大型项目使用 `go_router` 或 Navigator 2.0 自研 Router。
- 路由表按 feature 拆分，支持深层链接和权限守卫。

六、网络与持久化

- 网络层封装 Dio/Http + 拦截器 + 错误映射。
- 持久化使用 Hive/Drift/Isar，模型层做 DTO ↔ Entity 映射。

设计理由：
- **依赖方向向内**：domain 不依赖 data/presentation，便于测试和替换实现。
- **按业务拆分模块**：降低编译耦合，支持团队并行开发。
- **统一错误和日志**：在 core 层集中处理异常、埋点和调试。

最佳实践：
- 每层只暴露必要接口，避免跨层直接依赖具体实现。
- 单元测试优先覆盖 domain/usecase。
- 使用 `build_runner` 代码生成减少样板（freezed、json_serializable、riverpod_generator、injectable）。

**评分维度**：
- 能给出清晰的分层和依赖方向（30%）
- 能说明模块化与状态管理选型（30%）
- 能结合 DI、路由、网络持久化给出落地方案（40%）

**常见错误**：
- 所有代码堆在 `lib/` 根目录，没有分层。
- domain 层直接依赖 Dio 或 Hive。
- 状态管理方案过多，团队难以统一。

**延伸追问**：
- 如何处理跨 Feature 的状态共享？
- 如果未来要从 BLoC 迁移到 Riverpod，分层架构如何降低迁移成本？

**相关题目**：
- [FB-47-CP-P-002 Flutter 状态管理方案选型](#FB-47-CP-P-002)
- [FB-47-SD-R-006 Flutter 大规模状态管理架构](#FB-47-SD-R-006)

**参考资源**：
- [Flutter 官方文档 - App architecture](https://docs.flutter.dev/app-architecture)
- [Reso Coder - Clean Architecture](https://resocoder.com/flutter-clean-architecture-tdd/)

**口头回答版**：
> 大型 Flutter 应用我会采用分层架构：presentation 负责 UI，application 放用例，domain 放实体和仓库接口，data 放具体实现。模块按业务拆分，比如 auth、order、profile，各自独立。状态管理看规模，小模块用 Cubit，全局用 Riverpod。依赖注入用 get_it + injectable 或 Riverpod 容器，domain 只依赖接口不依赖具体实现。路由用 go_router，网络用 Dio 加拦截器。这样依赖方向向内，方便测试和替换实现，也支持多人并行开发。

---

### FB-47-PE-R-002：Flutter 应用包体积优化有哪些系统性的做法？

**题型**：性能优化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：47 Flutter
**标签**：Flutter、包体积、Tree Shaking、Deferred Components、混淆、ABI
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请系统性地说明 Flutter 应用包体积优化的目标、分析工具和常用手段，覆盖 Dart 层、资源、原生层和构建配置。

**参考答案**：

包体积优化的核心是：**减少代码、压缩资源、按需加载、裁剪原生库**。

一、分析工具

| 工具 | 用途 |
|------|------|
| `flutter build apk --analyze-size` | 生成体积分析报告 |
| `flutter build appbundle` | 上传到 Play 商店后按 ABI/语言动态分发 |
| DevTools App Size | 可视化查看 APK/IPA 各组成部分 |

二、Dart 层优化

- **Tree Shaking**：Flutter 发布模式会自动移除未使用的代码。
- **避免全局 import**：不要 import 整个大库只用一个函数。
- **代码生成控制**：freezed/json_serializable 生成的文件也会被 tree shake，但模板代码仍会增加编译时间。
- **混淆**：使用 `--obfuscate --split-debug-info=symbols/` 减小 Dart 代码并保护源码。

三、资源优化

- 优先使用矢量图（SVG/vector drawable）替代多套位图。
- 图片使用 WebP/AVIF 格式，按需加载不同分辨率。
- 移除未使用的字体和 assets。
- 使用 `flutter_gen` 管理资源引用，避免拼写错误导致冗余打包。

四、原生层优化

- **ABI 过滤**：Android 的 `ndk.abiFilters` 只保留 `arm64-v8a` 和 `armeabi-v7a`（根据目标市场）。
- **Android App Bundle**：让 Google Play 按设备下发 so 和资源。
- **iOS App Clips / On-Demand Resources**：按需加载资源。
- **移除不需要的插件 native 代码**：检查依赖插件是否带多余 so/framework。

五、Deferred Components（动态功能模块）

- Android 上把不常用功能拆分为 deferred component，首次安装不下载。
- iOS 对应使用 On-Demand Resources。

示例配置：

```yaml
flutter:
  deferred-components:
    - name: featurePremium
      libraries:
        - package:my_app/premium/
```

最佳实践：
- 每次发版前跑 `--analyze-size`，建立包体积基线。
- AAB/IPA 上传到商店前，用本地 bundletool 验证拆分效果。
- 对图片资源做 CI 自动化压缩。

**评分维度**：
- 能从 Dart/资源/原生/构建四个层面给出方案（40%）
- 能说明 Tree Shaking、混淆、Deferred Components（30%）
- 能提到分析工具和基线管理（30%）

**常见错误**：
- 只关注 APK 大小，忽略 AAB 动态分发。
- 所有图片都放多倍分辨率，不做压缩。
- 混淆后不保存 symbol 文件，线上崩溃无法还原。

**延伸追问**：
- Deferred Components 对启动时间和用户体验有什么影响？
- Flutter Web 的包体积优化有什么特殊手段？

**相关题目**：
- [FB-47-PE-A-007 Flutter 性能优化常用手段](#FB-47-PE-A-007)
- [FB-47-PE-P-004 Flutter 性能调优实战](#FB-47-PE-P-004)

**参考资源**：
- [Flutter 官方文档 - App size](https://docs.flutter.dev/perf/app-size)
- [Flutter 官方文档 - Deferred components](https://docs.flutter.dev/perf/deferred-components)

**口头回答版**：
> 包体积优化可以从代码、资源、原生库、构建配置四方面做。Dart 层靠 tree shaking 和混淆；资源用矢量图、WebP、移除无用字体；原生层用 AAB 动态分发、裁剪 ABI、只保留需要的 so；还可以用 Deferred Components 把不常用功能拆成按需下载。每次发版前用 --analyze-size 看报告，建立基线。混淆时一定要保存 symbol，否则线上崩溃解不出堆栈。

---

### FB-47-SD-R-003：Flutter 国际化（i18n）和无障碍（a11y）应该如何架构？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：47 Flutter
**标签**：Flutter、国际化、i18n、无障碍、a11y、ARB、Semantics
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一套 Flutter 应用的国际化和无障碍方案，说明技术选型、目录结构、动态语言切换、文案管理和无障碍支持。

**参考答案**：

一、国际化技术选型

推荐官方方案：
- `flutter_localizations` + `intl` + ARB（Application Resource Bundle）文件 + `gen-l10n`。
- 不使用硬编码字符串，所有文案走 ARB。

目录结构：

```text
lib/
 ├─ l10n/
 │   ├─ app_en.arb
 │   ├─ app_zh.arb
 │   └─ app_ja.arb
 ├─ core/localization/
 │   ├─ locale_provider.dart
 │   └─ l10n_extensions.dart
 └─ main.dart
```

ARB 示例：

```json
{
  "helloWorld": "Hello World",
  "userGreeting": "Hello, {name}",
  "userGreeting_male": "Hello, Mr. {name}",
  "userGreeting_female": "Hello, Ms. {name}"
}
```

使用：

```dart
final l10n = AppLocalizations.of(context)!;
Text(l10n.helloWorld);
Text(l10n.userGreeting('Tom'));
```

动态语言切换：

```dart
MaterialApp(
  locale: localeNotifier.value,
  supportedLocales: AppLocalizations.supportedLocales,
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  // 监听切换后调用 setState 或 Riverpod 更新
)
```

二、无障碍支持

- **Semantics**：为自定义控件添加语义标签、角色、状态。
- **TextScaleFactor**：适配系统字体缩放，使用 `MediaQuery.textScalerOf(context)`。
- **焦点管理**：为键盘/手柄用户提供 `FocusNode`、`FocusTraversalGroup`。
- **对比度与颜色**：避免仅通过颜色传递信息。
- **测试**：使用 DevTools 的 Accessibility Inspector 或 TalkBack/VoiceOver 真机测试。

示例：

```dart
Semantics(
  button: true,
  label: 'Submit form',
  child: ElevatedButton(
    onPressed: submit,
    child: const Text('Submit'),
  ),
)
```

三、架构原则

- 文案与代码分离，便于产品和翻译团队维护。
- 支持运行时切换语言，不重启应用。
- 无障碍不是“附加功能”，从设计阶段就纳入验收标准。

最佳实践：
- 使用 `flutter_gen` 生成类型安全的 l10n 访问代码。
- 对文案进行占位符校验，避免翻译后格式错误。
- 为所有图标按钮添加 tooltip 或 semanticLabel。

**评分维度**：
- 能说明 ARB + gen-l10n 的国际化方案（30%）
- 能说明动态语言切换实现（20%）
- 能说明 Semantics、TextScale、焦点等无障碍支持（30%）
- 能给出可落地的目录结构（20%）

**常见错误**：
- 字符串硬编码在 UI 中，后期国际化成本高。
- 切换语言后需要重启应用。
- 忽略自定义控件的语义标签。

**延伸追问**：
- 如何处理文案中的复数、性别等复杂语法？
- Flutter Web 上的无障碍与移动端有什么不同？

**相关题目**：
- [FB-47-SD-R-001 Flutter 大型应用架构](#FB-47-SD-R-001)
- [FB-47-SC-R-004 Flutter Web 与桌面端支持](#FB-47-SC-R-004)

**参考资源**：
- [Flutter 官方文档 - Internationalization](https://docs.flutter.dev/ui/accessibility-and-internationalization/internationalization)
- [Flutter 官方文档 - Accessibility](https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility)

**口头回答版**：
> 国际化我推荐官方方案：flutter_localizations 加 ARB 文件和 gen-l10n，所有文案放 ARB 里，代码里用 AppLocalizations 访问。目录按语言分 app_en.arb、app_zh.arb 等，通过 Riverpod 或 ValueNotifier 动态切换 locale，不需要重启。无障碍方面，给自定义组件加 Semantics 标签，注意字体缩放适配，图标按钮要加 tooltip 或 semanticLabel。最好从设计阶段就把 a11y 纳入验收。

---

### FB-47-SC-R-004：Flutter Web 和桌面端（Windows/macOS/Linux）支持有哪些关键考虑？

**题型**：场景设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：47 Flutter
**标签**：Flutter、Web、Desktop、响应式、输入适配、性能
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明将 Flutter 应用扩展到 Web 和桌面端时需要考虑的关键问题，包括渲染、输入、布局、插件、构建部署等方面。

**参考答案**：

一、渲染

- Web 支持两种渲染器：
  - **CanvasKit**：基于 WebAssembly 的 Skia，性能和一致性更好，但首次加载包体较大。
  - **HTML**：使用 DOM/CSS 渲染，包体小，但复杂效果支持有限。
- 桌面端使用与移动端相同的嵌入器架构，但窗口管理、菜单栏、系统托盘需要额外处理。

二、输入与交互

| 端 | 关键差异 |
|----|----------|
| Web | 浏览器前进/后退、URL、SEO 有限、右键菜单、文本选择 |
| Desktop | 键盘快捷键、鼠标悬停/右键、窗口大小调整、菜单栏、多窗口 |

处理建议：
- 使用 `FocusableActionDetector`、`Shortcuts`、`Actions` 处理键盘快捷键。
- 使用 `InkWell`/`MouseRegion` 处理悬停状态。
- 窗口管理使用 `window_manager` 等插件。

三、布局

- 桌面/Web 屏幕尺寸变化大，需使用 `LayoutBuilder`、`MediaQuery`、`ResponsiveRowColumn` 或自定义断点。
- 避免写死宽高，使用约束驱动布局。

四、插件与平台代码

- 很多移动端插件没有 Web/桌面实现，需要：
  - 检查依赖插件是否支持目标平台。
  - 使用 `universal_html`、`url_launcher`、`shared_preferences` 等跨平台插件。
  - 对缺失平台实现 `MethodChannel` 的 stub 或自行实现。

五、构建与部署

```bash
flutter build web --web-renderer canvaskit
flutter build windows
flutter build macos
flutter build linux
```

- Web 部署需配置服务器 MIME 类型、Service Worker、PWA manifest。
- 桌面端需要代码签名、自动更新、安装包制作（如 MSIX、DMG、AppImage）。

最佳实践：
- 使用 `kIsWeb`、`defaultTargetPlatform` 做平台分支，但尽量把平台差异隔离在 adapter 层。
- 对 Web 做首屏加载优化：拆包、延迟加载、Gzip/Brotli。
- 桌面端提供原生菜单、托盘、窗口记忆等体验。

**评分维度**：
- 能区分 Web 两种渲染器及优缺点（30%）
- 能说明桌面/Web 的输入、布局、窗口差异（30%）
- 能给出插件适配和构建部署方案（40%）

**常见错误**：
- 直接复用移动端竖屏布局到桌面端。
- 忽略 Web 的 SEO 和首屏加载问题。
- 使用大量仅支持移动端的插件而不做 fallback。

**延伸追问**：
- Flutter Web 如何做 SSR 或预渲染？
- 多窗口在桌面端目前有哪些可行方案？

**相关题目**：
- [FB-47-FS-A-002 Skia 与 Impeller 渲染引擎](#FB-47-FS-A-002)
- [FB-47-PE-R-002 Flutter 包体积优化](#FB-47-PE-R-002)

**参考资源**：
- [Flutter 官方文档 - Web support](https://docs.flutter.dev/platform-integration/web)
- [Flutter 官方文档 - Desktop support](https://docs.flutter.dev/platform-integration/desktop)

**口头回答版**：
> Flutter Web 有 CanvasKit 和 HTML 两种渲染器，CanvasKit 性能一致性好但包大，HTML 包小但复杂效果支持有限。桌面端要考虑键盘快捷键、鼠标悬停、窗口管理、菜单栏。布局上不能写死尺寸，要用响应式。插件要检查是否支持 Web 和桌面，不支持的自己写 stub 或适配。部署上 Web 要配 MIME、PWA，桌面要做签名和安装包。首屏性能对 Web 很关键，可以做拆包和压缩。

---

### FB-47-EN-R-005：Flutter 项目的工程化与 CI/CD 应该如何设计？

**题型**：工程化题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：47 Flutter
**标签**：Flutter、CI/CD、GitHub Actions、Codemagic、Fastlane、Flavor
**出现频率**：高频
**预计回答时长**：8-15 分钟

**题目描述**：
请设计一套 Flutter 项目的工程化规范与 CI/CD 流水线，包括代码质量、构建、测试、打包、分发和环境管理。

**参考答案**：

一、代码质量

- Lint：使用 `flutter_lints` 或自定义 `analysis_options.yaml`。
- 代码生成：`build_runner`、`freezed`、`json_serializable`、`riverpod_generator`。
- 格式化：`dart format --set-exit-if-changed .`。
- 提交前钩子：lefthook / husky 跑 format + lint + 单测。

二、分支与版本管理

- Git Flow 或 Trunk Based Development。
- 语义化版本（SemVer），通过 `pubspec.yaml` + CI 自动打 tag。

三、环境管理（Flavor）

- Android：`productFlavors` + `flutterFlavors`。
- iOS：Xcode Schemes + `xcconfig`。
- Dart 层通过 `--dart-define` 或 `envied` 注入环境变量。

示例：

```bash
flutter run --flavor dev --dart-define=API_BASE=https://dev.example.com
```

四、CI/CD 流水线

| 阶段 | 任务 |
|------|------|
| PR Check | lint、format、unit test、widget test、golden test |
| Build | Android APK/AAB、iOS IPA、Web、Desktop |
| Integration Test | 真机/模拟器冒烟测试 |
| Sign & Distribute | Fastlane 签名、上传到 Firebase App Distribution / TestFlight / Play Console |
| Release | 自动生成 changelog、GitHub Release、Tag |

常用工具：

- **GitHub Actions / GitLab CI**：灵活、与仓库集成好。
- **Codemagic / Bitrise**：专为 Flutter 设计，内置签名和分发。
- **Fastlane**：统一处理 iOS/Android 签名、截图、上传。

五、安全与密钥

- API Key、签名文件不提交仓库，使用 CI secrets / Keychain / Android Keystore。
- 混淆与 symbol 分离：`--obfuscate --split-debug-info`。

最佳实践：
- CI 中缓存 `~/.pub-cache` 和 Gradle/Pod 依赖，加速构建。
- 每个 flavor 独立 bundle id 和图标，避免冲突。
- 发布前自动跑集成测试，避免带病上线。

**评分维度**：
- 能说明 lint、格式化、代码生成等工程化规范（30%）
- 能设计 PR → Build → Test → Distribute 的流水线（40%）
- 能说明 Flavor、签名、密钥管理（30%）

**常见错误**：
- 把签名密钥和 API Key 提交到仓库。
- CI 不做缓存，每次全量下载依赖。
- 只有手动打包，没有自动化测试和分发。

**延伸追问**：
- 如何实现 Flutter 的“热更新”或灰度发布？
- CI 中如何并行运行不同 flavor 的构建？

**相关题目**：
- [FB-47-CO-P-007 Flutter 测试体系](#FB-47-CO-P-007)
- [FB-47-PE-R-002 Flutter 包体积优化](#FB-47-PE-R-002)

**参考资源**：
- [Flutter 官方文档 - Continuous delivery](https://docs.flutter.dev/deployment/cd)
- [Fastlane 官方文档](https://docs.fastlane.tools/)

**口头回答版**：
> Flutter 工程化我会先配好 lint、format、代码生成和提交钩子。分支用 Git Flow 或 Trunk Based，版本用 SemVer。环境用 flavor 加 dart-define 管理 dev/staging/prod。CI/CD 流水线分 PR 检查、构建、测试、签名分发，工具可以用 GitHub Actions 或 Codemagic，打包分发用 Fastlane。签名文件和 API Key 一定要放 CI secrets，不能进仓库。缓存 pub 和 Gradle 能显著加快构建。

---

### FB-47-SD-R-006：Flutter 大规模应用中，状态管理应该如何分层与治理？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：47 Flutter
**标签**：Flutter、状态管理、分层、治理、事件总线、缓存一致性
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
在大型 Flutter 项目中，状态种类繁多、来源复杂。请设计一套状态管理的分层与治理方案，确保状态可预测、可测试、可维护。

**参考答案**：

一、状态分层

```text
全局状态（Global State）
 ├─ 用户会话 / 认证状态
 ├─ 主题 / 语言
 └─ 全局配置

应用状态（App State）
 ├─ 购物车、消息未读
 └─ 跨页面共享的业务数据

页面状态（Page State）
 ├─ 列表分页、筛选条件
 └─ 表单草稿

局部 UI 状态（UI State）
 ├─ 加载中 / 错误提示
 ├─ 动画进度
 └─ 下拉刷新状态
```

二、管理方案

| 状态层级 | 推荐方案 |
|----------|----------|
| 全局状态 | Riverpod / BLoC + 持久化 |
| 应用状态 | Riverpod StateNotifier / BLoC |
| 页面状态 | Cubit / Riverpod AutoDispose |
| 局部 UI 状态 | StatefulWidget / ValueNotifier |

三、治理原则

1. **单一来源**：同一份业务数据只在一个地方管理，避免多个副本不一致。
2. **不可变状态**：State 对象不可变，更新时创建新对象，便于追踪和比较。
3. **依赖注入**：通过 DI 容器注入 Repository 和 Service，状态层只依赖接口。
4. **副作用隔离**：网络请求、本地存储、日志在 Repository 或 Service 中处理，状态层只负责转换。
5. **状态持久化**：用户会话、草稿等关键状态在应用生命周期变化时持久化，启动时恢复。
6. **事件溯源**：对关键业务流程可用 Event Sourcing，便于回放和调试。

四、缓存一致性

- 远程数据使用 TTL 或 stale-while-revalidate 策略。
- 本地修改先 Optimistic Update，失败后再回滚并通知用户。
- 用唯一标识符缓存 Entity，避免不同页面出现同一对象的不同版本。

代码结构示例：

```text
lib/
 ├─ features/cart/
 │   ├─ application/cart_cubit.dart
 │   ├─ domain/cart_repository.dart
 │   └─ data/cart_repository_impl.dart
 └─ core/state/
     ├─ app_state.dart
     └─ session_provider.dart
```

最佳实践：
- 避免全局 EventBus，状态变化路径应清晰可追踪。
- 使用 `autoDispose` 等机制防止页面关闭后状态泄漏。
- 建立状态变更日志和 DevTools 扩展，方便调试。

**评分维度**：
- 能按层级划分状态并给出对应方案（40%）
- 能说明单一来源、不可变、依赖注入等治理原则（30%）
- 能给出缓存一致性和持久化策略（30%）

**常见错误**：
- 所有状态都用全局状态管理，导致无关页面重建。
- 不同页面各自维护同一份数据的副本。
- 在状态层直接发起网络请求并处理异常。

**延伸追问**：
- 如何处理 A 页面修改数据后 B 页面自动更新？
- 状态持久化与隐私合规如何平衡？

**相关题目**：
- [FB-47-CP-P-002 Flutter 状态管理方案选型](#FB-47-CP-P-002)
- [FB-47-SD-R-001 Flutter 大型应用架构](#FB-47-SD-R-001)

**参考资源**：
- [Flutter 官方文档 - State management](https://docs.flutter.dev/development/data-and-backend/state-mgmt)
- [Riverpod 官方文档 - AutoDispose](https://riverpod.dev/docs/concepts/modifiers/auto_dispose)

**口头回答版**：
> 大规模 Flutter 项目里，状态要分层管理：全局状态如用户会话、主题用 Riverpod 或 BLoC；应用级状态比如购物车、消息未读也用 Riverpod；页面级用 Cubit 或 AutoDispose；局部 UI 状态用 StatefulWidget。治理上要遵循单一来源、State 不可变、依赖注入、副作用隔离。缓存用 TTL 或乐观更新，避免多个页面各自保存同一份数据。尽量少用全局 EventBus，状态变更路径要清晰，方便调试。

---

### FB-47-SD-R-007：如何开发一个 Flutter 插件？Federated Plugin 和 PlatformView 分别解决什么问题？

**题型**：系统设计题
**难度**：⚫ 架构
**岗位层级**：架构师
**面试知识域**：47 Flutter
**标签**：Flutter、插件、Federated Plugin、PlatformView、平台视图
**出现频率**：中频
**预计回答时长**：8-15 分钟

**题目描述**：
请说明 Flutter 插件的开发流程，解释 Federated Plugin 的设计思想和 PlatformView 的适用场景，并给出架构示例。

**参考答案**：

一、普通插件开发

一个 Flutter 插件通常包含：

```text
my_plugin/
 ├─ lib/              # Dart API
 ├─ android/          # Android 原生实现（Kotlin/Java）
 ├─ ios/              # iOS 原生实现（Swift/ObjC）
 ├─ windows/          # Windows 原生实现（C++）
 ├─ macos/
 ├─ linux/
 ├─ web/              # JS 实现
 └─ pubspec.yaml
```

通过 `MethodChannel` 或 `EventChannel` 与原生通信。

二、Federated Plugin

Federated Plugin 把插件拆分为接口包和平台实现包：

```text
my_plugin/                # 接口包，纯 Dart API
my_plugin_android/        # Android 实现
my_plugin_ios/            # iOS 实现
my_plugin_platform_interface/  # 平台接口定义
```

优势：
- 第三方可以为新平台贡献实现，而不需要修改主包。
- 主包保持轻量，平台实现按需依赖。
- 便于平台专属团队独立维护。

三、PlatformView

PlatformView 用于在 Flutter 中嵌入原生 UI 组件：

- **Android**：`PlatformViewFactory` + `AndroidView` / `PlatformViewLink` + `Surface` / `Texture`。
- **iOS**：`FlutterPlatformView` + `UiKitView`。

适用场景：
- 地图（Google Maps、Mapbox）。
- 视频播放器（ExoPlayer、AVPlayer）。
- 原生广告、WebView、相机预览。

渲染模式：

- **Hybrid Composition**：原生 View 与 Flutter View 在同一层级混合，但可能影响性能。
- **Texture Layer**：把原生内容渲染到纹理，再由 Flutter 合成，性能更好但实现复杂。

架构示例：

```text
Dart 层：MapWidget → MethodChannel 控制相机、标记
              ↓
PlatformView：原生 MapView 嵌入 Flutter 树
              ↓
原生 SDK：GoogleMap / MKMapView
```

最佳实践：
- 优先用 Dart 实现 UI，只有必须原生的功能才用 PlatformView。
- PlatformView 尽量固定大小，避免频繁 resize 触发重创建。
- 插件接口设计要稳定，版本变更遵循 SemVer。

**评分维度**：
- 能说明普通插件结构和 MethodChannel 使用（30%）
- 能解释 Federated Plugin 的拆分思想（30%）
- 能说明 PlatformView 的适用场景和渲染模式（40%）

**常见错误**：
- 所有功能都通过 PlatformView 实现，增加复杂度和性能开销。
- Federated Plugin 中接口包频繁破坏平台实现。
- 忽略 PlatformView 的内存和手势冲突问题。

**延伸追问**：
- PlatformView 与 Flutter 手势冲突如何解决？
- 如何为一个 Federated Plugin 添加 Windows 平台实现？

**相关题目**：
- [FB-47-CO-A-008 Platform Channel 类型与场景](#FB-47-CO-A-008)
- [FB-47-SC-P-003 Add-to-App 方案与挑战](#FB-47-SC-P-003)

**参考资源**：
- [Flutter 官方文档 - Developing packages & plugins](https://docs.flutter.dev/packages-and-plugins/developing-packages)
- [Flutter 官方文档 - Federated plugins](https://docs.flutter.dev/packages-and-plugins/developing-packages#federated-plugins)
- [Flutter 官方文档 - Hosting native Android and iOS views](https://docs.flutter.dev/platform-integration/android/platform-views)

**口头回答版**：
> Flutter 插件一般是 lib 里写 Dart API，然后通过 MethodChannel 调 Android/iOS 等原生代码。Federated Plugin 是把接口和平台实现拆开，比如 my_plugin 只定义 API，my_plugin_android 和 my_plugin_ios 分别实现，这样第三方可以为新平台写实现，主包也轻量。PlatformView 用于在 Flutter 里嵌入原生 View，比如地图、视频播放器，可以用 Hybrid Composition 或 Texture 方式渲染。除非必须，否则不要用 PlatformView，性能和管理成本都比较高。




### FB-47-CO-A-009：Flutter 的 Widget、Element、RenderObject 三棵树是什么关系？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Flutter
**标签**：Flutter、Widget、Element、RenderObject、三棵树
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 中 Widget、Element、RenderObject 三者的关系和作用。

**参考答案**：
Flutter 三棵树：

1. **Widget 树**
   - Widget 是 UI 的描述，不可变（immutable）。
   - 每次状态变化都会重建 Widget 树。
   - 轻量，创建成本低。

2. **Element 树**
   - Element 是 Widget 的实例，可变。
   - 负责 Widget 的生命周期和状态管理。
   - 框架通过比较新旧 Widget 决定复用或重建 Element。

3. **RenderObject 树**
   - RenderObject 负责真正的布局和绘制。
   - 与 Element 一一对应（部分 Element 无 RenderObject）。
   - 是渲染管线中的实际节点。

关系：
- Widget 描述配置 → Element 管理实例和生命周期 → RenderObject 执行布局绘制。
- 状态变化时，Widget 重建，Element 尽量复用，RenderObject 按需更新。

为什么这样设计？
- Widget 轻量，重建成本低。
- Element 复用减少对象创建。
- RenderObject 专注渲染性能。

示例：
```dart
Text('hello') // Widget
```
框架会为它创建对应 Element 和 RenderParagraph。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 有 Widget、Element、RenderObject 三棵树。Widget 是不可变的 UI 描述，Element 是可变的实例管生命周期，RenderObject 负责布局绘制。Widget 重建，Element 复用，RenderObject 按需更新。

---

### FB-47-CO-A-010：Flutter 中 StatefulWidget 和 StatelessWidget 有什么区别？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Flutter
**标签**：Flutter、StatefulWidget、StatelessWidget、状态
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 StatefulWidget 和 StatelessWidget 的区别及使用场景。

**参考答案**：
区别：

| 特性 | StatelessWidget | StatefulWidget |
|------|----------------|---------------|
| 状态 | 无内部状态 | 有内部状态 |
| 重建 | 依赖外部传入数据 | 依赖外部数据和内部状态 |
| 生命周期 | 简单，build 即可 | 有 createState、initState、didUpdateWidget、dispose 等 |
| 使用场景 | 展示型 UI | 交互型、动态变化 UI |

使用建议：
- 优先使用 StatelessWidget，更轻量、易维护。
- 需要响应用户交互、动画、数据变化时用 StatefulWidget。
- 状态管理复杂时，考虑 Provider、Riverpod、Bloc 等方案。

示例：
```dart
class MyText extends StatelessWidget {
  final String text;
  MyText(this.text);
  @override
  Widget build(BuildContext context) => Text(text);
}

class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => setState(() => count++),
      child: Text('$count'),
    );
  }
}
```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> StatelessWidget 无状态轻量，适合展示；StatefulWidget 有内部状态，有完整生命周期，适合交互和动态 UI。优先 Stateless，复杂状态用状态管理库。

---

### FB-47-CO-A-011：Flutter 的 setState 有什么作用和注意事项？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Flutter
**标签**：Flutter、setState、状态、重建
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 中 setState 的作用及使用注意事项。

**参考答案**：
`setState` 作用：
- 通知框架当前 State 对象的内部状态发生变化。
- 框架会标记该 State 对应的 Element 为 dirty，在下一帧重建 build 方法。

使用注意事项：

1. **只更新必要状态**
   - setState 会重建整个 build 方法下的 Widget 树。
   - 应尽量把 setState 放在最小作用域内。

2. **避免频繁调用**
   - 动画等高频场景应使用 AnimationController，而非 setState。

3. **不要在 build 中调用 setState**
   - 会导致无限循环重建。

4. **setState 内只做状态变更**
   - 不要在 setState 中做耗时操作或网络请求。

5. **异步操作注意 context**
   - await 后调用 setState 前检查 mounted 状态。

示例：
```dart
setState(() {
  count++;
});
```

替代方案：
- 简单局部状态：StatefulWidget + setState。
- 跨组件状态：Provider、Riverpod、Bloc、GetX。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> setState 通知框架状态变化并重建 UI。要注意放在最小作用域，避免频繁调用，不在 build 中调用，setState 内只做状态变更，异步操作后检查 mounted。

---

### FB-47-CO-A-012：Flutter 中的 BuildContext 是什么？有什么作用？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Flutter
**标签**：Flutter、BuildContext、上下文、定位
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 BuildContext 的概念和常见用途。

**参考答案**：
BuildContext 是 Widget 在 Element 树中的位置句柄。

作用：

1. **定位 Widget 树**
   - 通过 context 可以找到祖先节点。
   - 如 `Navigator.of(context)`、`Theme.of(context)`。

2. **访问 InheritedWidget**
   - 通过 context 获取最近的 InheritedWidget 数据。
   - 如 Theme、MediaQuery、Localizations。

3. **导航**
   - `Navigator.push(context, route)`。

4. **获取 RenderObject**
   - `context.findRenderObject()` 可获取 RenderBox，用于测量或动画。

5. **查找祖先/子孙 Element**
   - `context.findAncestorWidgetOfExactType<T>()`。
   - `context.visitChildElements()`。

注意事项：
- BuildContext 与 Element 关联，不要在异步操作后直接使用旧的 context（需检查 mounted）。
- 不要在 State 的 initState 中直接使用 context，因为此时 Element 未挂载完成。
- 谨慎使用 `BuildContext` 跨异步边界。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> BuildContext 是 Widget 在 Element 树中的位置句柄。用于定位 Widget 树、访问 InheritedWidget、导航、获取 RenderObject、查找祖先。异步操作后要检查 mounted，initState 中不能直接用 context。

---

### FB-47-CO-A-013：Flutter 的 pubspec.yaml 文件主要配置哪些内容？

**题型**：概念题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Flutter
**标签**：Flutter、pubspec、依赖、配置
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 项目中 pubspec.yaml 文件的主要配置项。

**参考答案**：
pubspec.yaml 主要配置：

```yaml
name: my_app
description: A new Flutter project.
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  http: ^1.0.0
  provider: ^6.0.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/data.json
  fonts:
    - family: MyFont
      fonts:
        - asset: assets/fonts/MyFont-Regular.ttf
```

主要配置项：
- `name`：包名。
- `version`：应用版本号。
- `environment`：Dart/Flutter SDK 版本约束。
- `dependencies`：生产依赖。
- `dev_dependencies`：开发依赖。
- `flutter`：资源、字体、主题等 Flutter 专属配置。

注意：
- 修改 pubspec.yaml 后需运行 `flutter pub get`。
- 依赖版本约束要谨慎，避免冲突。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> pubspec.yaml 配置项目名、版本、SDK 约束、依赖、开发依赖、Flutter 资源和字体等。修改后需要 flutter pub get。

---

### FB-47-CO-B-009：Flutter 中的路由管理有哪些方式？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：Flutter
**标签**：Flutter、路由、Navigator、路由管理
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 中页面路由跳转的几种方式。

**参考答案**：
Flutter 路由管理方式：

1. **匿名路由**
   - `Navigator.push(context, MaterialPageRoute(builder: (_) => PageB()))`
   - `Navigator.pop(context)`
   - 适合简单场景。

2. **命名路由**
   - 在 MaterialApp 中配置 routes。
   - `Navigator.pushNamed(context, '/detail')`
   - 适合页面较少的应用。

3. **onGenerateRoute**
   - 自定义路由生成逻辑。
   - 适合需要传递参数或做权限校验的场景。

4. **第三方路由库**
   - go_router、auto_route、fluro。
   - 适合大型应用，支持深层链接、声明式路由。

5. **Navigator 2.0**
   - 声明式路由 API。
   - 通过 Router、RouteInformationParser、RouterDelegate 控制路由栈。
   - 适合需要与系统 URL 同步的复杂应用。

示例（go_router）：
```dart
final _router = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => HomePage()),
    GoRoute(path: '/detail/:id', builder: (context, state) => DetailPage(id: state.pathParameters['id'])),
  ],
);
```

选择建议：
- 小型项目：匿名路由或命名路由。
- 中大型项目：go_router 或 auto_route。
- 需要与 Web URL 同步：Navigator 2.0 / go_router。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 路由有匿名路由、命名路由、onGenerateRoute、第三方库如 go_router、Navigator 2.0 声明式路由。小项目用匿名/命名路由，中大型用 go_router。

---

### FB-47-CO-B-010：Flutter 如何实现异步编程？Future 和 Stream 有什么区别？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：Flutter
**标签**：Flutter、Future、Stream、异步
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter/Dart 中 Future 和 Stream 的区别及使用场景。

**参考答案**：
Dart 异步编程：

**Future**：
- 代表一个将来会完成的单一异步结果。
- 类似 JavaScript Promise。
- 用 `async/await` 处理。

**Stream**：
- 代表一系列异步事件的序列。
- 可以监听多个事件。
- 用 `await for` 或 Stream API（listen、map、where 等）处理。

区别：

| 特性 | Future | Stream |
|------|--------|--------|
| 结果数量 | 一个 | 多个 |
| 监听 | 一次 then/await | 持续 listen |
| 使用场景 | 单次异步请求 | 实时数据、事件流 |

示例：
```dart
// Future
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 1));
  return 'data';
}

// Stream
Stream<int> countStream() async* {
  for (int i = 0; i < 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}
```

Stream 类型：
- Single subscription：只能被一个 listener 订阅。
- Broadcast：可被多个 listener 订阅。

常用 Stream 场景：
- WebSocket、蓝牙数据、传感器、用户输入事件。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Future 是单一异步结果，类似 Promise；Stream 是异步事件序列，可监听多个事件。Future 适合单次请求，Stream 适合实时数据。

---

### FB-47-CO-B-011：Flutter 中如何处理网络请求？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：Flutter
**标签**：Flutter、网络请求、http、dio
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 中常见的网络请求方案。

**参考答案**：
Flutter 网络请求方案：

1. **http 包**
   - Dart 官方提供的 HTTP 客户端。
   - 轻量，适合简单请求。

2. **dio**
   - 强大的 Dart HTTP 客户端。
   - 支持拦截器、请求取消、文件上传下载、全局配置等。
   - 中大型项目首选。

3. **retrofit / chopper**
   - 类型安全的 REST API 客户端生成器。
   - 类似 Android Retrofit。

4. **graphql_flutter**
   - 用于 GraphQL API 请求。

网络请求最佳实践：
- 封装网络层，统一处理错误、token、loading。
- 使用模型类序列化 JSON（json_serializable、freezed）。
- 处理超时和重试。
- 注意异步操作后的 Widget 状态检查（mounted）。

示例（dio）：
```dart
final dio = Dio();
final response = await dio.get('https://api.example.com/items');
```

注意：
- Android 需要配置 internet 权限。
- iOS 需要配置 ATS（允许 HTTP 需配置）。
- Web 有 CORS 限制。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 网络请求常用 http 包和 dio，dio 功能更强大支持拦截器等。复杂项目可用 retrofit 或 graphql。建议封装网络层，处理错误超时，JSON 序列化，检查 mounted。

---

### FB-47-CO-B-012：Flutter 中如何加载本地资源图片？

**题型**：概念题
**难度**：🟢 基础
**岗位层级**：初级
**面试知识域**：Flutter
**标签**：Flutter、资源、图片、assets
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 中如何配置和使用本地图片资源。

**参考答案**：
Flutter 加载本地资源：

1. **配置 pubspec.yaml**
   ```yaml
   flutter:
     assets:
       - assets/images/
       - assets/logo.png
   ```

2. **使用 Image.asset 加载**
   ```dart
   Image.asset('assets/images/logo.png')
   ```

3. **使用不同分辨率图片**
   - 按 `assets/images/2.0x/logo.png`、`3.0x/logo.png` 组织。
   - Flutter 自动按设备密度选择。

4. **加载其他资源**
   - JSON：`DefaultAssetBundle.of(context).loadString('assets/data.json')`
   - 字体：在 pubspec.yaml 中配置 fonts。

注意事项：
- 资源路径相对于项目根目录。
- 目录资源需列出目录或具体文件。
- 修改 pubspec 后需重新运行 `flutter pub get`。
- Web 平台资源加载方式略有不同。

示例完整配置：
```yaml
flutter:
  assets:
    - assets/images/
  fonts:
    - family: CustomFont
      fonts:
        - asset: assets/fonts/CustomFont.ttf
```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 在 pubspec.yaml 的 flutter.assets 下配置资源路径，用 Image.asset 加载，支持 2.0x/3.0x 密度图，JSON 用 DefaultAssetBundle 加载，字体在 fonts 下配置。

---

### FB-47-FS-P-007：Flutter 的渲染原理是什么？为什么性能高？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：Flutter
**标签**：Flutter、渲染、Skia、Impeller、性能
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 的渲染原理及其性能优势来源。

**参考答案**：
Flutter 渲染原理：

1. **自绘引擎**
   - Flutter 使用自己的渲染层，不依赖平台原生控件。
   - 早期使用 Skia，现在逐步切换到 Impeller（iOS 已默认）。

2. **渲染流程**
   - Widget 描述 UI → Element 管理 → RenderObject 布局和绘制。
   - 渲染层将绘制指令提交给 Skia/Impeller。
   - 引擎将位图输出到屏幕。

3. **统一 UI**
   - 同一套代码在 iOS、Android、Web、桌面渲染一致。
   - 避免平台差异导致的适配成本。

性能优势：

1. **直接控制渲染管线**
   - 减少与平台原生 View 的通信开销。
   - 动画和高频刷新更高效。

2. **高效布局**
   - 一次性布局约束传递（layout pass）。
   - 避免传统 View 系统的多次 measure/layout。

3. **GPU 加速**
   - 绘制指令直接提交 GPU。
   - Impeller 预编译 shader，减少 jank。

4. **热重载**
   - 开发阶段快速迭代，不直接提升运行时性能，但提升开发效率。

5. **可控的刷新**
   - 通过 SchedulerBinding 控制帧率和重绘范围。

总结：Flutter 通过自绘引擎和统一的渲染管线，实现了接近原生的性能和多端一致性。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 自绘渲染，Widget 到 Element 到 RenderObject，再用 Skia/Impeller 绘制。性能高是因为直接控制渲染管线、减少平台通信、一次性布局、GPU 加速、Impeller 预编译 shader。

---

### FB-47-FS-P-008：Flutter 的 Key 有什么作用？什么时候需要使用 Key？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：Flutter
**标签**：Flutter、Key、Widget、Element、复用
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 中 Key 的作用及使用场景。

**参考答案**：
Key 的作用：
- Key 是 Widget 的标识，帮助框架在 Widget 树变化时识别哪些 Widget 应该复用对应的 Element。
- 没有 Key 时，框架按位置比较 Widget。
- 有 Key 时，框架按 Key 比较，可以跨位置复用 Element。

使用场景：

1. **列表项重排**
   - 当列表顺序变化时，给 item 加 Key 可以保持每个 item 的状态。
   - 否则框架可能错误复用 Element，导致状态错乱。

2. **表单字段动态增删**
   - 动态表单项需要 Key 来保持焦点和状态。

3. **AnimatedSwitcher**
   - 不同子 Widget 切换时，用 Key 区分动画对象。

4. **跨状态保持**
   - 当 Widget 在树中位置变化但希望保持状态时。

Key 类型：
- `ValueKey`：用值作为标识。
- `ObjectKey`：用对象作为标识。
- `UniqueKey`：每次创建唯一，适合一次性 Widget。
- `GlobalKey`：全局唯一，可跨树访问 State。

示例：
```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ListTile(
    key: ValueKey(items[index].id),
    title: Text(items[index].name),
  ),
)
```

注意：不要滥用 Key，只在需要状态复用或跨位置匹配时使用。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Key 帮助框架在 Widget 树变化时按标识复用 Element。列表重排、动态表单、AnimatedSwitcher、跨状态保持时用 Key。有 ValueKey、ObjectKey、UniqueKey、GlobalKey。不要滥用。

---

### FB-47-FS-P-009：Flutter 中的 InheritedWidget 是什么？与 Provider 有什么关系？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：Flutter
**标签**：Flutter、InheritedWidget、Provider、状态共享
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请解释 InheritedWidget 的作用，以及 Provider 如何基于它实现状态管理。

**参考答案**：
InheritedWidget：
- 是 Flutter 中用于在 Widget 树中向下共享数据的机制。
- 子 Widget 可以通过 `context.dependOnInheritedWidgetOfExactType<T>()` 获取数据。
- 数据变化时，依赖它的子 Widget 会自动重建。

Provider：
- 是基于 InheritedWidget 封装的状态管理库。
- 简化了 InheritedWidget 的使用，提供更友好的 API。

关系：
- Provider 内部使用 InheritedWidget 实现数据传递。
- Provider 让开发者无需手动写 InheritedWidget。

Provider 常用类：
- `ChangeNotifierProvider`：配合 ChangeNotifier 使用。
- `Provider`：提供不可变对象。
- `Consumer`：监听并重建部分 UI。
- `Selector`：选择部分数据监听，减少重建。

示例：
```dart
ChangeNotifierProvider(
  create: (_) => CounterModel(),
  child: MyApp(),
)

// 读取
context.watch<CounterModel>()
context.read<CounterModel>()
```

 InheritedWidget 适合：
- 主题、语言、配置等全局数据共享。
- 底层机制理解。

Provider 适合：
- 日常状态管理，代码更简洁。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> InheritedWidget 是 Flutter 向下共享数据的机制，子 Widget 依赖它，数据变化自动重建。Provider 基于 InheritedWidget 封装，简化状态管理。

---

### FB-47-FS-P-010：Flutter 中如何与平台原生代码交互？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：Flutter
**标签**：Flutter、Platform Channel、原生交互、MethodChannel
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 调用 Android/iOS 原生能力的方式。

**参考答案**：
Flutter 与原生交互方式：

1. **Platform Channel**
   - MethodChannel：方法调用，最常用的通道。
   - BasicMessageChannel：传递字符串/二进制消息。
   - EventChannel：原生向 Flutter 发送事件流。

2. **PlatformView**
   - 在 Flutter 中嵌入原生 View。
   - 适合需要原生控件的场景，如地图、广告、摄像头。

3. **FFI（Foreign Function Interface）**
   - Dart 2.12+ 支持直接调用 C/C++ 库。
   - 高性能场景可用，避免 Platform Channel 序列化开销。

4. **插件（Plugin）**
   - 将原生代码封装为 Flutter 插件，便于复用。
   - 可发布到 pub.dev。

MethodChannel 示例：
```dart
const platform = MethodChannel('com.example/channel');
final result = await platform.invokeMethod('getBatteryLevel');
```

注意事项：
- 通道名要唯一，避免冲突。
- 原生代码中需处理主线程切换。
- 数据传递需要可序列化。
- 错误处理要完善。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 与原生交互有 Platform Channel（MethodChannel、BasicMessageChannel、EventChannel）、PlatformView 嵌入原生 View、FFI 调用 C/C++、插件封装。MethodChannel 最常用。

---

### FB-47-FS-P-011：Flutter 的热重载（Hot Reload）和热重启（Hot Restart）有什么区别？

**题型**：框架原理题
**难度**：🔴 深入
**岗位层级**：专家
**面试知识域**：Flutter
**标签**：Flutter、Hot Reload、Hot Restart、开发效率
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 热重载和热重启的区别及使用场景。

**参考答案**：
区别：

| 特性 | Hot Reload | Hot Restart |
|------|-----------|-------------|
| 速度 | 快，通常毫秒级 | 较慢，秒级 |
| 状态保留 | 保留应用状态 | 不保留，重新初始化 |
| 生效范围 | 修改的代码 | 全部代码 |
| 适用场景 | UI 调整、小逻辑修改 | 全局状态、初始化逻辑变化 |
| 触发方式 | r / 保存 | R |

Hot Reload 原理：
- 将修改后的 Dart 代码注入到运行中的 VM。
- Widget 树重建，但 State 对象保留。

Hot Restart 原理：
- 重新编译并启动应用。
- 所有 State 重置。

使用建议：
- UI 调整、事件处理修改：Hot Reload。
- main 函数、全局变量、initState 修改：Hot Restart。
- 原生代码修改：需要重新编译安装（Cold Restart）。

限制：
- Hot Reload 不会重新执行 main 和 initState。
- 类结构重大变化可能需要 Hot Restart。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Hot Reload 快且保留状态，适合 UI 和小逻辑调整。Hot Restart 慢且不保留状态，重新初始化，适合全局状态变化。原生代码改后需冷启动。

---

### FB-47-PE-A-008：Flutter 应用启动慢如何优化？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Flutter
**标签**：Flutter、启动优化、性能、包体积
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 应用启动慢的优化方向。

**参考答案**：
Flutter 启动优化方向：

1. **减小包体积**
   - 压缩图片、删除无用资源。
   - 使用 `--split-debug-info` 和 `--obfuscate`。
   - 按需引入依赖，避免过度依赖。

2. **延迟初始化**
   - 非必要服务在首帧后初始化。
   - 避免 main 函数中同步做大量工作。

3. **优化首屏 Widget**
   - 减少首屏构建复杂度。
   - 使用 splash 屏占位。

4. **减少 Shader 编译耗时**
   - 使用 Impeller（iOS 默认）减少 shader 编译 jank。
   - Android 可尝试开启 Impeller。
   - 预缓存 shader（旧方案）。

5. **网络请求优化**
   - 首屏所需数据并行请求。
   - 使用缓存先展示再更新。

6. **Dart VM 启动优化**
   - 减少主 isolate 初始化工作。
   - 延后大对象创建。

7. **原生层优化**
   - Android：优化 Application onCreate。
   - iOS：优化 AppDelegate 启动逻辑。

8. **使用性能工具**
   - Flutter DevTools  timeline 分析启动耗时。
   - 原生 profiler 分析平台启动时间。

9. **AOT 编译**
   - release 模式使用 AOT，启动比 debug 快很多。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 启动优化要减小包体积、延迟初始化、优化首屏 Widget、用 Impeller 减少 shader 编译、网络请求并行和缓存、减少 isolate 初始化、优化原生层启动、用 DevTools 分析。

---

### FB-47-PE-A-009：Flutter 列表性能优化有哪些手段？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Flutter
**标签**：Flutter、ListView、性能、优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 中长列表的性能优化方案。

**参考答案**：
Flutter 长列表优化：

1. **使用 ListView.builder**
   - 懒加载，只构建可视区 item。
   - 避免一次性构建所有 item。

2. **设置 itemExtent**
   - 固定高度列表设置 `itemExtent`，框架无需计算高度。
   - 大幅提升滚动性能。

3. **使用 const 构造函数**
   - item Widget 尽量用 const，减少重建。

4. **给 item 加 Key**
   - 列表数据变化时正确复用 Element。

5. **避免嵌套 ListView**
   - 嵌套滚动容易导致性能问题和手势冲突。
   - 可用 CustomScrollView + Sliver 组合。

6. **图片优化**
   - 列表图片懒加载、缓存、合适尺寸。
   - 使用 cached_network_image。

7. **减少 rebuild 范围**
   - 列表项内部状态变化只重建局部。
   - 使用 Selector、Consumer 等精确监听。

8. **分页加载**
   - 触底加载更多，避免一次性大数据。

9. **避免复杂 item**
   - 简化每个 item 的 UI 结构。

10. **使用 RepaintBoundary**
    - 对复杂 item 加 RepaintBoundary，减少重绘范围。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 长列表用 ListView.builder 懒加载，设置 itemExtent，item 用 const 和 Key，避免嵌套 ListView，图片优化，减少 rebuild 范围，分页加载，复杂 item 加 RepaintBoundary。

---

### FB-47-PE-A-010：Flutter 如何减少 Widget 重建？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Flutter
**标签**：Flutter、Widget、重建、性能、优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 中减少不必要 Widget 重建的方法。

**参考答案**：
减少 Widget 重建的方法：

1. **const 构造函数**
   - 对不依赖状态的子 Widget 使用 const。
   - 父 Widget 重建时 const 子 Widget 不会重建。

2. **细化状态作用域**
   - 把状态放到最小需要它的 Widget 中。
   - 避免高层 Widget 状态变化导致整树重建。

3. **使用 Selector / Consumer**
   - Provider 中 Selector 只监听部分数据变化。
   - 减少依赖大范围状态的重建。

4. **拆分 Widget**
   - 将大 Widget 拆分为多个小 Widget。
   - 每个小 Widget 独立管理状态和重建。

5. **使用 const 集合**
   - List、Map 等用 const 避免重复创建。

6. **避免在 build 中创建对象**
   - 避免每次 build 都创建新的对象或回调。
   - 缓存 callback 和对象。

7. **shouldRebuild 控制**
   - CustomPainter、SliverChildBuilderDelegate 等可控制是否重建。

8. **ValueNotifier + ValueListenableBuilder**
   - 局部状态变化只重建监听部分。

9. **合理设计 InheritedWidget**
   -  InheritedWidget 更新时，只重建依赖它的子树。

10. **使用 DevTools 分析**
    - 用 Flutter Performance 工具查看重建情况。
    - 针对性优化高频重建的 Widget。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> 减少 Widget 重建要 const 构造函数、细化状态作用域、Selector 监听部分数据、拆分 Widget、避免 build 中创建对象、ValueNotifier 局部刷新、用 DevTools 分析。

---

### FB-47-PE-A-011：Flutter 包体积如何优化？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Flutter
**标签**：Flutter、包体积、APK、IPA、优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 应用包体积优化的常见方法。

**参考答案**：
Flutter 包体积优化：

1. **压缩图片资源**
   - 使用 WebP 格式。
   - 删除无用图片，使用合适分辨率。

2. **移除未使用资源**
   - 清理 pubspec 中引用的无用资源。
   - 使用 flutter_asset_utils 等工具检查。

3. **代码混淆**
   - release 构建使用 `--obfuscate --split-debug-info`。
   - 减小产物体积。

4. **移除未使用依赖**
   - 定期检查 pubspec，删除无用包。
   - 使用 dependency_validator 等工具。

5. **使用 deferred components**
   - Android 支持延迟加载组件。
   - 按需下载功能模块。

6. **分平台构建**
   - 分别构建 arm64、arm32、x86 版本。
   - 避免一个包包含所有 ABI so。

7. **字体优化**
   - 只打包需要的字体字重。
   - 使用系统字体替代自定义字体。

8. **原生库优化**
   - 检查原生依赖体积。
   - 使用更轻量的替代方案。

9. **分析包体积**
   - 使用 `flutter build apk --analyze-size`。
   - 使用 DevTools 的 App Size 工具。

10. **资源 CDN 化**
    - 大资源放 CDN，运行时下载。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 包体积优化要压缩图片、移除未用资源、代码混淆、移除未用依赖、延迟组件、分平台构建、字体优化、分析包体积、大资源 CDN 化。

---

### FB-47-PE-A-012：Flutter 中如何优化图片加载和内存？

**题型**：性能优化题
**难度**：🟡 进阶
**岗位层级**：高级
**面试知识域**：Flutter
**标签**：Flutter、图片、内存、优化、缓存
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 中图片加载和内存优化的策略。

**参考答案**：
Flutter 图片优化策略：

1. **使用合适尺寸**
   - 不要加载远超显示尺寸的大图。
   - 服务端支持按尺寸裁剪。

2. **图片格式**
   - 优先使用 WebP，体积更小。
   - SVG 适合图标。

3. **缓存策略**
   - 使用 `cached_network_image` 包管理网络图片缓存。
   - 控制内存和磁盘缓存大小。

4. **懒加载**
   - ListView 中图片默认懒加载。
   - 避免首屏加载过多图片。

5. **释放不可见图片**
   - 长列表中图片离开可视区后可释放内存。
   - 使用 `VisibilityDetector` 控制加载。

6. **避免图片放大**
   - Image 组件 fit 方式要合理。
   - 内存中不要保存超过显示尺寸的图片。

7. **占位图和淡入**
   - 使用 placeholder 和 fade-in 提升体验。

8. **本地图片优化**
   - 使用 2.0x/3.0x 分辨率适配。
   - 压缩资源图片。

9. **内存监控**
   - 使用 DevTools Memory 工具。
   - 定位图片内存占用。

10. **RepaintBoundary**
    - 对复杂图片区域加 RepaintBoundary，减少重绘。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 图片优化要用合适尺寸、WebP、缓存网络图片、懒加载、释放不可见图片、合理 fit、占位图、内存监控、RepaintBoundary。

---

### FB-47-SC-R-005：Flutter 大型项目如何组织代码架构？

**题型**：场景设计题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：Flutter
**标签**：Flutter、架构、大型项目、分层
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 大型项目的代码组织方式和架构设计。

**参考答案**：
Flutter 大型项目架构：

1. **分层架构**
   - Presentation 层：UI、Widget、State。
   - Domain 层：业务逻辑、实体、用例。
   - Data 层：数据源、模型、仓库实现。

2. **状态管理**
   - 选择 Provider、Riverpod、Bloc、GetX 等。
   - 统一状态管理方案，避免混用。

3. **路由管理**
   - 使用 go_router 或 auto_route。
   - 集中管理路由和深层链接。

4. **依赖注入**
   - 使用 get_it、injectable 或 Riverpod 的依赖注入。
   - 便于测试和解耦。

5. **模块拆分**
   - 按功能模块拆分为多个 package。
   - 使用 melos 管理多包仓库。

6. **代码生成**
   - 使用 freezed、json_serializable、retrofit_generator。
   - 减少样板代码。

7. **测试策略**
   - 单元测试、widget 测试、集成测试分层。
   - 核心逻辑必须有测试覆盖。

8. **CI/CD**
   - 自动化构建、测试、代码质量检查、发布。

9. **代码规范**
   - lint 规则、Code Review、架构守卫。

10. **示例结构**：
    ```
    lib/
      main.dart
      app.dart
      features/
        auth/
          data/
          domain/
          presentation/
        home/
          ...
      core/
        utils/
        theme/
        router/
    ```

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 大型项目用分层架构（Presentation/Domain/Data），统一状态管理，go_router 路由，依赖注入，功能模块拆包，代码生成，分层测试，CI/CD，代码规范。

---

### FB-47-SC-R-006：Flutter 跨平台开发中如何处理平台差异？

**题型**：场景设计题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：Flutter
**标签**：Flutter、跨平台、平台差异、适配
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 开发中处理 iOS/Android/Web/桌面平台差异的策略。

**参考答案**：
处理平台差异策略：

1. **条件编译/平台判断**
   ```dart
   import 'dart:io' show Platform;
   if (Platform.isIOS) { ... }
   ```
   或使用 `defaultTargetPlatform`。

2. **PlatformView**
   - 需要原生控件时用 PlatformView 嵌入。
   - 如地图、视频播放器、广告。

3. **插件抽象**
   - 对平台能力封装统一接口。
   - 内部用 Platform Channel 调用原生。

4. **UI 适配**
   - 使用 Material 和 Cupertino 组件。
   - 根据平台选择合适风格。

5. **响应式布局**
   - 用 LayoutBuilder、MediaQuery 适配不同屏幕。
   - Web 和桌面需要特别考虑大屏布局。

6. **平台特定资源**
   - Android 和 iOS 分别配置图标、启动图、权限。

7. **功能降级**
   - 某平台不支持的功能提供替代方案。
   - 如 Web 不支持某些原生 API。

8. **统一测试**
   - 在不同平台模拟器和真机上测试。
   - 关注手势、输入法、生命周期差异。

9. **分支代码最小化**
   - 尽量把平台差异封装在底层，业务代码保持统一。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> 处理平台差异用 Platform 判断、PlatformView 嵌入原生控件、插件抽象、Material/Cupertino UI、响应式布局、平台资源、功能降级、多平台测试、把差异封装在底层。

---

### FB-47-SC-R-007：Flutter 项目中如何做状态管理选型？

**题型**：场景设计题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：Flutter
**标签**：Flutter、状态管理、选型、Provider、Bloc、Riverpod
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 常见状态管理方案及选型建议。

**参考答案**：
Flutter 常见状态管理方案：

| 方案 | 特点 | 适用场景 |
|------|------|---------|
| setState | 简单，内聚 | 局部简单状态 |
| InheritedWidget | 底层共享机制 | 主题、配置等 |
| Provider | 基于 InheritedWidget，易用 | 中小型项目 |
| Riverpod | 编译安全，依赖注入 | 中大型项目 |
| Bloc/Cubit | 事件驱动，可预测 | 复杂业务逻辑 |
| GetX | 功能全面，学习曲线低 | 快速开发 |
| MobX | 响应式 | 喜欢响应式编程 |

选型建议：
- 小项目：setState + Provider。
- 中大型项目：Riverpod 或 Bloc。
- 团队有响应式经验：MobX。
- 快速原型：GetX。

考虑因素：
- 团队熟悉度。
- 项目规模和复杂度。
- 测试友好性。
- 社区活跃度和长期维护。
- 是否与其他架构（如 Clean Architecture）兼容。

最佳实践：
- 不要在一个项目中混用多种状态管理方案。
- 状态管理要分层，UI 层只负责展示。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 状态管理有 setState、Provider、Riverpod、Bloc、GetX、MobX。小项目用 Provider，中大型用 Riverpod 或 Bloc，快速原型用 GetX。不要混用，状态管理分层。

---

### FB-47-SC-R-008：Flutter 应用的测试策略如何设计？

**题型**：场景设计题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：Flutter
**标签**：Flutter、测试、单元测试、Widget 测试、集成测试
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter 应用中单元测试、Widget 测试、集成测试的分工和实践。

**参考答案**：
Flutter 测试分层：

1. **单元测试**
   - 测试纯函数、业务逻辑、数据转换。
   - 不依赖 UI。
   - 使用 `flutter_test` 和 `mockito`。
   - 运行快，覆盖率高。

2. **Widget 测试**
   - 测试单个 Widget 的渲染和交互。
   - 验证 UI 状态变化、点击事件等。
   - 使用 `tester.pumpWidget`、`tester.tap`。

3. **集成测试**
   - 测试完整用户流程。
   - 在真机或模拟器上运行。
   - 使用 `integration_test` 包。

测试策略：
- 单元测试覆盖核心业务逻辑。
- Widget 测试覆盖关键交互组件。
- 集成测试覆盖核心用户路径。
- 测试金字塔：单元测试最多，集成测试最少。

CI 集成：
- 每次 PR 自动跑单元测试和 Widget 测试。
-  nightly 或发布前跑集成测试。

最佳实践：
- 业务逻辑与 UI 解耦，便于单元测试。
- 使用依赖注入，方便 mock。
- 避免过度测试 UI 细节。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 测试分单元测试、Widget 测试、集成测试。单元测纯逻辑，Widget 测单个组件渲染交互，集成测完整流程。金字塔结构，CI 自动跑，业务逻辑与 UI 解耦便于测试。

---

### FB-47-SD-R-008：Flutter 混合开发（与原生项目集成）有哪些方案？

**题型**：系统设计题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：Flutter
**标签**：Flutter、混合开发、原生集成、Flutter Module
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明在现有 Android/iOS 项目中集成 Flutter 的方案。

**参考答案**：
Flutter 混合开发方案：

1. **Flutter Module**
   - 将 Flutter 作为模块集成到现有原生项目中。
   - Android 通过 `flutter attach` 或 aar 依赖。
   - iOS 通过 pod 或 framework 依赖。
   - 适合逐步迁移。

2. **Flutter Engine 复用**
   - 多个 Flutter 页面共享同一个 FlutterEngine。
   - 减少引擎启动开销。
   - 需要管理引擎生命周期。

3. **PlatformView**
   - 原生 View 嵌入 Flutter。
   - 或 Flutter View 嵌入原生页面。

4. **多 Flutter 引擎**
   - 每个 Flutter 页面独立引擎。
   - 简单但内存开销大。

集成步骤：
1. 创建 Flutter module：`flutter create --template module my_flutter_module`。
2. 原生项目配置依赖。
3. 原生代码中创建 FlutterView 或 FlutterFragment/FlutterViewController。
4. 通过 Platform Channel 通信。

挑战：
- 包体积增加。
- 原生与 Flutter 页面跳转和生命周期协调。
- 状态共享和路由管理。
- 构建流程复杂。

建议：
- 新项目优先纯 Flutter。
- 老项目逐步迁移，先独立模块。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter 混合开发主要用 Flutter Module 集成到原生项目，可复用 FlutterEngine。PlatformView 嵌入原生 View。集成要注意包体积、生命周期、状态共享、构建流程。

---

### FB-47-SD-R-009：Flutter Web 的性能优化和适配有哪些要点？

**题型**：系统设计题
**难度**：🔵 架构
**岗位层级**：架构师
**面试知识域**：Flutter
**标签**：Flutter Web、性能、适配、优化
**出现频率**：高频
**预计回答时长**：5-8 分钟

**题目描述**：
请说明 Flutter Web 项目中的性能优化和浏览器适配要点。

**参考答案**：
Flutter Web 优化要点：

1. **渲染模式选择**
   - html renderer：文件小，适合移动端。
   - canvaskit renderer：性能好，适合桌面，但需下载 wasm。
   - 根据场景选择或自动切换。

2. **首屏加载优化**
   - 压缩 main.dart.js。
   - 使用 CDN、Gzip/Brotli。
   - 添加 loading 占位。

3. **SEO 优化**
   - Flutter Web 默认对 SEO 不友好。
   - 使用 `flutter_seo` 或 SSR 方案（如 flutter_rust_bridge + 服务端渲染）。
   - 关键页面使用静态 HTML。

4. **浏览器兼容**
   - 测试主流浏览器 Chrome、Safari、Edge、Firefox。
   - 注意 WebGL、触摸事件差异。

5. **响应式布局**
   - Web 屏幕尺寸多样，用 LayoutBuilder、MediaQuery 适配。

6. **滚动和手势**
   - Web 滚动行为与移动端不同。
   - 注意 hover、右键菜单等桌面交互。

7. **资源优化**
   - 图片、字体按需加载。
   - 使用 Web 友好的资源格式。

8. **减少 rebuild**
   - Web 上 Widget 重建成本更高，需更注意性能。

9. **测试**
   - 多浏览器、多分辨率测试。
   - 关注加载时间和交互流畅度。

**评分维度**：
- 能准确理解问题并给出结构化回答（40%）
- 能结合实际案例或数据说明（30%）
- 能体现业务思维与技术落地的结合（30%）

**常见错误**：
- 回答过于空泛，缺乏具体做法。
- 只谈技术实现，忽略业务目标和约束。
- 没有考虑风险和可执行性。

**口头回答版**：
> Flutter Web 要选对渲染模式，压缩 JS，CDN 加速，做 SEO，浏览器兼容测试，响应式布局，适配桌面交互，资源优化，减少 rebuild，多浏览器测试。

---
