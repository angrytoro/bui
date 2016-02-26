/**
 * @ignore
 * @fileoverview flash上传方案
 * @author 
 **/
var $ = require('jquery'),
    File = require('../file'),
    UploadType = require('./base');

var LOG_PREFIX = '[uploader-Flash]:';


//获取链接绝对路径正则
var URI_SPLIT_REG = new RegExp('^([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$'),
    HOSTNAME_SPLIT_REG = new RegExp('^(?:([\\w\\d+.-]+):)?(?://([\\w\\d\\-\\u0100-\\uffff.+%]*))?(:[\\d]*)?.*$');

/**
 * @class BUI.Uploader.UploadType.Flash
 * flash上传方案
 * 使用时要确认flash与提交的url是否跨越，如果跨越则需要设置crossdomain.xml
 * @extends BUI.Uploader.UploadType
 */
function FlashType(config) {
    var _self = this;
    //调用父类构造函数
    FlashType.superclass.constructor.call(_self, config);
}

BUI.extend(FlashType, UploadType, {
    /**
     * 初始化
     */
    _init:function () {
        var _self = this;
        var swfButton = _self.get('swfButton');
        var uploadifyEl = swfButton.get('uploadifyEl');

        //测试是否存在crossdomain.xml
        // _self._hasCrossdomain();

        var uploadify = uploadifyEl.uploadify({
          auto: false,
          width: 200,
          height: 200,
          swf: swfButton.get('flashUrl'),
          uploader: _self.get('url'),
          onSelect: function (file) {
            var files = [];
            files.push(File.create(file));
            swfButton.fire('change', {files: files});
          },
          onUploadStart: function (file) {
            _self.fire('start', {file: File.create(file)});
          },
          onUploadProgress: function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
            _self.fire('progress', { 'loaded': bytesUploaded, 'total': bytesTotal });
          },
          onUploadSuccess: function (file, data, response) {
            var result = _self._processResponse(data);
            file = File.create(file);
            _self.fire('complete', {result: result, file: file});
            // _self.fire('complete', {result: result, file: file});
          },
          onUploadError: function (file) {
            _self.fire('error', {file: File.create(file)});
          }
        });

        _self.set('uploadify', uploadify);


    },
    /**
     * 上传文件
     * @param {String} id 文件id
     * @return {BUI.Uploader.UploadType.Flash}
     * @chainable
     */
    upload:function () {
        var _self = this;
        var swfButton = _self.get('swfButton');
        var uploadifyEl = swfButton.get('uploadifyEl');

        uploadifyEl.uploadify("upload", '*');

        return _self;
    },
    cancel: function () {
        var _self = this;
        var swfButton = _self.get('swfButton');
        var uploadifyEl = swfButton.get('uploadifyEl');

        uploadifyEl.uploadify("cancel", '*');

        return _self;
    },
    /**
     * 应用是否有flash跨域策略文件
     * @private
     * 2014-01-13 应该判断swf的路径上提交上传接口的路径是否同域
     */
    _hasCrossdomain: function(){
        var _self = this,

            // http://g.tbcdn.cn/fi/bui/upload.php => ['http://g.tbcdn.cn/fi/bui/upload.php', 'http', 'g.tbcdn.cn']
            url = _self.get('url').match(HOSTNAME_SPLIT_REG) || [],
            flashUrl = _self.get('swfUploader').get('src').match(HOSTNAME_SPLIT_REG) || [],
            urlDomain = url[2],
            flashUrlDomain = flashUrl[2],
            port = url[3] || '';

        //不同域时才去校验crossdomain
        if(urlDomain && flashUrlDomain && urlDomain !== flashUrlDomain){
            $.ajax({
                url: url[1] + '://' + urlDomain + port + '/crossdomain.xml',
                dataType:"xml",
                error:function(){
                   BUI.log('缺少crossdomain.xml文件或该文件不合法！');
                }
            });
        }
    }
}, {ATTRS:{
    uploader: {
        setter: function(v){
            var _self = this;
            if(v && v.isController){
                //因为flash上传需要依赖swfButton，所以是要等flash加载完成后才可以初始化的
                var swfButton = v.get('button');
                _self.set('swfButton', swfButton);
                _self._init();
            }
        }
    },
    /**
     * 服务器端路径，留意flash必须是绝对路径
     */
    url:{
        setter: function(v){
            var reg = /^http/;
            //不是绝对路径拼接成绝对路径
            if(!reg.test(v)){
                //获取前面url部份
                //修复下如下链接问题：http://a.b.com/a.html?a=a/b/c#d/e/f => http://a.b.com/a.html
                var href = location.href.match(URI_SPLIT_REG) || [],
                    path = href[1] || '',
                    uris = path.split('/'),
                    newUris;
                newUris  = BUI.Array.filter(uris,function(item,i){
                    return i < uris.length - 1;
                });
                v = newUris.join('/') + '/' + v;
            }
            return v;
        }
    },
    /**
     * 正在上传的文件id
     */
    uploadingId : {},
    /**
     * 事件列表
     */
    events:{
        value: {
            /**
             * 上传正在上传时
             * @event
             * @param {Object} e 事件对象
             * @param {Number} total 文件的总大小
             * @param {Number} loaded 已经上传的大小
             */
            progress: false
        }
    }
}});

module.exports = FlashType;
