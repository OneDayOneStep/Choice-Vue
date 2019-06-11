// vue.config.js
let Mock = require('./src/mock/data.json')
module.exports = {
    runtimeCompiler: true,
    publicPath: '/',
    devServer: {
        before(app) {
            app.get('/api/data', (req, res) => {
                res.json({
                    errno: 0,
                    data: Mock
                })
            })
        }
    },
    configureWebpack: {
        mode: "development"
    }
}