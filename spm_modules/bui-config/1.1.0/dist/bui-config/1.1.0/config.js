!function(){var e;e=function(){function e(e){return e.hasAttribute?e.src:e.getAttribute("src",4)}var t=window.BUI=window.BUI||{};t.use=seajs.use,t.config=seajs.config;var n=document.getElementsByTagName("script"),r=n[n.length-1],i=e(r),s=i.substring(0,i.lastIndexOf("/")),u="true"===r.getAttribute("debug")?!0:!1;t.loaderScript=r,seajs.config({paths:{bui:s}}),t.setDebug=function(e){t.debug=e;var n=new RegExp("^("+s+"\\S*).js$");if(e){var r,i=seajs.data.map;if(!i)return;for(var u=i.length-1;u>=0;u--)r=i[u][0],"[object RegExp]"===Object.prototype.toString.call(r)&&r.toString()===n.toString()&&i.splice(u,1)}else seajs.config({map:[[n,"$1-min.js"]]})},t.setDebug(u),window.jQuery&&window.define("jquery",[],function(){return window.jQuery})}()}();