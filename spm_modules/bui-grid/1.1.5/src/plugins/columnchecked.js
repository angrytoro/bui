var $ = require('jquery'),
  BUI = require('bui-common');


/**
 * 表格自适应宽度
 * @class BUI.Grid.Plugins.ColumnChecked
 * @extends BUI.Base
 */
var Checked = function(cfg){
  Checked.superclass.constructor.call(this,cfg);
};

BUI.extend(Checked,BUI.Base);

Checked.ATTRS = {

  /**
   * 触发的样式，默认 ： x-col-checkbox
   * @type {String}
   */
  triggerCls : {
    value : 'x-col-checkbox'
  },
  /**
   * 未选中的模板
   * @type {String}
   */
  uncheckedTpl : {
    value : '<span class="x-col-checkbox"></span>'
  },
  /**
   * 选中的模板
   * @type {String}
   */
  checkedTpl : {
    value : '<span class="x-col-checkbox x-col-checkbox-checked"></span>'
  }
};

BUI.augment(Checked,{

  renderUI : function(grid){
    var _self = this,
      columns = grid.get('columns'),
      uncheckedTpl = _self.get('uncheckedTpl'),
      checkedTpl = _self.get('checkedTpl');

    BUI.each(columns,function(column){
      if(column.get('checkable')){
        var renderer = column.get('renderer');
        var newRender = function(value,obj){
          var text = renderer ? renderer(value,obj) : '';
          if(value){
            text = checkedTpl + text;
          }else{
            text = uncheckedTpl + text;
          }
          return text;
        };

        column.set('renderer',newRender);
      }
    });
  },
  bindUI : function(grid){
    var _self = this,
      triggerCls = _self.get('triggerCls'),
      store = grid.get('store');

    grid.on('cellclick',function(ev){
      var sender = $(ev.domTarget);
      if(sender.hasClass(triggerCls)){
        var  record = ev.record,
          field = ev.field,
          value = record[field];
        store.setValue(record,field,!value);
        return false; //阻止默认行为
      }
    });
  }
});


module.exports = Checked;