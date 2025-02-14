const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

 module.exports = {
    chainWebpack: config => {
        plugins: [
            new GoogleFontsPlugin({
                fonts: [
                    { family: "Source Sans Pro" },
                    {family:"Bebas Neue"}
                ]
            })
        ]
     }
 }