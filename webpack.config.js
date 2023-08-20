const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/main.tsx',
	output: {
		path: path.join(__dirname, './build'),
		filename: '[name].[fullhash].bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							"@babel/preset-typescript",
							"babel-preset-solid"
						]
					}
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					{
						loader: 'css-loader',
						options: {
							modules: {
								auto: /\.module\.scss$/,
								mode: 'local',
								localIdentName: '[local]_[hash:base64:6]',
								exportLocalsConvention: "camelCase",
							},
						},
					},
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								indentWidth: 4,
								includePaths: [path.join(__dirname, 'src/asset')],
							},
						},
					},
				],
			},
			{
				test: [/\.json$/,],
				type: 'asset/source'
			},
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@src': path.resolve(__dirname, 'src/'),
			'@feature': path.resolve(__dirname, 'src/feature'),
		},
	},
	devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'static'),
		},
		historyApiFallback: true,
		port: 8000,
		hot: true,
		compress: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/asset/index.html',
		}),
	],
}