//Create and export configuration environment

//Container for all environments
var environments = {}

environments.staging = {
    'port': 8082,
    'envName': 'staging',
}

environments.production = {
    'post': 5000,
    'envName': 'production'
}


//Determine which is passed in command line argument
var currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
// Check that the current environment is one of the environments above, if not, default to staging environment
var environmentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;


module.exports = environmentToExport;