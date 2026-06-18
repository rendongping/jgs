# 系统架构练习册

## 一、选择题

### 1. 以下关于 MVC 模式的描述，正确的是？

A. View 可以直接修改 Model 的数据
B. Controller 负责接收用户输入并协调 Model 和 View
C. Model 只负责界面展示
D. MVC 中 View 和 Model 必须通过双向绑定同步

**答案：B**

**解析**：在 MVC 中，Controller 是协调者，接收用户输入，调用 Model 更新数据，再通知 View 刷新。View 不应该直接修改 Model；双向绑定是 MVVM 的特性。

---

### 2. 关于 MVVM 模式，下列说法错误的是？

A. MVVM 通过 ViewModel 实现 View 和 Model 的解耦
B. Vue 是典型的 MVVM 框架
C. ViewModel 必须包含所有业务逻辑
D. 双向绑定可以减少手动操作 DOM 的代码

**答案：C**

**解析**：ViewModel 负责把 Model 的数据转换为 View 需要的形式，并通过绑定机制同步。业务逻辑可以放在 Model 或服务层，不一定全部放在 ViewModel。

---

### 3. BFF 架构的主要价值是什么？

A. 替代前端框架
B. 为不同前端端聚合和适配后端接口
C. 完全取代后端微服务
D. 让前端直接操作数据库

**答案：B**

**解析**：BFF（Backend for Frontend）的核心价值是面向前端做接口聚合、数据适配、鉴权缓存等，不是替代前端框架或后端服务。

---

### 4. DDD 中的“限界上下文”主要用于解决什么问题？

A. 数据库性能优化
B. 明确业务边界，避免同一概念在不同场景下含义混淆
C. 前端页面布局
D. 网络请求并发控制

**答案：B**

**解析**：限界上下文（Bounded Context）是 DDD 核心概念，用于划定业务边界。例如“商品”在库存上下文和营销上下文中的含义不同。

---

### 5. 以下哪个原则强调“高层模块不应该依赖低层模块的具体实现”？

A. 单一职责原则
B. 开闭原则
C. 依赖倒置原则
D. 里氏替换原则

**答案：C**

**解析**：依赖倒置原则（DIP）要求依赖抽象而非具体实现，从而降低模块间耦合。

---

## 二、填空题

### 6. MVC 模式中的三个核心角色分别是 ______、______、______。

**答案**：Model（模型）、View（视图）、Controller（控制器）

**解析**：Model 负责数据和业务逻辑，View 负责界面展示，Controller 负责接收输入并协调 Model 和 View。

---

### 7. 在 MVVM 架构中，______ 扮演了 View 和 Model 之间的桥梁，负责数据的双向同步。

**答案**：ViewModel

**解析**：ViewModel 把 Model 的数据转换为 View 可用的形式，并通过响应式机制实现自动同步。

---

### 8. DDD 中用于隔离外部模型变化对内部领域模型影响的层叫做 ______。

**答案**：防腐层（Anti-Corruption Layer）

**解析**：防腐层负责把外部模型（如后端 DTO）转换为内部领域模型，保护核心业务代码不受外部变化影响。

---

### 9. 前端架构中，把代码按业务领域而非技术类型组织的拆分方式，体现了 DDD 中的 ______ 思想。

**答案**：限界上下文 / 领域拆分

**解析**：按业务领域组织代码让每个上下文内部的代码高内聚，便于团队协作和长期维护。

---

### 10. 分层架构中，______ 层通常负责调用后端 API 并把数据转换为领域模型。

**答案**：数据访问层 / 防腐层 / 适配层

**解析**：数据访问层（或适配层）是应用与外部服务交互的边界，负责网络请求、数据转换、错误处理等。

---

## 三、代码分析题

### 11. 阅读以下代码，指出其架构问题并提出改进方案。

```javascript
// page.js
import { getUser, getOrders, getProducts } from './api';

export default function initPage() {
  $('#btn-load').click(async () => {
    const user = await getUser();
    const orders = await getOrders(user.id);
    const products = await getProducts();

    let html = '<h1>用户：' + user.name + '</h1>';
    html += '<ul>';
    orders.forEach(order => {
      html += '<li>订单号：' + order.id + '，金额：' + order.amount + '</li>';
    });
    html += '</ul>';
    html += '<h2>推荐商品</h2>';
    products.forEach(p => {
      html += '<p>' + p.name + '：' + p.price + '元</p>';
    });

    $('#app').html(html);
  });
}
```

