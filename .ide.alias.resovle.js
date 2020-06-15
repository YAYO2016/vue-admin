/**
 * Created by yanyue on 2020/6/15 20:40
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转 -- 用来让webstorm识别别名，然后进行跳转使用的
 */
module.exports = {
  resolve: {
    alias: {
      "@": require("path").resolve(__dirname, "src"),
      "@common": require("path").resolve(__dirname, "src/common"),
      "@components": require("path").resolve(__dirname, "src/components")
    }
  }
};
