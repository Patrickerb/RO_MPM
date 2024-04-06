var taches = [] ;
var liaisons = [] ;
var alphabet = ["A", "B","C", "D","E", "F","G", "H","I", "J","K", "L","M", "N","O", "P","Q", "R","S", "T","U", "V","W", "X","Y", "Z","A1", "B1","C1", "D1","E1", "F1","G1", "H1","I1", "J1","K1", "L1","M1", "N1","O1", "P1","Q1", "R1","S1", "T1","U1", "V1","W1", "X1","Y1", "Z1"];
var i = 0;
var i1 = 0; 
var tachesTries = [];
var tachesListes = [];
var TachesCritiques = [] ;
var TachesCritiquesTries = [];
var cheminCritique = [];
var old = [];

var num_pasApas = 0;


// affiche les lignes
function afficheTR(){
    $('#table_taches tr:gt(1)').remove();
    $("#table").css('display', 'block');
    var nbTache = $('#nbTache').val();
    var tdTaches , tdDurees, tdHeads;
    var len_taches, len_durees,j,k;
    var nombre = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    var appartient = false;
    if(nbTache > 0){
        for(  ; i<nbTache ; i++){
            $('#table_taches').append('<tr><td class="tache_ant" style="text-align:center; font-size:bold;">'+ alphabet[i]+'</td><td class="pt-3-half duree" contenteditable="true"></td><td class="pt-3-half tache" contenteditable="true"></td></tr>');
        }
        $('.pt-3-half').keypress(function(e) {
            if(e.which == 13){
                e.preventDefault(false);
            } 
        });
    }
    tdTaches = document.querySelectorAll(".tache");
    tdDurees = document.querySelectorAll(".duree");
    tdHeads = document.querySelectorAll(".tache_ant");
    console.log(tdHeads);
    len_durees = tdDurees.length;
    len_taches = tdTaches.length;
    for( j= 0 ; j < len_durees ; j++){
        tdDurees[j].addEventListener('keydown', function(e) {
            console.log(e);
            console.log(e.key);
            var condition = (e.key != "0" && e.key != "1" && e.key != "2" && e.key != "3"  && e.key != "4" && e.key != "5" && e.key != "6" && e.key != "7" && e.key != "8" && e.key != "9"  && e.key != "Backspace" && e.key != "Tab" );
            
                if( condition ){
                    
                    e.preventDefault(); 
                    erreur("Caractère invalide ");
                }else  erreur("");
                
        }, false);
    }/*
   for( j= 0 ; j < len_taches ; j++){
        tdTaches[j].addEventListener('keydown', function(e) {
           console.log('path *******');
            console.log(e.path[1].firstChild.textContent);
            console.log(e.key.toUpperCase());
            console.log("i = " + i );
            var tache_ant = e.path[1].firstChild.textContent;
            var condition = false;
            var condition2 = (e.key != "0" && e.key != "1" && e.key != "2" && e.key != "3"  && e.key != "4" && e.key != "5" && e.key != "6" && e.key != "7" && e.key != "8" && e.key != "9");
            var k = 0;   
            var tacheAvant = "";                                
            for(; k<i ; k++){   // on verifie si la tache antérieur appartient à l'ensemble des tache definies
                if( e.key.toUpperCase() == alphabet[k]){
                    condition = true;
                    console.log("Condition = " + condition );
                
                }else{
                    if(!condition2){
                        condition = true;
                    }   
                }                       
            }
            if(e.key.toUpperCase() == tache_ant) 
            {
                condition = false ;
            }
            if(!condition && e.key != "Backspace" && e.key != "," && e.key != "-"   && e.key != "Tab" ){                
                e.preventDefault(); 
                erreur("Caractère invalide ");
            }else{
                erreur("");
            }
           if(e.key.toUpperCase() == tache_ant) 
            {
                erreur("Tache de même nom que la tâche successeur : boucle infinie");
            }
            condition = false;
            tache_ant = "";
        }, false);
    }*/
    document.getElementById("okTr").style.display = 'none';
    document.getElementById("nbTache").disabled = true;

}

function validatorTache(tache){
    
}

function erreur(erreur){
    document.getElementById("error").innerHTML = erreur;
}


// ajouter des lignes au tableau des taches 
function addTache(){
    $('#table_taches').append('<tr><td style="text-align:center; font-size:bold;">'+ alphabet[i++]+'</td><td class="pt-3-half" contenteditable="true"></td><td class="pt-3-half" contenteditable="true"></td></tr>');
    $('.pt-3-half').keypress(function(e) {
        if(e.which == 13){
            e.preventDefault(false);
        } 
    });
}
    


// permet de vider les cellules
function vider(){
    $('#table_taches tr:gt(1):lt('+ (i) +')').remove();
}


// permet des summprimer les lignes du tableau
function reset(){
    var tab = $('#table_taches tr:gt(1):lt('+ (i) +') ');
    var tr = 0 ;
    for( ; tr<(tab.length) ; tr++ ){       
        tab[tr].firstChild.nextSibling.innerHTML = '';
        tab[tr].firstChild.nextSibling.nextSibling.innerHTML ='';     
    } 
}

