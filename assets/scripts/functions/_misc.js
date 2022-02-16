export const sortObj = unordered => Object.keys(unordered).sort().reduce(
	(obj, key) => { 
		obj[key] = unordered[key]; 
		return obj;
	}, 
	{}
);
	
// export const newElement = (el, content) => {
// 	return document.createElement(el);
// };
// export const newTH = (content) => {
// 	return newElement('th', content);
// };
// export const newTD = (content) => {
// 	return newElement('td', content);
// };

export const eventTypeIs = (e, type) => {
	return e !== undefined && e.type === type;
}
export const niceName = str => {
	return str.replace(/\_/g, ' ');
}
export const getLocations = () => {
	let locations = [];
	
	window.CONFIG.locations.forEach(line => {
		let arr = line.replace(/(\t+)/, "\t").split("\t");
		
		if (arr.length === 1) {
			arr.push('');
		}
		
		locations.push(arr);
	});

	return locations;
}
export const getDistance = (lat1, lat2, lon1, lon2) => {
	// 5°19′N 4°2′W
	
	// let c = coords.match(/([0-9]+)°([0-9]+)′(N|S) ([0-9]+)°([0-9]+)′(W|E)/);
	// 
	// console.log(c);
	
	const R = 6371e3; // metres
	const φ1 = lat1 * Math.PI/180; // φ, λ in radians
	const φ2 = lat2 * Math.PI/180;
	const Δφ = (lat2-lat1) * Math.PI/180;
	const Δλ = (lon2-lon1) * Math.PI/180;
	
	const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
						Math.cos(φ1) * Math.cos(φ2) *
						Math.sin(Δλ/2) * Math.sin(Δλ/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	
	const d = R * c; // in metres
	
	return d;
}