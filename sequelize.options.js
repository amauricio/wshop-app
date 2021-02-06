const path = require('path');

module.exports = {
  config: path.join(__dirname, 'src', 'config', 'sequelize.config.js'),
  'migrations-path': path.join(__dirname, 'migrations','db'),
  'models-path': path.join(__dirname, 'src', 'common', 'models', 'pg'),
};
