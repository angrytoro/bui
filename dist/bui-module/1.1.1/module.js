define("bui-module/1.1.1/module",["jquery","bui-common/1.1.6/common"],function(e,t,n){function i(){return"module"+u++}var s=e("jquery"),o=e("bui-common/1.1.6/common"),u=1,a=function(e){a.superclass.constructor.call(this,e),this.get("id")||this.set("id",i()),this.get("autoInit")&&this.init(),a.Manager.add(this)};a.ATTRS={id:{},autoInit:{value:!1},hasInit:{value:!1},parent:{},destroyed:{value:!1},modules:{value:{},shared:!1},events:{value:["change"]}},o.extend(a,o.Base),o.augment(a,{set:function(e,t){this.setInternal?this.setInternal(e,t):a.superclass.set.call(this,e,t)},init:function(){return this.get("hasInit")||(this._initData(),this._initDom(),this._initModules(),this._initEvent(),this.set("hasInit",!0)),this},fire:function(e,t,n){n=void 0==n?!0:n;var i=s.makeArray(arguments),o=this,u=t;t&&t.module&&(o=t.module,u=t.event),a.superclass.fire.apply(this,i);var d=this.get("parent");d&&d.fire("change",{module:o,eventType:e,event:u},!1),n&&a.Manager.fire("change",{module:this,eventType:e,event:t})},addModule:function(e){e.set("parent",this),this.get("modules")[e.get("id")]=e},removeById:function(e){this.removeModule(this.getModule(e))},removeModule:function(e){delete this.get("modules")[e.get("id")]},getModule:function(e){return this.get("modules")[e]},eachModule:function(e){o.each(this.getModules(),e)},getModules:function(){return this.get("modules")},_initData:function(){},_initDom:function(){},_initModules:function(){},_initEvent:function(){},_destroy:function(){var e=this,t=e.get("modules");o.each(t,function(e){e.destroy()}),e.set("modules",null),e.detach()},destroy:function(){this.get("destroyed")||(a.Manager.remove(this),this._destroy(),this.set("destroyed",!0))}});var d={},r=function(){};o.extend(r,o.Base),o.augment(r,{add:function(e){var t=e.get("id");d[t]=e},remove:function(e){var t=e.get("id");delete d[t]},getModule:function(e){return d[e]}}),a.Manager=new r,n.exports=a});