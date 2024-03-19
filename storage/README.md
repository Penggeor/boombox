# `localStorage`/`sessionStorage` 轻量封装

`localStorage` 只能设置字符串，需要设置对象时比较麻烦。

该包提供了一个简单的封装，可以**直接获取、存储对象**。

```typescript
// 导入 localStorage
import { localStorage } from '@boombox/storage';
```

```typescript
// 像正常的 localStorage 一样使用
// 1. 获取 item
const storage = localStorage.getItem('statistic')
// 2. 设置 item
localStorage.setItem('statistic', storage)
```

```typescript
// 直接存储
localStorage.setItem('statistic', { count: 1 })
```

这里实际是用 `serialize` 和 `deserialize` 方法来实现的。

默认 `serialize` 为 `JSON.stringify`，`deserialize` 为 `JSON.parse`。


可以设置自定义的 `serialize` 和 `deserialize` 方法。
```typescript
// 比如 YAML 序列化
import { localStorage } from '@boombox/storage';
import { safeDump, safeLoad } from 'js-yaml';

localStorage.serialize = safeDump;
localStorage.deserialize = safeLoad;
```