//-=====================================**************Desinner GRAPHE************===================================================
// valider
function validerUnique(){
    CalculDonnee();
    $('#myDiagramDiv').remove();
           
    listerTaches();// on trie les taches en les attribuants des numeros pour faciliter le mise en place de la graphe
    $('#dia').append('<div id="myDiagramDiv" style="width:100%; height:800px"></div>');
    init(); // on dessine la graphe  
    reInit();
}

function validerPasaPas(){
    switch(num_pasApas){
        case 0 : valider1();
                 document.getElementById('suivant').innerHTML = 'Chemin critique';
                 num_pasApas++; 
                 break;
        case 1 : valider2();
                 document.getElementById('suivant').innerHTML = 'Date au plus tard';
                 num_pasApas++;
                 break;
        case 2 : valider3();
                 document.getElementById('suivant').innerHTML = 'Marge totale';
                 num_pasApas++;
                 break;
        case 3 : valider4();
                 document.getElementById('suivant').innerHTML = 'Pas à pas';
                 num_pasApas = 0;
                 break;
    }
     
    
}
function valider1(){
    CalculDonnee();
    $('#myDiagramDiv').remove();
           
    listerTaches();// on trie les taches en les attribuants des numeros pour faciliter le mise en place de la graphe
    $('#dia').append('<div id="myDiagramDiv" style="width:100%; height:400px"></div>');
     
    initDatePlusTot(); // on dessine la graphe  
    reInit();
}
function valider2(){
    CalculDonnee();
    $('#myDiagramDiv').remove();
           
    listerTaches();// on trie les taches en les attribuants des numeros pour faciliter le mise en place de la graphe
    $('#dia').append('<div id="myDiagramDiv" style="width:100%; height:800px"></div>');
     
    initCheminCritique(); // on dessine la graphe  
    reInit();
}

function valider3(){
    CalculDonnee();
    $('#myDiagramDiv').remove();
           
    listerTaches();// on trie les taches en les attribuants des numeros pour faciliter le mise en place de la graphe
    $('#dia').append('<div id="myDiagramDiv" style="width:100%; height:800px"></div>');
     
    initDatePlusTard(); // on dessine la graphe  
    reInit();
}
function valider4(){
    CalculDonnee();
    $('#myDiagramDiv').remove();
           
    listerTaches();// on trie les taches en les attribuants des numeros pour faciliter le mise en place de la graphe
    $('#dia').append('<div id="myDiagramDiv" style="width:100%; height:800px"></div>');
     
    initMarge(); // on dessine la graphe  
    reInit();
}



// reinitialisation des variables globales 
function reInit(){
              
            
    //reinitialisation des variables : 
    var vide1 = [];
    var vide2 = [];
    var vide3 = [];
    var vide4 = [];
    var vide5 = [];
    var vide6 = [];
    var vide7 = [];
    var vide8 = [];
    taches = vide1 ;
    liaisons = vide2 ;
    i = 0;
    i1 = 0; 
    tachesTries = vide3 ;
    tachesListes = vide4 ;
    TachesCritiques = vide5 ;
    TachesCritiquesTries = vide6;
    cheminCritique = vide7;
    old = vide8 ;
}

