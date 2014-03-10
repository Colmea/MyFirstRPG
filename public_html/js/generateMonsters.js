/*
 * Placement aléatoire des monstres
 *
 * Le monstre est généré aléatoirement. 
 * Son lvl sera fonction du niveau de difficulté du dongeon et du niveau du héros
 * En mourrant, il laissera tomber l'arme
 * 
 */


//On cree un tableau vide pour commencer
var enemies = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]; 

var monstersNumTiles = 3;     // Nombre de tuiles sur une ligne de notre image
var monstersImage = new Image();
monstersImage.src = 'images/monsters.png';
tilesetImage.onload = placeMonster(posHero, item, ground);

function Monster(x, y) {
    var type = ['Gobelin', 'Orc', 'Zombie', 'Squelette', 'Démon', 'Naga'];
    var charPoints = 50;
    
    //Emplacement du monstre
    this.x = x;
    this.y = y;
            
    //Création du nom en fonction du type de monstre et de son arme (ou pas)
    this.quelType = rand(0,5,1);    
    this.name = type[this.quelType] + ' désarmé';
    
    this.arme = 0;
    
    //Compare son arme actuelle avec celle au sol, choisit la plus puissante et modifie le nom du monstre
    this.compareArme = function(ArmeSol) {
        if(!Monster.arme) {
            var totActu = Monster.arme.st + Monster.arme.dx + Monster.arme.iq + Monster.arme.ht;
            var totSol = ArmeSol.st + ArmeSol.dx + ArmeSol.iq + ArmeSol.ht;
            
            Monster.arme = (totSol > totActu)? ArmeSol : Monster.arme;
        }
        else {
            Monster.arme = ArmeSol;
        }   
        Monster.name = type[Monster.quelType] + ' équipé d\'un(e) ' + Monster.arme.name;
    };
    
    //Caractéristiques ; l'ordre d'importance dépend du type de monstre
    switch(this.quelType) {
        case 0:
            this.dx = 20;
            charPoints -= this.dx;
            this.iq = rand(10,20,1);
            charPoints -= this.iq;
            this.ht = rand(1,charPoints-1,1);
            charPoints -= this.ht;
            this.st = charPoints;
            break;
        case 1:
            this.st = 20;
            charPoints -= this.st;
            this.ht = rand(10,20,1);
            charPoints -= this.ht;
            this.dx = rand(1,charPoints-1,1);
            charPoints -= this.dx;
            this.iq = charPoints;
            break;
        case 2:
            this.ht = 20;
            charPoints -= this.ht;
            this.st = rand(10,20,1);
            charPoints -= this.st;
            this.dx = rand(1,charPoints-1,1);
            charPoints -= this.dx;
            this.iq = charPoints;
            break;
        case 3:
            this.dx = 20;
            charPoints -= this.dx;
            this.st = rand(10,20,1);
            charPoints -= this.st;
            this.ht = rand(1,charPoints-1,1);
            charPoints -= this.ht;
            this.iq = charPoints;
            break;
        case 4:
            this.iq = 20;
            charPoints -= this.iq;
            this.st = rand(10,20,1);
            charPoints -= this.st;
            this.ht = rand(1,charPoints-1,1);
            charPoints -= this.ht;
            this.dx = charPoints;
            break;
        case 5:
            this.dx = 20;
            charPoints -= this.dx;
            this.ht = rand(10,20,1);
            charPoints -= this.ht;
            this.st = rand(1,charPoints-1,1);
            charPoints -= this.st;
            this.iq = charPoints;
            break;
        default:
                this.st = 10;
                this.dx = 10;
                this.iq = 10;
                this.ht = 10;
                break;

    }
}

//Place un certain nombre d'items en fonction de la taille du donjon et de la position de départ du héros
function placeMonster(avoidH, avoidI, tabFree) {
    var cmp = 0;
    var nbMonsters = 0;
    var coord = [0,0];
    
    for(var i = tabFree.length-1; i >= 0; i--) {
        for(var j = tabFree[i].length-1; j >= 0; j--) {
            (tabFree[i][j] === 199) ? cmp++ : '';       //compte le nombre de cases disponible
        }
    }
    
    nbMonsters = rand(cmp/14, cmp/7, 1);                    //nombre de monstres à générer
    
    for(var k = nbMonsters; k >= 0 ; k--) {    
        do {
            coord = placeIt();
        }while(coord === avoidH[0] && coord[1] === avoidH[1] || avoidI[coord[1]][coord[0]] || enemies[coord[1]][coord[0]]); //Ne place pas de monstre sous la position de départ du héros ou s'il y a déjà un objet
        
        var tmp = new Monster(coord[0], coord[1]);
        enemies[coord[1]][coord[0]] = tmp;
    
        drawMonster(coord, tmp);
    }
}

function drawMonster(coord, enemy) { 
    var tileRow = (enemy.quelType / monstersNumTiles) | 0;  //Bitewise OR operation = Math.floor en plus rapide
    var tileCol = (enemy.quelType % monstersNumTiles) | 0;  //Permet de localiser le tile sur notre image par ex. on veut la 10 --> math.floor(10/16) = 0 et math.floor(10%16) = 10
    ecxt.drawImage(monstersImage, (tileCol*TILESIZE), (tileRow*TILESIZE), TILESIZE, TILESIZE, (coord[0]*TILESIZE), (coord[1]*TILESIZE), TILESIZE, TILESIZE);
}

function fight(coordH) {
    
}