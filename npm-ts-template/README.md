# NPM Template With TypeScript/TS

## 介绍

这是一个用于创建一个包含 TypeScript/TS 的 NPM/npm 包的模板。


## 如何创建一个 TypeScript/TS 的 NPM/npm 包

0. 在 GitHub 上创建一个仓库，并 `clone` 到本地

1. 登录到 npm 官网 [https://www.npmjs.com/](https://www.npmjs.com/)

注册登录你的账号

2. 在本地进行登录：使用 `npm login` 命令

![](https://img-blog.csdnimg.cn/687a552c1e2a4742ae5e2a53a3e6b324.png)

3. 初始化一个 npm 项目：`npm init`

其实就是生成一个 `package.json` 文件：
![](https://img-blog.csdnimg.cn/b2d762275fda4c9e8880b7f35b148402.png)
4. 安装 TypeScript 依赖
```shell
npm install --save-dev typescript
```

5. 添加 `tsconfig.json` 文件

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./lib",
    "strict": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "**/__tests__/*"]
}
```
![](https://img-blog.csdnimg.cn/4d57e4ebd8684719ac57195e11168597.png)
6. 安装 `prettier` 和 `tslint`

> `tslint-config-prettier` 用于解决 `tslint` 和 `prettier` 之间的规则冲突

```shell
npm install --save-dev prettier tslint tslint-config-prettier
```

7. 添加 `tslint.json` 文件

```json
{
  "extends": ["tslint:recommended", "tslint-config-prettier"]
}

```

8. 添加 `.prettierrc` 文件

```json
{
  "printWidth": 80,
  "trailingComma": "all",
  "singleQuote": true
}
```

9. 在 `package.json` 添加需要的运行脚本

```json
  //...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "format": "prettier --write \"src/**/*.ts\" \"src/**/*.js\"",
    "lint": "tslint -p tsconfig.json"
  },
  //...
```

10. 在 `package.json` 添加白名单文件
```json
  //...
  "files": ["lib/**/*"]
  //...
```

> 只有在 `files`  数组中的文件才会被 publish 到 npm 上

11. 安装 `jest`，用于单元测试
```shell
npm install --save-dev jest ts-jest @types/jest
```

12. 创建 `jestconfig.json`
```json
{
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
}
```

13. 把 `package.json` 中旧的 `test` 运行脚本替换掉
```json
  "scripts": {
    "test": "jest --config jestconfig.json",
    //...
  },
```

14. 在 `src/` 下创建一个 `index.ts` 文件
```typescript
export const Greeter = (name: string) => `Hello ${name}`;
```

15. 在 `src/` 下创建 `__tests__` 文件夹，在`src/__tests__` 文件夹下创建一个 `test.ts` 文件，编写单元测试

```typescript
import { Greeter } from '../index';

test('My Greeter', () => {
  expect(Greeter('Carl')).toBe('Hello Carl');
});
```

16. 运行单元测试
```shell
npm run test
```

17. 在 `package.json` 中增加一些前置 or 后置处理脚本
```json
  "scripts": {
    //...
    "prepare": "npm run build",
    "prepublishOnly": "npm test && npm run lint",
    "preversion": "npm run lint",
    "version" : "npm run format && git add -A src",
    "postversion" : "git push && git push --tags"
  },
```
- `"prepare": "npm run build"`: `prepare` 脚本会在项目、发布，还有本地 `npm install` 之前执行。
- `"prepublishOnly" : "npm test && npm run lint"` : `prepublishOnly` 会在 `prepare` 脚本之前以及 `npm publish`运行过程中执行。
- `"preversion": "npm run lint"` : `preversion` 会在发布新的包版本之前执行。
- `"version" : "npm run format && git add -A src"` : `version` 会在新版本被发布之后执行。
- `"postversion" : "git push && git push --tags"` : `postversion` 会在 git 的 `commit` 创建之后执行。

18. 完善 `package.json` 脚本
```json
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
```

19. 提交代码
```json
git add -A && git commit -m "Setup Package"
git push
```

20. 发布 npm 包
```shell
npm publish
```
> 如果你是一个包含作用域（Scoped，含有前缀的 `@`开头的，比如 `@vue/compiler-core`）的包，并且是公开的，那么需要加上 `--access=public`，否则会发布失败，因为发布作用域包默认是付费私有。

21. 升级新版本
```shell
npm version patch
```

22. 重新发布包
```shell
npm publish
```