// import { getDistance } from '../functions/_misc';

// const getPosition = () => {
// 		// Simple wrapper
// 		return new Promise((res, rej) => {
// 				navigator.geolocation.getCurrentPosition(res, rej);
// 		});
// }

// export default class GPS {
		
			// console.log('Your current position is:');
			// console.log(`Latitude : ${crd.latitude}`);
			// console.log(`Longitude: ${crd.longitude}`);
			// console.log(`More or less ${crd.accuracy} meters.`);
	// getPosition().then(console.log); wait for getPosition to complete
	
// 	getPosition() {
// 		// Simple wrapper
// 		return new Promise((res, rej) => {
// 			navigator.geolocation.getCurrentPosition(res, rej);
// 		});
// 	}
// 	
// 	get() {
// 		return this.getPosition().then((e) => {
// 			return e;
// 		});
// 		 // wait for getPosition to complete
// 	}
// }

export default class GPS {
	constructor() {
		this.crd = 'mup';
		this.options = {
			timeout: 5000,
			maximumAge: 0
		};
		navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
	}
	success (pos) {
		this.crd = pos.coords;
		
		// console.log(getDistance(crd.latitude, '', crd.longitude, ''));
	}
	
	get() {
		return this.crd;
	}
	
	error (err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}
}