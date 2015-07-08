db.dropDatabase();

var locationCollection = [
  {
    _id: "camposjordao", name: "Campos do Jordão", state: "São Paulo", country: "Brasil", currency: "BRL",
    description: "Campos do Jordão é conhecida como a “Suíça brasileira”, por isso, não é exagero dizer que a \
    cidade tem um dos invernos mais charmosos de todo o Brasil. Localizada a quase 1.700 m de altitude e cercada\
    pelas montanhas da Serra da Mantiqueira, Campos encanta pela arquitetura europeia, gastronomia refinada e \
    pela diversidade de atrações culturais.\
    Durante os meses mais frios do ano, a cidade ganha novidades como pistas de esqui artificiais e até mesmo casas\
    noturnas abertas apenas nesse período. Para quem gosta de passeios mais calmos, os “alpes brasileiros” contam\
    com paisagens bucólicas e exuberantes, como o famoso Morro do Elefante.",
    itineraries: [
      {
        _id: "camposjordao1",
        name: "Três dias em Campos do Jordão",
        days: [
          {
            number: 1,
            morning: ["baden", "baden"], afternoon: ["amantikir", "baden"], night: [],
            lunch: null, dinner: null
          },
          {
            number: 2,
            morning: ["amantikir", "baden"], afternoon: ["amantikir", "baden"], night: [],
            lunch: null, dinner: null
          },
          {
            number: 3,
            morning: ["amantikir", "baden"], afternoon: ["amantikir", "baden"], night: [],
            lunch: null, dinner: null
          }
        ]
      }
    ]
  },
  {
    _id: "santiago", name: "Santiago", state: "", country: "Chile", currency: "CLP",
    description: "A cidade é um importante destino turístico a nível nacional, por ser a principal porta de entrada ao país \
      através do Aeroporto Internacional Comodoro Arturo Merino Benítez e do Paso Transandino Internacional Los \
      Libertadores. Ambos concentram 55,2% do total de pessoas que ingressam no Chile por ano, o equivalente a \
      1.119.840 de turistas em 2005. Segundo um estudo do Serviço Nacional de Turismo, 52,3% dos turistas (tanto \
      nacionais como internacionais) têm como destino a categoria 'Santiago e seus arredores', sendo que quase \
      toda esta parcela também visita as estações de esqui localizadas na Cordilheira dos Andes. Com vários \
      atrativos históricos e culturais, museus, palácios, mirantes, shows, vida noturna intensa, compras, entre \
      outros, se tornou, principalmente após o 'boom' econômico da década de 1990, uma grande opção turística. \
      Além disso, se encontra a menos de 100 km do litoral e de estâncias de esqui (entre elas, a mais moderna \
      da América do Sul). Provenientes de todas as partes do mundo, os turistas que conhecem a cidade são \
      principalmente europeus, estadunidenses, canadenses e brasileiros.",
    itineraries: [
      {
        _id: "santiago1",
        name: "Dois dias em Santiago",
        days: [
          {
            number: 1,
            morning: ["moneda", "plazaarmas", "plazaarmas"], afternoon: ["moneda", "moneda"],
            lunch: "ajiseco", dinner: "casonaajiseco"
          },
          {
            number: 2,
            morning: ["vina"], afternoon: ["vina"], lunch: "vina", dinner: "ajiseco"
          }
        ]
      }
    ]
  }
];

var placeCollection = [
  { _id: "amantikir", location_id: "camposjordao", name: "Amantikir", description: "", price: 10.00, loc: [-22.7833172, -45.6079034], duration: 90 },
  { _id: "baden", location_id: "camposjordao", name: "Cervejaria Baden Baden", description: "", price: 25.50, loc: [-22.748019, -45.6202769], duration: 120 },

  { _id: "moneda", location_id: "santiago", name: "Palácio de la Moneda", description: "" , price: 0.00, loc: [-33.4429091, -70.6538699], duration: 120 },
  { _id: "plazaarmas", location_id: "santiago", name: "Plaza de Armas", description: "" , price: 0.00, loc: [-33.4378594, -70.6504649], duration: 60 },
  { _id: "ajiseco", location_id: "santiago", name: "El Ají Seco", description: "" , price: 0.00, loc: [-33.4367128, -70.648602] },
  { _id: "casonaajiseco", location_id: "santiago", name: "La Casona del Ají Seco", description: "" , price: 0.00, loc: [-33.434163, -70.616931] },
  { _id: "patiobelavista", location_id: "santiago", name: "Pátio Bela Vista", description: "" , price: 0.00, loc: [-33.434163, -70.616931] },
  { _id: "vina", location_id: "santiago", name: "Viña del Mar e Valparaíso", description: "" , price: 0.00, loc: [-33.434163, -70.616931], duration: 240 }
];

db.locations.save(locationCollection);
db.places.save(placeCollection);

db.places.createIndex({ loc : "2dsphere" });