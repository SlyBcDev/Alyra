pragma solidity ^0.5.0;

import "./erc721Simple.sol";
import "./safemath.sol";


contract Cannasson is ERC721Simple{
    
    using SafeMath for uint256;
    using SafeMath16 for uint16;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
    event newCannasson(uint id,string nom,string famille,string categorie);
    event participantCourse(uint _participant1, uint _participant2);
    event resultatCourse(uint _tokenId, uint _concurentId, uint _winnerId);
    
    
    //------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------Gestion de la Création et tunning des cannassons---------------------------------------//
    //------------------------------------------------------------------------------------------------------------------------//
    
    mapping(uint=>address) ownerOfCannasson; // Qui est le proprio du token
    mapping(address=>uint) ownerCannassonCount; // Combien cette adresse a t elle de cannassons
    mapping(uint=>bool) exist;
    mapping(address=>bool) getFree; // A t il déjà eu son cannasson gratuit.
    mapping(address=>bool) isAdmin; // le créateur du contrat sera admin.
      
    mapping(uint=>string) nom;
    mapping(uint=>string) familly;
    mapping(uint=>string) category;
    mapping(uint=>bool) sexe; 
    mapping(uint=>uint) level;
    mapping(uint=>uint) nbreDeCourse;
    mapping(uint=>uint) nbreDeVictoire;
    mapping(uint=>uint) nbreEntrainement;
    mapping(uint=>uint) popularite;
    mapping(uint=>bool) private estDope; // Seul un controle anti dopage pourra voir si le cannasson est dopé;
    mapping(uint=>uint) private lastDopageDate; // Permet de stocker la date du dopage, un dopage sera controlable sous 24h.
    mapping(uint=>uint) nbreDopageAvere;
    mapping(uint=>uint) attenteAvantProchaineCourse;
    mapping(address=>uint) resteCourseGratuite;
    
    modifier isOwner(uint _idToken) {
        require(ownerOfCannasson[_idToken]==msg.sender,"Vous n'etes pas le propriétaire !");
        _;
    }
    
    modifier isAdminOfContract{
        require(isAdmin[msg.sender]==true);
        _;
    }
    
    // Connaitre le nombre de cannasson d'une adresse.
    function balanceOf(address _owner) public view returns (uint256 _balance){
        return ownerCannassonCount[_owner];
    }
    
    // Qui est le proprio de ce cannasson
    function ownerOf(uint256 _tokenId) public view returns (address _owner){
        return ownerOfCannasson[_tokenId];
    }
    
    // Ce cannasson existe t il?
    function exists(uint256 _tokenId) public view returns (bool _exists){
        return exist[_tokenId];
    }
    
    function nomDuCannasson(uint _tokenId) public view returns(string memory _name){
        return  nom[_tokenId];
    }
    
    function fammileDuCannasson(uint _tokenId) public view returns(string memory _familly){
        return  familly[_tokenId];
    }
    
    function categoryDuCannasson(uint _tokenId) public view returns(string memory _category){
        return  category[_tokenId];
    }
    
    function sexeDuCannasson(uint _tokenId) public view returns(string memory _sexe){
        if(sexe[_tokenId]){
            _sexe ="Male";
        } else{
            _sexe= "Femelle";
        }
        return  _sexe;
    }
    
    function nbreCourseDuCannasson(uint _tokenId) public view returns(uint){
        return  nbreDeCourse[_tokenId];
    }
    
    function nbreVictoireDuCannasson(uint _tokenId) public view returns(uint){
        return  nbreDeVictoire[_tokenId];
    }
    
    function levelDuCannasson(uint _tokenId) public view returns(uint){
        return  level[_tokenId];
    }
    
    function nbreEntrainementDuCannasson(uint _tokenId) public view returns(uint){
        return  nbreEntrainement[_tokenId];
    }
    
    function populariteDuCannasson(uint _tokenId) public view returns(uint){
        return  popularite[_tokenId];
    }
    
    function nbreDopageDuCannasson(uint _tokenId) public view returns(uint){
        return  nbreDopageAvere[_tokenId];
    }
    
    function tempsAttenteDuCannasson(uint _tokenId) public view returns(uint){
        return  attenteAvantProchaineCourse[_tokenId];
    }
    
    uint nbreCannassons;
    
    function combienDeCannasson() public view returns(uint){
        return  nbreCannassons;
    }
    
    // Le constructeur permettra de créer 3 Chevaux aléatoires pour que le premier utilisateur puisse faire des courses . Il nommera msg.sender comme admin qui pourra changer ultèrieument les noms, familles et catégories existantes.
    constructor() public ERC721Simple() {

        isAdmin[msg.sender]= true;
        _creationCanassonConstructor();
    }
    
    // Fonction de création de 3 cannassons pour le constructor.
    function _creationCanassonConstructor() private {
      nbreCannassons = nbreCannassons.add(1);
      exist[1]= true;
      bool _sexe;
      if((block.number-1)%2==1){
          _sexe=true;
      }
      nom[1] = noms[uint(blockhash(block.number-1))%10];
      familly[1] = familles[uint(blockhash(block.number-2))%10];
      category[1] = categories[uint(blockhash(block.number-3))%10];
      sexe[1] = _sexe;
      level[1] = 1;
      ownerOfCannasson[nbreCannassons] = address(this);
      ownerCannassonCount[address(this)] = ownerCannassonCount[address(this)].add(1);
      emit newCannasson(nbreCannassons,noms[uint(blockhash(block.number-1))%10],familles[uint(blockhash(block.number-2))%10],categories[uint(blockhash(block.number-3))%10]);
      
      nbreCannassons = nbreCannassons.add(1);
      exist[2]= true;
      if((block.number-2)%2==1){
          _sexe=true;
      }
      nom[2] = noms[uint(blockhash(block.number-5))%10];
      familly[2] = familles[uint(blockhash(block.number-6))%10];
      category[2] = categories[uint(blockhash(block.number-7))%10];
      sexe[2] = _sexe;
      level[2] = 1; ownerOfCannasson[nbreCannassons] = address(this);
      ownerCannassonCount[address(this)] = ownerCannassonCount[address(this)].add(1);
      emit newCannasson(nbreCannassons,noms[uint(blockhash(block.number-5))%10],familles[uint(blockhash(block.number-6))%10],categories[uint(blockhash(block.number-7))%10]);
      
      nbreCannassons = nbreCannassons.add(1);
      exist[3]= true;
      if((block.number-3)%2==1){
          _sexe=true;
      }
      nom[3] = noms[uint(blockhash(block.number-9))%10];
      familly[3] = familles[uint(blockhash(block.number-10))%10];
      category[3] = categories[uint(blockhash(block.number-11))%10];
      sexe[3] = _sexe;
      level[3] = 1;
      ownerOfCannasson[nbreCannassons] = address(this);
      ownerCannassonCount[address(this)] = ownerCannassonCount[address(this)].add(1);
      emit newCannasson(nbreCannassons,noms[uint(blockhash(block.number-9))%10],familles[uint(blockhash(block.number-10))%10],categories[uint(blockhash(block.number-11))%10]);
    }
    
    // Création de noms, familles et catégories. Le cannasson sera representé par une valeur de chaque tableau.
    string [10] noms = ["Apocalyptic","Furioso","Blizzard","Booster","Casimir","DirtyDildo", "Lucifer", "Bontempi","Looser","ElChialo"];
    string [10] familles = ["Batard", "HautDescendant", "PureSang", "SemiAne","OnSaitPasTrot","Poneys","Barbie", "Shetland", "ChevalAillés","Licorne"];
    string [10] categories = ["BullDozer", "Diesel", "Ferrari", "Immortel", "Alcolo", "Léger", "Nain", "Géant","3Pates","Véteran"];
    
    // L'admin pourra changer les noms de base afin d'avoir plus de variété.
    function modifierNomDeBase(uint _nameId, string memory _newName) public isAdminOfContract{
        noms[_nameId]= _newName;
    }
    
    // L'admin pourra changer les familles pour créer des familles saisonnières par exemple, ajoutant de la rareté aux cannassons.
    function modifierFamilleDeBase(uint _familleId, string memory _newFamille) public isAdminOfContract{
        noms[_familleId]= _newFamille;
    }
    
    // Idem pour les categories
    function modifierCategorieDeBase(uint _categorieId, string memory _newCategorie) public isAdminOfContract{
        noms[_categorieId]= _newCategorie;
    }
    
    // L'utilisateur a droit à un cannasson gratuit
    function monPremierCannasson() public {
        require(getFree[msg.sender]==false, "Vous avez déjà eu votre cannasson gratuit, il va falloir payer maintenant !!!");
        _creationCanasson(msg.sender);
        getFree[msg.sender]=true;
        resteCourseGratuite[msg.sender] = 5; // on offre 5 courses gratuites au créateur de cannasson . 
    }
    
    // Si l'utilisateur veut un cannasson supplémentaire, il faudra passer à la caisse
    function plusDeCannasson() public payable {
        require(getFree[msg.sender]==true,"Ben tu veux payer alors que t'as le droit à un premier cannasson gratuit ???");
        require(msg.value == 1 finney, "Le prix, c'est 1 finney !!!");
        _creationCanasson(msg.sender);
    }
    
    // Fonction de création de cannasson.
    function _creationCanasson(address _address) private {
      nbreCannassons = nbreCannassons.add(1);
      uint _tokenId = nbreCannassons;
      exist[_tokenId]= true;
      bool _sexe;
      if((block.number-1)%2==1){
          _sexe=true;
      }
      nom[nbreCannassons] = noms[uint(blockhash(block.number-1))%10];
      familly[nbreCannassons] = familles[uint(blockhash(block.number-2))%10];
      category[nbreCannassons] = categories[uint(blockhash(block.number-3))%10];
      sexe[nbreCannassons] = _sexe;
      level[nbreCannassons] = 1;
      ownerOfCannasson[nbreCannassons] = _address;
      ownerCannassonCount[_address] = ownerCannassonCount[msg.sender].add(1);
      emit newCannasson(nbreCannassons,noms[uint(blockhash(block.number-1))%10],familles[uint(blockhash(block.number-2))%10],categories[uint(blockhash(block.number-3))%10]);
    }
    
    // L'utilisateur pourra changer le nom de son cannason moyennant finance.
    function changerDeNom(uint _tokenId, string memory _newName) public  payable isOwner(_tokenId){
        require (msg.value >= 1 finney);
        nom[_tokenId] = _newName;
    }
    
    // Un cannasson de course... Ca s'entraine !!!
    function entrainerCannasson(uint _tokenId) public payable isOwner(_tokenId) returns(uint _newLevel){
        require (msg.value >= 1 finney);
        if (msg.value >= 1 finney && msg.value < 2 finney){
            level[_tokenId]= level[_tokenId].add(uint16((uint(blockhash(block.number-1))%3)).add(1)); // Un entrainement payé 0.001 à 0.002 peut donner de 1 à 3 pts de level.
        } if (msg.value >= 2 finney && msg.value < 3 finney){
            level[_tokenId]= level[_tokenId].add(uint16((uint(blockhash(block.number-1))%10)).add(1).div(2)); // Un entrainement payé 0.002 à 0.003 peut donner de 1 à 5 pts de level.
        } if (msg.value >= 3 finney ){
            level[_tokenId]= level[_tokenId].add(uint16((uint(blockhash(block.number-1))%10)).add(1)); // Un entrainement payé plus de 0.003 peut donner 1 à 10 pts de level.
        } 
        nbreEntrainement[_tokenId] = nbreEntrainement[_tokenId].add(1);
        _newLevel = level[_tokenId];
        return _newLevel;
    }
    
    // Mais ça peut aussi se doper ^^.
    function doperCannasson(uint _tokenId) public payable isOwner(_tokenId) returns (uint _newLevel){
        require(estDope[_tokenId]==false, "Hehe, vous ne pouvez pas doper 2 fois votre cannasson en 24h.");
        require (msg.value >= 5 finney);
        if (msg.value >= 5 finney && msg.value < 10 finney){
            level[_tokenId] = level[_tokenId].add(uint16((uint(blockhash(block.number-1))%10)).add(1));// Un entrainement payé 0.005 à 0.01 peut donner de 1 à 10 pts de level.
            estDope[_tokenId] ==true;
            lastDopageDate[_tokenId]=now;
        } if (msg.value >= 10 finney && msg.value < 30 finney){
            level[_tokenId] = level[_tokenId].add(uint16((uint(blockhash(block.number-1))%10)).mul(2)); // Un entrainement payé 0.01 à 0.03 peut donner de 2 à 20 pts de level.
            estDope[_tokenId] ==true;
            lastDopageDate[_tokenId]=now;
        } if (msg.value >= 30 finney ){
            level[_tokenId] = level[_tokenId].add(uint16((uint(blockhash(block.number-1))%10)).mul(3)); // Un entrainement payé plus de 0.03 peut donner 3 à 30 pts de level.
            estDope[_tokenId] ==true;
            lastDopageDate[_tokenId]=now;
        } 
        _newLevel = level[_tokenId];
        return _newLevel;
    }
    
    // Et ça peut aussi servir de monnaie d'échange
    function _transfererCannasson(uint _tokenId, address _to, address _from) private isOwner(_tokenId){
        ownerOfCannasson[_tokenId] = _to;
        ownerCannassonCount[_to] = ownerCannassonCount[_to].add(1);
        ownerCannassonCount[_from] = ownerCannassonCount[_from].sub(1);
        emit Transfer(_from,_to,_tokenId);
    }
    
    // standard ERC721
    function transferFrom(address _from,address _to, uint256 _tokenId) public {
        require(ownerOfCannasson[_tokenId] == msg.sender);
        require(_from == msg.sender);
        ownerOfCannasson[_tokenId] = _to;
        ownerCannassonCount[_to] = ownerCannassonCount[_to].add(1);
        ownerCannassonCount[msg.sender] = ownerCannassonCount[msg.sender].sub(1);
        emit Transfer(msg.sender,_to,_tokenId);
    }
    
    // controle antidopage
    function demanderControleAntiDopage(uint _tokenId) public payable returns(string memory _message) {
        require(msg.value == 0.001 ether,"Attends ça coute du fric un controle anti dopage.");
        _message = "Le controle anti dopage n'a rien décelé d'anormal.";
            if (lastDopageDate[_tokenId].add(1 days) < now){
            estDope[_tokenId] = false;
            }
        
            if (estDope[_tokenId] == true){
            if((uint(blockhash(block.number-1))%2) == 1){ // Le controle anti dopage a 50% de chance d'etre juste. Et ouais, ya des produits plus traçables que d'autres.
              nbreDopageAvere[_tokenId] = nbreDopageAvere[_tokenId].add(1); 
              popularite[_tokenId] = 0; // t'as été gaulé, ta popularité passe à 0
              attenteAvantProchaineCourse[_tokenId] = now.add(3 days); // 3 jours de suspension.
              _message = "Il n'y a pas de doute!!! Ce cannasson est dopé !!! Il écope d'une suspension de 3 jours!!!";
            } else {
                for(uint i = 0; i<nbreCannassons;i++){
                    if(ownerOfCannasson[i] == msg.sender){
                    popularite[i] = 0; 
                    _message = "WOU !!! Vous avez accusé à tort un cannasson !!! Votre popularité passe à 0 !!! ";
                    }
                }
            }
        }
        return _message;
    }
    
    //------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------Gestion de la vente aux enchères des cannassons----------------------------------------//
    //------------------------------------------------------------------------------------------------------------------------//
    
    struct enchere {
     uint idEnchere;
     address meilleurAcheteur;
     uint256 meilleureOffre;
     uint256 finEnchere;
     uint256 idCannasson;
     address vendeur;
     uint departDeLaVente;
     bool enchereHollandaise;
   }
   
   uint idEnchere=0;
   
   function quiEstVendeur(uint _tokenId) public view returns(address){
       require(estEnVente[_tokenId]);
       for (uint i=0; i<=idEnchere;i++){
           if(encheres[i].idCannasson == _tokenId && estActive[i]== true){
                      return encheres[i].vendeur;
           }
       }

   }
   
   function meilleurOffrant(uint _tokenId) public view returns (address){
       require(estEnVente[_tokenId]);
       for (uint i=0; i<=idEnchere;i++){
           if(encheres[i].idCannasson == _tokenId && estActive[i]== true){
                      return encheres[i].meilleurAcheteur;
           }
       }

   }
   
   
   function tarifEnchere(uint _tokenId) public view returns(uint){
        require(estEnVente[_tokenId]);
        for (uint i=0; i<=idEnchere;i++){
           if(encheres[i].idCannasson == _tokenId && estActive[i]== true){
                      return encheres[i].meilleureOffre;
           }
       }
   } 
   
   function finEnchere(uint _tokenId) view public returns(uint){
       require(estEnVente[_tokenId]);
       for (uint i=0; i<=idEnchere;i++){
           if(encheres[i].idCannasson == _tokenId && estActive[i]== true){
                      return encheres[i].finEnchere;
           }
       }
   }
   
   function enchereHollandaise(uint _tokenId) view public returns(bool){
        require(estEnVente[_tokenId]);
        for (uint i=0; i<=idEnchere;i++){
           if(encheres[i].idCannasson == _tokenId && estActive[i]== true){
                      return encheres[i].enchereHollandaise;
           }
       }
    }
    
    function obtenirEnchereId(uint _tokenId) view public returns(uint){
        for(uint i= 0; i<=idEnchere;i++){
            if(encheres[i].idCannasson == _tokenId){
                return encheres[i].idEnchere;
            }
        }
    }
   
   enchere[] encheres;
   uint private argentBloque; // Montant que ne pourra pas réclamer le proprietaire du contrat 
   
   mapping(uint=>bool) public estEnVente;
   mapping(address=>bool) public peutEtreRembourse;
   mapping(address=>uint) public montantARembourser;
   mapping(uint=>bool) public estActive;
   
   function proposerALaVente(uint _tokenId, bool _hollandaise, uint _montant) public isOwner(_tokenId){
       estEnVente[_tokenId] = true;
       encheres.push(enchere(idEnchere,msg.sender,_montant,now.add(5 days),_tokenId,msg.sender,now,_hollandaise)); // msg.sender est initié comme meilleur offrant pour avoir la possibilité de récupérer son objet au cas il n'y aurait pas eu d'offre.
       _transfererCannasson(_tokenId,address(this),msg.sender);
       estActive[idEnchere]= true;
       idEnchere = idEnchere.add(1);
   }
   
   function _majOffreHollandaise(uint _enchereId) private returns(uint){
       require(encheres[_enchereId].enchereHollandaise==true);
       require(estActive[_enchereId] ==true);
       uint _tempsPasse = now.sub(encheres[_enchereId].departDeLaVente); // On calcule le temps passé depuis la mise en enchere de l'objet.
       uint _remise = encheres[_enchereId].meilleureOffre.div(1000); // On calcule 0,1% du montant de l'enchère.
       uint _uneHeure = 3600000; // Une heure = 3 600 000 millisecondes
       uint _remiseGlobale = (_tempsPasse.div(_uneHeure)).mul(_remise);
       uint _newPrice = encheres[_enchereId].meilleureOffre.sub(_remiseGlobale); // on retire (0.1% X le nombre d'heures passés) depuis le debut l'enchere.
       encheres[_enchereId].meilleureOffre = _newPrice; // on met à jour le nouveau prix.
       return _newPrice;
   }
   
   function proposerOffre(uint _enchereId) payable public{
    require(estActive[_enchereId]==true,"Cet objet n'est pas/plus en vente!");
    require(now<encheres[_enchereId].finEnchere,"La vente pour cet objet est terminée"); //On verifie si le bloc actuel n'est pas supperieur au bloc de fin d'enchere

       if(encheres[_enchereId].enchereHollandaise==true){ // Si c'est une enchere Hollandaise
           if(msg.value >= _majOffreHollandaise(_enchereId)){ // Si l'offre est suffisante
               _transfererCannasson(encheres[_enchereId].idCannasson,msg.sender,address(this)); // On transfert directement le token
               estEnVente[encheres[_enchereId].idCannasson] = false; // On stop l'enchere
               argentBloque = argentBloque.add(msg.value); // on mets à jour le montant que ne peut pas récupérer le proprietaire du contrat
               estActive[_enchereId]=false;
           }
       }
       
       // Si ce n'est pas une enchere hollandaise.
       else if(msg.value > encheres[_enchereId].meilleureOffre){ // On verifie que l'offre est suppèrieur à la précédente 
           if(encheres[_enchereId].meilleurAcheteur !=  encheres[_enchereId].vendeur){ // Si il y'a déjà eu une offre
               peutEtreRembourse[encheres[_enchereId].meilleurAcheteur]=true; // l'address du précédent enchereur peut prétendre à un remboursement
               montantARembourser[encheres[_enchereId].meilleurAcheteur]=encheres[_enchereId].meilleureOffre; // on fixe le montant du remboursement 
           }
           encheres[_enchereId].meilleurAcheteur=msg.sender; // on fixe le nouvel enchereur et la nouyvelle offre
           encheres[_enchereId].meilleureOffre=msg.value;
           argentBloque = argentBloque.add(msg.value); // on mets à jour le montant que ne peut pas récupérer le proprietaire du contrat
       }
   }
   
   function demanderRemboursement() public{
       if(peutEtreRembourse[msg.sender]==true){
           msg.sender.transfer(montantARembourser[msg.sender]);
           montantARembourser[msg.sender] = 0;
           peutEtreRembourse[msg.sender]= false;
           argentBloque = argentBloque.sub(montantARembourser[msg.sender]);
       }
   }
   
   function reclamerPaiement(uint _tokenId) public{
       require(encheres[_tokenId].vendeur == msg.sender);
       require(encheres[_tokenId].meilleurAcheteur !=  encheres[_tokenId].vendeur);
       msg.sender.transfer(encheres[_tokenId].meilleureOffre);
       argentBloque = argentBloque.sub(encheres[_tokenId].meilleureOffre);
   }
   
   function recupererCannasson(uint _tokenId) public {
       require( msg.sender == encheres[_tokenId].meilleurAcheteur,"Vous n'etes pas le plus offrant, si vous avez fait une offre, vous pouvez réclamer un remboursement");
       require(now>encheres[_tokenId].finEnchere,"L'enchere n'est pas encore terminée, revenez plus tard");
       _transfererCannasson(_tokenId,encheres[_tokenId].meilleurAcheteur,address(this)); // S'il n'y a pas eu d'enchere, l'ancien propriétaire peut récupérer son objet.
   }
   
   function majOffreActive() private { // permet de desactiver les offres "perimées", cette fonction sera appelé à chaque  course, pour eviter d'avoir a le faire manuellement
       for(uint i=0;i<=idEnchere;i++){
           if(estActive[i]==true){
               if(encheres[i].finEnchere<now){
                   estActive[i] = false;
               }
           }
       }
   }
   
    //------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------Gestion des courses de cannassons------------------------------------------------------//
    //------------------------------------------------------------------------------------------------------------------------//
 
    mapping(address=>uint) dateProchaineCourseGratuite;
    uint tempsDAttente = 4 hours; // par defaut le temps d'attente est de 4h entre 2 courses gratuites.
    
    // L'admin peut changer le temps d'attente.
    function modifierTempsAttente(uint _newTemps) public isAdminOfContract{
        tempsDAttente = _newTemps;
    }
    
    function afficherNbreCourseGratuiteRestante() view public returns(uint){
        return resteCourseGratuite[msg.sender];
    }
    
    function afficherDateProchaineCourseGratuite() view public returns(uint){
        return dateProchaineCourseGratuite[msg.sender];
    }
    
    // L'utilisateur a droit à une course gratuite toutes les 24h
    function faireCourseGratuite(uint _tokenId) public isOwner(_tokenId){
        // On verifie qu'il a attendu 4h et que son reste de course gratuite soit à 0 pour lui en donner une nouvelle.
        if(dateProchaineCourseGratuite[msg.sender]< now && resteCourseGratuite[msg.sender]==0){ 
            resteCourseGratuite[msg.sender].add(1);
        }
        // Si il a en stock une course gratuite, il peut l'utiliser
        if(resteCourseGratuite[msg.sender]>0){
        _faireUneCourse(_tokenId);
        // 4h plus tard il pourra participer à la suivante.
        dateProchaineCourseGratuite[msg.sender]= now.add(tempsDAttente);
        resteCourseGratuite[msg.sender].sub(1);
        }
    }
    
     function faireCoursePayante(uint _tokenId) public payable isOwner(_tokenId){
        require(msg.value==1 finney);
        _faireUneCourse(_tokenId);
    }
 
    function _faireUneCourse(uint _tokenId) private  {
        uint _winner;
        
        // tirage au sort d'un concurrent.
        uint _concurrent = (uint(blockhash(block.number-1))) % nbreCannassons;
       if (_concurrent == 0){
           _concurrent = _concurrent.add(1);
       }
       
        // On verifie qu'on ne va pas participer contre nous même.
        if(_concurrent == _tokenId) {
           if(_concurrent.add(1) > nbreCannassons){
                _concurrent = _concurrent.sub(1);
            }else {_concurrent = _concurrent.add(1);}
        }
        
        emit participantCourse(_concurrent,_tokenId);
        
        // Simulation de la course. on utilise le level , la popularité, le nombre de course, le nombre de victoire , nbre d'entrainement pour générer un chiffre, et on soustrait le nbre de dopage averait X2 ,celui qui a le plus de chance de gagner.
        
        uint _monCoeff = level[_tokenId].add(popularite[_tokenId].add(nbreDeCourse[_tokenId].add(nbreDeVictoire[_tokenId].add(nbreEntrainement[_tokenId].sub(nbreDopageAvere[_tokenId].mul(2))))));
        uint _coeffConcurent = level[_concurrent].add(popularite[_concurrent].add(nbreDeCourse[_concurrent].add(nbreDeVictoire[_concurrent].add(nbreEntrainement[_concurrent].sub(nbreDopageAvere[_concurrent].mul(2))))));
     
        // Calcul de notre proba de gagner
        uint _maProbaDeWin = uint(((_monCoeff.add(_coeffConcurent)).div(100)).mul(_monCoeff));
        
        // Désignation du vainqueur en tirant au sort un nombre entre 0 et 99.
        if(((uint(blockhash(block.number-1))) % 100)<= _maProbaDeWin){
            _winner = _tokenId; // Si notre proba est supperieur au nombre tiré au sort, on gagne.
            level[_tokenId].add(1);
            nbreDeCourse[_tokenId].add(1);  // On gagne 1 en level, victoire et nbre de course
            nbreDeVictoire[_tokenId].add(1);
            nbreDeCourse[_concurrent].add(1); // on ajoute 1 course au concurent
            attenteAvantProchaineCourse[_tokenId] = now.add(tempsDAttente); // notre cannasson devra attendre 4h avant de pouvoir courrir de nouveau.
        } else {
            _winner = _concurrent;
            level[_concurrent].add(1);
            nbreDeCourse[_concurrent].add(1); // Il gagne 1 en level, victoire et nbre de course
            nbreDeVictoire[_concurrent].add(1);
            nbreDeCourse[_tokenId].add(1); // on ajoute une course à notre cannasson
            attenteAvantProchaineCourse[_tokenId]= now.add(tempsDAttente); // notre cannasson devra attendre 4h avant de pouvoir courrir de nouveau.
        }
        emit resultatCourse(_tokenId,_concurrent,_winner);
        majOffreActive(); // fonction de mise à jour des offres d'enchères: est activé ici car sinon la maj est manuelle. 
    }
    
    //------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------Gestion des propositions de gestation--------------------------------------------------//
    //------------------------------------------------------------------------------------------------------------------------//
    
    mapping(uint => bool) seProposePourGestation;
    mapping(uint => uint) tarifPourGestation;
    
    function estDispoPourGestation(uint _tokenId) public view returns(bool){
        return seProposePourGestation[_tokenId];
    }
    
    function tarifDemandePourGestation(uint _tokenId) public view returns(uint){
        return tarifPourGestation[_tokenId];
    }
    
    function proposerGestation(uint _tokenId, uint _demande) public isOwner(_tokenId){
        seProposePourGestation[_tokenId] = true;
        tarifPourGestation[_tokenId] = _demande;
    }
    
    function payerPourGestation (uint _parent1,uint _parent2 ) public payable isOwner(_parent2){
        require(msg.value == tarifPourGestation[_parent1],"Pas le bon montant");
        require(sexe[_parent1] != sexe[_parent2]); // On verifie quand même que les 2 parents ne soient pas du même sexe hein ... 
        _gestation(_parent1,_parent2,msg.sender);
        seProposePourGestation[_parent1]= false;
        argentBloque = argentBloque.sub(msg.value);
    }
    
    function _gestation (uint _parent1, uint _parent2, address _adresseProprio) private {
        uint _levelChild = ((level[_parent1].add(level[_parent2])).div(4)).mul(uint16((uint(blockhash(block.number-1))%3)).add(1)); // le level du poulain pourra etre la moitié de la moyenne des 2 parents, la moyenne ou 1,5X la moyenne des parents. 
        uint _populariteChild = (popularite[_parent1].add(popularite[_parent2])).div(2); // La popularité du poullain sera la moyenne de ses 2 parents.
        uint _tempsAvantPremiereCourse = now.add(3 days); // Il ne pourra courrir que 3 jours après sa naissance (précoce tout de même)
        
        bool _sexe;
      if((block.number-1)%2==1){
          _sexe=true;
      }
        nbreCannassons = nbreCannassons.add(1);
        nom[nbreCannassons] = noms[uint(blockhash(block.number-1))%10];
        familly[nbreCannassons] = familles[uint(blockhash(block.number-2))%10];
        category[nbreCannassons] = categories[uint(blockhash(block.number-3))%10];
        sexe[nbreCannassons] = _sexe;
        level[nbreCannassons] = _levelChild;
        popularite[nbreCannassons] = _populariteChild;
        attenteAvantProchaineCourse[nbreCannassons] = _tempsAvantPremiereCourse;
        ownerOfCannasson[nbreCannassons] = _adresseProprio;
        ownerCannassonCount[_adresseProprio].add(1);
        emit newCannasson(nbreCannassons,noms[uint(blockhash(block.number-1))%10],familles[uint(blockhash(block.number-2))%10],categories[uint(blockhash(block.number-3))%10]);
    }
    
    //------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------Gestion des retributions admin---------------------------------------------------------//
    //------------------------------------------------------------------------------------------------------------------------//
   
    // Et ouais, le créateur du contrat veut récupérer les sous payés par les utilisateurs (Tout travail merite salaire)
    
    function reclamerLaThune() public isAdminOfContract{
        uint _value=(address(this).balance).sub(argentBloque);
        (msg.sender).transfer(_value);
    }
}