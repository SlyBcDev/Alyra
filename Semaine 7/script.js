const messariApi = "https://data.messari.io/api/v1";
const symbol = "markets";

let data;

const clic = () => {
  fetch(messariApi + "/" + symbol)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      data = data;
    });
};

console.log(data);
