import { niceName, sortObj, getLocations } from '../functions/_misc';

const locationList = getLocations();

export default class Timezones {
	constructor () {
		let list = [];
		
		locationList.forEach(v => {
			list.push(v[0]);
		});
		
		this.tzList = list;
	}
	
	newTZ (event) {
		this.dateObj = new Date();
		this.home = localStorage.getItem('home') || window.CONFIG.home;
		
		if (this.eventTypeIs(event, 'load')) {
			if (!localStorage.getItem('tz')) {
				localStorage.setItem('tz', this.home);
			}
			if (!localStorage.getItem('home')) {
				localStorage.setItem('home', this.home);
			}
		}
		
		this.userTZ = localStorage.getItem('tz').split('|');
	}
	
	eventTypeIs (e, type) {
		return e !== undefined && e.type === type;
	}
	convertTo12Hour (hour) {
		let period = 'AM';
		if (0 < hour && hour > 12) {
			hour = hour - 12;
			period = 'PM';
		}
		else if (hour === 0) {
			hour = 12;
			period = 'AM';
		}
		return {
			hour: hour,
			period: period,
		};
	}
	
	UTC () {
		return {
			date: this.dateObj,
			hours: this.dateObj.getUTCHours(),
			minutes: this.dateObj.getUTCMinutes(),
			unix: Math.floor(Date.now() / 1000) + (this.dateObj.getTimezoneOffset() * 60),
		};
	}
	
	localTime () {
		return {
			date: this.dateObj,
			hours: this.dateObj.getHours(),
			minutes: this.dateObj.getMinutes(),
			unix: Math.floor(Date.now() / 1000),
		};
	}
	
	table() {
		let trTZ = '';
		
		let list = {};
		
		this.userTZ.forEach(tz => {
			let t = this.definedTime(tz);
			let key = t.unix + t.niceName;
			list[key] = t;
		});
		
		list = sortObj(list);
			
		Object.keys(list).forEach(k => {
			let timezone = list[k];
			let currentTime = this.convertTo12Hour(timezone.h, timezone.m);
			let button_DELETE = `<button data-id="${timezone.name}" class="btn delete" title="Delete Timezone"></button>`;
			let enabled = this.home === timezone.name ? 'disabled="disabled"' : '';
			let button__HOME = `<button data-id="${timezone.name}" title="Make this home" ${enabled} class="home" id="add_as_home">Make Home</button>`;
			let th_Name = `<th class="name"><div>${button_DELETE + button__HOME + timezone.niceName}</div></th>`;
			let th_CurrentTime = `<th class="current_time"><div>${currentTime.hour}:${timezone.m} ${currentTime.period}</span></th>`;
			let th_Offset = `<th class="offset"><div>${timezone.offsets.str}</div></th>`;
			let td_Hours = '';
			
			timezone.increment.forEach(hour => {
				// remove -
				let m = timezone.offsets.m.toString().replace(/-/g, '').padStart(2, '0');
				td_Hours += `<td class="inc"><div><span class="hour">${this.convertTo12Hour(hour).hour}</span>:<span class="minutes">${m}</span></div></td>`;
			});
			
			let cells = [
				th_Name,
				th_Offset,
				th_CurrentTime,
				td_Hours,
			].join('');
			
			trTZ += `<tr class="${timezone.isHome ? 'current' : ''}">${cells}</tr>`;
		});
		
		//-- Create Add form
				
		document.getElementById('table_wrapper').innerHTML = `<table id="table" cellspacing="0">${trTZ}</table>`;
	}
	isValidTimeZone(tz) {
			if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
					throw new Error('Time zones are not available in this environment');
			}
	
			try {
					Intl.DateTimeFormat(undefined, {timeZone: tz});
					return true;
			}
			catch (ex) {
					return false;
			}
	}
	
	definedTime (tz, key) {
		if ( !this.isValidTimeZone(tz) ) {
			console.log(`Invalid timezone: ${tz}`);
			return {};
		}
		let date = new Date(this.dateObj.toLocaleString("en-US", {timeZone: tz}));
		let UTC = this.UTC();
		
		let unix = date.getTime() / 1000;
		let offset = '';
		let sign = '±';
		let h = date.getHours();
		let m = date.getMinutes();
		let h2 = h;
		let k = 0;
		let inc_hours = [];
		let offsets = {
			h: Math.floor((unix - UTC.unix) / (60 * 60)),
			m: Math.round(((unix - UTC.unix) / 60) % 60),
		};
		let direction = unix - UTC.unix;
		
		this.date = date;
		
		if (offsets.m === 60) {
			offsets.m = 0;
			if (direction < 0) {
				offsets.h--;
			}
			else if(direction > 0) {
				offsets.h++;
			}
		}
		if (direction < 0) {
			sign = '-';
		}
		else if (direction > 0) {
			sign = '+';
		}
		
		Object.keys(offsets).forEach(key => {
			let value = niceName(offsets[key].toString().replace(/\-/, ''));
			offset += value.padStart(2, '0');
		});
		
		offsets.str = sign + offset;
		
		for (let j=0;j < 24;j++) {
			if ( (h2 + k) > 23 ) {
				h2 = 0;
				k = 0;
			}
			inc_hours.push(h2 + k);
			k++;
		}
		
		let r = {
			name: tz,
			niceName: niceName(tz),
			h: h,
			m: m.toString().padStart(2, '0'),
			obj: date,
			unix: unix,
			offsets: offsets,
			increment: inc_hours,
			isHome: tz === this.home,
		};
		
		if (key !== undefined) {
			return r[key];
		}
		
		return r;
	}
	
	getList () {
		let list = {};
		this.tzList.forEach(timezone => {
			if (this.userTZ.indexOf(timezone) <= -1) {
				let unix = this.definedTime(timezone, 'unix');
				let key = [unix, timezone].join('__');
				list[key] = timezone;
			}
		});
		this.sortedList = sortObj(list);
	}
	form__ADD () {
		let options = [];
		
		this.getList();
		
		options.push(`<option value="--" selected="selected">Add City</option>`);
		
		Object.keys(this.sortedList).forEach(v => {
			let timezone = this.sortedList[v];
			if (this.userTZ.indexOf(timezone) <= -1) {
				let offset_str = this.definedTime(timezone, 'offsets').str;
				options.push(`<option value="${timezone}">(GMT ${offset_str}) ${niceName(timezone)}</option>`);
			}
		});
		
		let button__ADD = `<button type="submit" disabled="disabled" class="add" id="add_timezone_btn">Add</button>`;
		
		let select = `<select id="timezone_list" name="timezone_list">${options.join('')}</select>`;
		
		document.getElementById('add_timezone_inner').innerHTML = button__ADD + select;
	}
	
	add () {
		let new_tz = document.getElementById('timezone_list').value;
		if (new_tz !== '--') {
			let current_tzs = localStorage.getItem('tz').split('|');
			current_tzs.push(new_tz);
			localStorage.setItem('tz', current_tzs.join('|'));
			this.newTZ();
			this.form__ADD();
			this.table();
		}
	}
	changeHome(tz) {
		localStorage.setItem('home', tz);
		this.newTZ();
		this.table();
	}
	remove(tz) {
		let list = this.userTZ;
		list.splice(list.indexOf(tz), 1);
		localStorage.setItem('tz', list.join('|'));
		this.newTZ();
		this.form__ADD();
		this.table();
	}
}