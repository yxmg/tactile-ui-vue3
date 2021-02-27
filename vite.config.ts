/**
 *Created by 夜雪暮歌 on 2021/2/25
 **/
import {mdTransform} from './src/plugins/md-transform'
import vueCustomBlockTransforms from './src/plugins/vue-custom-block-transform'

export default {
  base: './',
  assetsDir: 'assets',
  plugins: [mdTransform()],
  vueCustomBlockTransforms
}
