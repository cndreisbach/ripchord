const alias = require('rollup-plugin-alias')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')

// TODO add replace for process.env.

module.exports = {
  input: 'script.js',
  output: {
    file: 'build.js',
    format: 'esm'
  },
  plugins: [
    resolve({
      mainFields: ['module', 'main']
    }),
    alias({
      'vue': require.resolve('vue/dist/vue.esm.js')
    })
  ]
}
