const {injectBabelPlugin, compose} = require('react-app-rewired');
const rewireLess = require("react-app-rewire-less-modules");
module.exports = function override(config, env) {
    config = injectBabelPlugin([
        'import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css'
        }
    ], config);
    const rewires = compose(rewireLess.withLoaderOptions({
        modifyVars: {
            // "@primary-color": "#DB7093",
            // "@info-color": "#DB7093",
            // "@layout-body-background": "#fff"
        }
    }));

    return rewires(config, env);
};