// affiche la graphe
function CalculDonnee(){                
    var tab = $('#table_taches tr');
    var td1, td2, td3;                
    var ListeTachesAvantFin = [];                 
    var antecedant;
    var j=2;
    var j1 = 2;
    var j2 = 0;                 
    var i2 = 0;
    var ok = false;

    i = tab.length - 2;

    taches['Debut'] = new Tache('Debut', 0);
    taches['Debut'].dtTot = 0;
    taches['Debut'].rang = 0;
    taches['Fin'] = new Tache('Fin', 0);

    //on recupère les taches existants et leur durée
    for( ; j1<(tab.length) ; j1++ ){                  
        td1 = tab[j1].firstChild.textContent; // nom de la tache
        td2 = parseInt(tab[j1].firstChild.nextSibling.textContent); // durrée de la tache 
        taches[alphabet[j1-2]] = new Tache(td1, td2);  // création de la tache
    }             

    //on récupère les antecedants de chaque tache
    for( ; j<(tab.length) ; j++ ){         
        td3 = ((tab[j].firstChild.nextSibling.nextSibling.textContent).toUpperCase()).split(','); // decoupage de la chaine de caractère contenu dans la celulle
        if(tab[j].firstChild.nextSibling.nextSibling.textContent.trim() == '-' ){ // si le contenu de la celulle  est égale à - , donc son antécedant est la tache debut
            liaisons[i1] = new Liaison(taches[alphabet[i2]], taches['Debut']); // on crée une liaison entre la tache concernée et la tache debut
            i1++;
        }else{
            console.log('création de liaison');
            td3.forEach( element => { // on parcours le tableau td3 contenant les antecedants d'une tache                                      
                for(; j2<i ; j2++){     // on verifie si la tache antérieur appartient à l'ensemble des tache definies
                    if(element.trim() == alphabet[j2] ){
                        ok = true;
                        break; 
                       }
                }
                if(ok){ // si elle appartient  à l'ensemble des tache definies
                    antecedant = taches[element.trim()];                                 
                    if( taches[alphabet[i2]] != antecedant ){
                        liaisons[i1] = new Liaison(taches[alphabet[i2]], antecedant); // on cree une nouvelle liaison
                        i1++;
                        
                    }    
                    console.log('********');
                        console.log('1 : ' + taches[alphabet[i2]].nom );
                        console.log('2 : ' + antecedant.nom );
                        if( taches[alphabet[i2]].nom == antecedant.nom ){
                            alert("Erreur : " + taches[alphabet[i2]].nom + " successeur de " + antecedant.nom);
                        }              
                }else{ // si elle n'appartient pas à l'ensemble des tache definies
                    alert( 'La tâche ' + element + " n'appartient pas à la liste des tâches ");
                    erreur('Erreur');
                    exit();
                    //tout doit s'arreter ici ;
                }
                ok = false ;
                j2 = 0 ;                        
            }); 
        }                               
        i2++;
    }
            
    //pour creer la tache fin : PRINCIPE : si la tache n'est l'antécedant d'aucune tache 
    var  i3 = 0, i4 = 0;
    var appartenir = false;
    for( ; i3 < i ; i3++ ){ // on parcours les alphabets
        var j3 = 0;
        for( ; j3<liaisons.length ; j3++){
            if(liaisons[j3].antecedant.nom == alphabet[i3]){ // on parcours les antecedants dans le tableau liaisons
                appartenir = true;
                break;
            }
        }
        if(appartenir == false){ // si la tache tache n'est l'antecedant d'aucune tache
            ListeTachesAvantFin[i4] = alphabet[i3]; // on stocke la tache dans le tableau ListeTachesAvantFin
            i4++;              
        }
        appartenir = false;
    }
            
    var i5 = 0;
    for(; i5<ListeTachesAvantFin.length ; i5++ ){ // on crée enfin la liaison des taches contenue dans ListeTachesAvantFin avec la tache fin
        liaisons[i1] = new Liaison( taches['Fin'], taches[ListeTachesAvantFin[i5]]);
        i1++;
    }
          
    ranger(taches['Debut'], 0); // on appelle la fonction ranger pour ranger les taches de façon croissante
    calculDatePlusTot(taches); // on calcule la date au plus tot de tout les taches
    calculDatePlusTard(taches); // on calcule la date au plus tard de tout les taches
    calculMargeTotale(taches); // on calcule la marge totale de tout les taches
    trierTaches(); // mettre en ordre les taches
    rechercheTachesCritiques(); // on recherche toute les taches avec une marge totale égale à 0
            
    cheminCritique[0] = [taches['Debut']];                
    var c = 0;
    old[0] = [];
            
    determinerCheminCritique( 0 , taches['Debut'] );// on determine le chemin critique
    // AU cas où il y a plusieurs chemins critiques
    for(; c < old.length ; c++){ 
        var tacheNext;
        old[c].forEach(element => {
            tacheNext = element;
        });   
        cheminCritique[c + 1] = old[c];
        determinerCheminCritique( c + 1 , tacheNext );
    }
            
    var Critiques = [] ;
    var kk = 0;
    for(;kk < cheminCritique.length ; kk++){
        if(cheminCritique[kk].length != 0){
            Critiques.push(cheminCritique[kk]);
        }
    }
            
    //on met critical les liaisons appartenant aux chemin critique
    liaisons.forEach(element => {
        var tC1 = false;
        var tC2 = false;
        var tTache = 0;
       
        /*
        for(; iTache < i ; iTache++){
            taches[alphabet[iTache]].rang == iRang;
        } */
        if(element.antecedant.nom == "Debut"){
            tC1 = true ;
        }else{
            for(;tTache < i ; tTache++ ){ 
            
                if(element.antecedant.nom == taches[alphabet[tTache]].nom){
                       
                    //alert("hey1 : " + element.antecedant.nom + " == " + taches[alphabet[tTache]].nom + " critical : " + taches[alphabet[tTache]].margeT) ;
                    if(taches[alphabet[tTache]].margeT == 0 ){                   
                        tC1 = true;
                        break;
                    }
                }
            }
        }
        if(element.successeur.nom == "Fin"){
            tC2 = true ;
        }else{
            for(tTache = 0 ;tTache < i ; tTache ++ ){            
                if(element.successeur.nom == taches[alphabet[tTache]].nom){
                    
                    if(taches[alphabet[tTache]].margeT == 0 ){
                        //alert("hey2 : " + element.successeur.nom + " == " + taches[alphabet[tTache]].nom + " critical : " + taches[alphabet[tTache]].margeT);
                        tC2 = true;
                        break;
                    }
                }
            }
        }
        
        if(tC1 == true && tC2 == true ){
            element.critical = true;
        }
    });
/*
    Critiques.forEach(element => {
        
        var k = 0;
        for(; k< element.length ; k++){
            element[k].critical = true;
            element[k].critical = true;
            if(element[k] == taches['Fin']){
                break;
            }else{
                liaisons.forEach(el => {
                    if(el.antecedant == element[k] && el.successeur == element[k+1]){
                        el.critical = true;
                    }
                });
            }
        }
    });
*/
    console.log(tachesListes);
    console.log(taches);
    console.log(liaisons);

}
//===================================*******************FIN*******************==================================================




