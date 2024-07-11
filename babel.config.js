/* eslint-env node */

module.exports = {
  presets: [
    '@quasar/babel-preset-app'
  ],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining', { loose: false }], // 此行可处理项目启动后 可选链报错的问题
    'transform-vue-jsx',
  ],
}
