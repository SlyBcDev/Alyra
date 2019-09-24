//===============================================================
// Fonction convertion décimale vers Hexadécimale.
//===============================================================

const deciToHexa = a => {
  let hexa = a.toString(16);
  if (hexa.length % 2 == 1) {
    hexa = "0" + hexa;
  }
  return hexa;
};

//===============================================================
// Fonction convertion Hexadécimale vers décimale.
//===============================================================

const hexaToDeci = a => {
  let decimale = parseInt(a, 16);
  if (isNaN(decimale)) {
    return 0;
  }
  return decimale;
};

//===============================================================
// Fonction convertion décimale vers Binaire.
//===============================================================

const deciToBinaire = a => {
  binaire = a.toString(2);
  if (binaire.length % 2 == 1) {
    binaire = "0" + binaire;
  }
  return binaire;
};

//===============================================================
// Fonction convertion Binaire vers décimale.
//===============================================================

const binaireToDecimale = binaire => {
  let decimale = parseInt(binaire, 2);
  if (isNaN(decimale)) {
    return 0;
  }
  return decimale;
};

//===============================================================
// Fonction convertion Binaire vers Hexadécimale.
//===============================================================

const binaireToHexa = a => {
  let decimale = parseInt(a, 2);
  if (isNaN(decimale)) {
    return 0;
  }
  hexa = decimale.toString(16);
  if (hexa.length % 2 == 1) {
    hexa = "0" + hexa;
  }
  return hexa;
};

//===============================================================
// Fonction convertion Hexadécimale vers Binaire.
//===============================================================

const hexaToBinaire = a => {
  let decimale = parseInt(a, 16);
  if (isNaN(decimale)) {
    return 0;
  }
  binaire = decimale.toString(2);
  if (binaire.length % 2 == 1) {
    binaire = "0" + binaire;
  }
  return binaire;
};

//===============================================================
// Fonction convertion Hexadécimale vers LittleEndian.
//===============================================================

const hexaToLittleEndian = a => {
  if (a.length % 2 == 1) {
    a = "0" + a;
  }
  let littleEndian = "";
  for (let i = 0; i < a.length - 1; i += 2) {
    littleEndian = a[i] + a[i + 1] + littleEndian;
  }
  return "0x" + littleEndian;
};

//===============================================================
// Fonction convertion LittleEndian vers Hexadécimale.
//===============================================================

const littleEndianToHexa = littleEndian => {
  let hexa = "";
  if (littleEndian[0] + littleEndian[1] == "0x") {
    littleEndian = littleEndian.slice(2);
  }
  for (i = littleEndian.length - 2; i >= 0; i -= 2) {
    hexa = hexa + littleEndian[i] + littleEndian[i + 1];
  }
  return hexa;
};

//===============================================================
// Fonction convertion VarInt vers décimale.
//===============================================================

const varIntToDecimale = varInt => {
  hexa = 0;
  temp = [];
  for (i = 0; i < varInt.length; i += 2) {
    temp.push(varInt[i] + varInt[i + 1]);
  }
  if (temp[1] == "fd") {
    hexa = temp[2] + temp[3];
  } else if (temp[1] == "fe") {
    hexa = temp[2] + temp[3] + temp[4] + temp[5];
  } else if (temp[1] == "ff") {
    hexa =
      temp[2] +
      temp[3] +
      temp[4] +
      temp[5] +
      temp[6] +
      temp[7] +
      temp[8] +
      temp[9];
  } else hexa = temp[1];

  let temp2 = [];
  for (i = 0; i < hexa.length; i += 2) {
    temp2.push(hexa.substr(i, 2));
  }

  let temp3 = [];
  for (i = temp2.length - 1; i >= 0; i--) {
    temp3.push(temp2[i]);
  }

  hexa = temp3.join("");

  let decimale = parseInt(hexa, 16);
  if (isNaN(decimale)) {
    return 0;
  }
  return decimale;
};

//===============================================================
// Calculer la difficulté à partir d'une cible.
//===============================================================

