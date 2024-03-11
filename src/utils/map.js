export function calculateDistance(location1, location2) {
    const lat1 = location1.lat()
    const lon1 = location1.lng();
    const lat2 = location2.lat();
    const lon2 = location2.lng();
    const R = 3959e3; // Earth's radius in miles
  
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = φ2 - φ1;
    const λ1 = toRadians(lon1);
    const λ2 = toRadians(lon2);
    const Δλ = λ2 - λ1;
  
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(toRadians(φ1)) * Math.cos(toRadians(φ2)) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
  
    return distance;
  }
  
function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }