export default function getDate (dateObj, name, TimeUTC) {
	let sign = '±';
	let date = new Date(dateObj.toLocaleString("en-US", {timeZone: name}));
	let unix = date.getTime() / 1000;
	let offset = '';
	let offsets = {
		hours: Math.floor((unix - TimeUTC.unix) / (60 * 60)),
		minutes: ((unix - TimeUTC.unix) / 60) % 60,
	};
	let h = date.getHours();
	let m = date.getMinutes();
	
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
	
	offsets.str = sign + offset;
	
	return {
		h: h,
		m: m,
		obj: date,
		unix: unix,
		offsets: offsets,
	};
}