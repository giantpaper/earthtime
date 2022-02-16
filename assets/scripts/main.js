// import getDate from './functions/_getDate';
// import GPS from './classes/_class.GPS';
import Timezones from './classes/_class.Timezones';
// import { getDistance, getLocations } from './functions/_misc';
// import cookie from './functions/_cookie';

(function(){
	
	// const list = window.EARTH.list;
	// const current = window.EARTH.home;
	// const convertTo12Hour = hour => {
	// 	if (hour > 12) {
	// 		hour = hour - 12;
	// 	}
	// 	else if (hour === 0) {
	// 		hour = 12;
	// 	}
	// 	return hour;
	// };
	// const sortObj = unordered => Object.keys(unordered).sort().reduce(
	// 	(obj, key) => { 
	// 		obj[key] = unordered[key]; 
	// 		return obj;
	// 	}, 
	// 	{}
	// );
	// 	
	// const newElement = el => {
	// 	return document.createElement(el);
	// };
	// const newTH = () => {
	// 	return newElement('th');
	// };
	// const newTD = () => {
	// 	return newElement('td');
	// };
	// const periods = ['AM', 'PM'];
	
	// const run = e => {
	// 	// if onload
	// 	if (eventTypeIs(e, 'load')) {
	// 		if (!localStorage.getItem('tz')) {
	// 			localStorage.setItem('tz', current);
	// 		}
	// 		if (!localStorage.getItem('home')) {
	// 			localStorage.setItem('home', current);
	// 		}
	// 	}
	// 	let timezones = {};
	// 	let dateObj = new Date();
	// 	let TimeUTC = {
	// 		hours: dateObj.getUTCHours(),
	// 		minutes: dateObj.getUTCMinutes(),
	// 		unix: Math.floor(Date.now() / 1000) + (dateObj.getTimezoneOffset() * 60),
	// 	};
	// 	
	// 	localStorage.getItem('tz').split('|').forEach(name => {
	// 		let date = getDate(dateObj, name, TimeUTC);
	// 		let inc_hours = [];
	// 		let h2 = date.h;
	// 		let k = 0;
	// 		
	// 		for (let j=0;j < 24;j++) {
	// 			if ( (h2 + k) > 23 ) {
	// 				h2 = 0;
	// 				k = 0;
	// 			}
	// 			inc_hours.push(h2 + k);
	// 			k++;
	// 		}
	// 		
	// 		timezones[date.unix + name] = {
	// 			name: name.replace(/_/g, ' '),
	// 			offset: date.offsets,
	// 			hour: date.h,
	// 			minute: date.m,
	// 			increment: inc_hours,
	// 			period: periods[date.h < 12 ? 0 : 1],
	// 		};
	// 	});
	// 	
	// 	timezones = sortObj(timezones);
	// 	
	// 	const table = newElement('table');
	// 	table.setAttribute('id', 'table');
	// 	
	// 	Object.keys(timezones).forEach(unix => {
	// 		
	// 		let row = timezones[unix];
	// 		
	// 		let th__name__delete = newElement('button');
	// 			th__name__delete.textContent = 'Delete';
	// 			th__name__delete.classList = ' delete';
	// 			th__name__delete.value = row.name;
	// 			th__name__delete.title = 'Delete';
	// 			th__name__delete.setAttribute('id', 'delete__' + row.name.replace(/([\/ ])/g, '-'));
	// 		
	// 		let th__name = newTH();
	// 			th__name.innerHTML = `<span class="name">${th__name__delete.outerHTML}${row.name}</span>`;
	// 			th__name.classList += ' name';
	// 		let th__offset = newTH();
	// 			th__offset.innerHTML = row.offset.str;
	// 			th__offset.classList += ' offset';
	// 		let minute = row.minute.toString().padStart(2, '0');
	// 		let td__currentTime = newTD();
	// 			td__currentTime.classList += ' current_time';
	// 			td__currentTime.textContent = [convertTo12Hour(row.hour), minute].join(':') + ' ' + row.period;
	// 		
	// 		let tr = newElement('tr');
	// 			tr.appendChild(th__name);
	// 			tr.appendChild(th__offset);
	// 			tr.appendChild(td__currentTime);
	// 			
	// 		if (localStorage.getItem('home').replace(/_/g, ' ') === row.name) {
	// 			tr.classList += ' current';
	// 		}
	// 		
	// 		row.increment.forEach(cell => {
	// 			let min = row.offset.minutes.toString().padStart(2, '0');
	// 			let td = newTD();
	// 				td.innerHTML = `<span class="offset">${convertTo12Hour(cell)}<span class="offset_minutes">:${min.replace(/[^0-9]/, '')}</span></span>`;
	// 				tr.appendChild(td);
	// 		});
	// 		table.appendChild(tr);
	// 	});
	// 			
	// 	document.getElementById('table').innerHTML = table.outerHTML;
	// 	
	// 	//-- FORM
	// 	let generateForm = () => {
	// 		
	// 		let addTZ__name__select = newElement('select');
	// 			addTZ__name__select.setAttribute('name', 'timezone_list');
	// 			addTZ__name__select.setAttribute('id', 'timezone_list');
	// 		
	// 		let addTZ__name__option_blank = newElement('option');
	// 			addTZ__name__option_blank.setAttribute('value', '--');
	// 			addTZ__name__option_blank.textContent = 'Add New City';
	// 			addTZ__name__option_blank.setAttribute('selected', 'selected');
	// 			addTZ__name__select.appendChild(addTZ__name__option_blank);
	// 			
	// 		list.forEach(tz => {
	// 			let date = getDate(dateObj, tz, TimeUTC);
	// 			let regexFindName = new RegExp('(?:^|\\|)' + tz.replace('/', '\\/') + '(?:\\||$)');
	// 			
	// 			if ( !localStorage.getItem('tz').match(regexFindName) ) {
	// 				let addTZ__name__option = newElement('option');
	// 					addTZ__name__option.setAttribute('value', tz);
	// 					addTZ__name__option.text = "(GMT " +date.offsets.str+ ") " +tz.replace(/_/g, ' ');
	// 					
	// 					addTZ__name__select.appendChild(addTZ__name__option);
	// 			}
	// 			let addTZ__submit = newElement('button');
	// 				addTZ__submit.innerHTML = '+';
	// 				addTZ__submit.type = 'submit';
	// 				addTZ__submit.title = 'Add';
	// 				
	// 			document.getElementById('add_timezone_inner').innerHTML = addTZ__submit.outerHTML + addTZ__name__select.outerHTML;
	// 			
	// 			document.getElementById('add_timezone').onsubmit = function(e) {
	// 				let new_tz = document.getElementById('timezone_list').value;
	// 				if (new_tz !== '--') {
	// 					let current_tzs = localStorage.getItem('tz').split('|');
	// 					current_tzs.push(new_tz);
	// 					localStorage.setItem('tz', current_tzs.join('|'));
	// 					run(e);
	// 					generateForm();
	// 				}
	// 				e.preventDefault();
	// 			};
	// 		});
	// 		
	// 	};
	// 	
	// 	let deleteBtns = document.getElementsByClassName('delete');
	// 	Object.keys(deleteBtns).forEach(i => {
	// 		let id = deleteBtns[i].getAttribute('id');
	// 		document.getElementById(id).addEventListener('hover', function(){
	// 			console.log(document.getElementById(id));
	// 			console.log(this);
	// 		});
	// 	});
	// 	
	// 	if (eventTypeIs(e, 'load')) {
	// 		generateForm();
	// 	}
	// };
	// 
	// window.onload = run;
	// setInterval(run, 5000);
		
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