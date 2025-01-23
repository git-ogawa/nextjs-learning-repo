const tsPlugin = require("@typescript-eslint/eslint-plugin")
const tsParser = require("@typescript-eslint/parser")
const reactPlugin = require("eslint-plugin-react")
const reactHooksPlugin = require("eslint-plugin-react-hooks")
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y")
const storybookPlugin = require("eslint-plugin-storybook")

module.exports = [
  {
    files: ["**/*.{ts,tsx}"], // TypeScript ファイルを対象
    languageOptions: {
      parser: tsParser, // TypeScript パーサー
      parserOptions: {
        project: "./tsconfig.json", // TypeScript のプロジェクトファイルを指定
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // JSX サポート
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      // TypeScript 推奨ルール
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs["recommended-requiring-type-checking"].rules, // 型チェックを有効にするルール

      // React 関連ルール
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      // カスタムルール
      "@typescript-eslint/explicit-module-boundary-types": "off", // 型推論を優先
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // 未使用変数の警告
      "react/react-in-jsx-scope": "off", // Next.js では不要

      // ignore rules
      // "@typescript-eslint/no-misused-promises": "off",
      // "@typescript-eslint/no-floating-promises": "off",
      // "@typescript-eslint/require-await": "off",
      // "@typescript-eslint/no-unsafe-member-access": "off",
      // "@typescript-eslint/no-unsafe-call": "off",
      // "@typescript-eslint/no-unsafe-assignment": "off",
      // "@typescript-eslint/no-unsafe-return": "off",
      // "@typescript-eslint/no-unsafe-argument": "off",
      // "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.stories.{ts,tsx}"], // Storybook ファイル
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules, // Storybook 推奨ルール
    },
  },
  {
    ignores: ["node_modules", "dist", ".next"], // 無視するディレクトリ
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    plugins: ["import"], // eslint-plugin-import を追加
    settings: {
      // TypeScript の import を eslint-import-resolver-typescript で解決
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {},
    overrides: [
      {
        // TypeScript 用に設定を上書く
        files: ["*.ts", "*.tsx"],
        rules: {},
      },
      {
        // import を sort するため、AutoFix をかける範囲で設定を上書く
        files: ["src/folder/**/*.{js,jsx,ts,tsx}"],
        rules: {
          "import/order": [
            "error",
            {
              groups: ["builtin", "external", "parent", "sibling", "index", "object", "type"],
              pathGroups: [
                {
                  pattern: "@alias/**",
                  group: "parent",
                  position: "before",
                },
              ],
              alphabetize: {
                order: "asc",
              },
              "newlines-between": "always",
            },
          ],
        },
      },
    ],
  },
]
