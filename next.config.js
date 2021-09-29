/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
    distDir: 'dist',
    webpack(config) {
        config.resolve.alias['api'] = path.join(__dirname, 'api')
        config.resolve.alias['components'] = path.join(__dirname, 'components')
        config.resolve.alias['data'] = path.join(__dirname, 'data')
        config.resolve.alias['errors'] = path.join(__dirname, 'errors')
        config.resolve.alias['styles'] = path.join(__dirname, 'styles')
        config.resolve.alias['types'] = path.join(__dirname, 'types')
        config.resolve.alias['utilities'] = path.join(__dirname, 'utilities')
        config.resolve.alias['hooks'] = path.join(__dirname, 'hooks')
        config.resolve.alias['lib'] = path.join(__dirname, 'lib')
        config.resolve.alias['src'] = path.join(__dirname)

        return config
    },
})
