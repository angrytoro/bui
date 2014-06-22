define("bui/tree",["bui/common","bui/tree/treemixin","bui/tree/treelist","bui/tree/treemenu"],function(require){var e=require("bui/common"),t=e.namespace("Tree");return e.mix(t,{TreeList:require("bui/tree/treelist"),Mixin:require("bui/tree/treemixin"),TreeMenu:require("bui/tree/treemenu")}),t}),define("bui/tree/treemixin",["bui/common","bui/data"],function(require){function e(e,n){return t.isString(n)&&(n=e.findNode(n)),n}var t=require("bui/common"),n=require("bui/data"),i="expanded",d="loading",a="checked",o="partial-checked",s={NONE:"none",ALL:"all",CUSTOM:"custom",ONLY_LEAF:"onlyLeaf"},l="x-tree-icon",r="x-tree-elbow",c="x-tree-show-line",u=r+"-",h=l+"-wraper",f=u+"line",v=u+"end",p=u+"empty",g=u+"expander",m=l+"-checkbox",_=l+"-radio",C=g+"-end",k=function(){};return k.ATTRS={store:{getter:function(e){if(!e){var t=this,i=new n.TreeStore({root:t.get("root"),data:t.get("nodes")});return t.setInternal("store",i),i}return e}},root:{},nodes:{sync:!1},iconContainer:{},iconWraperTpl:{value:'<span class="'+h+'">{icons}</span>'},showLine:{value:!1},showIcons:{value:!0},iconTpl:{value:'<span class="x-tree-icon {cls}"></span>'},leafCls:{value:u+"leaf"},dirCls:{value:u+"dir"},checkType:{value:"custom"},cascadeCheckd:{value:!0},accordion:{value:!1},multipleCheck:{value:!0},checkedField:{valueFn:function(){return this.getStatusField("checked")}},checkableField:{value:"checkable"},itemStatusFields:{value:{expanded:"expanded",disabled:"disabled",checked:"checked"}},dirSelectable:{value:!0},showRoot:{value:!1},events:{value:{expanded:!1,collapsed:!1,checkedchange:!1}},expandEvent:{value:"itemdblclick"},expandAnimate:{value:!1},collapseEvent:{value:"itemdblclick"},startLevel:{value:1}},t.augment(k,{collapseAll:function(){var e=this,n=e.get("view").getAllElements();t.each(n,function(t){var n=e.getItemByElement(t);n&&e._collapseNode(n,t,!0)})},collapseNode:function(e){var n,i=this;t.isString(e)&&(e=i.findNode(e)),e&&(n=i.findElement(e),i._collapseNode(e,n))},expandAll:function(){var e=this,n=e.get("view").getAllElements();t.each(n,function(t){var n=e.getItemByElement(t);e._expandNode(n,t,!0)})},expandNode:function(e,n){var i,d=this;t.isString(e)&&(e=d.findNode(e)),e&&(e.parent&&!d.isExpanded(e.parent)&&d.expandNode(e.parent),i=d.findElement(e),d._expandNode(e,i,n))},expandPath:function(e,t,n){if(e){n=n||0;var i,d,a,o,s=this,l=s.get("store"),r=e.split(",");for(i=s.findNode(r[n]),a=n+1;a<r.length;a++)if(o=r[a],d=s.findNode(o,i),i&&d)s.expandNode(i),i=d;else if(i&&t){l.load({id:i.id},function(){d=s.findNode(o,i),d&&s.expandPath(e,t,a)});break}}},findNode:function(e,t){return this.get("store").findNode(e,t)},getCheckedLeaf:function(e){var t=this,n=t.get("store");return n.findNodesBy(function(e){return e.leaf&&t.isChecked(e)},e)},getCheckedNodes:function(e){var t=this,n=t.get("store");return n.findNodesBy(function(e){return t.isChecked(e)},e)},isItemSelectable:function(e){var t=this,n=t.get("dirSelectable"),i=e;return!i||n||i.leaf?!0:!1},isExpanded:function(e){if(!e||e.leaf)return!1;var n,i=this;return i._isRoot(e)&&!i.get("showRoot")?!0:(t.isString(e)&&(item=i.getItem(e)),n=i.findElement(e),this._isExpanded(e,n))},isChecked:function(e){return e?!!e[this.get("checkedField")]:!1},toggleExpand:function(e){var n,i=this;t.isString(e)&&(item=i.getItem(e)),n=i.findElement(e),i._toggleExpand(e,n)},setNodeChecked:function(n,i,d){if(d=null==d?!0:d,n){var o,s,l=this,r=l.get("multipleCheck"),c=l.get("cascadeCheckd");if(n=e(this,n),n&&(o=n.parent,l.isCheckable(n))){if(l.isChecked(n)!==i||l.hasStatus(n,"checked")!==i){if(s=l.findElement(n),c?(s?(l.setItemStatus(n,a,i,s),r?l._resetPatialChecked(n,i,i,s):i&&o&&l.isChecked(o)!=i&&l.setNodeChecked(o,i,!1)):l.isItemDisabled(n)||l.setStatusValue(n,a,i),o&&(l.isChecked(o)!=i?l._resetParentChecked(o):r&&l._resetPatialChecked(o,null,null,null,!0))):l.isItemDisabled(n)||(s?l.setItemStatus(n,a,i,s):l.setStatusValue(n,a,i)),i&&!r&&(l.isChecked(o)||o==l.get("root")||!c)){var u=o.children;t.each(u,function(e){e!==n&&l.isChecked(e)&&l.setNodeChecked(e,!1)})}l.fire("checkedchange",{node:n,element:s,checked:i})}!n.leaf&&d&&c&&t.each(n.children,function(e,t){(r||!i||!r&&0==t)&&l.setNodeChecked(e,i,d)})}}},setChecked:function(e){this.setNodeChecked(e,!0)},clearAllChecked:function(){var e=this,n=e.getCheckedNodes();t.each(n,function(t){e.setNodeChecked(t,!1)})},_initRoot:function(){var e,n,i=this,d=i.get("store"),a=i.get("showRoot");d&&(e=d.get("root"),i.setInternal("root",e),n=a?[e]:e.children,t.each(n,function(e){i._initChecked(e,!0)}),i.clearItems(),i.addItems(n))},_initChecked:function(e,n){var i,d=this,a=d.get("checkType"),o=d.get("checkedField"),l=d.get("multipleCheck"),r=d.get("checkableField"),c=d.get("cascadeCheckd");return a===s.NONE?(e[r]=!1,void(e[o]=!1)):a===s.ONLY_LEAF?void(e.leaf?e[r]=!0:(e[r]=!1,e[o]=!1,n&&t.each(e.children,function(e){d._initChecked(e,n)}))):(a===s.CUSTOM&&null==e[r]&&(e[r]=null!=e[o]),a===s.ALL&&(e[r]=!0),void(e&&d.isCheckable(e)&&(i=e.parent,!d.isChecked(e)&&c&&(i&&d.isChecked(i)&&(l||!d._hasChildChecked(i))&&d.setStatusValue(e,"checked",!0),(e.children&&e.children.length&&d._isAllChildrenChecked(e)||!l&&d._hasChildChecked(e))&&d.setStatusValue(e,"checked",!0)),n&&t.each(e.children,function(e){d._initChecked(e,n)}))))},_resetPatialChecked:function(e,t,n,i,d){if(!e||e.leaf)return!0;var n,a=this;return(t=null==t?a.isChecked(e):t)?void a.setItemStatus(e,o,!1,i):(n=null==n?a._hasChildChecked(e):n,a.setItemStatus(e,o,n,i),void(d&&e.parent&&a._resetPatialChecked(e.parent,!1,n?n:null,null,d)))},_resetParentChecked:function(e){if(this.isCheckable(e)){var t=this,n=t.get("multipleCheck"),i=n?t._isAllChildrenChecked(e):t._hasChildChecked(e);t.setStatusValue(e,"checked",i),t.setNodeChecked(e,i,!1),n&&t._resetPatialChecked(e,i,null,null,!0)}},__bindUI:function(){var e=this,t=(e.get("el"),e.get("multipleCheck"));e.on("itemclick",function(t){var n=$(t.domTarget),i=t.element,d=t.item;if(n.hasClass(g))return e._toggleExpand(d,i),!1;if(n.hasClass(m)){var a=e.isChecked(d);e.setNodeChecked(d,!a)}else n.hasClass(_)&&e.setNodeChecked(d,!0)}),e.on("itemrendered",function(n){var i=n.item,d=n.domTarget;e._resetIcons(i,d),e.isCheckable(i)&&t&&e.get("cascadeCheckd")&&e._resetPatialChecked(i,null,null,d),e._isExpanded(i,d)&&e._showChildren(i)}),e._initExpandEvent()},_initExpandEvent:function(){function e(e){return function(n){var i=$(n.domTarget),d=n.element,a=n.item;i.hasClass(g)||t[e](a,d)}}var t=this,n=(t.get("el"),t.get("expandEvent")),i=t.get("collapseEvent");n==i?t.on(n,e("_toggleExpand")):(n&&t.on(n,e("_expandNode")),i&&t.on(i,e("_collapseNode")))},_isForceChecked:function(){var e=this,t=e.get("multipleCheck");return t?e._isAllChildrenChecked():_isForceChecked()},_isAllChildrenChecked:function(e){if(!e||e.leaf)return!1;var n=this,i=e.children,d=!0;return t.each(i,function(e){return d=d&&n.isChecked(e),d?void 0:!1}),d},_hasChildChecked:function(e){if(!e||e.leaf)return!1;var t=this;return 0!=t.getCheckedNodes(e).length},_isRoot:function(e){var t=this,n=t.get("store");return n&&n.get("root")==e?!0:!1},_setLoadStatus:function(e,t,n){var i=this;i.setItemStatus(e,d,n,t)},_beforeLoadNode:function(e){var n,i=this;t.isString(e)&&(e=i.findNode(e)),n=i.findElement(e),n?(i._collapseNode(e,n),i._setLoadStatus(e,n,!0)):e&&t.each(e.children,function(e){i._removeNode(e)})},onBeforeLoad:function(e){var t=this,n=e.params,i=n.id,d=t.findNode(i)||t.get("root");t._beforeLoadNode(d)},_addNode:function(e,t){var n,i,d,a=this,o=e.parent;a._initChecked(e,!0),o?(a.isExpanded(o)&&(n=o.children.length,d=a._getInsetIndex(e),a.addItemAt(e,d),t==n-1&&t>0&&(i=o.children[t-1],a._updateIcons(i))),a._updateIcons(o)):(d=a._getInsetIndex(e),a.addItemAt(e,d),i=a.get("nodes")[t-1],a._updateIcons(i))},_getInsetIndex:function(e){var t,n=this;return t=n._getNextItem(e),t?n.indexOfItem(t):n.getItemCount()},_getNextItem:function(e){var n,i,d=this,a=e.parent,o=null;return a?(n=a.children,i=t.Array.indexOf(e,n),o=n[i+1],o||d._getNextItem(a)):null},onAdd:function(e){var t=this,n=e.node,i=e.index;t._addNode(n,i)},_updateNode:function(e){var t=this;t.updateItem(e),t._updateIcons(e)},onUpdate:function(e){var t=this,n=e.node;t._updateNode(n)},_removeNode:function(e,t){var n,i,d=this,a=e.parent;d.collapseNode(e),a&&(d.removeItem(e),d.isExpanded(a)&&(n=a.children.length,n==t&&0!==t&&(i=a.children[t-1],d._updateIcons(i))),d._updateIcons(a),d._resetParentChecked(a))},onRemove:function(e){var t=this,n=e.node,i=e.index;t._removeNode(n,i)},_loadNode:function(e){var t=this;t._initChecked(e,!0),t.expandNode(e),t._updateIcons(e),t.setItemStatus(e,d,!1)},__syncUI:function(){var e=this,t=e.get("store"),n=e.get("showRoot");n&&!t.hasData()&&e._initRoot()},onLoad:function(e){var t=this,n=t.get("store"),i=n.get("root");e&&e.node!=i||t._initRoot(),e&&e.node&&t._loadNode(e.node)},_isExpanded:function(e,t){return this.hasStatus(e,i,t)},_getIconsTpl:function(e){var n,i=this,d=e.level,a=i.get("startLevel"),o=i.get("iconWraperTpl"),s=[];for(n=a;d>n;n+=1)s.push(i._getLevelIcon(e,n));return s.push(i._getExpandIcon(e)),s.push(i._getCheckedIcon(e)),s.push(i._getNodeTypeIcon(e)),t.substitute(o,{icons:s.join("")})},_getCheckedIcon:function(e){var t,n=this,i=n.isCheckable(e);return i?(t=n.get("multipleCheck")?m:_,n._getIcon(t)):""},isCheckable:function(e){return e[this.get("checkableField")]},_getExpandIcon:function(e){var t=this,n=g;return e.leaf?t._getLevelIcon(e):(t._isLastNode(e)&&(n=n+" "+C),t._getIcon(n))},_getNodeTypeIcon:function(e){var t=this,n=e.cls?e.cls:t.get(e.leaf?"leafCls":"dirCls");return t._getIcon(n)},_getLevelIcon:function(e,t){var n,i=this,d=i.get("showLine"),a=p;return d&&(e.level===t||null==t?a=i._isLastNode(e)?v:r:(n=i._getParentNode(e,t),a=i._isLastNode(n)?p:f)),i._getIcon(a)},_getParentNode:function(e,t){var n=e.level,i=e.parent,d=n-1;if(t>=n)return null;for(;d>t;)i=i.parent,d-=1;return i},_getIcon:function(e){var n=this,i=n.get("iconTpl");return t.substitute(i,{cls:e})},_isLastNode:function(e){if(!e)return!1;if(e==this.get("root"))return!0;var t,n=this,i=e.parent,d=i?i.children:n.get("nodes");return t=d.length,d[t-1]===e},_initNodes:function(e,n,i){var d=this;t.each(e,function(e){e.level=n,null==e.leaf&&(e.leaf=e.children?!1:!0),i&&!e.parent&&(e.parent=i),d._initChecked(e),e.children&&d._initNodes(e.children,n+1,e)})},_collapseNode:function(e,t,n){var d=this;e.leaf||d.hasStatus(e,i,t)&&(d.setItemStatus(e,i,!1,t),n?(d._collapseChildren(e,n),d.removeItems(e.children)):d._hideChildrenNodes(e),d.fire("collapsed",{node:e,element:t}))},_hideChildrenNodes:function(e){var n=this,i=e.children,d=[];t.each(i,function(e){var t=n.findElement(e);t&&(d.push(t),n._hideChildrenNodes(e))}),n.get("expandAnimate")?(d=$(d),d.animate({height:0},function(){n.removeItems(i)})):n.removeItems(i)},_collapseChildren:function(e,n){var i=this,d=e.children;t.each(d,function(e){i.collapseNode(e,n)})},_expandNode:function(e,n,d){var a=this,o=a.get("accordion"),s=a.get("store");if(!e.leaf){if(!a.hasStatus(e,i,n)){if(o&&e.parent){var l=e.parent.children;t.each(l,function(t){t!=e&&a.collapseNode(t)})}s&&!s.isLoaded(e)?a._isLoading(e,n)||s.loadNode(e):n&&(a.setItemStatus(e,i,!0,n),a._showChildren(e),a.fire("expanded",{node:e,element:n}))}t.each(e.children,function(e){(d||a.isExpanded(e))&&a.expandNode(e,d)})}},_showChildren:function(e){if(e&&e.children){var t,n=this,i=n.indexOfItem(e),d=e.children.length,a=d-1;for(a=d-1;a>=0;a--)t=e.children[a],n.getItem(t)||(n.get("expandAnimate")?(el=n._addNodeAt(t,i+1),el.hide(),el.slideDown()):n.addItemAt(t,i+1))}},_addNodeAt:function(e,t){var n=this,i=n.get("items");return void 0===t&&(t=i.length),i.splice(t,0,e),n.addItemToView(e,t)},_isLoading:function(e,t){var n=this;return n.hasStatus(e,d,t)},_resetIcons:function(e,t){if(this.get("showIcons")){var n,i=this,d=i.get("iconContainer"),a=i._getIconsTpl(e);$(t).find("."+h).remove(),n=$(t).find(d).first(),d&&n.length?$(a).prependTo(n):$(t).prepend($(a))}},_toggleExpand:function(e,t){var n=this;n._isExpanded(e,t)?n._collapseNode(e,t):n._expandNode(e,t)},_updateIcons:function(e){var n=this,i=n.findElement(e);i&&(n._resetIcons(e,i),n._isExpanded(e,i)&&!e.leaf&&t.each(e.children,function(e){n._updateIcons(e)}))},_uiSetShowRoot:function(){var e=this,t=this.get("showRoot")?0:1;e.set("startLevel",t)},_uiSetNodes:function(e){var t=this,n=t.get("store");n.setResult(e)},_uiSetShowLine:function(e){var t=this,n=t.get("el");e?n.addClass(c):n.removeClass(c)}}),k}),define("bui/tree/selection",["bui/list"],function(require){var e=require("bui/common"),t=require("bui/list").SimpleList,n=function(){};return n.ATTRS={},e.augment(n,{getSelection:function(){var e,n=this,i=n.getStatusField("selected");return i?(e=n.get("store"),e.findNodesBy(function(e){return e[i]})):t.prototype.getSelection.call(this)},getSelected:function(){var e,n=this,i=n.getStatusField("selected");return i?(e=n.get("store"),e.findNodeBy(function(e){return e[i]})):t.prototype.getSelected.call(this)}}),n}),define("bui/tree/treelist",["bui/common","bui/list","bui/tree/treemixin","bui/tree/selection"],function(require){var e=require("bui/common"),t=require("bui/list"),n=require("bui/tree/treemixin"),i=require("bui/tree/selection"),d=t.SimpleList.extend([n,i],{},{ATTRS:{itemCls:{value:e.prefix+"tree-item"},itemTpl:{value:"<li>{text}</li>"},idField:{value:"id"}}},{xclass:"tree-list"});return d}),define("bui/tree/treemenu",["bui/common","bui/list","bui/tree/treemixin","bui/tree/selection"],function(require){var e=require("bui/common"),t=require("bui/list"),n=require("bui/tree/treemixin"),i=require("bui/tree/selection"),d=t.SimpleList.View.extend({getItemTpl:function(t,n){var i=this,d=i.get("itemTplRender"),a=i.get(t.leaf?"leafTpl":"dirTpl");return d?d(t,n):e.substitute(a,t)}},{xclass:"tree-menu-view"}),a=t.SimpleList.extend([n,i],{},{ATTRS:{itemCls:{value:e.prefix+"tree-item"},dirSelectable:{value:!1},expandEvent:{value:"itemclick"},itemStatusFields:{value:{selected:"selected"}},collapseEvent:{value:"itemclick"},xview:{value:d},dirTpl:{view:!0,value:'<li class="{cls}"><a href="#">{text}</a></li>'},leafTpl:{view:!0,value:'<li class="{cls}"><a href="{href}">{text}</a></li>'},idField:{value:"id"}}},{xclass:"tree-menu"});return a.View=d,a});