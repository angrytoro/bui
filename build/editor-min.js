define("bui/editor",["bui/common","jquery","bui/form","bui/overlay","bui/list","bui/data"],function(e,t,r){var i=e("bui/common"),n=(e("bui/form"),i.namespace("Editor"));return i.mix(n,{Editor:e("bui/editor/editor"),RecordEditor:e("bui/editor/record"),DialogEditor:e("bui/editor/dialog")}),n}),define("bui/editor/editor",["bui/common","jquery","bui/overlay"],function(e,t,r){var i=e("bui/common"),n=e("bui/overlay").Overlay;CLS_TIPS="x-editor-tips",Mixin=e("bui/editor/mixin");var o=n.extend([Mixin],{bindUI:function(){var e=this;e.getInnerControl();e.on("validchange",function(t){!e.isValid()&&e.get("visible")?e._showError(e.getErrors()):e._hideError()}),e.on("hide",function(){e._hideError()}),e.on("show",function(){e.isValid()||e._showError(e.getErrors())})},_initOverlay:function(){var e=this,t=e.get("tooltip"),r=new n(t);return r.render(),e.set("overlay",r),r},_getErrorList:function(){var e=this,t=e.get("overlay");return t&&t.get("children")[0]},_showError:function(e){var t=this,r=t.get("overlay")||t._initOverlay(),n=t._getErrorList(),o=t.get("errorAlign"),a=i.Array.map(e,function(e){return{error:e}});n.set("items",a),o.node=t.get("el"),r.set("align",o),r.show()},_hideError:function(){var e=this,t=e.get("overlay");t&&t.hide()},clearErrors:function(){var e=this,t=e.getInnerControl();t.clearErrors(),e._hideError()},getSourceValue:function(){var e=this,t=e.get("curTrigger"),r=e.get("parser"),i=t.text();return r&&(i=r.call(this,i,t)),i},updateSource:function(e){var t=this,r=t.get("curTrigger");r&&r.length&&(e=t._formatText(e),r.text(e))},_formatText:function(e){var t=this,r=t.get("formatter");return r&&(e=r.call(t,e)),e},_uiSetWidth:function(e){var t=this;if(null!=e){var r=t.getInnerControl();r.set&&r.set("width",e)}}},{ATTRS:{innerValueField:{value:"value"},emptyValue:{value:""},autoHide:{value:!0},controlCfgField:{value:"field"},defaultChildCfg:{value:{tpl:"",forceFit:!0,errorTpl:""}},tooltip:{valueFn:function(){return{children:[{xclass:"simple-list",itemTpl:'<li><span class="x-icon x-icon-mini x-icon-error" title="{error}">!</span>&nbsp;<span>{error}</span></li>'}],elCls:CLS_TIPS}}},defaultChildClass:{value:"form-field"},align:{value:{points:["tl","tl"]}},parser:{},formatter:{},errorAlign:{value:{points:["bl","tl"],offset:[0,10]}},overlay:{},field:{value:{}}}},{xclass:"editor"});r.exports=o}),define("bui/editor/mixin",["jquery"],function(e,t,r){function i(e){var t=e,r=t.get("controlCfgField"),i=t.get(r),n=t.addChild(i);t.setInternal(r,n)}var n=e("jquery"),o=function(){i(this)};o.ATTRS={acceptEvent:{value:"autohide"},preventHide:{value:!0},changeSourceEvent:{value:"show triggerchange"},ignoreInputFields:{value:!1},innerValueField:{},emptyValue:{},controlCfgField:{},focusable:{value:!0},autoUpdate:{value:!0},events:{value:{accept:!1,cancel:!1}}},o.prototype={__bindUI:function(){var e=this,t=e.get("acceptEvent"),r=e.get("changeSourceEvent");t&&e.on(t,function(){return e.accept()?void 0:e.get("preventHide")?!1:void e.cancel()}),r&&e.on(r,function(){e.setValue(e.getSourceValue()),e.get("visible")&&e.focus()})},getInnerControl:function(){var e=this,t=e.get("children");return t[0]},setValue:function(e,t){var r=this,i=r.getInnerControl();r.set("editValue",e),r.clearControlValue(),i.set(r.get("innerValueField"),e),e||r.valid(),t&&r.clearErrors()},getValue:function(){var e=this,t=e.getInnerControl();return t.get(e.get("innerValueField"))},isValid:function(){var e=this,t=e.getInnerControl();return t.isValid?t.isValid():!0},valid:function(){var e=this,t=e.getInnerControl();t.valid&&t.valid()},getErrors:function(){var e=this,t=e.getInnerControl();return t.getErrors?t.getErrors():[]},isChange:function(){var e=this,t=e.get("editValue"),r=e.getValue();return t!==r},clearValue:function(){this.clearControlValue(),this.clearErrors()},clearControlValue:function(){var e=this,t=e.getInnerControl();t.set(e.get("innerValueField"),e.get("emptyValue"))},clearErrors:function(){var e=this,t=e.getInnerControl();t.clearErrors()},getSourceValue:function(){},updateSource:function(){},handleNavEsc:function(){this.cancel()},handleNavEnter:function(e){var t=e.target;"TEXTAREA"!==t.tagName&&("BUTTON"===t.tagName&&n(t).trigger("click"),this.accept())},focus:function(){var e=this,t=e.getInnerControl();t.focus&&t.focus()},accept:function(){var e,t=this;return t.valid(),t.isValid()?(e=t.getValue(),t.get("autoUpdate")&&t.updateSource(e),0!=t.fire("beforeaccept",{value:e})?(t.fire("accept",{value:e,editValue:t.get("editValue")}),t.hide(),!0):void 0):!1},cancel:function(){this.fire("cancel"),this.clearValue(),this.close()}},r.exports=o}),define("bui/editor/record",["bui/common","jquery","bui/overlay"],function(e,t,r){var i=e("bui/common"),n=e("bui/editor/editor"),o=n.extend({getSourceValue:function(){return this.get("record")},updateSource:function(e){var t=this,r=t.get("record");i.mix(r,e)},_uiSetRecord:function(e){this.setValue(e)}},{ATTRS:{innerValueField:{value:"record"},acceptEvent:{value:""},emptyValue:{value:{}},autoHide:{value:!1},record:{value:{}},controlCfgField:{value:"form"},form:{value:{}},errorAlign:{value:{points:["tr","tl"],offset:[10,0]}},defaultChildCfg:{valueFn:function(){var e=this;return{xclass:"form",errorTpl:"",showError:!0,showChildError:!0,defaultChildCfg:{elCls:"bui-inline-block",tpl:"",forceFit:!0},buttons:[{btnCls:"button button-primary",text:i.i18n("confirm"),handler:function(){e.accept()}},{btnCls:"button",text:i.i18n("cancel"),handler:function(){e.cancel()}}]}}}}},{xclass:"record-editor"});r.exports=o}),define("bui/editor/dialog",["jquery","bui/overlay","bui/common"],function(e,t,r){var i=e("jquery"),n=e("bui/overlay").Dialog,o=e("bui/editor/mixin"),a=n.extend([o],{getSourceValue:function(){return this.get("record")},handleNavEnter:function(e){var t=this,r=t.get("success"),n=e.target;"TEXTAREA"!==n.tagName&&("BUTTON"===n.tagName&&i(n).trigger("click"),r?r.call(t):this.accept())},cancel:function(){this.fire("cancel"),this.clearValue(),this.close()},updateSource:function(e){var t=this,r=t.get("record");BUI.mix(r,e)},_uiSetRecord:function(e){this.setValue(e)}},{ATTRS:{innerValueField:{value:"record"},acceptEvent:{value:""},record:{value:{}},emptyValue:{shared:!1,value:{}},controlCfgField:{value:"form"},changeSourceEvent:{value:""},defaultChildCfg:{value:{xclass:"form-horizontal"}},focusable:{value:!1},success:{value:function(){this.accept()}},cancel:{value:function(){this.cancel()}},form:{value:{}}}},{xclass:"dialog-editor"});r.exports=a});