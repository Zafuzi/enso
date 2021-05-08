module.exports = {
	servers: {
		one: {
			// change to your server ip
			host: '165.232.146.70',
			username: 'root',
		}
	},

	app: {
		name: 'meteor-micro-server',
		path: '../',

		servers: {
			one: {},
		},

		buildOptions: {
			serverOnly: true,
		},

		env: {
			// server url 
			ROOT_URL: 'https://www.moistboat.com',
			MONGO_URL: 'mongodb://mongodb/meteor',
			MONGO_OPLOG_URL: 'mongodb://mongodb/local',
		},

		docker: {
			image: 'abernix/meteord:node-12-base',
		},

		enableUploadProgressBar: true
	},

	mongo: {
		version: '3.4.1',
		servers: {
		one: {}
		}
	},

	proxy: {
		// change this to your domain
		domains: 'moistboat.com,www.moistboat.com',
		// and your email
		ssl: {
			letsEncryptEmail: 'zacharyfoutz@gmail.com'	
		}
	}
};