//***********************************--------------FONCTION CONCERNANT L'ORDONNANCEMENT------------------***********************************/

        function calculDatePlusTot(taches){
            var maxRang = taches['Fin'].rang;
            var iRang = 0;
            var iTache = 0;
            
            datePlusTot(taches['Debut']);        

            for(; iRang <= maxRang ; iRang++){
                for(; iTache < i ; iTache++){
                    if(taches[alphabet[iTache]].rang == iRang){
                        datePlusTot(taches[alphabet[iTache]]);
                    }
                } 
                iTache = 0;                
            }
            datePlusTot(taches['Fin']);  
        }


        function datePlusTot(tache){ 
            var antecedants = [];
            var ii = 0;
            liaisons.forEach(element => {
                if( element.successeur.nom == tache.nom ){
                    antecedants[ii] = element.antecedant;
                    ii++;
                }
            });

            if(antecedants.length == 1){
                tache.dtTot = antecedants[0].dtTot + antecedants[0].duree;
            }else if(antecedants.length > 1){
                antecedants.forEach(element => {
                    if( (element.dtTot + element.duree) > tache.dtTot ){
                        tache.dtTot = element.dtTot + element.duree;
                    }
                });
            }
        }
        
        function calculDatePlusTard(taches){
            var maxRang = taches['Fin'].rang;
            var iRang = maxRang;
            var iTache = 0;
            
            datePlusTard(taches['Fin']);        

            for(; iRang >=0 ; iRang--){
                for(; iTache < i ; iTache++){
                    if(taches[alphabet[iTache]].rang == iRang){
                        datePlusTard(taches[alphabet[iTache]]);
                    }
                } 
                iTache = 0;                
            }
            datePlusTard(taches['Debut']);  
        }

        function datePlusTard(tache){
            var successeurs = [];
            var ii = 0;
            var dTard1 = 0;
            liaisons.forEach(element => {
                if( element.antecedant.nom == tache.nom ){
                    successeurs[ii] = element.successeur;
                    ii++;
                }
            });                
            if(successeurs.length == 1){
                tache.dtTard = successeurs[0].dtTard - tache.duree;
            }else if(successeurs.length > 1){
                dtTard1 = successeurs[0].dtTard - tache.duree;
                successeurs.forEach(element => {
                    if( (element.dtTard - tache.duree) < dtTard1 ){
                        tache.dtTard = element.dtTard - tache.duree;
                        dtTard1 = tache.dtTard ;
                    }else{
                        
                        tache.dtTard = dtTard1;
                    }
                });
            }else if(tache.nom == 'Fin'){
                tache.dtTard = tache.dtTot;
            }
        }

        function calculMargeTotale(taches){
            var iTache = 0;                    
            margeTotale(taches['Debut']);        
            for(; iTache < i ; iTache++){
                margeTotale(taches[alphabet[iTache]]);
                
            } 
            
            margeTotale(taches['Fin']);  
        }
        
        function margeTotale(tache){
            tache.margeT = tache.dtTard - tache.dtTot;
        }
        
        function ranger(tache, rang){
            
            liaisons.forEach(element => {
                if(element.antecedant.nom == tache.nom){
                    if(element.successeur.rang <= (rang + 1)){
                        element.successeur.rang = rang + 1;
                    }                        
                    ranger( element.successeur, rang + 1 );
                }                    
            });                
        }
        function trierTaches(){
            var maxRang = taches['Fin'].rang;
            var iRang = 0;
            var iTache = 0;
            tachesTries.push(taches['Debut']);                      

            for(; iRang <= maxRang ; iRang++){
                for(; iTache < i ; iTache++){
                    if(taches[alphabet[iTache]].rang == iRang){
                        tachesTries.push(taches[alphabet[iTache]]);
                    }
                } 
                iTache = 0;                
            }
            tachesTries.push(taches['Fin']);   
        }


        function rechercheTachesCritiques(){                
            var iTache = 0;
            
            for(; iTache < tachesTries.length ; iTache++){
                if(tachesTries[iTache].margeT == 0){
                    TachesCritiques.push(tachesTries[iTache]);
                }
            } 
        }
        function getSuccesseur(tache){
            var successeurs = [];
            liaisons.forEach(el => {
                if(el.antecedant == tache  ){
                    TachesCritiques.forEach(element => {
                        if(element == el.successeur){                      
                            successeurs.push(el.successeur);                        
                        }
                
                    });
                }
                    
            });
            
            return successeurs;
        }

     function getAntecedant(tache){
            var antecedants = [];
            liaisons.forEach(el => {
                if(el.successeur == tache  ){
                    TachesCritiques.forEach(element => {
                        if(element == el.antecedant){                      
                            antecedants.push(el.antecedant);                        
                        }
                
                    });
                }
                    
            });
            
            return antecedants;
        }

        function determinerCheminCritique( ii , tache){
            var successeurs = getSuccesseur(tache);                  
            var t = 0;

            try {
                   
            for(; t < successeurs.length ; t++){  
                if(successeurs.length > 1){
                    if(t > 0){
                    var temp = [];
                    var ant = getAntecedant(successeurs[t]);
                    var k = 0,k1 = 0;
                    var sortir = false;
                    for(; k < cheminCritique[ii].length ; k++){
                        temp.push(cheminCritique[ii][k]);
                        for(; k1 < ant.length ; k1++){
                        if(cheminCritique[ii][k] == ant[k1] ){
                            sortir = true;
                        }
                        }
                        k1 = 0 ;
                        if(sortir){
                        break;
                        temp.push(successeurs[t]);  
                        old.push(temp);
                        }
                        
                    }
                    }
                            }                                                     
                            if(t==0 ){
                    if( successeurs[t].dtTot == (  tache.dtTot + tache.duree) ){
                                    cheminCritique[ii].push(successeurs[t]);                          
                                    determinerCheminCritique(ii, successeurs[t]); 
                    }
                    else{
                    var tabVide = [] ;
                    cheminCritique[ii] = tabVide;
                    }
                            }   
                        
                    }
                
            } catch (error) {
                alert("Boucle infinie ");
            }
           
        }

        function listerTaches(){
            var k = 1;
            tachesTries.forEach(element => {
                TachesCritiques.forEach(el => {
                    if(el == element){
                        el.critical = true;
                    }
                });
                element.numero = k ;
                tachesListes.push(element);
                k++;
            });
        }

