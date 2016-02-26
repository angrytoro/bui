/**
 * @ignore
 * @fileoverview swfupload的上传
 * @author: 索丘 yezengyue@gmail.com
 **/

var $ = require('jquery'),
  BUI = require('bui-common'),
  Component = BUI.Component,
  File = require('../file'),
  ButtonBase = require('./base'),
  baseUrl = getBaseUrl(),
  UploadifyPlugin = require('../plugins/uploadify');

function getBaseUrl(){
  if(window.seajs){
    if (seajs.pluginSDK && seajs.pluginSDK.util && seajs.pluginSDK.util.loaderDir) {
      return seajs.pluginSDK.util.loaderDir;
    } else {
      var paths = seajs.data.paths || {};
      return paths['bui'] || seajs.data.base;
    }
  }
  else if(window.KISSY){
    return KISSY.Config.packages['bui'].base;
  }
}

/**
 * 文件上传按钮，flash上传方式使用,使用的是flash
 * @class BUI.Uploader.Button.Uploadify
 * @extends BUI.Uploader.Button
 */
var Uploadify = ButtonBase.extend({
  renderUI: function(){
    var _self = this,
      buttonCls = _self.get('buttonCls'),
      buttonEl = _self.get('el').find('.' + buttonCls),
      flashCfg = _self.get('flash'),
      flashUrl = _self.get('flashUrl'),
      swfTpl = _self.get('swfTpl'),
      swfEl = $(swfTpl).appendTo(buttonEl),
      uploadifyEl = swfEl.find('input'),
      uploader = _self.get('uploader');

    var name = _self.get('name');

    // console.log(uploader);

    uploadifyEl.attr('name', name);
    uploadifyEl.attr('id', BUI.guid('bui-uploadify'));


    // uploadifyEl.uploadify({
    //   swf: flashUrl,
    //   uploader: uploader.get('url'),
    //   onSelect: function (file) {
    //     var files = [];
    //     files.push(File.create(file));
    //     _self.fire('change', {files: files});
    //   }
    // });
    // 
    
    _self.set('uploadifyEl', uploadifyEl);



    // console.log(UploadifyPlugin);
  }
},{
  ATTRS: {
    name: {},
    uploader: {
    },
    swfEl:{
    },
    /**
     * 上传uploader.swf的路径，默认为bui/uploader/uploader.swf
     * @type {String} url
     */
    flashUrl:{
      value: baseUrl + '/uploadify.swf'
    },
    swfTpl:{
      view: true,
      value: '<div class="uploader-button-swf"><input type="file"/></div>'
    }
  }
}, {
  xclass: 'uploader-uploadify'
});

module.exports = Uploadify;
