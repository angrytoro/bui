window.BUI=window.BUI||{},window.define=window.define||function(n,e,t){function require(n){return KISSY.require.call(KISSY,n)}function i(){return t.call(window,require)}KISSY.isFunction(e)&&(t=e,e=[]),e&&!KISSY.Node&&e.unshift("core"),KISSY.add(n,i,{requires:e})},BUI.use||(BUI.use=function(n,e){KISSY.isArray(n)&&(n=n.join()),KISSY.use(n,function(n){var t=KISSY.makeArray(arguments);t.shift(),e&&e.apply(n,t)})});var adapterCallback=function(){var n=KISSY,e=n.DOM,t=n.Node.prototype;return window.jQuery=window.jQuery||function(){"use strict";function i(n,e,t,i,a){var o=r(t,i,a);e.call(n,o.duration,o.complete,o.easing)}function r(e,t,i){if(n.isPlainObject(e)){var r=e;return n.isNumber(r.duration)&&(r.duration=r.duration/1e3),r}return n.isNumber(e)?e/=1e3:n.isString(e)?(i=t,t=e,e=void 0):n.isFunction(e)&&(i=e,e=void 0),n.isFunction(t)&&(i=t,t=void 0),{duration:e,complete:i,easing:t}}function a(n){var e,t=n.ownerDocument,i=t.body,r=$(n).css("position"),a="fixed"==r||"absolute"==r;if(!a)return"html"==n.nodeName.toLowerCase()?null:n.parentNode;for(e=n.parentNode;e&&e!=i;e=e.parentNode)if(r=$(e).css("position"),"static"!=r)return e;return null}var o=function(e,t){return this instanceof o?n.isFunction(e)?n.ready(e):n.isString(e)?t?new o(t).find(e):new o(n.all(e)):void n.Node.call(this,e):new o(e,t)};n.extend(o,n.Node),n.augment(o,{bind:t.on,off:t.detach,trigger:t.fire,sort:function(n){return Array.prototype.sort.call(this,n)},filter:function(t){if(!t)return new o;if(n.isString(t))return new o(e.filter(this[0],t));var i,r=this.getDOMNodes();return n.isFunction(t)?(i=[],n.each(r,function(n,e){var r=t.call(n,e);r&&i.push(n)}),new o(i)):(n.each(r,function(n){return n===t?(i=n,!1):void 0}),new o(i))},find:function(n){return new o(e.query(n,this[0]))},is:function(n){for(var t=n.split(","),i=!1,r=0;r<t.length;r++)!i&&t[r]&&(i=i||e.test(this[0],t[r]));return i},delegate:function(n,e,t){return o.superclass.delegate.call(this,e,n,t)},each:function(n){return o.superclass.each.call(this,function(e,t){return n.call(this[0],t,e[0])})},first:function(){return new o(this[0])},parents:function(n){return this.parent(n)},last:function(){var n=this.length;return new o(this[n-1])},offsetParent:function(){return new o(a(this[0]))},animate:function(n,e,t,i){var a=r(e,t,i);o.superclass.animate.call(this,n,a.duration,a.easing,a.complete)},position:function(){var n=this,e=this.offset(),t=n.offsetParent();if(t.length){var i=t.offset();e.left-=i.left,e.top-=i.top}return e},serializeArray:function(){var e=this[0],t=null,i=null,r=[],a=null;return t=n.isArray(e)?e:n.makeArray(e.elements),i=n.filter(t,function(n){return(n.id||n.name)&&!n.disabled&&(n.checked||/select|textarea/i.test(n.nodeName)||/text|hidden|password/i.test(n.type))}),a=n.filter(t,function(n){return(n.id||n.name)&&!n.disabled&&/checkbox/i.test(n.type)}),n.each(i,function(e){var t=n.one(e).val(),i=e.name||e.id,a=null==t?{name:i,value:""}:n.isArray(t)?n.map(t,function(n){return{name:i,value:n}}):{name:i,value:t};a&&r.push(a)}),r}});var u=["fadeIn","fadeOut","fadeToggle","slideDown","slideUp","slideToggle","show","hide"];n.each(u,function(n){o.prototype[n]=function(e,r,a){i(this,t[n],e,r,a)}});var s=["change","blur","focus","select"];n.each(s,function(n){o.prototype[n]=function(){var e=this[0];e&&(e[n]?e[n]():this.fire(n))}});var c=["children","parent","next","prev","siblings","closest"];return n.each(c,function(n){o.prototype[n]=function(t){return new o(e[n](this[0],t))}}),n.mix(o,n),n.mix(o,{contains:function(e,t){return n.DOM.contains(e,t)},extend:function(){var e,t=n.makeArray(arguments),i=!1;if(n.isBoolean(arguments[0])&&(i=t.shift()),e=t[0])for(var r=1;r<t.length;r++)(n.isObject(t[r])||n.isArray(t[r]))&&n.mix(e,t[r],void 0,void 0,i);return e},each:function(e,t){n.each(e,function(n,e){return t(e,n)})},inArray:function(e,t){return n.indexOf(e,t)},map:function(e,t){var i=[];return n.each(e,function(n,e){var r=t(n,e);null!=r&&i.push(r)}),i},noop:function(){},parseJSON:n.JSON.parse}),o}(),window.$=window.$||window.jQuery,KISSY};define("bui/adapter",["core"],adapterCallback),KISSY.Node&&adapterCallback(),KISSY.config({packages:[{name:"bui",tag:"201312251606",path:"http://g.tbcdn.cn/fi",charset:"utf-8"}]});