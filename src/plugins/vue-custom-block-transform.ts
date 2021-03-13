/**
 *Created by 夜雪暮歌 on 2021/2/25
 **/
// @ts-nocheck
import fs from 'fs'
import {parse} from '@vue/compiler-sfc'

export default {
  'demo-sign'(options) {
    const { path } = options
    const file = fs.readFileSync(path).toString()
    const parsed = parse(file).descriptor
    const title = parsed.customBlocks.find(block => block.type === 'demo-sign').content
    const main = parsed.source

    return `export default function (Component) {
      Component.__sourceCode = ${JSON.stringify(main)}
      Component.__sourceCodeTitle = ${JSON.stringify(title)}
    }`.trim()
  }
}