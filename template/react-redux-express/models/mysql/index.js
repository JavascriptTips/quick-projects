/**
 * Created by zyg on 16/6/14.
 */
var Sequelize = require('sequelize')

var sequelize;


if(__DEV__) {
  sequelize = new Sequelize('db', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 2,
      min: 0,
      idle: 10000
    },
  });
}else{
  sequelize = new Sequelize('online_db', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 2,
      min: 0,
      idle: 10000
    },
  });
}

sequelize
  .authenticate()
  .then(function(err) {
    console.log('sequelize:Connection has been successfully.');
  })
  .catch(function (err) {
    console.log('sequelize:Unable to connect to the database:', err);
  });

sequelize.mdUtils = {

}

module.exports = sequelize;