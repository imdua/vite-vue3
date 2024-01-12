## ESLint & Prettier

> 오류를 잡으려면 린터, 스타일을 교정하려면 포맷터를 사용.

- ESLint

  - 린터 룰은 크게 포맷팅(스타일) 룰과 코드 퀄리티 룰이라는 두 가지 카테고리로 나눌 수 있다. 사용되지 않은 변수를 오류로 분류하는 코드 퀄리티 룰은 prettier 같은 포맷터가 잡아낼 수 없다.
    - 참고: ESLint에서 2013년 부터 유지해오던 [포맷팅 관련 규칙들을 폐기하겠다고 발표](https://eslint.org/blog/2023/10/deprecating-formatting-rules/). v8.53.0에서 일단 Deprecated 처리되며, v10에서 완전히 삭제할 예정이라고 함.
  - `root` :
    ESLint는 린트 대상의 파일이 위치한 폴더(프로젝트 폴더) 안에 설정 파일이 있는지 우선적으로 확인하고, 없으면 그 상위 폴더를 한 단계씩 거슬러 올라가면서 설정 파일을 찾는다. `root` 옵션이 `true`로 설정되어 있는 설정 파일을 만나면 더 이상 상위 폴더로 올라가지 않는다. - '여기가 root니까 더 올라가지 마'
  - `plugins` :
    ESLint에는 기본으로 제공되는 규칙 외에도 추가적인 규칙을 사용할 수 있도록 만들어주는 다양한 플러그인이 있다. 예를 들어, 불러오기(import)와 React와 관련된 규칙은 다음과 같이 추가할 수 있다.
    ```js
    // eslint.config.js
    export default [
      {
        plugins: ["import", "react"],
      },
    ];
    ```
    당연히 먼저 프로젝트에 해당 플러그인을 개발 의존성으로 설치해놨어야한다. 보통 ESLint 플러그인의 npm 패키지 이름은 `eslint-plugin-`으로 시작한다.
    ```
    $ npm i -D eslint-plugin-import eslint-plutin-react
    ```
    한 가지 유념해야 할 것은, 단순히 플러그인만 추가해주면 관련 규칙이 바로 활성화되지 않는다는 점. 사실 플러그인은 '새로운 규칙을 단순히 설정이 가능한 상태로 만들어주기만' 한다. 실제로 규칙을 위반하면 오류를 낼지 경고를 낼지 아니면 해당 규칙을 끌지에 대해서는 `extends` 옵션이나 `rules` 옵션을 통해 추가 설정을 해줘야한다.
  - `extends` :
    Google, Facebook, Airbnb 등 수많은 기업들이 ESLint로 자바스크립트 코드를 린트하는데, `extends` 옵션을 통해서 이러한 기업들이 공개해놓은 설정을 그대로 가져와 기반(base) 설정으로 활용할 수 있다. 예를 들어, Airbnb에서 npm 저장소에 공개한 ESLint 설정인 `eslint-config-airbnb`를 기반 설정으로 사용하겠다 하면 아래와 같이 작성하면 된다.

    ```js
    // eslint.config.js
    export default [
      {
        extends: ["airbnb"],
      },
    ];
    ```

    이렇게 확장이 가능한 ESLint 설정은 npm 패키지 이름이 `eslint-config-`로 시작하며, `extends` 옵션에서 명시할 때는 위와 같이 앞 부분을 생략해도 무방하다.
    뿐만 아니라, 대부분의 ESLint 플러그인은 추천 설정을 제공한다. `extends` 옵션은 이러한 추천 설정을 사용할 때도 사용된다. 예를 들어, `import`와 `react` 플러그인에서 제공하는 추천 설정을 사용해보자.

    ```js
    // eslint.config.js
    export default [
      {
        plugins: ["import", "react"],
        extends: ["plugin:import/recommended", "plugin:react/recommended"],
      },
    ];
    ```

  - `rule` :
    규칙 하나하나를 세세하게 제어하기 위해 사용. `extends` 옵션을 통해 설정된 규칙을 덮어쓰고 싶을 때유용하게 쓰인다. 예를 들어, Airbnb 기반 설정에서는 `no-console` 규칙을 어기면 경고(warn)를 내고, `import/prefer-default-export` 규칙을 어기면 오류(error)를 내도록 되어 있는데요. 만약에 `no-console` 규칙을 어겼을 시, 경고 대신에 오류를 내고, `import/prefer-default-export` 규칙은 비활성화해보자.

    ```js
    // eslint.config.js
    export default [
      {
        extends: ["airbnb"],
        rules: {
          "no-console": "error",
          "import/prefer-default-export": "off",
        },
      },
    ];
    ```

    `rules` 옵션을 많이 사용하면 할 수록 직접 관리해야하는 설정이 늘어나는 부작용이 있으니 주의 필요.

  - `parser` / `parserOptions` :
    ESLint는 기본적으로 <u>순수한 자바스크립트 코드</u>만 이해할 수 있기 때문에 자바스크립트의 확장 문법이나 최신 문법으로 작성한 코드를 린트하기 위해서는 그에 상응하는 파서(parser)를 사용하도록 설정해줘야 한다. 예를 들어, 타입스크립트와 JSX를 사용하여 작성된 코드를 린트하도록 설정해보자.

    ```js
    // eslint.config.js
    export default [
      {
        parser: "@typescript-eslint/parser",
        parserOptions: {
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 11,
        },
      },
    ];
    ```

    이번엔 Babel 파서로 사용하도록 설정해보자.

    ```js
    // eslint.config.js
    export default [
      {
        parser: "@babel/eslint-parser",
      },
    ];
    ```

  - `settings` : 일부 ESLint 플러그인은 추가적인 설정이 가능한데, 이런 경우 `setting` 옵션을 사용한다. 예를 들어, react 플러그인이 프로젝트에 설치된 리액트의 버전을 자동으로 탐지하도록 설정을 하려면 아래와 같이 한다. (기본 설정은 리액트 최신 버전을 기준으로 린트하게 되어있음.)
    ```js
    // eslint.config.js
    export default [
      {
        setting: {
          react: {
            version: "detect",
          },
        },
      },
    ];
    ```
    그 외 다른 플러그인에 대한 구체적은 설정 방법은 해당 플러그인의 공식 문서를 참고.
  - `overrides` : 프로젝트 내에서 일부 파일에 대해서만 살짝 다른 설정을 적용해줘야 할 때 사용한다. 예를 들어, 프로젝트에 자바스크립트 파일과 타입스크립트 파일이 공존한다면 자바스크립트 파일을 기준으로 기본 설정을 하고, 타입스크립트 파일을 위한 설정은 `overrides` 옵션에 명시할 수 있다. 타입스크립트 확장자를 가진 파일에 대해서는 타입스크립트용 파서와 플러그인과 추천 설정을 사용하도록 별도로 세팅이 가능하다.

  - flat config 에서는 `env` 옵션이 없음 : 더이상 환경을 명시하지 않는다. 대신 전역 변수에 대한 정의는 `languageOptions` 안의 `globals` 라는 옵션에서 정의하면 됨. ESLint 팀은 각 환경에 전역적으로 사용 가능한 항목을 그룹화한 간단한 json 인 [globals](https://www.npmjs.com/package/globals?activeTab=readme) 라는 패키지를 아래와 같이 사용할 것을 권장한다.

    ```js
    // eslint.config.js
    import globals from "globals";

    export default [
      {
        files: ["**/*.js"],
        languageOptions: {
          globals: {
            ...globals.browser,
            myCustomGloabl: "readonly",
          },
        },
      },
    ];
    ```

  - flat config 에서는 `ignorePatterns` 옵션이 없음 : 대신 `ignores` 옵션으로 사용.
  - `.eslintignore` 파일은 더이상 사용하지 않음 : eslintrc 구조에서는 ESLint에서 전역적으로 몇개의 폴더를 제외하려면 아래와 같이 `.eslintignore`를 생성하거나,
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
      ignorePatters: ["dist/**", "node_modules/**", "bin/**", "build/**"],
    };
    ```
    이제 flat config에서 동일한 효과를 얻으려면 <u>객체를 첫 번째 배열 요소로 추가</u>하고 무시를 선언하기만 하면 된다. '첫 번째 배열 요소로 추가하는 것'이 중요하다.
    ```js
    // eslint.config.js
    export default [
      // global ignores
      {
        ignores: ["dist/**", "node_modules/**", "bin/**", "build/**"],
      },
      {
        files: ["**/*.js", "**/*.ts"],
        rules: {
          "prefer-const": "error",
        },
      },
    ];
    ```

- Prettier
  - 프리티어는 코드 포맷팅에 특화되어 있으므로, 린터가 할 수 없는 최대 글자 길에에 맞춘 자동 포맷팅을 할 수 있다.

### ESLint와 Prettier를 같이 사용하기

- eslint-config-prettier (추천)
  - eslint에서 prettier와 충돌할 수 있는 rule들을 꺼버림.
  - 코드 오류를 잡는데는 eslint를, 코드 포맷팅에는 prettier를 구분해서 사용하는 방법.
- eslint-plugin-prettier (비추천, 사용하지 말것)
  - prettier를 eslint의 rule로 동작하게 함.
  - 포맷팅 문제도 오류로 출력되어서 오류 메시지가 지나치게 많아지며 느리다.
- prettier-eslint (사용하지 말것)
  - prettier를 실행하고 나서 eslint --fix를 실행함. (prettier 실행 후 eslint를 실행하는 방법)
  - prettier를 단독으로 실행하는 것보다 훨씬 느리다.

## 기타

- 경로 표기
  - `'/path/**/*file.txt/'` : path 디렉토리 아래 모-든 디렉토리 및 그 하위에 있는 모든 디렉토리 내에서 'file.txt'로 끝나는 모든 파일을 포함.
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
