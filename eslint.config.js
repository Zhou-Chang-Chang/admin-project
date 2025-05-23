import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  // 其他 JavaScript 文件也继承全局变量
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // {
  //   languageOptions: {
  //     globals: {
  //       ...globals.browser,
  //     },
  //   },
  //   rules: {
  //     //  关闭单文件组件名必须多单词的规则
  //     'vue/multi-word-component-names': 'off',
  //   },
  // },

  js.configs.recommended, // JavaScript 基础规则
  ...pluginVue.configs['flat/essential'],
  skipFormatting, // prettier 格式关闭

  // Vue 文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
])
