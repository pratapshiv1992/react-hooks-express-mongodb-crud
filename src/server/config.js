/**
 * Default config for all environment types
 * @type {{db: string, apiPort: number}}
 */
const defaultConfig = {
    db: 'mongodb://localhost:27017/expressMongodbReactDemo',
    apiPort: 4000
};

/**
 * Enviroment specific configuration
 * @type {{prod: {}, dev: {}, test: {apiPort: number}}}
 */
const envConfig = {
    prod: {},
    dev: {},
    test: {apiPort: 3100}
};

/**
 * Loads config based on the current environment
 * @returns {*}
 */

function loadConfig() {
    const env = process.env.NODE_ENV || 'dev';
    if (!envConfig[env]) {
        throw new Error(`Environment config for environment '${env}' not found. process.env.NODE_ENV must be one of '${Object.keys(envConfig)}'`);
    }
    console.log('[INFO] config loaded for environment: ', env);
    return Object.assign({}, defaultConfig, envConfig[env]);    // merge default config with environment specific config
}

export default loadConfig();