const calculerDifficulte = cible => {
  let cibleMax = (Math.pow(2, 16) - 1) * Math.pow(2, 208);
  let difficulty = cibleMax / cible;
  return difficulty;
};

//===============================================================
// Calculer la récompense à partir d'un timestamp.
//===============================================================

const calculRecompense = a => {
  let datePremierBtc = new Date("January 01, 2010 00:00:00 GMT+00:00");
  datePremierBtc = datePremierBtc.getTime();

  let tempsExistanceBtc = a - datePremierBtc;

  // Un bloc toutes les 10 minutes soit 10 x60000 =600 000
  hauteurBlocADate = Math.floor(tempsExistanceBtc / 600000);

  let recompense = 50;
  nbHalving = Math.floor(hauteurBlocADate / 210000);
  for (i = 0; i <= nbHalving; i++) {
    recompense = recompense / 2;
  }
  return recompense;
};

//===============================================================
// Décrypter le bloc.
//===============================================================

// 1 block Btc

let blockBtc =
  "00000020a15e218f5f158a31053ea101b917a6113c807f6bcdc85a000000000000000000cc7cf9eab23c2eae050377375666cd7862c1dfeb81abd3198c3a3f8e045d91484a39225af6d00018659e5e8a0101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff64030096072cfabe6d6d08d1c2f6d904f4e1cd10c6558f8e5aed5d6a89c43bb22862464ebb819dd8813404000000f09f909f104d696e6564206279206a6f73656d7372000000000000000000000000000000000000000000000000000000000000000000007f06000001807c814a000000001976a914c825a1ecf2a6830c4401620c3a16f1995057c2ab88acefebcf38";
let entete = "";
let version = "";
let previousBloc = "";
let merkleHash = "";
let timeStamp = "";
let bits = "";
let difficulty = "";
let nonce = "";
let recompense = 0;

const decrypterBloc = a => {
  // Entête:
  for (i = 0; i < 160; i++) {
    entete = entete + blockBtc[i];
  }
  document.getElementById("entete").textContent = ` Entête du bloc: ${entete}`;

  // Version:
  for (i = 0; i < 8; i++) {
    version = version + entete[i];
  }
  version = hexaToLittleEndian(version);
  document.getElementById(
    "version"
  ).textContent = ` Version du bloc: ${version}`;

  // Previous Bloc:
  for (i = 8; i < 72; i++) {
    previousBloc = previousBloc + entete[i];
  }
  previousBloc = littleEndianToHexa(previousBloc);
  document.getElementById(
    "previousBloc"
  ).textContent = `Bloc précédent: ${previousBloc}`;

  // Merkle tree:
  for (i = 72; i < 136; i++) {
    merkleHash = merkleHash + entete[i];
  }
  merkleHash = littleEndianToHexa(merkleHash);
  document.getElementById(
    "merkle"
  ).textContent = `Hash arbre de Merkle: ${merkleHash}`;

  // Date:
  for (i = 136; i < 144; i++) {
    timeStamp = timeStamp + entete[i];
  }
  timeStamp = littleEndianToHexa(timeStamp);
  timeStamp = hexaToDeci(timeStamp);
  timeStamp = new Date(timeStamp * 1000);
  document.getElementById("date").textContent = `Date du bloc: ${timeStamp}`;

  // Bits:
  for (i = 144; i < 152; i++) {
    bits = bits + entete[i];
  }
  bits = hexaToLittleEndian(bits);
  document.getElementById("bits").textContent = `Bits: ${bits}`;

  // Difficulté:
  cible = hexaToDeci(bits);
  difficulty = calculerDifficulte(cible);
  document.getElementById(
    "difficulte"
  ).textContent = `Difficulté: ${difficulty}`;

  // Nonce:
  for (i = 152; i < 160; i++) {
    nonce = nonce + entete[i];
  }
  nonce = littleEndianToHexa(nonce);
  nonce = hexaToDeci(nonce);
  document.getElementById("nonce").textContent = `Nonce: ${nonce}`;

  // Récompense:
  recompense = calculRecompense(timeStamp);
  document.getElementById(
    "reward"
  ).textContent = `Récompense: ${recompense} BTC`;
};
