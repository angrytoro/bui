define("bui/extensions/search",["bui/common","bui/form"],function(require){function t(e){t.superclass.constructor.call(this,e)}var e=require("bui/common"),n=require("bui/form");return e.extend(t,e.Base),t.ATTRS={tpl:{value:'<p><input type="text" name="key"/> <button class="button button-small">\u786e\u5b9a</button></p>'}},e.augment(t,{createDom:function(){var t=this,e=$("<div></div>").append(t.get("tpl")),o=new n.Group({srcNode:e}).render();t.set("el",e),t.set("group",o)},renderUI:function(t){var e=t.get("el");e.before(this.get("el"))},bindUI:function(t){var e=this,n=e.get("el"),o=t.get("store"),u=e.get("group");n.find(".button").on("click",function(){o.load(u.getRecord())})}}),t});