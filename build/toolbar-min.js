define("bui/toolbar",["bui/common","jquery"],function(t,e,a){var n=t("bui/common"),i=n.namespace("Toolbar");n.mix(i,{BarItem:t("bui/toolbar/baritem"),Bar:t("bui/toolbar/bar"),PagingBar:t("bui/toolbar/pagingbar"),NumberPagingBar:t("bui/toolbar/numberpagingbar")}),a.exports=i}),define("bui/toolbar/baritem",["jquery","bui/common"],function(t,e,a){var n=(t("jquery"),t("bui/common")),i=n.prefix,r=n.Component,u=r.UIBase,o=r.View.extend([u.ListItemView]),s=r.Controller.extend([u.ListItem],{renderUI:function(){var t=this.get("el");t.addClass(i+"inline-block"),t.attr("id")||t.attr("id",this.get("id"))}},{ATTRS:{elTagName:{view:!0,value:"li"},selectable:{value:!1},focusable:{value:!1},xview:{value:o}}},{xclass:"bar-item",priority:1}),l=s.extend({_uiSetDisabled:function(t){var e=this,a=e.get("el"),n=t?"addClass":"removeClass";a.find("button").attr("disabled",t)[n](i+"button-disabled")},_uiSetChecked:function(t){var e=this,a=e.get("el"),n=t?"addClass":"removeClass";a.find("button")[n](i+"button-checked")},_uiSetText:function(t){var e=this,a=e.get("el");a.find("button").text(t)},_uiSetbtnCls:function(t){var e=this,a=e.get("el");a.find("button").addClass(t)}},{ATTRS:{checked:{value:!1},tpl:{view:!0,value:'<button type="button" class="{btnCls}">{text}</button>'},btnCls:{sync:!1},text:{sync:!1,value:""}}},{xclass:"bar-item-button",priority:2}),g=s.extend({renderUI:function(){var t=this.get("el");t.attr("role","separator")}},{xclass:"bar-item-separator",priority:2}),c=s.extend({},{ATTRS:{width:{view:!0,value:2}}},{xclass:"bar-item-spacer",priority:2}),m=s.extend({_uiSetText:function(t){var e=this,a=e.get("el");a.html(t)}},{ATTRS:{text:{value:""}}},{xclass:"bar-item-text",priority:2});s.types={button:l,separator:g,spacer:c,text:m},a.exports=s}),define("bui/toolbar/bar",["jquery","bui/common"],function(t,e,a){var n=(t("jquery"),t("bui/common")),i=n.Component,r=i.UIBase,u=i.View.extend({renderUI:function(){var t=this.get("el");t.attr("role","toolbar"),t.attr("id")||t.attr("id",n.guid("bar"))}}),o=i.Controller.extend([r.ChildList],{getItem:function(t){return this.getChild(t)}},{ATTRS:{elTagName:{view:!0,value:"ul"},defaultChildClass:{value:"bar-item"},focusable:{value:!1},xview:{value:u}}},{xclass:"bar",priority:1});a.exports=o}),define("bui/toolbar/pagingbar",["jquery","bui/common"],function(t,e,a){var n=(t("jquery"),t("bui/common")),i=t("bui/toolbar/bar"),r=n.Component,u=r.UIBase.Bindable,o=n.prefix,s="first",l="prev",g="next",c="last",m="skip",b="refresh",p="totalPage",v="curPage",f="totalCount",d=[s,l,g,c,m,b],_=[p,v,f],h=i.extend([u],{initializer:function(){var t=this,e=t.get("children"),a=t.get("items"),i=t.get("store");a?n.each(a,function(a,i){n.isString(a)&&(a=n.Array.contains(a,d)?t._getButtonItem(a):n.Array.contains(a,_)?t._getTextItem(a):{xtype:a}),e.push(a)}):(a=t._getItems(),n.each(a,function(t){e.push(t)})),i&&i.get("pageSize")&&t.set("pageSize",i.get("pageSize"))},bindUI:function(){var t=this;t._bindButtonEvent()},jumpToPage:function(t){if(!(0>=t||t>this.get("totalPage"))){var e=this,a=e.get("store"),n=e.get("pageSize"),i=t-1,r=i*n,u=e.fire("beforepagechange",{from:e.get("curPage"),to:t});a&&u!==!1&&a.load({start:r,limit:n,pageIndex:i})}},_afterStoreLoad:function(t,e){var a,n,i,r,u=this,o=u.get("pageSize"),s=0;s=t.get("start"),n=t.getTotalCount(),a=n-s>o?s+t.getCount()-1:n,r=parseInt((n+o-1)/o,10),r=r>0?r:1,i=parseInt(s/o,10)+1,u.set("start",s),u.set("end",a),u.set("totalCount",n),u.set("curPage",i),u.set("totalPage",r),u._setAllButtonsState(),u._setNumberPages()},_bindButtonEvent:function(){function t(){var t=parseInt(e._getCurrentPageValue(),10);e._isPageAllowRedirect(t)?e.jumpToPage(t):e._setCurrentPageValue(e.get("curPage"))}var e=this;e._bindButtonItemEvent(s,function(){e.jumpToPage(1)}),e._bindButtonItemEvent(l,function(){e.jumpToPage(e.get("curPage")-1)}),e._bindButtonItemEvent(g,function(){e.jumpToPage(e.get("curPage")+1)}),e._bindButtonItemEvent(c,function(){e.jumpToPage(e.get("totalPage"))}),e._bindButtonItemEvent(m,function(){t()}),e._bindButtonItemEvent(b,function(){e.jumpToPage(e.get("curPage"))});var a=e.getItem(v);a&&a.get("el").on("keyup",function(e){e.stopPropagation(),13===e.keyCode&&t()})},_bindButtonItemEvent:function(t,e){var a=this,n=a.getItem(t);n&&n.on("click",e)},onLoad:function(t){var e=this,a=e.get("store");e._afterStoreLoad(a,t)},_getItems:function(){var t=this,e=t.get("items");return e&&e.length?e:(e=[],e.push(t._getButtonItem(s)),e.push(t._getButtonItem(l)),e.push(t._getSeparator()),e.push(t._getTextItem(p)),e.push(t._getTextItem(v)),e.push(t._getButtonItem(m)),e.push(t._getSeparator()),e.push(t._getButtonItem(g)),e.push(t._getButtonItem(c)),e.push(t._getSeparator()),e.push(t._getTextItem(f)),e)},_getButtonItem:function(t){var e=this;return{id:t,xclass:"bar-item-button",text:e.get(t+"Text"),disabled:!0,elCls:e.get(t+"Cls")}},_getSeparator:function(){return{xclass:"bar-item-separator"}},_getTextItem:function(t){var e=this;return{id:t,xclass:"bar-item-text",text:e._getTextItemTpl(t)}},_getTextItemTpl:function(t){var e=this,a=e.getAttrVals();return n.substitute(this.get(t+"Tpl"),a)},_isPageAllowRedirect:function(t){var e=this;return t&&t>0&&t<=e.get("totalPage")&&t!==e.get("curPage")},_setAllButtonsState:function(){var t=this,e=t.get("store");e&&t._setButtonsState([l,g,s,c,m],!0),1===t.get("curPage")&&t._setButtonsState([l,s],!1),t.get("curPage")===t.get("totalPage")&&t._setButtonsState([g,c],!1)},_setButtonsState:function(t,e){var a=this,i=a.get("children");n.each(i,function(a){-1!==n.Array.indexOf(a.get("id"),t)&&a.set("disabled",!e)})},_setNumberPages:function(){var t=this,e=t.getItems();n.each(e,function(e){"bar-item-text"===e.__xclass&&e.set("content",t._getTextItemTpl(e.get("id")))})},_getCurrentPageValue:function(t){var e=this;if(t=t||e.getItem(v)){var a=t.get("el").find("input");return a.val()}},_setCurrentPageValue:function(t,e){var a=this;if(e=e||a.getItem(v)){var n=e.get("el").find("input");n.val(t)}}},{ATTRS:{firstText:{value:n.i18n("homePage")},firstCls:{value:o+"pb-first"},prevText:{value:n.i18n("prev")},prevCls:{value:o+"pb-prev"},nextText:{value:n.i18n("next")},nextCls:{value:o+"pb-next"},lastText:{value:n.i18n("LastPage")},lastCls:{value:o+"pb-last"},skipText:{value:n.i18n("confirm_ok")},skipCls:{value:o+"pb-skip"},refreshText:{value:n.i18n("refresh")},refreshCls:{value:o+"pb-refresh"},totalPageTpl:{value:n.i18n("totalPage")},curPageTpl:{value:n.i18n("noPageA")+'autocomplete="off" class="'+o+n.i18n("noPageB")},totalCountTpl:{value:n.i18n("totalRecord")},autoInitItems:{value:!1},curPage:{value:0},totalPage:{value:0},totalCount:{value:0},pageSize:{value:30},store:{}},ID_FIRST:s,ID_PREV:l,ID_NEXT:g,ID_LAST:c,ID_SKIP:m,ID_REFRESH:b,ID_TOTAL_PAGE:p,ID_CURRENT_PAGE:v,ID_TOTAL_COUNT:f},{xclass:"pagingbar",priority:2});a.exports=h}),define("bui/toolbar/numberpagingbar",["jquery","bui/common"],function(t,e,a){var n=(t("jquery"),t("bui/common")),i=(n.Component,t("bui/toolbar/pagingbar")),r=n.prefix,u=r+"button-number",o=i.extend({_getItems:function(){var t=this,e=t.get("items");return e?e:(e=[],e.push(t._getButtonItem(i.ID_PREV)),e.push(t._getButtonItem(i.ID_NEXT)),e)},_getButtonItem:function(t){var e=this;return{id:t,content:'<a href="javascript:;">'+e.get(t+"Text")+"</a>",disabled:!0}},_bindButtonEvent:function(){var t=this,e=t.get("numberButtonCls");o.superclass._bindButtonEvent.call(this),t.get("el").delegate("a","click",function(t){t.preventDefault()}),t.on("click",function(a){var n=a.target;if(n&&n.get("el").hasClass(e)){var i=n.get("id");t.jumpToPage(i)}})},_setNumberPages:function(){var t=this;t._setNumberButtons()},_setNumberButtons:function(){var t,e=this,a=e.get("curPage"),i=e.get("totalPage"),r=e._getNumberItems(a,i);e._clearNumberButtons(),n.each(r,function(t){e._appendNumberButton(t)}),t=e.getItem(a),t&&t.set("selected",!0)},_appendNumberButton:function(t){var e=this,a=e.getItemCount();e.addItemAt(t,a-1)},_clearNumberButtons:function(){for(var t=this,e=(t.getItems(),t.getItemCount());e>2;)t.removeItemAt(e-2),e=t.getItemCount()},_getNumberItems:function(t,e){function a(t,e){for(var a=t;e>=a;a++)u.push(r._getNumberItem(a))}function n(){u.push(r._getEllipsisItem())}var i,r=this,u=[],o=r.get("maxLimitCount"),s=r.get("showRangeCount");if(o>e)i=e,a(1,e);else{var l=o>=t?1:t-s,g=t+s,c=e>g?g>o?g:o:e;l>1&&(a(1,1),l>2&&n()),i=c,a(l,c)}return e>i&&(e-1>i&&n(),a(e,e)),u},_getEllipsisItem:function(){var t=this;return{disabled:!0,content:t.get("ellipsisTpl")}},_getNumberItem:function(t){var e=this;return{id:t,elCls:e.get("numberButtonCls")}}},{ATTRS:{itemStatusCls:{value:{selected:"active",disabled:"disabled"}},itemTpl:{value:'<a href="">{id}</a>'},prevText:{value:"<<"},nextText:{value:">>"},maxLimitCount:{value:4},showRangeCount:{value:1},numberButtonCls:{value:u},ellipsisTpl:{value:'<a href="#">...</a>'}}},{xclass:"pagingbar-number",priority:3});a.exports=o});