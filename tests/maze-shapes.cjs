/* Zero-dependency gameplay regression suite for GitHub Actions.
   Load the actual game script in a minimal fake browser, then exercise its public QA API. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html','utf8');
const match = html.match(/<script>\s*([\s\S]*?)<\/script>/);
assert(match,'embedded game script missing');
new vm.Script(match[1],{filename:'labyrinthe-inline.js'});
const app = {innerHTML:'',style:{}};
const document = {
 documentElement:{className:'',style:{setProperty(){}}},
 getElementById(id){return id==='app'?app:null;},
 addEventListener(){},querySelectorAll(){return[];}
};
class ImageStub{
 constructor(){this.complete=false;this.naturalWidth=0;this.width=0;this.onload=null;this.onerror=null;}
 set src(x){this._src=x;}get src(){return this._src;}
}
const window = {innerWidth:390,innerHeight:780,devicePixelRatio:1,
 addEventListener(){},scrollTo(){},matchMedia(){return {matches:false};}};
const storage={};
const context={window,document,navigator:{},location:{protocol:'file:',hostname:''},
 Image:ImageStub,localStorage:{getItem(k){return storage[k]||null;},setItem(k,v){storage[k]=v;}},
 setTimeout,clearTimeout,setInterval,clearInterval,console};
vm.runInNewContext(match[1],context,{timeout:20000,filename:'labyrinthe-inline.js'});
const game=window.LabyrintheTest;
assert(game,'game test API not initialized');
assert.equal(game.worlds.length,28,'28 worlds are expected');
assert.equal(game.worldQuests.length,28);
const ids=new Set(game.worlds.map(w=>w.id));
assert.equal(ids.size,28,'world identifiers must be distinct');
let maps=0,books=0,portalLevels=0,carvings=0;const patterns=new Set(),styles=new Set();
function count(grid,sym){let total=0;for(const line of grid)for(const t of line)if(t===sym)total++;return total;}
function reachable(g,origin,blocked){return new Set(game.bfs(g,origin[0],origin[1],blocked).q.map(([x,y])=>x+','+y));}
function checkMap(cfg){
 const config={...cfg,shapeVersion:3};
 const map=game.generate(config),n=config.size,tag=config.id||config.title;
 assert(map.silhouette,'no silhouette '+tag);
 assert(map.layout&&map.layout.style,'no theme architecture '+tag);
 assert.equal(map.grid.length,n,tag);
 assert.equal(map.silhouette.footprint.length,n,tag);
 assert(map.silhouette.nodeCount>=8,'too few usable nodes '+tag);
 assert.equal(map.grid[map.start[1]][map.start[0]],'.','invalid start '+tag);
 assert(map.silhouette.footprint[map.start[1]][map.start[0]],'start outside shape '+tag);
 assert(map.start[0]>=1&&map.start[1]>=1,'invalid maze spawn '+tag);
 const key=(x,y)=>x+','+y,reach=reachable(map.grid,map.start);
 assert(reach.has(key(...map.exit)),'exit unreachable '+tag);
 for(const book of map.books)assert(reach.has(key(book.x,book.y)),'book unreachable '+tag);
 for(const gem of map.crystals)assert(reach.has(key(...gem)),'gem unreachable '+tag);
 assert(map.books.length>=2,'missing education books '+tag);
 assert(map.crystals.length>=2,'not enough crystals '+tag);
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){
  if(map.grid[y][x]!=='#')assert(map.silhouette.footprint[y][x],'walkable cell outside silhouette '+tag+' '+x+','+y);
 }
 let blocked={};
 for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(map.grid[y][x]==='D'||map.grid[y][x]==='G')blocked[key(x,y)]=true;
 const initial=reachable(map.grid,map.start,blocked);
 if(map.needKey){assert.equal(count(map.grid,'K'),1,'missing key '+tag);let found=false;for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(map.grid[y][x]==='K'&&initial.has(key(x,y)))found=true;assert(found,'key behind door '+tag);}
 if(map.needSwitch){assert.equal(count(map.grid,'S'),1,'missing lever '+tag);let found=false;for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(map.grid[y][x]==='S'&&initial.has(key(x,y)))found=true;assert(found,'lever behind door '+tag);}
 if(map.needCrystals)assert(map.crystals.length>=map.needCrystals,'treasures impossible '+tag);
 if(config.type==='portal')portalLevels++;
 const again=game.generate({...config});
 assert.equal(JSON.stringify(map.grid),JSON.stringify(again.grid),'nondeterministic geometry '+tag);
 assert.equal(JSON.stringify(map.start),JSON.stringify(again.start),'nondeterministic start '+tag);
 styles.add(map.layout.style);carvings+=map.layout.cuts;
 books+=map.books.length;maps++;
}
for(const levels of game.worldQuests)for(const cfg of levels)checkMap(cfg);
for(const cfg of game.campaign)checkMap(cfg);
for(const cfg of game.academy)checkMap(cfg);
for(const world of game.worlds){
 const shape=game.makeMazeSilhouette(19,world.id);
 patterns.add(shape.footprint.map(row=>row.map(t=>t?'1':'0').join('')).join(''));
 assert(shape.start[0]>=1&&shape.start[1]>=1,'invalid shape origin '+world.id);
}
assert(patterns.size>=27,'too many silhouettes are identical: '+patterns.size);
assert(styles.size>=8,'not enough architectural families');
assert(carvings>=70,'themed rooms/corridors were not carved');
for(const levels of game.worldQuests){const variants=new Set(levels.map(c=>game.generate({...c,shapeVersion:3}).layout.variant));assert(variants.size>=3,'no six-level variation '+levels[0].world);}
const legacyCfg={...game.worldQuests[7][0]};
const legacy=game.generate(legacyCfg);
assert.equal(legacy.silhouette,null,'legacy saves should keep square maps');
assert.equal(legacy.start[0],1);assert.equal(legacy.start[1],1);
const saved=game.makeRun({...game.worldQuests[7][3],shapeVersion:2});
const resumed=game.unpackRun(game.packRun(saved));
assert(resumed.map.silhouette,'saved V4.4 run lost silhouette');
assert.equal(resumed.map.layout,null,'V4.4 save must preserve old maze interior');
assert.equal(resumed.x,saved.x);assert.equal(resumed.y,saved.y);
const older=game.unpackRun(game.packRun(game.makeRun(legacyCfg)));
assert.equal(older.map.silhouette,null,'old saved run unexpectedly remapped');
game.start(game.worldQuests[6][0]);
assert.equal(game.getRun().cfg.shapeVersion,3,'new runs must select redesigned interior');
assert(game.getRun().map.layout,'V4.5 architecture missing');
assert(game.getRun().map.silhouette,'new run not shaped');
assert(game.getScreen()==='game','start failed');

// V4.6 collection regression: existing saves, unique awards, learning and camp.
// V4.7: world-specific sprite art and fallback must all be present.
const artMarkup=game.collectionPage();
assert(artMarkup.includes('prize-art-sprite'),'illustrated collectible art is missing');
assert(artMarkup.includes('atlas-0.webp')&&artMarkup.includes('atlas-1.webp')&&artMarkup.includes('atlas-2.webp'),'three original atlases not referenced');
assert.equal((artMarkup.match(/prize-art-sprite/g)||[]).length,84,'expected 84 original artifacts, four each for 21 worlds');
const gp=game.getProgress();
const album=game.ensureAlbum();
assert(game.prizeCount()===0,'fresh account should start with an empty souvenir album');
assert(game.collectionPage().includes('Mon Grand Album'),'illustrated collection missing');
assert(game.collectionPage().includes('assets/world-cards/unicorn.webp'),'world artwork not used in album');
assert(game.collectionPage().includes('Royaume des licornes'),'album world gallery missing');
assert.equal(game.awardPrize(6,0), 'w6-0','a first collectible should unlock');
assert.equal(game.awardPrize(6,0),null,'same prize cannot be won twice');
assert.equal(game.prizeCount(),1,'duplicate prize counted twice');
assert.equal(game.ownedInWorld(6),1,'world progress display inaccurate');
const runBefore=game.makeRun({...game.worldQuests[6][1],shapeVersion:3});
assert.deepEqual([...runBefore.newAwards],[],'new run should start with no pending prizes');
assert.equal(game.awardPrize(6,1,runBefore),'w6-1');
assert.equal(runBefore.newAwards.length,1,'pending prize reveal not stored');
const resumedRewards=game.unpackRun(game.packRun(runBefore));
assert.equal(resumedRewards.newAwards.length,1,'saved reward reveal lost on resume');
game.start(game.worldQuests[6][0]);
const finished=game.getRun();
finished.gems=finished.map.crystals.slice(0,2).map(p=>p[0]+','+p[1]);
game.win();
assert(gp.done['w6-0'],'world quest completion not saved');
assert(album.owned['w6-0']&&album.owned['w6-1'],'earned souvenirs not unlocked at finish');
assert.equal(game.getModal(),'win');
assert(app.innerHTML.includes('Mon album'),'win screen should link to album');
for(let stage=1;stage<6;stage++){game.start(game.worldQuests[6][stage]);game.win();}
assert(album.owned['w6-3'],'finishing all six stages must unlock crown');
assert.equal(game.awardPrize(6,3),null,'crown must not be granted twice');
// Correctly answering one real question unlocks the world knowledge prize.
game.start(game.worldQuests[6][0]);
const bookRun=game.getRun(),book=bookRun.map.books[0];
const question=game.selectBookQuestion(bookRun,book);
game.openBook(bookRun,book);
function fakeTarget(action,extras){return {parentNode:document,getAttribute(k){if(k==='data-action')return action;if(extras&&Object.prototype.hasOwnProperty.call(extras,k))return extras[k];return null;}};}
game.handleAction(fakeTarget('answer',{'data-answer':String(question.ok)}));
assert(album.owned['w6-2'],'correct answer did not unlock book souvenir');
assert.equal(gp.booksCorrect,1,'correct answer count not updated');
assert.equal(game.getModal(),'bookresult');
assert(app.innerHTML.includes('Nouveau souvenir de savoir'),'book reveal not displayed');
const oldGold=gp.coins;
gp.coins=90;
game.handleAction(fakeTarget('collection'));
assert.equal(game.getScreen(),'collection','album screen cannot open');
assert(app.innerHTML.includes('album-world-list'),'world collection layout not rendered');
game.handleAction(fakeTarget('albumtab',{'data-tab':'medals'}));
assert(app.innerHTML.includes('Les médailles'),'medals tab not rendered');
game.handleAction(fakeTarget('albumtab',{'data-tab':'camp'}));
assert(app.innerHTML.includes('Le camp des découvertes'),'camp tab not rendered');
const goldBefore=gp.coins;
game.handleAction(fakeTarget('campupgrade',{'data-upgrade':'garden'}));
assert.equal(gp.coins,goldBefore-15,'camp must spend only in-game coins');
assert.equal(gp.camp.garden,1,'camp upgrade did not persist');
assert(storage['elc_labyrinthe_aventure_v10'],'saving after upgrade failed');
assert(JSON.parse(storage['elc_labyrinthe_aventure_v10']).album.owned['w6-2'],'album not persisted');
gp.coins=oldGold;
// Migration from a real pre-album localStorage payload (without losing coins,
// completed stages, gems or camp improvements).
const savedPrevious={
 done:{'w4-0':{stars:3,gems:3,steps:51},'w4-1':{stars:2,gems:2,steps:73}},
 coins:83,booksRead:7,booksCorrect:4,camp:{library:2},relics:{'old-chest':true}
};
const previousStorage={'elc_labyrinthe_aventure_v10':JSON.stringify(savedPrevious)};
const previousApp={innerHTML:'',style:{}};
const previousWindow={innerWidth:390,innerHeight:780,devicePixelRatio:1,
 addEventListener(){},scrollTo(){},matchMedia(){return {matches:false};}};
const previousDoc={documentElement:{className:'',style:{setProperty(){}}},
 getElementById(k){return k==='app'?previousApp:null;},addEventListener(){},querySelectorAll(){return [];}};
vm.runInNewContext(match[1],{
 window:previousWindow,document:previousDoc,Image:ImageStub,navigator:{},location:{protocol:'file:',hostname:''},
 localStorage:{getItem(k){return previousStorage[k]||null;},setItem(k,v){previousStorage[k]=v;}},
 setTimeout,clearTimeout,setInterval,clearInterval,console
},{timeout:20000});
const historic=previousWindow.LabyrintheTest;
const historicAlbum=historic.ensureAlbum();
assert(historicAlbum.owned['w4-0'],'old completed stage must grant world postcard');
assert(historicAlbum.owned['w4-1'],'old crystal record must grant world gemstone');
assert.equal(historic.getProgress().coins,83,'old wallet must remain unchanged');
assert.equal(historic.getProgress().camp.library,2,'old camp must be retained');
assert(historic.getProgress().relics['old-chest'],'old relics must remain');

console.log('PASS',maps,'solvable levels;',books,'reachable books;',portalLevels,
 'portal-type levels;',patterns.size,'unique outlines;',styles.size,'maze architectures;',carvings,'carved tiles; 112-prize collection tested.');
