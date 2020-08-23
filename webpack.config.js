const path = require("path");

module.exports = {
    entry: "./src/index.js", //on donne à Webpack index.js en entrée
    output: { //le fichier en sortie
        path: path.resolve(__dirname,"dist/assets"), //le fichier ira dans le dossier dist/assets
        filename: "main.js",
        publicPath: path.resolve(__dirname,"dist/assets")
    },
    devServer: {
        inline: true, //insertion d'un script permettant le hot-reload + insertion de messages de build dans la console
        contentBase: path.join(__dirname,"dist"), //le dossier sur lequel le serveur client devra utiliser
        port: 3030,
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
            }
            //Pas besoin d'utiliser json-loader : webpack >= 2.0.0 interprète déjà les fichiers JSON
            // {
            //     test: /\.json$/,
            //     exclude: /(node_modules)/,
            //     loader: 'json-loader' //json-loader permet de charger un fichier JSON du côté client
            // }
        ]
    }
}