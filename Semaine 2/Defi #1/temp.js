//===============================================================
// Fonction convertion décimale vers Hexadécimale.
//===============================================================

const deciToHexa = decimale => {
  result1 = document.getElementById("result1");
  decimale = parseFloat(document.getElementById("value1").value);
  hexa = decimale.toString(16);
  if (hexa.length % 2 == 1) {
    hexa = "0" + hexa;
  }
  result1.textContent = `La valeur "${decimale}" donne "${hexa}" en valeur hexadécimale.`;
};

/* du html
<div class="row text-center ml-3 p-3">
      <div class="ml-3 p-1 bg-info col-5">
        <h4>Conversion d'un décimal en <i class="text-warning">Binaire</i>:</h4>
        <input
          class="form-control"
          type="number"
          onchange="deciToBinaire()"
          id="value3"
          value=""
          placeholder="Saisissez un nombre décimal"
        />
        <h6 class="m-3" id="result3"></h6>
      </div>

*/
