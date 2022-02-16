export default {
	get : function(k) {
		let cookies = {};
		
		document.cookie.split('; ').forEach((v) => {
			let list = v.split('=');
			cookies[ list[0] ] = list[1];
		});
			
		return cookies[k] || '';
	},
	set : function(k, v) {
		document.cookie = [k, v].join('=') + '; secure';
	},
	delete : function(k) {
		let regex = new RegExp("^(.*)((?:" + k + "=[^;]+);?)(.*)$", 'g');
		console.log(regex);
		document.cookie = document.cookie.replace(regex, '$1$3');
	},
};