/* eslint-disable no-param-reassign */
// import haversine from 'haversine';
// import format from 'date-fns/format';
// import conf from '../conf';

export function formatNumber(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: value > 1000 || Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: value > 1000 || Number.isInteger(value) ? 0 : 2
  }).format(value);
}

// https://gist.github.com/tobyjsullivan/96d37ca0216adee20fa95fe1c3eb56ac
export function abbreviateNumber(value, unit) {
  const sign = Math.sign(value);
  let newValue = Math.abs(value);
  let suffixes = ['', 'K', 'M', 'B', 'T'];
  if (unit === 'kW') {
    suffixes = ['kW', 'MW', 'GW', 'TW', 'PW'];
  }
  let suffixNum = 0;
  while (newValue >= 1000) {
    newValue /= 1000;
    suffixNum += 1;
  }
  const newValueWithSign = sign * newValue;
  const newValueWithSignPercision = formatNumber(newValueWithSign);
  const suffix = suffixes[suffixNum];
  const result = `${newValueWithSignPercision}${suffix}`;
  return result;
}

// export function getDistanceFromLatLonInKm(coordinates1, coordinates2) {
//   const start = {
//     latitude: coordinates1[1],
//     longitude: coordinates1[0]
//   };

//   const end = {
//     latitude: coordinates2[1],
//     longitude: coordinates2[0]
//   };

//   return haversine(start, end);
// }

// export function toAppId(osmId) {
//   return osmId < 0 ? `R${osmId}` : `W${Math.abs(osmId)}`;
// }

// export function toOSMId(appId) {
//   if (!appId) return null;
//   return parseInt(appId.replace('W', '').replace('R', '-'), 10);
// }

// export function metersToMiles(meters, fractionDigits = 2) {
//   return (meters * 0.000621371192).toFixed(fractionDigits);
// }

// export async function downloadFile(url, name, delay = 0) {
//   const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
//   await sleep(delay);
//   const a = document.createElement('a');
//   a.download = name;
//   a.href = url.startsWith('http') ? url : `${conf.E2E_API_URL}${url}`;
//   a.target = '_blank';
//   a.style.display = 'none';
//   document.body.append(a);
//   a.click();
//   // Chrome requires the timeout
//   await sleep(100);
//   a.remove();
// }

// export function abbreviate(val) {
//   const match = val.match(/[0-9A-Z]/g);
//   if (!match) {
//     return val.substring(0, 2);
//   }
//   const short = match.join('').substring(0, 2);

//   if (short.length > 1) {
//     return short;
//   }

//   return val.substring(0, 2);
// }

// export function groupBy(xs, key) {
//   return xs.reduce((rv, x) => {
//     (rv[x[key]] = rv[x[key]] || []).push(x);
//     return rv;
//   }, {});
// }

// export function hexToRgb(hex) {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result
//     ? [
//         parseInt(result[1], 16),
//         parseInt(result[2], 16),
//         parseInt(result[3], 16)
//       ]
//     : null;
// }

// export function elevateGeometry(geometry, elevation) {
//   const { type } = geometry;
//   let coordinates = [...geometry.coordinates];

//   if (type === 'Point') {
//     coordinates[2] = elevation;
//   }

//   if (type === 'Polygon') {
//     coordinates = coordinates.map(coordinateGroup => {
//       return coordinateGroup.map(coord => {
//         return [coord[0], coord[1], elevation];
//       });
//     });
//   }

//   if (type === 'LineString') {
//     coordinates = coordinates.map(coord => {
//       return [coord[0], coord[1], elevation];
//     });
//   }

//   return {
//     type,
//     coordinates
//   };
// }

// export function getElevationFromGeometry(geometry) {
//   if (geometry?.type === 'Point' && geometry.coordinates[2])
//     return geometry.coordinates[2];
//   if (geometry?.type === 'Polygon' && geometry.coordinates[0]?.[0]?.[2]) {
//     return geometry.coordinates[0][0][2];
//   }

//   if (geometry?.type === 'LineString' && geometry.coordinates[0]?.[2]) {
//     return geometry.coordinates[0][2];
//   }
//   return 0;
// }

// export function humanDate(timeLike) {
//   const unixTime =
//     typeof timeLike === 'string' ? parseInt(timeLike, 10) : timeLike;
//   const date = new Date(unixTime * 1000);
//   return format(date, `MMM d, yyyy HH:mm`);
// }

// export function humanFileSize(byteSize, si = true) {
//   let bytes = byteSize;
//   const thresh = si ? 1000 : 1024;
//   if (Math.abs(bytes) < thresh) {
//     return `${bytes} B`;
//   }
//   const units = si
//     ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
//     : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
//   let u = -1;
//   do {
//     bytes /= thresh;
//     u += 1;
//   } while (Math.abs(bytes) >= thresh && u < units.length - 1);
//   return `${bytes.toFixed(1)} ${units[u]}`;
// }

// export function timeSince(date) {
//   const seconds = Math.floor((new Date() - date) / 1000);

//   let interval = seconds / 31536000;

//   if (interval > 1) {
//     return `${Math.floor(interval)} years`;
//   }
//   interval = seconds / 2592000;
//   if (interval > 1) {
//     return `${Math.floor(interval)} months`;
//   }
//   interval = seconds / 86400;
//   if (interval > 1) {
//     return `${Math.floor(interval)} days`;
//   }
//   interval = seconds / 3600;
//   if (interval > 1) {
//     return `${Math.floor(interval)} hours`;
//   }
//   interval = seconds / 60;
//   if (interval > 1) {
//     return `${Math.floor(interval)} minutes`;
//   }
//   return `${Math.floor(seconds)} seconds`;
// }

// export function uniqBy(arr, predicate) {
//   const cb = typeof predicate === 'function' ? predicate : o => o[predicate];

//   return [
//     ...arr
//       .reduce((map, item) => {
//         const key = item === null || item === undefined ? item : cb(item);

//         // eslint-disable-next-line no-unused-expressions
//         map.has(key) || map.set(key, item);

//         return map;
//       }, new Map())
//       .values()
//   ];
// }