**答案与解析**：

主要问题：

1. **混合关注点**：DOM 操作、网络请求、业务逻辑、字符串拼接全部混在一起。
2. **无领域模型**：直接使用原始 API 返回数据，没有定义 User、Order、Product 等领域对象。
3. **难以测试**：无法单独测试业务逻辑，必须依赖 DOM 和真实 API。
4. **可维护性差**：HTML 结构嵌入在 JS 字符串中，容易出错。

改进方案：

```javascript
// domain/order.js
export class Order {
  constructor(id, amount) {
    this.id = id;
    this.amount = amount;
  }

  format() {
    return `订单号：${this.id}，金额：${this.amount}`;
  }
}

// services/userPageService.js
import { adaptUser, adaptOrders, adaptProducts } from './adapters';

export async function loadUserPageData(userId) {
  const [user, orders, products] = await Promise.all([
    getUser(userId).then(adaptUser),
    getOrders(userId).then(adaptOrders),
    getProducts().then(adaptProducts)
  ]);
  return { user, orders, products };
}

// components/UserPage.js
export function UserPage({ user, orders, products }) {
  return `
    <h1>用户：${user.name}</h1>
    <ul>
      ${orders.map(order => `<li>${order.format()}</li>`).join('')}
    </ul>
    <h2>推荐商品</h2>
    ${products.map(p => `<p>${p.name}：${p.price}元</p>`).join('')}
  `;
}
```

改进后职责清晰：领域模型负责业务逻辑，服务层负责数据聚合，组件负责渲染。

---

### 12. 分析以下 BFF 代码，指出潜在风险。

```javascript
app.get('/api/dashboard', async (req, res) => {
  const user = await fetchUser(req.query.userId);
  const orders = await fetchOrders(user.id);
  const products = await fetchProducts();
  const coupons = await fetchCoupons(user.id);
  const notifications = await fetchNotifications(user.id);

  res.json({ user, orders, products, coupons, notifications });
});
```

**答案与解析**：

风险：

1. **串行请求导致性能差**：5 个请求依次执行，响应时间为各请求耗时之和。
2. **单点故障放大**：只要有一个下游服务失败，整个接口返回 500。
3. **无超时和降级**：某个服务卡住会导致整个请求卡住。
4. **无缓存**：相同用户每次请求都重新查全部数据。
5. **数据量不可控**：orders 等列表可能很大，直接返回给前端会造成传输和渲染压力。

改进方案：

```javascript
app.get('/api/dashboard', async (req, res) => {
  try {
    const user = await fetchUser(req.query.userId);

    const [orders, coupons, notifications] = await Promise.all([
      fetchOrders(user.id, { limit: 10 }).catch(() => []),
      fetchCoupons(user.id).catch(() => []),
      fetchNotifications(user.id, { limit: 5 }).catch(() => [])
    ]);

    const products = await fetchProducts({ limit: 6 }).catch(() => []);

    res.json({
      user: pick(user, ['id', 'name', 'avatar']),
      orders: orders.map(adaptOrder),
      coupons: coupons.map(adaptCoupon),
      notifications: notifications.map(adaptNotification),
      products: products.map(adaptProduct)
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: '加载失败，请稍后重试' });
  }
});
```

---

### 13. 下面这段代码违反了哪条架构原则？如何重构？

```javascript
// components/OrderList.js
import { request } from '../utils/request';

export function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    request('/api/orders').then(setOrders);
  }, []);

  return (
    <ul>
      {orders.map(order => (
        <li key={order.id}>
          {order.id} - {order.status === 1 ? '待支付' : order.status === 2 ? '已支付' : '已完成'}
        </li>
      ))}
    </ul>
  );
}
```

**答案与解析**：

问题：

1. **组件直接调用 API**：组件承担了数据获取职责，违反单一职责。
2. **业务逻辑泄露到视图层**：状态码转文本的逻辑应该由领域模型或服务层处理。
3. **无领域模型**：直接使用原始 API 数据。

