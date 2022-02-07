(function(){
	const list = window.EARTH.list,
		current = window.EARTH.current;
	const convertTo12Hour = hour => {
		if (hour > 12) {
			hour = hour - 12;
		}
		else if (hour === 0) {
			hour = 12;
		}
		return hour;
	};
	
	const cookie = {
		get : function(k) {
			let cookies = {};
			
			document.cookie.split('; ').forEach((v) => {
				let list = v.split('=');
				cookies[ list[0] ] = list[1];
			});
				
			return cookies[k] || '';
		},
		set : function(k, v) {
			document.cookie = [k, v].join('=') + ';';
		},
	};
	const newTH = () => {
		return newElement('th');
	};
	const newTD = () => {
		return newElement('td');
	};
	const newElement = el => {
		return document.createElement(el);
	};
	const sortObj = unordered => Object.keys(unordered).sort().reduce(
		(obj, key) => { 
			obj[key] = unordered[key]; 
			return obj;
		}, 
		{}
	);
	const periods = ['AM', 'PM'];
	
	const run = e => {
		// if onload
		if (e !== undefined) {
			cookie.set('tz', 'America/Los_Angeles|America/Chicago|America/Denver');
			cookie.set('home', 'America/Los_Angeles');
		}
		let timezones = {};
		let dateObj = new Date();
		let TimeUTC = {
			hours: dateObj.getUTCHours(),
			minutes: dateObj.getUTCMinutes(),
			unix: Math.floor(Date.now() / 1000) + (dateObj.getTimezoneOffset() * 60),
		};
		
		cookie.get('tz').split('|').forEach(name => {
			let date = new Date(dateObj.toLocaleString("en-US", {timeZone: name}));
			let inc_hours = [];
			let h = date.getHours();
			let h2 = h;
			let m = date.getMinutes();
			let unix = date.getTime() / 1000;
			let offset = '';
			let sign = '±';
			let k = 0;
			let offsets = {
				hours: Math.floor((unix - TimeUTC.unix) / (60 * 60)),
				minutes: ((unix - TimeUTC.unix) / 60) % 60,
			};
			
			Object.keys(offsets).forEach(key => {
				let value = offsets[key].toString().replace(/\-/, '');
				offset += value.padStart(2, '0');
			});
			
			if (offsets.hours > 0) {
				sign = '+';
			}
			else if (offsets.hours < 0) {
				sign = '-';
			}
			
			for (let j=0;j < 24;j++) {
				if ( (h2 + k) > 23 ) {
					h2 = 0;
					k = 0;
				}
				inc_hours.push(h2 + k);
				k++;
			}
			
			offsets.str = sign + offset;
			
			timezones[unix + name] = {
				name: name.replace(/_/g, ' '),
				offset: offsets,
				hour: h,
				minute: m,
				increment: inc_hours,
				period: periods[h < 12 ? 0 : 1],
			};
		});
		
		timezones = sortObj(timezones);
		
		const table = newElement('table');
		table.setAttribute('id', 'table');
		
		Object.keys(timezones).forEach(unix => {
			
			let row = timezones[unix];
			
			let th__name = newTH();
				th__name.textContent = row.name;
				th__name.classList += ' name';
			let th__offset = newTH();
				th__offset.innerHTML = row.offset.str;
				th__offset.classList += ' offset';
			let minute = row.minute.toString().padStart(2, '0');
			let td__currentTime = newTD();
				td__currentTime.textContent = [convertTo12Hour(row.hour), minute].join(':') + ' ' + row.period;
			
			let tr = newElement('tr');
				tr.appendChild(th__name);
				tr.appendChild(th__offset);
				tr.appendChild(td__currentTime);
				
			if (current === row.name) {
				tr.classList += ' current';
			}
			
			row.increment.forEach(cell => {
				let min = row.offset.minutes.toString().padStart(2, '0');
				let td = newTD();
					td.innerHTML = convertTo12Hour(cell) + `<span class="offset_minutes">:${min.replace(/[^0-9]/, '')}</span>`;
					tr.appendChild(td);
			});
			table.appendChild(tr);
		});
		
		// let th__addTZ__name__input = newElement('input');
		// 	th__addTZ__name__input.setAttribute('name', 'timezone');
		// 	th__addTZ__name__input.setAttribute('value', '');
		
		let th__addTZ__name__select = newElement('select');
			th__addTZ__name__select.setAttribute('name', 'timezone_list');
			th__addTZ__name__select.setAttribute('id', 'timezone_list');
		
		let th__addTZ__name__option_blank = newElement('option');
			th__addTZ__name__option_blank.setAttribute('value', '--');
			th__addTZ__name__option_blank.textContent = '-- Add New City --';
			th__addTZ__name__option_blank.setAttribute('selected', 'selected');
			th__addTZ__name__select.appendChild(th__addTZ__name__option_blank);
			
		list.forEach(tz => {
			let regexFindName = new RegExp('(?:^|\\|)' + tz.replace('/', '\\/') + '(?:\\||$)');
			
			if ( !cookie.get('tz').match(regexFindName) ) {
				let th__addTZ__name__option = newElement('option');
					th__addTZ__name__option.setAttribute('value', tz);
					th__addTZ__name__option.text = tz.replace(/_/g, ' ');
					
					th__addTZ__name__select.appendChild(th__addTZ__name__option);
			}
		});
		
		let th__addTZ__name = newTH();
			th__addTZ__name.appendChild(th__addTZ__name__select);
		
		let th__addTZ__submit_btn = newElement('button');
			th__addTZ__submit_btn.innerHTML = '+';
			th__addTZ__submit_btn.type = 'submit';
			th__addTZ__submit_btn.title = 'Add';
		
		let th__addTZ__submit = newTH();
			th__addTZ__submit.appendChild(th__addTZ__submit_btn);
			
		let tr__addTZ = newElement('tr');
			tr__addTZ.appendChild(th__addTZ__name);
			tr__addTZ.appendChild(th__addTZ__submit);
		
		table.appendChild(tr__addTZ);
		
		document.getElementById('container').onsubmit = function(e) {
			let new_tz = document.getElementById('timezone_list').value;
			if (new_tz !== '--') {
				let current_tzs = cookie.get('tz').split('|');
				current_tzs.push(new_tz);
				cookie.set('tz', current_tzs.join('|'));
				console.log(cookie.get('tz'));
			}
			e.preventDefault();
		};
		console.log(cookie.get('tz'));
		
		document.getElementById('container').innerHTML = table.outerHTML;
	};
	
	window.onload = run;
	// setInterval(run, 5000);
	
})();