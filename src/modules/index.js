const fs = require('fs');
const express = require('express');
const { debugApp } = require('../config/debug');
const { SERVER_HOST, PORT, NODE_ENV } = process.env;
const { RestException, errors} = require('modules/rest.exception');
const { default: app } = require('app');

const apiDoc = {
  swagger: '2.0',
  title: 'wshop API Doc.',
  info: {
    description: 'Workshop now api documentation',
    version: '0.0.1',
    title: 'Workshopnow Doc.',
    termsOfService: '',
    contact: {
      email: '',
    },
  },
  //host:
  //  ['test', 'dev', 'development'].indexOf(NODE_ENV) > -1
  //    ? `${SERVER_HOST.replace('https://', '')}`
  //    : SERVER_HOST,
  basePath: '/',
  //schemes: ['test', 'dev', 'development'].indexOf(NODE_ENV) > -1 ? ['http'] : ['https', 'http'],
  paths: {},
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'x-api-key',
      in: 'header',
    },
  },
  definitions: {},
};

const router = express.Router();
const basePath = __dirname;
module.exports = (dependencies) => {
  fs.readdirSync(basePath).forEach((dirName) => {
    const dirPath = `${basePath}/${dirName}`;
    if (fs.lstatSync(dirPath).isDirectory()) {
      try {
        const ctrlPaths = require(dirPath)(dependencies);
        try {
          const { paths, definitions } = require(`${dirPath}/apiDoc.json`);
          apiDoc.paths = { ...apiDoc.paths, ...paths };
          apiDoc.definitions = { ...apiDoc.definitions, ...definitions };
        } catch (e) {}

        for (const key in ctrlPaths) {

          if (ctrlPaths.hasOwnProperty(key)) {

            ctrlPaths[key].forEach(({ method, path, ctrlMiddleware }) => {

              const middleware = [];
              if (ctrlMiddleware) middleware.push(...ctrlMiddleware);
              
              middleware.forEach(item =>{

                router.route(`/${key}${path}`)[method](async (req, res, next)=>{
                  try{
                    (await item(req, res, next));
                  }catch(e){next(e)};
                });
              })
            });
          }
        }
      } catch (err) {
        debugApp(`>>>>>>>>>>>>>: ${__filename}::ERROR: `, err.stack);
      }
    }
  });
  return { router, apiDoc };
};