//************************------------------------------------FIN su----------------------------------------********************************/
        


//=================================------------------Canvas-------------------===============================================================================

function init() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for more concise visual tree definitions

    // colors used, named for easier identification
    var blue= "#0288D1";
    var pink= "#ef9a9a ";
    var redfill = "#ffebee  ";
    var pinkfill = "#ef9a9a ";
    var bluefill = "#B3E5FC";

    myDiagram =
        $(go.Diagram, "myDiagramDiv",
        {
            initialAutoScale: go.Diagram.Uniform,
            layout: $(go.LayeredDigraphLayout)
        });

    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
        { 
            fromSpot: go.Spot.RightSide,  // coming out from right side
            toSpot: go.Spot.LeftSide },   // going into at left side
            $(go.Shape, "Circle",  // the border
                { fill: "white", strokeWidth: 2 },
                new go.Binding("fill",  "critique", function(b){ 
                    if( b == 0) return bluefill;
                    else if( b == 1) return pinkfill;
                    else if( b == 2) return redfill;
                 }),
               // new go.Binding("fill", "text", function(b){ if( b == "Debut" || b == "Fin" ) return redfill; }),
                new go.Binding("stroke", "critical", function(b) { return (b ? pink : blue); })),
            $(go.Panel, "Table",
                $(go.RowColumnDefinition, { column: 1}),
                $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", coversSeparators: true }),
                $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" ,  coversSeparators: true}),
                $(go.TextBlock, // earlyStart
                    new go.Binding("text", "earlyStart"),
                    { row: 0, column: 0, margin: 10,textAlign: "center" , font: "bold 20px sans-serif"}),
                $(go.TextBlock, // lateFinish
                    new go.Binding("text", "lateFinish"),
                    { row: 0, column: 1, margin: 10, textAlign: "center" , font: "bold 20px sans-serif"}),
                $(go.TextBlock,
                    new go.Binding("text", "text"),
                   {row: 1, column: 0, columnSpan: 3, margin: 20, textAlign: "center", font: "bold 30px sans-serif"}),
                $(go.TextBlock,  // lateStart
                    new go.Binding("text", "marge"),
                    { row: 2, column: 0, columnSpan: 3, margin: 10, textAlign: "center" , font: "bold 20px sans-serif"})
      )  // end Table Panel
    );  

    myDiagram.linkTemplate =
        $(go.Link,
            { curve: go.Link.Bezier }, 
            { toShortLength: 6, toEndSegmentLength: 20 },
        $(go.Shape,
            { strokeWidth: 4 },
            new go.Binding("stroke", "critical", function(b) { return (b ? pink : blue); })),
        $(go.Shape,  // arrowhead
            { toArrow: "Triangle", stroke: null, scale: 1.5 },
            new go.Binding("fill", "critical", function(b) { return (b ? pink : blue); })),
       $(go.TextBlock, { margin: 20 , font: "bold 20px sans-serif" },new go.Binding("text", "text") , { segmentOffset: new go.Point(0, 20) })
    );

    var nodeDataArray = [];
    var linkDataArray = [];
    tachesListes.forEach(element => {
        var noeud = [];
        noeud['key'] = element.numero;            
        noeud['text'] = element.nom ;
        noeud['length'] = element.duree;
        noeud['earlyStart'] = element.dtTot ;
        noeud['lateFinish'] = element.dtTard ;
        noeud['marge'] = element.margeT ;
        noeud['critical'] = element.critical;
        if( element.critical == true){
            noeud['critique'] = 1;
            if( element.nom == "Debut" ||  element.nom == "Fin"){
                noeud['critique'] = 2;
            }
        }else if( element.critical == false){
            noeud['critique'] = 0;
        }
        
        nodeDataArray.push(noeud);
        
    });
    liaisons.forEach(element => {
        var lien = [];
        lien['from'] = element.antecedant.numero;
        lien['to'] = element.successeur.numero;
        lien['text'] = element.antecedant.duree;
        lien['critical'] = element.critical;
        linkDataArray.push(lien);
    });

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  
  
}


