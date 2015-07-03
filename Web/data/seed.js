db.dropDatabase();

var locations = [
  { name: "Campos do Jordão", state: "São Paulo", country: "Brasil", description: "" },
  { name: "Santiago", state: "", country: "Chile", description: "" }
];

db.locations.save(locations);