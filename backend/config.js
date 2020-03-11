module.exports = {
	postgress: {
		database: "api",
		username: "api",
		password: "api",
		option: {
			host: 'localhost',
			dialect: 'postgres',
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			}
		}
	},
	mongodb: {
		url: 'mongodb://localhost/',
		database: 'api'
	}
}