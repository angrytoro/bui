(function() {
	var i18n = {
		'zh_CN': {
			china: '中文'
		}
	};
	var current;

	if(typeof window.locale === 'string') {
		current = i18n[window.locale];
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