//---------------------------------------------------------------PAS à PAS--------------------------------------------------------------------------

function initDatePlusTot() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for more concise visual tree definitions

    // colors used, named for easier identification
    var blue = "#0288D1";
    var pink = "#ef9a9a ";
    var redfill = "#ffebee  ";
    var pinkfill = "#ef9a9a ";
    var bluefill = "#B3E5FC";

    myDiagram =
        $(go.Diagram, "myDiagramDiv",
        {
            initialAutoScale: go.Diagram.Uniform,
            layout: $(go.LayeredDigraphLayout)
        });

    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
        { 
            fromSpot: go.Spot.RightSide,  // coming out from right side
            toSpot: go.Spot.LeftSide },   // going into at left side
            $(go.Shape, "Circle",  // the border
                { fill: "white", strokeWidth: 2 },
                new go.Binding("fill", "critical", function(b) { return (b ? bluefill : bluefill); }),
                new go.Binding("stroke", "critical", function(b) { return (b ? blue : blue); })),
            $(go.Panel, "Table",
                $(go.RowColumnDefinition, { column: 1}),
                $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", coversSeparators: true }),
                $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" ,  coversSeparators: true}),
                $(go.TextBlock, // earlyStart
                    new go.Binding("text", "earlyStart"),
                    { row: 0, column: 0, margin: 10,textAlign: "center" , font: "bold 20px sans-serif"}),
                $(go.TextBlock, // lateFinish
                    new go.Binding("text", "lateFinish"),
                    { row: 0, column: 1, margin: 10, textAlign: "center" , font: "bold 20px sans-serif"}),
                $(go.TextBlock,
                    new go.Binding("text", "text"),
                   {row: 1, column: 0, columnSpan: 3, margin: 20, textAlign: "center", font: "bold 30px sans-serif"}),
                $(go.TextBlock,  // lateStart
                    new go.Binding("text", "marge"),
                    { row: 2, column: 0, columnSpan: 3, margin: 10, textAlign: "center" , font: "bold 20px sans-serif"})
      )  // end Table Panel
    );  

    myDiagram.linkTemplate =
        $(go.Link,
            { curve: go.Link.Bezier }, 
            { toShortLength: 6, toEndSegmentLength: 20 },
        $(go.Shape,
            { strokeWidth: 4 },
            new go.Binding("stroke", "critical", function(b) { return (b ? blue : blue); })),
        $(go.Shape,  // arrowhead
            { toArrow: "Triangle", stroke: null, scale: 1.5 },
            new go.Binding("fill", "critical", function(b) { return (b ? blue : blue); })),
       $(go.TextBlock, { margin: 20 , font: "bold 20px sans-serif" },new go.Binding("text", "text") , { segmentOffset: new go.Point(0, 20) })
    );

    var nodeDataArray = [];
    var linkDataArray = [];
    tachesListes.forEach(element => {
        var noeud = [];
        noeud['key'] = element.numero;            
        noeud['text'] = element.nom ;
        noeud['length'] = element.duree;
        noeud['earlyStart'] = element.dtTot ;
        noeud['lateFinish'] = '?' ;
        noeud['marge'] = '?' ;
        noeud['critical'] = element.critical;
        nodeDataArray.push(noeud);
        
    });
    liaisons.forEach(element => {
        var lien = [];
        lien['from'] = element.antecedant.numero;
        lien['to'] = element.successeur.numero;
        lien['text'] = element.antecedant.duree;
        lien['critical'] = element.critical;
        linkDataArray.push(lien);
    });

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  
  
}


