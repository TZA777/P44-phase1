mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  // style: "mapbox://styles/mapbox/standard-satellite",
  center: listing.geometry.coordinates,
  zoom: 12,
});

console.log(listing.geometry.coordinates);

const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title}, ${listing.location}</h4><p>Hello there, location details will be provided after booking</p>`
    )
  )
  .addTo(map);


console.log("check");