# ESLint & Prettier

> 오류를 잡으려면 린터, 스타일을 교정하려면 포맷터를 사용.

- ESLint

  - 린터 룰은 크게 포맷팅(스타일) 룰과 코드 퀄리티 룰이라는 두 가지 카테고리로 나눌 수 있다. 사용되지 않은 변수를 오류로 분류하는 코드 퀄리티 룰은 prettier 같은 포맷터가 잡아낼 수 없다.
    - 참고: ESLint에서 2013년 부터 유지해오던 [포맷팅 관련 규칙들을 폐기하겠다고 발표](https://eslint.org/blog/2023/10/deprecating-formatting-rules/). v8.53.0에서 일단 Deprecated 처리되며, v10에서 완전히 삭제할 예정이라고 함.
  - `root` :<br>
    ESLint는 린트 대상의 파일이 위치한 폴더(프로젝트 폴더) 안에 설정 파일이 있는지 우선적으로 확인하고, 없으면 그 상위 폴더를 한 단계씩 거슬러 올라가면서 설정 파일을 찾는다. `root` 옵션이 `true`로 설정되어 있는 설정 파일을 만나면 더 이상 상위 폴더로 올라가지 않는다. - '여기가 root니까 더 올라가지 마'
  - `plugins` :<br>

    > => `extends`와 마찬가지로, import 형태로 사용한다. flat config 에서는 네임스페이스를 원하는대로 변경할 수 있다.

    ESLint에는 기본으로 제공되는 규칙 외에도 추가적인 규칙을 사용할 수 있도록 만들어주는 다양한 플러그인이 있다. 예를 들어, JSDoc과 관련된 규칙은 다음과 같이 추가할 수 있다.

    ```js
    // eslint.config.js
    import jsdoc from 'eslint-plugin-jsdoc'

    export default [
      {
        plugins: {
          jsdoc,
        },
        rules: {
          'jsdoc/require-example': 'error', //
        },
      },
    ]
    ```

    ```js
    // 네임스페이스 변경 예시
    // eslint.config.js
    import jsdoc from 'eslint-plugin-jsdoc'

    export default [
      {
        plugins: {
          jsd: jsdoc, // 네임스페이스 jsd로 변경
        },
        rules: {
          'jsd/require-example': 'error', // 변경된 네임스페이스 사용
        },
      },
    ]
    ```

    당연히 먼저 프로젝트에 해당 플러그인을 개발 의존성으로 설치해놨어야한다. 보통 ESLint 플러그인의 npm 패키지 이름은 `eslint-plugin-`으로 시작한다.

    ```
    $ npm i -D eslint-plugin-import eslint-plutin-react
    ```

    한 가지 유념해야 할 것은, 단순히 플러그인만 추가해주면 관련 규칙이 바로 활성화되지 않는다는 점. 사실 플러그인은 '새로운 규칙을 단순히 설정이 가능한 상태로 만들어주기만' 한다. 실제로 규칙을 위반하면 오류를 낼지 경고를 낼지 아니면 해당 규칙을 끌지에 대해서는 `extends` 옵션이나 `rules` 옵션을 통해 추가 설정을 해줘야한다.

  - `extends` : (flat config 에서 없어짐)<br>

    > => 이제 extends 대신 해당 설정을 import 해서 config array에 추가해 사용하면 된다.

    Google, Facebook, Airbnb 등 수많은 기업들이 ESLint로 자바스크립트 코드를 린트하는데, `extends` 옵션을 통해서 이러한 기업들이 공개해놓은 설정을 그대로 가져와 기반(base) 설정으로 활용할 수 있다. 예를 들어, Airbnb에서 npm 저장소에 공개한 ESLint 설정인 `eslint-config-airbnb`를 기반 설정으로 사용하겠다 하면 아래와 같이 작성하면 된다.

    ```js
    // eslint.config.js
    export default [
      {
        extends: ['airbnb'],
      },
    ]
    ```

    이렇게 확장이 가능한 ESLint 설정은 npm 패키지 이름이 `eslint-config-`로 시작하며, `extends` 옵션에서 명시할 때는 위와 같이 앞 부분을 생략해도 무방하다.
    뿐만 아니라, 대부분의 ESLint 플러그인은 추천 설정을 제공한다. `extends` 옵션은 이러한 추천 설정을 사용할 때도 사용된다. 예를 들어, `import`와 `react` 플러그인에서 제공하는 추천 설정을 사용해보자.

    ```js
    // eslint.config.js
    export default [
      {
        plugins: ['import', 'react'],
        extends: ['plugin:import/recommended', 'plugin:react/recommended'],
      },
    ]
    ```

  - `eslint:recommend`가 없다 : <br>
    eslintrc에서는 extends 를 통해 ESLint 권장 규칙을 활성화할 수 있었으나, flat config에서는 불가능하다. 대신 `@eslint/js` 라는 패키지를 설치해 사용해야 한다.

    ```
    $ pnpm add --dev @eslint/js
    ```

    ```js
    // eslint.config.js
    import js from '@eslint/js'

    export default [
      {
        rules: {
          ...js.configs.recommended.rules,
          'no-unused-vars': 'warn',
        },
      },
    ]
    ```

  - `rule` :<br>
    규칙 하나하나를 세세하게 제어하기 위해 사용. `extends` 옵션을 통해 설정된 규칙을 덮어쓰고 싶을 때유용하게 쓰인다. 예를 들어, Airbnb 기반 설정에서는 `no-console` 규칙을 어기면 경고(warn)를 내고, `import/prefer-default-export` 규칙을 어기면 오류(error)를 내도록 되어 있는데요. 만약에 `no-console` 규칙을 어겼을 시, 경고 대신에 오류를 내고, `import/prefer-default-export` 규칙은 비활성화해보자.

    ```js
    // eslint.config.js
    export default [
      {
        extends: ['airbnb'],
        rules: {
          'no-console': 'error',
          'import/prefer-default-export': 'off',
        },
      },
    ]
    ```

    `rules` 옵션을 많이 사용하면 할 수록 직접 관리해야하는 설정이 늘어나는 부작용이 있으니 주의 필요.

  - `parser` / `parserOptions` :<br>
    ESLint는 기본적으로 <u>순수한 자바스크립트 코드</u>만 이해할 수 있기 때문에 자바스크립트의 확장 문법이나 최신 문법으로 작성한 코드를 린트하기 위해서는 그에 상응하는 파서(parser)를 사용하도록 설정해줘야 한다. 예를 들어, 타입스크립트와 JSX를 사용하여 작성된 코드를 린트하도록 설정해보자.

    ```js
    // eslint.config.js
    export default [
      {
        parser: '@typescript-eslint/parser',
        parserOptions: {
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 11,
        },
      },
    ]
    ```

    이번엔 Babel 파서로 사용하도록 설정해보자.

    ```js
    // eslint.config.js
    export default [
      {
        parser: '@babel/eslint-parser',
      },
    ]
    ```

  - `settings` : <br>
    일부 ESLint 플러그인은 추가적인 설정이 가능한데, 이런 경우 `setting` 옵션을 사용한다. 예를 들어, react 플러그인이 프로젝트에 설치된 리액트의 버전을 자동으로 탐지하도록 설정을 하려면 아래와 같이 한다. (기본 설정은 리액트 최신 버전을 기준으로 린트하게 되어있음.)
    ```js
    // eslint.config.js
    export default [
      {
        setting: {
          react: {
            version: 'detect',
          },
        },
      },
    ]
    ```
    그 외 다른 플러그인에 대한 구체적은 설정 방법은 해당 플러그인의 공식 문서를 참고.
  - `overrides` : (flat config 에서 없어짐)<br>

    > => flat config 에서 없어졌으며, `files` 속성으로 대상 파일을 지정하고 각각 다른 룰을 선언하면 됨. 만약 동일한 파일에 대한 두 가지 설정이 존재할 때는 언제나 마지막 설정이 적용된다.

    프로젝트 내에서 일부 파일에 대해서만 살짝 다른 설정을 적용해줘야 할 때 사용한다. 예를 들어, 프로젝트에 자바스크립트 파일과 타입스크립트 파일이 공존한다면 자바스크립트 파일을 기준으로 기본 설정을 하고, 타입스크립트 파일을 위한 설정은 `overrides` 옵션에 명시할 수 있다. 타입스크립트 확장자를 가진 파일에 대해서는 타입스크립트용 파서와 플러그인과 추천 설정을 사용하도록 별도로 세팅이 가능하다.<br>

  - flat config 에서는 `env` 옵션이 없음 : <br>
    더이상 환경을 명시하지 않는다. 대신 전역 변수에 대한 정의는 `languageOptions` 안의 `globals` 라는 옵션에서 정의하면 됨. ESLint 팀은 각 환경에 전역적으로 사용 가능한 항목을 그룹화한 간단한 json 인 [globals](https://www.npmjs.com/package/globals?activeTab=readme) 라는 패키지를 아래와 같이 사용할 것을 권장한다.

    ```js
    // eslint.config.js
    import globals from 'globals'

    export default [
      {
        files: ['**/*.js'],
        languageOptions: {
          globals: {
            ...globals.browser,
            myCustomGloabl: 'readonly',
          },
        },
      },
    ]
    ```

  - flat config 에서는 `ignorePatterns` 옵션이 없음 : <br>
    대신 `ignores` 옵션으로 사용.
  - `.eslintignore` 파일은 더이상 사용하지 않음 : <br>
    eslintrc 구조에서는 ESLint에서 전역적으로 몇개의 폴더를 제외하려면 아래와 같이 `.eslintignore`를 생성하거나,
    ```
    dist/
    node_modules/
    bin/
    build/
    ```
    또는 구성에서 최상위에 ignorePatterns 옵션을 사용해야 했다.
    ```js
    // eslintrc.js
    module.exports = {
      ignorePatters: ['dist/**', 'node_modules/**', 'bin/**', 'build/**'],
    }
    ```
    이제 flat config에서 동일한 효과를 얻으려면 <u>객체를 첫 번째 배열 요소로 추가</u>하고 무시를 선언하기만 하면 된다. '첫 번째 배열 요소로 추가하는 것'이 중요하다.
    ```js
    // eslint.config.js
    export default [
      // global ignores
      {
        ignores: ['dist/**', 'node_modules/**', 'bin/**', 'build/**'],
      },
      {
        files: ['**/*.js', '**/*.ts'],
        rules: {
          'prefer-const': 'error',
        },
      },
    ]
    ```

- Prettier 상세설정

  - 프리티어는 코드 포맷팅에 특화되어 있으므로, 린터가 할 수 없는 최대 글자 길에에 맞춘 자동 포맷팅을 할 수 있다.
  - 설정 방법은 3가지 방법 정도가 있으나, `.prettierrc.js` 등의 파일 형태로 저장하는 방법이 일반적이다.
  - 그냥 기본설정으로 사용해도 무방.
  - `singleQuote` : 홑따옴표. 문자열 표시 홑따옴표 사용 여부
  - `printWidth` : 한 줄 최대 글자 수.
  - `semi` : 세미콜론. 각 문장 뒤 세미콜론(`;`) 사용 여부
  - `trailingComma` : 후행 쉼표. 배열이나 객체, 매개변수가 작성된 경우 마지막 요소 뒤에도 쉼표(`,`) 붙이는지 여부. 쉼표 제거하고 싶다면 `none` 으로 설정.
  - `arrowParens` : 화살표 함수 괄호. 화살표 함수 작성 시 매개변수가 하나밖에 없더라도 매개변수를 소괄호(`()`)로 감싼다. 굳이 사용하고싶지 않다면 `avoid`로 설정.
  - `useTabs` : 탭 사용 여부. prettier는 들여쓰기 할 때 기본적으로 탭 대신 여러 개 공백을 사용함.
  - `tabWidth` : 탭 너비.

- ESLint와 Prettier를 같이 사용하기
  - eslint-config-prettier (추천)
    - eslint에서 prettier와 충돌할 수 있는 rule들을 꺼버림.
    - 코드 오류를 잡는데는 eslint를, 코드 포맷팅에는 prettier를 구분해서 사용하는 방법.
  - eslint-plugin-prettier (비추천, 사용하지 말것)
    - prettier를 eslint의 rule로 동작하게 함.
    - 포맷팅 문제도 오류로 출력되어서 오류 메시지가 지나치게 많아지며 느리다.
  - prettier-eslint (사용하지 말것)
    - prettier를 실행하고 나서 eslint --fix를 실행함. (prettier 실행 후 eslint를 실행하는 방법)
    - prettier를 단독으로 실행하는 것보다 훨씬 느리다.

# 모듈 시스템

CommonJS (CJS)

```js
// add.js
module.exports.add = (x, y) => x + y

// main.js
const { add } = require('./add')

add(1, 2)
```

ECMAScript Modules (ESM)

```js
// add.js
export function add(x, y) {
  return x + y
}

// main.js
import { add } from './add.js'

add(1, 2)
```

- Node.js에는 CommonJS, ECMAScript Modules라는 두 가지 모듈 시스템이 존재한다.
- CJS는 `require`/`module.exports`를 사용하고, ESM은 `import`/`export`문을 사용한다.
- CJS module loader는 동기적으로 작동하고, ESM module loader는 비동기적으로 작동한다.
  - ESM은 [Top-level Await](https://fe-developers.kakaoent.com/2022/220728-es2022/#1-top-level-await)를 지원하기 때문에 비동기적으로 동작한다.
- CJS는 Tree-shaking이 어렵고, ESM은 쉽게 가능하다.

  - 왜냐면 CJS는 기본적으로 `require`/`module.exports`를 동적으로 하는 것에 아무런 제약이 없기 때문. 따라서 CJS는 빌드 타임에 정적 분석을 적용하기가 어렵고, 런타임에서만 모듈 관계를 파악할 수 있다.

    ```js
    // require
    const utilName = /** 동적인 값 */;
    const util = require(`./utils/${utilName}`);

    // module.exports
    function foo() {
      if (/** 동적인 조건 */) {
        module.exports = /** ... */;
      }
    }
    foo();
    ```

  - 반면 ESM은 정적인 구조로 모듈끼리 의존하도록 강제한다. import path에 동적인 값을 사용할 수 없고, export는 항상 최상위 스코프에서만 사용할 수 있다. 따라서 ESM은 빌드 단계에서 정적 분석을 통해 모듈 간의 의존 관계를 파악할 수 있고, Tree-shaking을 쉽게 할 수 있다.

    ```js
    if (condition) {
      // 불가능 (동적으로 import 불가능)
      import modlule1 from 'module1'
    } else {
      import module2 from 'module2'
    }

    import util from './utils/${utilName}.js' // 불가능
    import { add } from './utils/math.js' // 가능

    function foo() {
      export const value = 'foo' // 불가능
    }
    export const value = 'foo' // 가능
    ```

- CJS / ESM 구분 (TypeScript도 동일)
  - `.js` 파일의 Module System은 package.json의 `type` field에 따라 결정된다.
    - `type` field의 기본값은 "commonjs"이고, 이 때 `.js`는 CJS로 해석된다.
    - `type` field 값의 다른 하나는 "module" 이다. 이 때 `.js`는 ESM으로 해석된다.
  - `.cjs`는 항상 CJS로 해석된다.
  - `.mjs`는 항상 ESM으로 해석된다.
- package.json에 추가된 exports 필드(속성)

  - 많은 라이브러리들이 CJS와 ESM을 동시에 지원하고 있다. 어떻게? `exports` 필드를 보고 각 모듈 시스템에 맞는 모듈을 불러온다. 기존에는 package.json의 main 필드를 주로 참고했다. 하지만 ESM 모듈과 CJS 모듈 두 개를 동시에 지원하는 경우에는 main 필드에 두 파일을 모둘 적을 수가 없다. 그래서 exports 필드가 생겼으며, exports 필드가 있으면 main, module, types 등보다 exports 필드를 더 우선시 한다.
  - 아래는 axios 라이브러리의 package.json 이다.

    ```json
    "exports": {
      ".": {
        "types": {
          "require": "./index.d.cts",
          "default": "./index.d.ts"
        },
        "browser": {
          "require": "./dist/browser/axios.cjs",
          "default": "./index.js"
        },
        "default": {
          "require": "./dist/node/axios.cjs",
          "default": "./index.js"
        }
      },
      "./lib/adapters/http.js": "./lib/adapters/http.js",
      "./lib/adapters/xhr.js": "./lib/adapters/xhr.js",
      "./unsafe/*": "./lib/*",
      "./unsafe/core/settle.js": "./lib/core/settle.js",
      "./unsafe/core/buildFullPath.js": "./lib/core/buildFullPath.js",
      "./unsafe/helpers/isAbsoluteURL.js": "./lib/helpers/isAbsoluteURL.js",
      "./unsafe/helpers/buildURL.js": "./lib/helpers/buildURL.js",
      "./unsafe/helpers/combineURLs.js": "./lib/helpers/combineURLs.js",
      "./unsafe/adapters/http.js": "./lib/adapters/http.js",
      "./unsafe/adapters/xhr.js": "./lib/adapters/xhr.js",
      "./unsafe/utils.js": "./lib/utils.js",
      "./package.json": "./package.json"
    },
    ```

    .(점)은 axios를 의미한다. 즉 `import 'axios'` 나 `require('axios')` 를 할 때 어떤 파일을 불러올 것인지 적어둔 것이다.<br>
    우선 `./lib/adapters/http.js`의 경우, `import 'axios/lib/adapters/http.js'`를 했을 때 './lib/adapters/http.js' 파일을 불러온다는 것을 알 수 있다. ESM이든 CJS든 불러오는 파일이 동일한 경우에는 이렇게 간단히 적을 수 있다.<br>

    - .(점) 하위에는 types, browser, default 키가 있는데, 이들은 '조건'이다.
      - `types`는 타입스크립트에서 불러올 때를 의미
      - `browser`는 브라우저에서 사용하는 경우를 의미
      - `default`는 그 외 기본적인 경우를 의미 (default 속성은 반드시 객체에서 제일 마지막에 있어야 한다.)
    - 각 조건에서 다시 아래 require와 default가 있다. 이들도 조건인데, 의미는 아래와 같다.

      - `require`는 CJS에서 불러올 때 참조할 파일을 의미
      - `default`는 그 외의 경우 불러올 파일을 의미
        위 axios package.json을 예로 들면, types + require는 CJS 타입스크립트 환경에서 타입을 찾으려고 할 때 참조할 파일을 적은 것이고, `index.d.cts`를 참조하라고 되어있다. types + default는 'CJS가 아닌' 타입스크립트 환경(ESM 환경)에서 타입을 찾으려고 할 때 참조할 파일을 적은 것이며 `index.d.ts`를 보라고 되어있다.

      ```js
      // index.d.cts
      declare const axios: axios.AxiosStatic;

      export = axios;
      ```

      ```js
      // index.d.ts
      declare const axios: AxiosStatic;

      export default axios;
      ```

# VUE

- vue-router 모드
  - Hash 모드: 해시모드는 모든 url을 hash(#) 형태로 서비스 한다. url이 변경될 때 페이지가 다시 로드되지 않는다.
    - `http://example.com/#/profile`에서 # 이후의 변경에 대해서는 웹서버에서는 인식하지 못한다. 왜냐면 request url로써는 #을 포함해 # 이후의 부분들은 생략되어 요청이 날라가기 때문. 요청이 날라가는건 최초에 한번 or 직접 접속 or 새로고침이고, 이후에는 #의 뒷부분들이 바뀌어도 HTTP 요청이 발생하지 않는다.
    - url에서 #은 해시라고 불리는데, [그 해시가 변경되는걸 감지해주는 web api](https://developer.mozilla.org/en-US/docs/web/api/window/hashchange_event)를 통해 해시 변경되는걸 vue-router에서 감지해 새로운 페이지로 화면 갱신없이 랜더링해준다. 그렇게 페이지 이동이 된다.
  - History 모드: 히스토리모드는 페이지를 다시 로드하지 않고 url을 탐색할 수 있다. SPA은 단일 페이지의 클라이언트 앱이기 때문에 사용자가 직접 `http://example.com/user/id`에 접속하면 404 에러가 발생한다. 이 문제를 해결하려면 서버에 간단한 포괄 대체 경로를 추가하기만 하면 된다.(아래 코드 참고)
    - 히스토리 모드로 바꾸면 url이 우리가 평소 보던 url처럼 /#이 제거되어 이쁘게 나온다. 이렇게되면 웹서버에서는 url이 바뀌는걸로 감지해 request가 날라가 페이지의 로드가 이루어지는 것으로 생각되나, 실제로 vue에서 히스토리 모드로 바꾸어도 request가 날라가지 않는다는 걸 볼 수 있다.
      ```js
      const router = createRouter({
        history: createWebHistory(),
        routers: [
          {
            path: '/:pathMatch(.*)',
            component: NotFolundComponent,
          },
        ],
      })
      ```
  - Hash 모드에서는 중간에 `http://example.com/user/id`와 같이 다른 url을 요청하면 전체 리소스 재로딩 없이 SPA 페이지 이동만 일어난다. History 모드에서는 페이지 재로딩이 발생한다. 따라서 History 모드에서는 없는 페이지의 경우에 404 not found 에러가 뜨는데, 이를 위해 router 설정 시 page Not Found 페이지 처리를 해주어야 한다.

# 기타

- 경로 표기
  - `'/path/**/*file.txt/'` : path 디렉토리 아래 모-든 디렉토리 및 그 하위에 있는 모든 디렉토리 내에서 'file.txt'로 끝나는 모든 파일을 포함.
- [Node.js] Path 모듈에서의 경로

  - Path 모듈 메소드
    - `path.join(경로, ..)`: 여러 인자를 넣으면 하나의 경로로 합쳐준다.
    - `path.resolve(경로, ..)`: path.join()과 비슷하지만 차이가 있다.
    - `path.parse(경로)`: 파일 경로를 root, dir, base, ext, name으로 분리한다.
    - `path.format(객체)`: path.parse() 한 객체를 파일 경로로 합친다.
    - `path.relative(기준경로, 비교경로)`: 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려준다.
  - `join`과 `resolve`의 차이점

    - `join`은 `/`를 상대경로로 처리, `resolve`는 절대경로로 처리한다.
    - `resolve`는 전달받은 경로인자들의 가장 오른쪽부터 왼쪽으로 합친다. 또한 합쳐나가는 중 인자의 맨 앞에 있는 `/`를 만나면 절대경로로 인식해서 그 이후 나머지 경로인자들을 무시한다. (인자 중간에 있는 `/`는 판단하지 않음 - `'foo/bar'`)
    - `__dirname`과 결합했을 때 `join`은 모두 결합하는 반면, `resolve`는 오른쪽부터 `/`가 있는 부분까지만 결합한다.

      ```js
      path.join('/foo/bar', './baz')
      // 실행결과 => /foo/bar/baz
      path.resolve('/foo/bar', './baz')
      // 실행결과 => /foo/bar/baz

      path.join('/foo/bar', '/tmp/file/')
      // 실행결과 => /foo/bar/tmp/file
      path.resolve('/foo/bar', '/tmp/file/')
      // 실행결과 => /tmp/file
      ```

- 패키지 매니저
  - npm
    - node.js에 내장되어 추가 설치가 불필요
    - 패키지 매니저의 시초: 생태계 풍부
  - yarn
    - npm의 취약점이었던 보안 문제 해결해 보다 나은 안전성 보장 (최근 npm의 보안 업데이트도 크게 향상되긴 했음)
    - npm과 달리 별도의 설치 필요 (npm을 통해 먼저 설치)
    - 다운받은 패키지 데이터를 캐시에 저장하여, 중복된 데이터는 다운로드 하지 않고, 캐시에 저장된 파일을 활용
    - 여러 개의 패키지를 설치할 때 병렬로 처리하여 설치 속도가 빠르다 (npm은 순차적)
    - npm은 패키지가 설치될 때 자동으로 코드와 의존성을 실행할 수 있도록 허용. 이것은 편리하지만 안정성을 위협한다. 반면 yarn은 `yarn.lock`이나 `package.json`으로부터 설치만 하며, `yarn.lock`은 모든 디바이스에 같은 패키지를 설치하는 것을 보장하기 때문에 버전 차이로 안해 생기는 버그를 방지함.
  - pnpm
    - performant npm (효율적인 npm)
    - 프로젝트별로 node_modules에 매번 패키지를 설치했던 것과는 달리, global 저장소에 패키지를 한번만 저정함으로써 저장 공간을 절약할 수 있음. 즉, 똑같은 라이브러리를 중복해서 설치할 필요가 없다.
    - 특정 패키지를 한번만 설치하기 때문에 프로젝트별로 연결을 해놓으면 호환 문제가 발생할 수 있어서 버전 관리를 반드시 해줘야함.