function initCheminCritique() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for more concise visual tree definitions

    // colors used, named for easier identification
    var blue = "#0288D1";
    var pink = "#ef9a9a ";
    var redfill = "#ffebee  ";
    var pinkfill = "#ef9a9a ";
    var bluefill = "#B3E5FC";

    myDiagram =
        $(go.Diagram, "myDiagramDiv",
        {
            initialAutoScale: go.Diagram.Uniform,
            layout: $(go.LayeredDigraphLayout)
        });

    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
        { 
            fromSpot: go.Spot.RightSide,  // coming out from right side
            toSpot: go.Spot.LeftSide },   // going into at left side
            $(go.Shape, "Circle",  // the border
                { fill: "white", strokeWidth: 2 },
                new go.Binding("fill", "critical", function(b) { return (b ? pinkfill : bluefill); }),
                new go.Binding("stroke", "critical", function(b) { return (b ? pink : blue); })),
            $(go.Panel, "Table",
                $(go.RowColumnDefinition, { column: 1}),
                $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", coversSeparators: true }),
                $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" ,  coversSeparators: true}),
                $(go.TextBlock, // earlyStart
                    new go.Binding("text", "earlyStart"),
                    { row: 0, column: 0, margin: 10,textAlign: "center" , font: "bold 20px sans-serif"}),
                $(go.TextBlock, // lateFinish
                    new go.Binding("text", "lateFinish"),
                    { row: 0, column: 1, margin: 10, textAlign: "center" , font: "bold 20px sans-serif"}),
                $(go.TextBlock,
                    new go.Binding("text", "text"),
                   {row: 1, column: 0, columnSpan: 3, margin: 20, textAlign: "center", font: "bold 30px sans-serif"}),
                $(go.TextBlock,  // lateStart
                    new go.Binding("text", "marge"),
                    { row: 2, column: 0, columnSpan: 3, margin: 10, textAlign: "center" , font: "bold 20px sans-serif"})
      )  // end Table Panel
    );  

    myDiagram.linkTemplate =
        $(go.Link,
            { curve: go.Link.Bezier }, 
            { toShortLength: 6, toEndSegmentLength: 20 },
        $(go.Shape,
            { strokeWidth: 4 },
            new go.Binding("stroke", "critical", function(b) { return (b ? pink : blue); })),
        $(go.Shape,  // arrowhead
            { toArrow: "Triangle", stroke: null, scale: 1.5 },
            new go.Binding("fill", "critical", function(b) { return (b ? pink : blue); })),
       $(go.TextBlock, { margin: 20 , font: "bold 20px sans-serif" },new go.Binding("text", "text") , { segmentOffset: new go.Point(0, 20) })
    );

    var nodeDataArray = [];
    var linkDataArray = [];
    tachesListes.forEach(element => {
        var noeud = [];
        noeud['key'] = element.numero;            
        noeud['text'] = element.nom ;
        noeud['length'] = element.duree;
        noeud['earlyStart'] = element.dtTot ;
        noeud['lateFinish'] = '?' ;
        noeud['marge'] = '?' ;
        noeud['critical'] = element.critical;
        if( element.critical == true){
            noeud['critique'] = 1;
            if( element.nom == "Debut" ||  element.nom == "Fin"){
                noeud['critique'] = 2;
            }
        }else if( element.critical == false){
            noeud['critique'] = 0;
        }
        nodeDataArray.push(noeud);
        
    });
    liaisons.forEach(element => {
        var lien = [];
        lien['from'] = element.antecedant.numero;
        lien['to'] = element.successeur.numero;
        lien['text'] = element.antecedant.duree;
        lien['critical'] = element.critical;
        linkDataArray.push(lien);
    });

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  
  
}

function initDatePlusTard() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for more concise visual tree definitions

    // colors used, named for easier identification
    var blue = "#0288D1";
    var pink = "#ef9a9a ";
    var redfill = "#ffebee  ";
    var pinkfill = "#ef9a9a ";
    var bluefill = "#B3E5FC";

    myDiagram =
        $(go.Diagram, "myDiagramDiv",
        {
            initialAutoScale: go.Diagram.Uniform,
            layout: $(go.LayeredDigraphLayout)
        });

    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
        { 
            fromSpot: go.Spot.RightSide,  // coming out from right side
            toSpot: go.Spot.LeftSide },   // going into at left side
            $(go.Shape, "Circle",  // the border
                { fill: "white", strokeWidth: 2 },
                new go.Binding("fill","critique", function(b){ 
                    if( b == 0) return bluefill;
                    else if( b == 1) return pinkfill;
                    else if( b == 2) return redfill;
                 }),
                new go.Binding("stroke", "critical", function(b) { return (b ? pink : blue); })),
            $(go.Panel, "Table",
                $(go.RowColumnDefinition, { column: 1}),
                $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", coversSeparators: true }),
                $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" ,  coversSeparators: true}),
                $(go.TextBlock, // earlyStart
                    new go.Binding("text", "earlyStart"),
                    { row: 0, column: 0, margin: 10,textAlign: "center" , font: "bold 20px sans-serif"}),
                $(go.TextBlock, // lateFinish
                    new go.Binding("text", "lateFinish"),
                    { row: 0, column: 1, margin: 10, textAlign: "center" , font: "bold 20px sans-serif"}),
                $(go.TextBlock,
                    new go.Binding("text", "text"),
                   {row: 1, column: 0, columnSpan: 3, margin: 20, textAlign: "center", font: "bold 30px sans-serif"}),
                $(go.TextBlock,  // lateStart
                    new go.Binding("text", "marge"),
                    { row: 2, column: 0, columnSpan: 3, margin: 10, textAlign: "center" , font: "bold 20px sans-serif"})
      )  // end Table Panel
    );  

    myDiagram.linkTemplate =
        $(go.Link,
            { curve: go.Link.Bezier }, 
            { toShortLength: 6, toEndSegmentLength: 20 },
        $(go.Shape,
            { strokeWidth: 4 },
            new go.Binding("stroke", "critical", function(b) { return (b ? pink : blue); })),
        $(go.Shape,  // arrowhead
            { toArrow: "Triangle", stroke: null, scale: 1.5 },
            new go.Binding("fill", "critical", function(b) { return (b ? pink : blue); })),
       $(go.TextBlock, { margin: 20 , font: "bold 20px sans-serif" },new go.Binding("text", "text") , { segmentOffset: new go.Point(0, 20) })
    );

    var nodeDataArray = [];
    var linkDataArray = [];
    tachesListes.forEach(element => {
        var noeud = [];
        noeud['key'] = element.numero;            
        noeud['text'] = element.nom ;
        noeud['length'] = element.duree;
        noeud['earlyStart'] = element.dtTot ;
        noeud['lateFinish'] = element.dtTard ;
        noeud['marge'] = '?' ;
        noeud['critical'] = element.critical;
        if( element.critical == true){
            noeud['critique'] = 1;
            if( element.nom == "Debut" ||  element.nom == "Fin"){
                noeud['critique'] = 2;
            }
        }else if( element.critical == false){
            noeud['critique'] = 0;
        }
        nodeDataArray.push(noeud);
        
    });
    liaisons.forEach(element => {
        var lien = [];
        lien['from'] = element.antecedant.numero;
        lien['to'] = element.successeur.numero;
        lien['text'] = element.antecedant.duree;
        lien['critical'] = element.critical;
        linkDataArray.push(lien);
    });

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  
  
}


