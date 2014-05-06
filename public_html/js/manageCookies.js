/* 
 * Création et chargement des cookies du jeu
 */

//Va chercher les infos dans un cookie donné
function getCookie(cookieName) {
    var name = cookieName + '=';
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Récupère ce qu'il y après partTofind dans un string
function getPartOfString(theString, partToFind) {
    var c = theString.trim();
    if (c.indexOf(partToFind) === 0) {
        return c.substring(partToFind.length, c.length);
    }
    return '';    
}

//Récupère le niveau
function getLvl() {
    var tmp = getCookie('lvl');
    
    if(tmp) {
        return parseInt(tmp);
    }
    else {
        alert('Erreur lors du chargement du niveau !');
        return 0;
    }
}

//Crée le cookie pour les items
function setItemsCookie(lvl) {
    var cookieString = 'items.' + lvl + ' = ';
    var k = 0;
    
    for(var i = 0; i < ROWTILECOUNT; i++) {
        for(var j = 0; j < COLTILECOUNT; j++) {
            if(!i && !j) {
                if(item[i][j]) {
                    cookieString += 'item.' + k + ':' + item[i][j].prepareCookie();
                    k++;
                }
                else {
                    cookieString += item[i][j];
                }     
            }
            else {
                if(item[i][j]) {
                    cookieString += ', item.' + k + ':' + item[i][j].prepareCookie();
                    k++;
                }
                else {
                    cookieString += ',' + item[i][j];
                }   
            }
        }
    }
    
    document.cookie = cookieString;
}

//Récupère et redessine les items au sol
function restoreItems(lvl) {
    var getItems = getCookie('items.' + lvl);
    var tabItems = getItems.split(',');
    var partOfString = '';
    var cmp = 0;
    var k = 0;
    
    if(getItems) {   
        icxt.clearRect(0, 0, TILESIZE*COLTILECOUNT, TILESIZE*ROWTILECOUNT);
 
        for(var i = 0; i < ROWTILECOUNT; i++) {
            for(var j = 0; j < COLTILECOUNT; j++) {
                if(tabItems[k] === "0") {
                    item[i][j] = parseInt(tabItems[k]);
                }
                else {
                    partOfString = getPartOfString(tabItems[k],'item.' + cmp + ':');
                    if(partOfString) {
                        item[i][j] = new Artefact(i, j);
                        item[i][j].restore(partOfString);
                        drawIt(icxt, itemsImage, item[i][j], item[i][j].quelType, itemsNumTiles);
                    }
                    cmp++;
                }
                k++;
            }
        }
    }
    else {
        alert('Erreur lors du chargement des artefacts !');    
    }
}

//Crée le cookie pour les monstres
function setMonstersCookie(lvl) {
    var cookieString = 'monsters.' + lvl + ' = ';
    var k = 0;
    
    for(var i = 0; i < ROWTILECOUNT; i++) {
        for(var j = 0; j < COLTILECOUNT; j++) {
            if(!i && !j) {
                if(enemies[i][j]) {
                    cookieString += 'monster.' + k + ':' + enemies[i][j].prepareCookie();
                    k++;
                }
                else {
                    cookieString += enemies[i][j];
                }     
            }
            else {
                if(enemies[i][j]) {
                    cookieString += ', monster.' + k + ':' + enemies[i][j].prepareCookie();
                    k++;
                }
                else {
                    cookieString += ',' + enemies[i][j];
                }   
            }
        }
    }
    
    document.cookie = cookieString;    
}

//Récupère et redessine les ennemis
function restoreEnemies(lvl) {
    var getMonsters = getCookie('monsters.' + lvl);
    var tabMonsters = getMonsters.split(',');
    var partOfString = '';
    var cmp = 0;
    var k = 0;
    
    if(getMonsters) {   
        ecxt.clearRect(0, 0, TILESIZE*COLTILECOUNT, TILESIZE*ROWTILECOUNT);
 
        for(var i = 0; i < ROWTILECOUNT; i++) {
            for(var j = 0; j < COLTILECOUNT; j++) {
                if(tabMonsters[k] === "0") {
                    enemies[i][j] = parseInt(tabMonsters[k]);
                }
                else {
                    partOfString = getPartOfString(tabMonsters[k],'monster.' + cmp + ':');
                    if(partOfString) {
                        enemies[i][j] = new Monster(i, j);
                        enemies[i][j].restore(partOfString);
                        drawIt(ecxt, monstersImage, enemies[i][j], enemies[i][j].quelType, monstersNumTiles);
                    }
                    cmp++;
                }
                k++;
            }
        }
    }
    else {
        alert('Erreur lors du chargement des ennemis !');    
    }    
}

//Récupère et redessine le niveau et le brouillard
function restoreGround(lvl) {
    var getGround = getCookie('ground.' + lvl);
    var tabGround = getGround.split(',');
    
    var getFog = getCookie('fog.' + lvl);
    var tabFog = getFog.split(',');
    
    var k = 0;
    
    if(getGround && getFog) {
        tcxt.clearRect(0, 0, TILESIZE*COLTILECOUNT, TILESIZE*ROWTILECOUNT);
        fcxt.clearRect(0, 0, TILESIZE*COLTILECOUNT, TILESIZE*ROWTILECOUNT);
        
        for(var i = 0; i < ROWTILECOUNT; i++) {
            for(var j = 0; j < COLTILECOUNT; j++) {
                ground[i][j] = parseInt(tabGround[k]);
                fog[i][j] = parseInt(tabFog[k]);
                k++;
                
                if(!fog[i][j]) {
                    fcxt.fillStyle = 'rgba(0, 0, 0, 1)';
                    fcxt.fillRect(j*TILESIZE, i*TILESIZE, TILESIZE, TILESIZE);
                }
                if(fog[i][j] === 1) {
                    fcxt.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    fcxt.fillRect(j*TILESIZE, i*TILESIZE, TILESIZE, TILESIZE);
                }
            }
        }  
        
        drawDungeon();
    }
    else if (!getGround) {
        alert('Erreur lors du chargement du plan du niveau !');    
    }
    else if(!getFog) {
        alert('Erreur lors du chargement du brouillard !');    
    }
    else {
        alert('Erreur inconnue lors du chargement des données du niveau !');
    }
}