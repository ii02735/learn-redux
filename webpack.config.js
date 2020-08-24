const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js", //on donne à Webpack index.js en entrée
    output: { //le fichier en sortie
        path: path.resolve(__dirname,"dist/assets"), //le fichier ira dans le dossier dist/assets
        filename: "bundle.js"
    },
    devServer: {
        inline: true, //insertion d'un script permettant le hot-reload + insertion de messages de build dans la console
        contentBase: path.join(__dirname,"dist"), //le dossier sur lequel le serveur client devra utiliser
        port: 3030,
        writeToDisk: true
    },
    module: { //insertion de modules pour la transpilation
        rules: [
            {
                test: /\.js$/, //le loader devra s'exécuter sur tous les fichiers JS
                exclude: /(node_modules)/, //on exclut le fichier node_modules,
                loader: 'babel-loader', //le nom du loader qui doit utiliser ces règles 
                options: { //ici contient les règles propres à babel (on reprend le contenu du .babelrc qui était utile pour babel-cli)
                    presets: ['@babel/preset-env']
                }
            },
            //Pas besoin d'utiliser json-loader : webpack >= 2.0.0 interprète déjà les fichiers JSON
            // {
            //     test: /\.json$/,
            //     exclude: /(node_modules)/,
            //     loader: 'json-loader' //json-loader permet de charger un fichier JSON du côté client
            // }
            {   //Interprétation des fichiers JSX par babel à l'aide du preset de React
                test: /\.(jsx|js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        ]
    }
}