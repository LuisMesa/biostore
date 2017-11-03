export const getCorrectUnit = (unit, amount) => {
  if (unit.endsWith('a') || unit.endsWith('e') || unit.endsWith('i') || unit.endsWith('o') || unit.endsWith('u'))
    return amount !== 1 ? unit + 's' : unit;
  else if (unit.endsWith('s'))
    return unit;
  else
    return amount !== 1 ? unit + 'es' : unit;
};

export const getProductName = (id) => {
  return productsNames[id];
};

export const distance = (lat1,lng1,lat2,lng2)=>{
  const R = 6371e3; // meters, earth's radius
  const φ1 = Math.PI*lat1/180;
  const φ2 = Math.PI*lat2/180;
  const Δφ = Math.PI*(lat2-lat1)/180;
  const Δλ = Math.PI*(lng2-lng1)/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c;
  return d;
}
export const productsNames = ['Pera','Tomate','Manzana','Ciruela','Durazno', 'Frambuesa', 'Arveja', 'Huevo', 'Queso','Papa'];
export const units = ['Libra','Unidad','Litro'];