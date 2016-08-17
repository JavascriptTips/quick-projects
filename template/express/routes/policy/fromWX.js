// Generated by CoffeeScript 1.8.0
var path = require('path');

var allowAll = true;

var wxReg = /micromessenger/;

module.exports = function (req, res, next) {
  var userAgent = req.headers['user-agent'];
  var iswx = wxReg.test(userAgent.toLowerCase());
  var isTest = req.query.isTest === 'true';

  if (iswx || isTest || allowAll) {
    return next(req, res);
  } else {
    return res.render('error/wxForbidden');
  }
};

//# sourceMappingURL=fromWX.js.map