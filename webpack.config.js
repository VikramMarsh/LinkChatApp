const path=require('path');

module.exports={
	entry:'./js/index.js',
	output:{
		path:path.join(__dirname,'public'),
		filename:'bundle.js',
		publicPath: '/'
	},
	module:{
		loaders:[{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
        			presets: ['react','es2015','stage-1']
        		}
	}]
},
	node:{
		net:'empty',
		dns:'empty'
	}
}