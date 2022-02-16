import Timezones from './classes/_class.Timezones';

(function(){
		
	const timezones = new Timezones();
	
	const run = (e) => {
		
		timezones.newTZ(e);
		timezones.table();
		timezones.form__ADD();
		
		document.getElementById('add_timezone').onsubmit = function(e) {
			e.preventDefault();
		};
		let toggleAddBtn = element => {
			if (element.value !== '--') {
				document.getElementById('add_timezone_btn').removeAttribute('disabled');
			}
			else {
				document.getElementById('add_timezone_btn').setAttribute('disabled', 'disabled');
			}
		};
		document.addEventListener('click', function(e){
			let element = e.target;
			if (element) {
				let classList = element.classList.value;
				let id = element.getAttribute('data-id');
				if(element.classList.value.match(/(^| )delete( |$)/)) {
					timezones.remove(id);
				}
				else if(classList.match(/(^| )home( |$)/) && !element.getAttribute('disabled')) {
					timezones.changeHome(id);
				}
				else if(element.id === 'add_timezone_btn') {
					timezones.add();
				}
				else if(element.id === 'timezone_list') {
					toggleAddBtn(element);
				}
			}
			e.preventDefault();
		});
		document.addEventListener('change', function(e){
			let element = e.target;
			if(element.id === 'timezone_list') {
				toggleAddBtn(element);
			}
		});
		
		setInterval(() => {
			timezones.newTZ(e);
			timezones.table();
		}, 2000);
	};
	
	window.onload = run;
})();