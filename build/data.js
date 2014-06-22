!function(){var e="bui/data/";define("bui/data",["bui/common",e+"sortable",e+"proxy",e+"abstractstore",e+"store",e+"node",e+"treestore"],function(t){var r=t("bui/common"),a=r.namespace("Data");return r.mix(a,{Sortable:t(e+"sortable"),Proxy:t(e+"proxy"),AbstractStore:t(e+"abstractstore"),Store:t(e+"store"),Node:t(e+"node"),TreeStore:t(e+"treestore")}),a})}(),define("bui/data/sortable",function(){var e="ASC",t=function(){};return t.ATTRS={compareFunction:{value:function(e,t){return void 0===e&&(e=""),void 0===t&&(t=""),BUI.isString(e)?e.localeCompare(t):e>t?1:e===t?0:-1}},sortField:{},sortDirection:{value:"ASC"},sortInfo:{getter:function(){var e=this,t=e.get("sortField");return{field:t,direction:e.get("sortDirection")}},setter:function(e){var t=this;t.set("sortField",e.field),t.set("sortDirection",e.direction)}}},BUI.augment(t,{compare:function(t,r,a,n){var o,i=this;return a=a||i.get("sortField"),n=n||i.get("sortDirection"),a&&n?(o=n===e?1:-1,i.get("compareFunction")(t[a],r[a])*o):1},getSortData:function(){},sortData:function(e,t,r){var a=this,r=r||a.getSortData();return BUI.isArray(e)&&(r=e,e=null),e=e||a.get("sortField"),t=t||a.get("sortDirection"),a.set("sortField",e),a.set("sortDirection",t),e&&t?(r.sort(function(r,n){return a.compare(r,n,e,t)}),r):r}}),t}),define("bui/data/proxy",["bui/data/sortable"],function(require){var e=require("bui/data/sortable"),t=function(e){t.superclass.constructor.call(this,e)};t.ATTRS={},BUI.extend(t,BUI.Base),BUI.augment(t,{_read:function(){},read:function(e,t,r){var a=this;r=r||a,a._read(e,function(e){t.call(r,e)})},_save:function(){},save:function(e,t,r,a){var n=this;a=a||n,n._save(e,t,function(e){r.call(a,e)})}});var r={READ:"read",ADD:"add",UPDATE:"update",REMOVE:"remove",SAVE_ALL:"all"},a=function(e){a.superclass.constructor.call(this,e)};a.ATTRS=BUI.mix(!0,t.ATTRS,{limitParam:{value:"limit"},startParam:{value:"start"},pageIndexParam:{value:"pageIndex"},saveTypeParam:{value:"saveType"},saveDataParam:{},pageStart:{value:0},dataType:{value:"json"},method:{value:"GET"},ajaxOptions:{value:{}},cache:{value:!1},save:{},url:{}}),BUI.extend(a,t),BUI.augment(a,{_processParams:function(e){var t=this,r=t.get("pageStart"),a=["start","limit","pageIndex"];null!=e.pageIndex&&(e.pageIndex=e.pageIndex+r),BUI.each(a,function(r){var a=t.get(r+"Param");a!==r&&(e[a]=e[r],delete e[r])})},_getUrl:function(e){var t,a=this,n=a.get("save");return e===r.READ?a.get("url"):n?BUI.isString(n)?n:(t=n[e+"Url"],t||(t=a.get("url")),t):a.get("url")},_getAppendParams:function(e){var t,a,n=this,o=null;return e==r.READ?o:(t=n.get("save"),a=n.get("saveTypeParam"),t&&!t[e+"Url"]&&(o={},o[a]=e),o)},_read:function(e,t){var a,n=this;e=BUI.cloneObject(e),n._processParams(e),a=n._getAjaxOptions(r.READ,e),n._ajax(a,t)},_getAjaxOptions:function(e,t){var r,a=this,n=a.get("ajaxOptions"),o=a._getUrl(e);return BUI.mix(t,a._getAppendParams(e)),r=BUI.merge({url:o,type:a.get("method"),dataType:a.get("dataType"),data:t,cache:a.get("cache")},n)},_ajax:function(e,t){var r=e.success,a=e.error;e.success=function(e){r&&r(e),t(e)},e.error=function(e,r,n){a&&a(e,r,n);var o={exception:{status:r,errorThrown:n,jqXHR:e}};t(o)},$.ajax(e)},_save:function(e,t,r){var a,n=this;a=n._getAjaxOptions(e,t),n._ajax(a,r)}});var n=function(e){n.superclass.constructor.call(this,e)};return n.ATTRS={matchFields:{value:[]}},BUI.extend(n,t),BUI.mixin(n,[e]),BUI.augment(n,{_read:function(e,t){var r=this,a=(e.pageable,e.start),n=e.sortField,o=e.sortDirection,i=e.limit,s=r.get("data"),d=[];s=r._getMatches(e),r.sortData(n,o),i?(d=s.slice(a,a+i),t({rows:d,results:s.length})):(d=s.slice(a),t(d))},_getMatchFn:function(e,t){return function(r){var a=!0;return BUI.each(t,function(t){return null!=e[t]&&e[t]!==r[t]?(a=!1,!1):void 0}),a}},_getMatches:function(e){var t,r=this,a=r.get("matchFields"),n=r.get("data")||[];return e&&a.length&&(t=r._getMatchFn(e,a),n=BUI.Array.filter(n,t)),n},_save:function(e,t){var a=this,n=a.get("data");e==r.ADD?n.push(t):e==r.REMOVE?BUI.Array.remove(n,t):e==r.SAVE_ALL&&(BUI.each(t.add,function(e){n.push(e)}),BUI.each(t.remove,function(e){BUI.Array.remove(n,e)}))}}),t.Ajax=a,t.Memery=n,t}),define("bui/data/abstractstore",["bui/common","bui/data/proxy"],function(require){function e(t){e.superclass.constructor.call(this,t),this._init()}var t=require("bui/common"),r=require("bui/data/proxy");return e.ATTRS={autoLoad:{value:!1},remoteFilter:{value:!1},lastParams:{shared:!1,value:{}},params:{},proxy:{shared:!1,value:{}},url:{},events:{value:["acceptchanges","load","beforeload","beforeprocessload","add","exception","remove","update","localsort","filtered"]},data:{setter:function(e){var t=this,r=t.get("proxy");r.set?r.set("data",e):r.data=e,t.set("autoLoad",!0)}}},t.extend(e,t.Base),t.augment(e,{isStore:!0,_init:function(){var e=this;e.beforeInit(),e._initParams(),e._initProxy(),e._initData()},beforeInit:function(){},_initData:function(){var e=this,t=e.get("autoLoad");t&&e.load()},_initParams:function(){var e=this,r=e.get("lastParams"),a=e.get("params");t.mix(r,a)},_initProxy:function(){var e=this,t=e.get("url"),a=e.get("proxy");a instanceof r||(t&&(a.url=t),a="ajax"===a.type||a.url?new r.Ajax(a):new r.Memery(a),e.set("proxy",a))},load:function(e,r){var a=this,n=a.get("proxy"),o=a.get("lastParams");t.mix(o,a.getAppendParams(),e),a.fire("beforeload",{params:o}),e=t.cloneObject(o),n.read(o,function(t){a.onLoad(t,e),r&&r(t,e)},a)},onFiltered:function(e,t){var r=this;r.fire("filtered",{data:e,filter:t})},onLoad:function(e,t){var r=this,a=r.processLoad(e,t);a&&r.afterProcessLoad(e,t)},getResult:function(){},filter:function(e){var t,r=this,a=r.get("remoteFilter");e=e||r.get("filter"),a?r.load({filter:e}):e&&(r.set("filter",e),r.getResult().length>0&&(t=r._filterLocal(e),r.onFiltered(t,e)))},_filterLocal:function(){},getFilterResult:function(){var e=this.get("filter");return e?this._filterLocal(e):this.getResult()},_clearLocalFilter:function(){this.set("filter",null)},clearFilter:function(){var e,t=this,r=t.get("remoteFilter");r?t.load({filter:""}):(t._clearLocalFilter(),e=t.getFilterResult(),t.onFiltered(e,null))},processLoad:function(e){var t=this,r=t.get("hasErrorProperty");return t.fire("beforeprocessload",{data:e}),t.fire("beforeProcessLoad",e),e[r]||e.exception?(t.onException(e),!1):!0},afterProcessLoad:function(){},onException:function(e){var t=this,r=t.get("errorProperty"),a={};e.exception?(a.type="exception",a[r]=e.exception):(a.type="error",a[r]=e[r]),t.fire("exception",a)},hasData:function(){},getAppendParams:function(){return{}}}),e}),define("bui/data/node",["bui/common"],function(require){function e(e,t){var a={};return t?(r.each(e,function(e,r){var n=t[r]||r;a[n]=e}),a.record=e):a=e,a}function t(t,a){t=e(t,a),r.mix(this,t)}var r=require("bui/common");return r.augment(t,{root:!1,leaf:null,text:"",id:null,loaded:!1,path:null,parent:null,level:0,record:null,children:null,isNode:!0}),t}),define("bui/data/treestore",["bui/common","bui/data/node","bui/data/abstractstore","bui/data/proxy"],function(require){function e(t){e.superclass.constructor.call(this,t)}var t=require("bui/common"),r=require("bui/data/node"),a=require("bui/data/proxy"),n=require("bui/data/abstractstore");return e.ATTRS={root:{},map:{},pidField:{},dataProperty:{value:"nodes"},events:{value:["add","update","remove","load"]}},t.extend(e,n),t.augment(e,{beforeInit:function(){this.initRoot()},_initData:function(){var e=this,t=e.get("autoLoad"),r=e.get("pidField"),a=e.get("proxy"),n=e.get("root");!a.get("url")&&r&&a.get("matchFields").push(r),t&&!n.children&&e.loadNode(n)},initRoot:function(){var e=this,t=e.get("map"),a=e.get("root");a||(a={}),a.isNode||(a=new r(a,t)),a.path=[a.id],a.level=0,a.children&&e.setChildren(a,a.children),e.set("root",a)},add:function(e,t,r){var a=this;return e=a._add(e,t,r),a.fire("add",{node:e,record:e,index:r}),e},_add:function(e,a,n){a=a||this.get("root");var o,i=this,s=i.get("map"),d=a.children;return e.isNode||(e=new r(e,s)),o=e.children||[],0==o.length&&null==e.leaf&&(e.leaf=!0),a&&(a.leaf=!1),e.parent=a,e.level=a.level+1,e.path=a.path.concat(e.id),n=null==n?a.children.length:n,t.Array.addAt(d,e,n),i.setChildren(e,o),e},remove:function(e){var r=e.parent||_self.get("root"),a=t.Array.indexOf(e,r.children);return t.Array.remove(r.children,e),0===r.children.length&&(r.leaf=!0),this.fire("remove",{node:e,record:e,index:a}),e.parent=null,e},setValue:function(e,t,r){var a=this;e[t]=r,a.fire("update",{node:e,record:e,field:t,value:r})},update:function(e){this.fire("update",{node:e,record:e})},getResult:function(){return this.get("root").children},setResult:function(e){var t=this,r=t.get("proxy"),n=t.get("root");r instanceof a.Memery?(t.set("data",e),t.load({id:n.id})):t.setChildren(n,e)},setChildren:function(e,r){var a=this;e.children=[],r.length&&t.each(r,function(t){a._add(t,e)})},findNode:function(e,t,r){return this.findNodeBy(function(t){return t.id===e},t,r)},findNodeBy:function(e,r,a){var n=this;if(a=null==a?!0:a,!r){var o=n.get("root");return e(o)?o:n.findNodeBy(e,o)}var i=r.children,s=null;return t.each(i,function(t){return e(t)?s=t:a&&(s=n.findNodeBy(e,t)),s?!1:void 0}),s},findNodesBy:function(e,r){var a=this,n=[];return r||(r=a.get("root")),t.each(r.children,function(t){e(t)&&n.push(t),n=n.concat(a.findNodesBy(e,t))}),n},findNodeByPath:function(e){if(!e)return null;var t,r,a=this,n=a.get("root"),o=e.split(","),i=o[0];if(!i)return null;if(t=n.id==i?n:a.findNode(i,n,!1)){for(r=1;r<o.length;r+=1){var i=o[r];if(t=a.findNode(i,t,!1),!t)break}return t}},contains:function(e,t){var r=this,a=r.findNode(e.id,t);return!!a},afterProcessLoad:function(e,r){var a=this,n=a.get("pidField"),o=r.id||r[n],i=a.get("dataProperty"),s=a.findNode(o)||a.get("root");t.isArray(e)?a.setChildren(s,e):a.setChildren(s,e[i]),s.loaded=!0,a.fire("load",{node:s,params:r})},hasData:function(){return this.get("root").children&&0!==this.get("root").children.length},isLoaded:function(e){var t=this.get("root");return e!=t||t.children?this.get("url")||this.get("pidField")?e.loaded||e.leaf||!(!e.children||!e.children.length):!0:!1},loadNode:function(e,t){var r,a=this,n=a.get("pidField");(t||!a.isLoaded(e))&&(r={id:e.id},n&&(r[n]=e.id),a.load(r))},reloadNode:function(e){var t=this;e=e||t.get("root"),e.loaded=!1,t.loadNode(e,!0)},loadPath:function(e){var t=this,r=e.split(","),a=r[0];t.findNodeByPath(e)||t.load({id:a,path:e})}}),e}),define("bui/data/store",["bui/data/proxy","bui/data/abstractstore","bui/data/sortable"],function(require){function e(e,t){if(!(0>e)){var r=t,a=r[e];return r.splice(e,1),a}}function t(t,r){var a=BUI.Array.indexOf(t,r);a>=0&&e(a,r)}function r(e,t){return-1!==BUI.Array.indexOf(e,t)}var a=require("bui/data/proxy"),n=require("bui/data/abstractstore"),o=require("bui/data/sortable"),i=function(e){i.superclass.constructor.call(this,e)};return i.ATTRS={autoSync:{value:!1},currentPage:{value:0},deletedRecords:{shared:!1,value:[]},errorProperty:{value:"error"},hasErrorProperty:{value:"hasError"},matchFunction:{value:function(e,t){return e==t}},modifiedRecords:{shared:!1,value:[]},newRecords:{shared:!1,value:[]},remoteSort:{value:!1},resultMap:{shared:!1,value:{}},root:{value:"rows"},rowCount:{value:0},totalProperty:{value:"results"},start:{value:0},pageSize:{}},BUI.extend(i,n),BUI.mixin(i,[o]),BUI.augment(i,{add:function(e,t,r){var a=this,n=a.getCount();a.addAt(e,n,t,r)},addAt:function(e,r,a,n){var o=this;n=n||o._getDefaultMatch(),BUI.isArray(e)||(e=[e]),$.each(e,function(e,i){a&&o.contains(i,n)||(o._addRecord(i,e+r),o.get("newRecords").push(i),t(i,o.get("deletedRecords")),t(i,o.get("modifiedRecords")))})},contains:function(e,t){return-1!==this.findIndexBy(e,t)},find:function(e,t){var r=this,a=null,n=r.getResult();return $.each(n,function(r,n){return n[e]===t?(a=n,!1):void 0}),a},findAll:function(e,t){var r=this,a=[],n=r.getResult();return $.each(n,function(r,n){n[e]===t&&a.push(n)}),a},findByIndex:function(e){return this.getResult()[e]},findIndexBy:function(e,t){var r=this,a=-1,n=r.getResult();return t=t||r._getDefaultMatch(),null===e||void 0===e?-1:($.each(n,function(r,n){return t(e,n)?(a=r,!1):void 0}),a)},findNextRecord:function(e){var t=this,r=t.findIndexBy(e);return r>=0?t.findByIndex(r+1):void 0},getCount:function(){return this.getResult().length},getTotalCount:function(){var e=this,t=e.get("resultMap"),r=e.get("totalProperty");return parseInt(t[r],10)||0},getResult:function(){var e=this,t=e.get("resultMap"),r=e.get("root");return t[r]},hasData:function(){return 0!==this.getCount()},setResult:function(e){var t=this,r=t.get("proxy");r instanceof a.Memery?(t.set("data",e),t.load({start:0})):(t._setResult(e),t.get("filter")&&t.filter())},remove:function(a,n){var o=this;n=n||o._getDefaultMatch(),BUI.isArray(a)||(a=[a]),$.each(a,function(a,i){var a=o.findIndexBy(i,n),s=e(a,o.getResult());r(s,o.get("newRecords"))||r(s,o.get("deletedRecords"))||o.get("deletedRecords").push(s),t(s,o.get("newRecords")),t(s,o.get("modifiedRecords")),o.fire("remove",{record:s})})},save:function(e,t,r){var a=this,n=a.get("proxy");BUI.isFunction(e)&&(r=e,e=void 0),BUI.isObject(e)&&(r=t,t=e,e=void 0),e||(e=a._getSaveType(t)),"all"!=e||t||(t=a._getDirtyData()),a.fire("beforesave",{type:e,saveData:t}),n.save(e,t,function(n){a.onSave(e,t,n),r&&r(n,t)},a)},_getSaveType:function(e){var t=this;return e?BUI.Array.contains(e,t.get("newRecords"))?"add":BUI.Array.contains(e,t.get("modifiedRecords"))?"update":BUI.Array.contains(e,t.get("deletedRecords"))?"remove":"custom":"all"},_getDirtyData:function(){var e=this,t=e.get("proxy");return t.get("url")?{add:BUI.JSON.stringify(e.get("newRecords")),update:BUI.JSON.stringify(e.get("modifiedRecords")),remove:BUI.JSON.stringify(e.get("deletedRecords"))}:{add:e.get("newRecords"),update:e.get("modifiedRecords"),remove:e.get("deletedRecords")}},onSave:function(e,t,r){var a=this,n=a.get("hasErrorProperty");return r[n]||r.exception?void a.onException(r):(a._clearDirty(e,t),a.fire("saved",{type:e,saveData:t,data:r}),void(a.get("autoSync")&&a.load()))},_clearDirty:function(e,t){function r(e,t){BUI.Array.remove(a.get(t),e)}var a=this;switch(e){case"all":a._clearChanges();break;case"add":r(t,"newRecords");break;case"update":r(t,"modifiedRecords");break;case"remove":r(t,"deletedRecords")}},sort:function(e,t){var r=this,a=r.get("remoteSort");a?(r.set("sortField",e),r.set("sortDirection",t),r.load(r.get("sortInfo"))):r._localSort(e,t)},sum:function(e,t){var r=this,a=t||r.getResult(),n=0;return BUI.each(a,function(t){var r=t[e];isNaN(r)||(n+=parseFloat(r))}),n},setValue:function(e,t,a){var n=e,o=this;n[t]=a,r(n,o.get("newRecords"))||r(n,o.get("modifiedRecords"))||o.get("modifiedRecords").push(n),o.fire("update",{record:n,field:t,value:a})},update:function(e,t,a){var n=e,o=this,a=null,i=null;t&&(a=a||o._getDefaultMatch(),i=o.findIndexBy(e,a),i>=0&&(n=o.getResult()[i])),n=BUI.mix(n,e),r(n,o.get("newRecords"))||r(n,o.get("modifiedRecords"))||o.get("modifiedRecords").push(n),o.fire("update",{record:n})},_addRecord:function(e,t){var r=this.getResult();void 0==t&&(t=r.length),r.splice(t,0,e),this.fire("add",{record:e,index:t})},_clearChanges:function(){var e=this;BUI.Array.empty(e.get("newRecords")),BUI.Array.empty(e.get("modifiedRecords")),BUI.Array.empty(e.get("deletedRecords"))},_filterLocal:function(e,t){var r=this,a=[];return t=t||r.getResult(),e?(BUI.each(t,function(t){e(t)&&a.push(t)}),a):t},_getDefaultMatch:function(){return this.get("matchFunction")},_getPageParams:function(){var e=this,t=e.get("sortInfo"),r=e.get("start"),a=e.get("pageSize"),n=e.get("pageIndex")||(a?r/a:0);return params={start:r,limit:a,pageIndex:n},e.get("remoteSort")&&BUI.mix(params,t),params},getAppendParams:function(){return this._getPageParams()},beforeInit:function(){this._setResult([])},_localSort:function(e,t){var r=this;r._sortData(e,t),r.fire("localsort",{field:e,direction:t})},_sortData:function(e,t,r){var a=this;r=r||a.getResult(),a.sortData(e,t,r)},afterProcessLoad:function(e,t){var r=this,a=r.get("root"),n=t.start,o=t.limit,i=r.get("totalProperty");BUI.isArray(e)?r._setResult(e):r._setResult(e[a],e[i]),r.set("start",n),o&&r.set("pageIndex",n/o),r.get("remoteSort")||r._sortData(),r.fire("load",{params:t}),!r.get("remoteFilter")&&r.get("filter")&&r.filter(r.get("filter"))},_setResult:function(e,t){var r=this,a=r.get("resultMap");t=t||e.length,a[r.get("root")]=e,a[r.get("totalProperty")]=t,r._clearChanges()}}),i});