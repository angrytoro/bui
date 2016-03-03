(function() {
	var i18n = {
		'zh_CN': {
			confirm : "确认",
			cancel : "取消",
			inputDifferent  : "两次输入不一致！",
			notNull : "不能为空！",
			inputNotLess : "输入值不能小于{0}！",
			inputNotMore : "输入值不能大于{0}！",
			inputLenght : "输入值长度为{0}！",
			inputLenNotLess : "输入值长度不小于{0}！",
			inputLenNotMore : "输入值长度不大于{0}！",
			inputIllegal  : "输入值不符合{0}！",
			mailIllegal : "不是有效的邮箱地址！",
			dateIllegal : "不是有效的日期！",
			dateNotLess : "输入日期不能小于{0}！",
			dateNotMore : "输入日期不能大于{0}！",
			dateInputError : "结束日期不能小于起始日期！",
			phoneIllegal : "不是有效的手机号码！",
			numberIllegal : "不是有效的数字！",
			numberInputError : "结束数字不能小于开始数字！",
			mustSelectOption : "必须选中{0}项！",
			pleaseSelect : "请选择",
			uploadFileError : "上传文件选择有误！",
			loading : "正在提交。。。",
			startNotMoreEnd : "开始不能大于结束！",
			ascending : "升序",
			descending : "降序",
			setColumn : "设置列",
			autoSize : "自动大小",
			actualSize : "实际大小",
			fitSize : "适合大小",
			leftHand : "左旋",
			rightHand : "右旋",
			zoom : "放大",
			micrify : "缩小",
			viewImg : "查看原图",
			close : "关闭",
			closeOther :"关闭其他",
			closeAll : "关闭所有",
			title : "标题",
			inputTag : "输入标签",
			refresh : "刷新",
			homePage : "首 页",
			prev : "上一页",
			next : "下一页",
			LastPage : "末 页",
			ensure : "确定",
			totalPage : "共 {totalPage} 页",
			noPageA : '第 <input type="text"',
			noPageB : 'pb-page" size="20" value="{curPage}" name="inputItem"> 页',
			totalRecord : '共{totalCount}条记录',	
			delBtn : "删除",
			uploadFile : "上传文件",
			paramError : "参数有误！",
			serverInput : '服务器端输出：',
			objNull : "对象为空！",
			uploadCount : "已经上传字节数为：",
			fileIllegal : "缺少crossdomain.xml文件或该文件不合法！",
			fileIllegal2 : "缺少crossdomain.xml文件或该文件不合法！",
			serverReturnErr : "服务器端返回数据有问题！",
			totalQuery : "查询合计",
			pageQuery : "本页合计"
		}
	};
	var current;

	if(typeof window.locale === 'string') {
		current = i18n[window.locale] || {};
	} else {
		current = i18n['zh_CN']; //默认是中文
	}
	
	/**
	 * 根据传入的key获取相应的key对应的翻译
	 * @param  {[type]} key [description]
	 * @return {[type]}     [description]
	 */
	BUI.i18n = function(key) {
		return current[key] || '';
	};

	/**
	 * 设置语言
	 * @param {[type]} language [description]
	 */
	BUI.i18n.setLanguage = function(language) {
		current = i18n[language];
	};
})();