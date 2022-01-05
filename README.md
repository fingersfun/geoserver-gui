# Geoserver Tools

## Intro

![styling](./files/demo.gif)

## For Developer

Option 1: For container development(Docker required):

1. Create the container: `./dev frontend`
2. Re-install PNP pakcages by Yarnpkg: `yarn install`(execute in your container)
3. Start Webpack dev-server: `yarn start`(execute in your container)

Option 2: For native development:

(Nodejs installed is required)

If yarnpkg is not installed: `npm install -g yarn`

1. `yarn install`
2. `yarn start`

Access: `http://localhost:9000/`

Other commands:

* Install new package: `yarn add [-D] <package-name>@version`
* Recycle development container: `./dev down`