重构：

```typescript
// domain/order.ts
export enum OrderStatus {
  PENDING = 1,
  PAID = 2,
  COMPLETED = 3
}

export const ORDER_STATUS_TEXT = {
  [OrderStatus.PENDING]: '待支付',
  [OrderStatus.PAID]: '已支付',
  [OrderStatus.COMPLETED]: '已完成'
};

export class Order {
  constructor(
    public id: string,
    public status: OrderStatus
  ) {}

  get statusText() {
    return ORDER_STATUS_TEXT[this.status] || '未知状态';
  }
}

// hooks/useOrders.ts
export function useOrders() {
  return useQuery('orders', () =>
    request('/api/orders').then(adaptOrders)
  );
}

// components/OrderList.js
export function OrderList() {
  const { data: orders } = useOrders();

  return (
    <ul>
      {orders?.map(order => (
        <li key={order.id}>{order.id} - {order.statusText}</li>
      ))}
    </ul>
  );
}
```

---

## 四、架构设计题

### 14. 某电商公司有 PC 官网、H5、小程序、管理后台四个前端项目，后端采用微服务架构（用户服务、订单服务、商品服务、营销服务）。请设计前端与后端的交互架构，说明是否需要 BFF，以及如何划分 BFF。

**参考答案**：

建议引入 BFF 层，原因：

1. 四端需求差异大，同一接口难以满足所有端。
2. 页面通常需要聚合多个微服务数据。
3. 需要统一处理鉴权、限流、缓存。

BFF 划分建议：

- **C 端 BFF**：服务 PC、H5、小程序，负责首页、商品详情、购物车、下单等。
- **管理后台 BFF**：服务 Admin 后台，负责数据报表、运营配置、权限管理等。

也可以进一步按业务领域拆分：

- user-bff
- order-bff
- product-bff
- marketing-bff

但需权衡服务数量与维护成本。初期建议按“端 + 业务域”两层划分。

---

### 15. 你接手一个历史悠久的 jQuery 项目，代码高度耦合，测试覆盖率为 0。业务方要求在未来半年内持续迭代新功能。请给出分阶段的前端架构改造方案。

**参考答案**：

**第一阶段：止血（1-2 周）**

- 引入 ESLint/Prettier 统一代码风格。
- 建立基础构建流程，引入模块打包工具（如 Webpack/Vite）。
- 补充关键路径的端到端测试，确保改造不破坏核心功能。

**第二阶段：边界清晰（1-2 月）**

- 按页面或业务模块拆分代码，建立目录规范。
- 引入 MVC/MVVM 分层，把 DOM 操作和业务逻辑分离。
- 提取公共组件和工具函数，建立组件库雏形。

**第三阶段：现代化（2-4 月）**

- 引入现代框架（如 Vue/React），新功能用新框架开发，老页面逐步迁移。
- 建立状态管理、路由管理、API 层规范。
- 引入单元测试和集成测试。

**第四阶段：持续演进**

- 引入 DDD 思想，按领域组织代码。
- 评估是否需要微前端或 Monorepo。
- 建立性能监控和质量门禁。

---

### 16. 如何在前端项目中落地 DDD？请列出具体步骤和注意事项。

**参考答案**：

步骤：

1. **识别领域**：与产品和后端对齐，明确业务领域边界（如订单、商品、用户）。
2. **建立领域模型**：定义实体、值对象、聚合根，使用 TypeScript 类或类型描述。
3. **按领域拆分目录**：每个领域包含自己的 components、services、stores、types。
4. **建立防腐层**：用 Adapter 把后端 DTO 转换为领域模型。
5. **业务逻辑下沉**：把状态流转、计算规则放到领域模型中，而不是组件里。

注意事项：

- 不要为了 DDD 而 DDD，简单 CRUD 项目不必强行套用。
- 前端 DDD 更多是“组织代码”和“保护领域模型”，不是照搬后端战术设计。
- 与后端团队保持术语一致，避免“一个概念多种叫法”。
- 渐进式落地，从核心领域开始试点。

---

> **领域编号**：A01 系统架构  
> **最后更新**：2026-06-18
