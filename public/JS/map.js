mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: 'mapbox://styles/mapbox/standard-satellite', // default to standard-satellite style on mount
  center: listing.geometry.coordinates, //UPDATE COORDINTES starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 12, // starting zoom
});

//note: we cannot access coordiantes directly from lising.geometry.coordinates---results  error
//similar to mapToken, we store cooridinate details @show.ejs on top in script and accesss the same in bottom script tag

console.log(listing.geometry.coordinates); //CHECK

const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h4>${listing.title}, ${listing.location}</h4><p>Hello there, location details will be provided after booking</p>`))
  .addTo(map);
