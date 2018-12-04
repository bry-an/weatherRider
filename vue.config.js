module.exports = {
  configureWebpack: {
    rules: [
      {
        test: /\.css$,
        use: [
          "vue-style-loader", 
          {
            loader: "css-loader", 
            options: {
              modules: true, 
              localIdentName: "[local]_[has:base64:8]"
            }
          }
        ]
      }
    ]
  }
}