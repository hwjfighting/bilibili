module.exports = {
    lintOnSave: false, //取消eslint校验代码
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',

            }
        }

    }

}