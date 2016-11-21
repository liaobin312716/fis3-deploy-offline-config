/**
 * 根据页面自动生成离线config.json
 * 用法：
 * fis.match('::package', {
 *   packager:fis.plugin('offline-config',{
 *		'id':'bdwm.plugin.ribao',
 *		'reg':'page/**', // or ['page/a/**','page/b/**']
 *    'output':'config.json'
 *   }
 * })
 *
 **/


var path = require('path');
var _ = fis.util;

module.exports = function (ret, conf, settings, opt) {

  var root = fis.project.getProjectPath();

  if (!settings || !Object.keys(settings).length) {
    throw new Error('TypeError: only Object are allowed.');
  }
  if (!settings.id) {
    throw new Error('PropertyError: property id can not be empty.');
  }
  if (!settings.reg) {
    throw new Error('PropertyError: property reg can not be empty.');
  }

  // 还缺乏参数严格校验

  var src = ret.src;
  var output = settings.output || 'config.json';
  var sources = [];
  var config = { // config 模板
    id   : settings.id,
    pages: []
  }

  // 源文件生成数组
  Object.keys(src).forEach(function (key) {
    sources.push(src[key]);
  });

  var patterns = settings.reg;
  if (!Array.isArray(patterns)) {
    patterns = [patterns];
  }

  var valid = patterns.every(function (pattern) {
    return typeof pattern === 'string' || pattern instanceof RegExp;
  });

  if (!valid) {
    throw new Error('TypeError: only string and RegExp are allowed.');
  }

  var list = [];

  patterns.forEach(function (pattern, index) {
    var reg = pattern;
    if (typeof reg === 'string') {
      reg = _.glob(reg);
    }
    var mathes = src[reg] || sources.filter(function (file) {
        reg.lastIndex = 0;
        return (reg.test(file.subpath));
      });
    list = mathes;
  });

  list.forEach(function (item, index) {
    config.pages.push({
      name: item.filename,
      file: item.getUrl()
    })
  });

  var pkg = fis.file.wrap(path.join(root, output));
  if (/\.json$/.test(output)) {
    pkg.setContent(JSON.stringify(config));
  } else {
    pkg.setContent(jsonWrapper(JSON.stringify(config)));
  }
  ret.pkg[output] = pkg;
  function jsonWrapper(jsonStr) {
    return "define('" + output + "', function(require, exports, module) { module.exports = " + jsonStr + ';})';
  }
}
