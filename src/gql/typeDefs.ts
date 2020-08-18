const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const typesArray = loadFilesSync(path.join(__dirname, '../entities/**/schema.js'));

export default mergeTypeDefs(typesArray, { all: true });