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
const context={window,document,navigator:{},location:{protocol:'file:',hostname:''},
 Image:ImageStub,localStorage:{getItem(){return null;},setItem(){}},
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
console.log('PASS',maps,'solvable levels;',books,'reachable books;',portalLevels,
 'portal-type levels;',patterns.size,'unique outlines;',styles.size,'maze architectures;',carvings,'carved tiles; V4.4 saved-run safe.');