function initMarge() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for more concise visual tree definitions

    // colors used, named for easier identification
    var blue = "#0288D1";
    var pink = "#ef9a9a ";
    var redfill = "#ffebee  ";
    var pinkfill = "#ef9a9a ";
    var bluefill = "#B3E5FC";

    myDiagram =
        $(go.Diagram, "myDiagramDiv",
        {
            initialAutoScale: go.Diagram.Uniform,
            layout: $(go.LayeredDigraphLayout)
        });

    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
        { 
            fromSpot: go.Spot.RightSide,  // coming out from right side
            toSpot: go.Spot.LeftSide },   // going into at left side
            $(go.Shape, "Circle",  // the border
                { fill: "white", strokeWidth: 2 },
                new go.Binding("fill",  "critique", function(b){ 
                    if( b == 0) return bluefill;
                    else if( b == 1) return pinkfill;
                    else if( b == 2) return redfill;
                 }),
                new go.Binding("stroke", "critical", function(b) { return (b ? pink : blue); })),
            $(go.Panel, "Table",
                $(go.RowColumnDefinition, { column: 1}),
                $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", coversSeparators: true }),
                $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" ,  coversSeparators: true}),
                $(go.TextBlock, // earlyStart
                    new go.Binding("text", "earlyStart"),
                    { row: 0, column: 0, margin: 10,textAlign: "center" , font: "bold 20px sans-serif"}),
                $(go.TextBlock, // lateFinish
                    new go.Binding("text", "lateFinish"),
                    { row: 0, column: 1, margin: 10, textAlign: "center" , font: "bold 20px sans-serif"}),
                $(go.TextBlock,
                    new go.Binding("text", "text"),
                   {row: 1, column: 0, columnSpan: 3, margin: 20, textAlign: "center", font: "bold 30px sans-serif"}),
                $(go.TextBlock,  // lateStart
                    new go.Binding("text", "marge"),
                    { row: 2, column: 0, columnSpan: 3, margin: 10, textAlign: "center" , font: "bold 20px sans-serif"})
      )  // end Table Panel
    );  

    myDiagram.linkTemplate =
        $(go.Link,
            { curve: go.Link.Bezier }, 
            { toShortLength: 6, toEndSegmentLength: 20 },
        $(go.Shape,
            { strokeWidth: 4 },
            new go.Binding("stroke", "critical", function(b) { return (b ? pink : blue); })),
        $(go.Shape,  // arrowhead
            { toArrow: "Triangle", stroke: null, scale: 1.5 },
            new go.Binding("fill", "critical", function(b) { return (b ? pink : blue); })),
       $(go.TextBlock, { margin: 20 , font: "bold 20px sans-serif" },new go.Binding("text", "text") , { segmentOffset: new go.Point(0, 20) })
    );

    var nodeDataArray = [];
    var linkDataArray = [];
    tachesListes.forEach(element => {
        var noeud = [];
        noeud['key'] = element.numero;            
        noeud['text'] = element.nom ;
        noeud['length'] = element.duree;
        noeud['earlyStart'] = element.dtTot ;
        noeud['lateFinish'] = element.dtTard ;
        noeud['marge'] = element.margeT ;
        noeud['critical'] = element.critical;
        if( element.critical == true){
            noeud['critique'] = 1;
            if( element.nom == "Debut" ||  element.nom == "Fin"){
                noeud['critique'] = 2;
            }
        }else if( element.critical == false){
            noeud['critique'] = 0;
        }
        nodeDataArray.push(noeud);
        
    });
    liaisons.forEach(element => {
        var lien = [];
        lien['from'] = element.antecedant.numero;
        lien['to'] = element.successeur.numero;
        lien['text'] = element.antecedant.duree;
        lien['critical'] = element.critical;
        linkDataArray.push(lien);
    });

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  
  
}









