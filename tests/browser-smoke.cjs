/* Browser QA for GitHub Pages build: real mobile/tablet layouts and main flows. */
'use strict';
const assert=require('node:assert/strict');
const {spawnSync}=require('node:child_process');
const path=require('node:path'), fs=require('node:fs');
const {chromium}=require('playwright-core');
function chromePath(){
 for(const name of ['google-chrome','google-chrome-stable','chromium','chromium-browser']){
  const p=spawnSync('which',[name],{encoding:'utf8'});
  if(p.status===0&&p.stdout.trim())return p.stdout.trim();
 }
 throw new Error('No Chromium/Chrome installed on the runner');
}
async function main(){
 const browser=await chromium.launch({executablePath:chromePath(),headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1});
 const page=await context.newPage(),exceptions=[];
 page.on('pageerror',e=>exceptions.push(String(e)));
 const url='file://'+path.resolve('index.html');
 await page.goto(url,{waitUntil:'load'});
 await page.waitForFunction(()=>window.LabyrintheTest&&window.LabyrintheTest.worlds.length===28);
 assert.match(await page.title(),/V4\.6/);
 assert.equal(await page.locator('.realm-card').count(),28);
 assert.equal(await page.locator('.album-home').count(),1,'home album card missing');
 await page.locator('.album-home [data-action=collection]').click();
 assert.equal(await page.locator('.album-world').count(),28,'collection does not show 28 worlds');
 assert.equal(await page.locator('.album-world summary img').count(),28,'world artwork not rendered');
 await page.locator('.album-world summary').first().click();
 assert.equal(await page.locator('.album-world').first().locator('.album-piece').count(),4,'four souvenirs per world expected');
 const loaded=await page.locator('.album-world summary img').first().evaluate(im=>im.complete&&im.naturalWidth>0);
 assert(loaded,'world artwork did not load');
 fs.mkdirSync('qa-screens',{recursive:true});
 await page.screenshot({path:'qa-screens/album-phone.png',fullPage:true});
 await page.locator('.album-tabs [data-tab=medals]').click();
 assert.equal(await page.locator('.album-medal').count(),12);
 await page.locator('.album-tabs [data-tab=camp]').click();
 assert.equal(await page.locator('.album-camp-item').count(),4);
 await page.locator('[data-action=home]').first().click();
 await page.locator('.realm-card[data-world="6"]').click();
 assert.equal(await page.locator('.world-quest-step').count(),6);
 assert.equal(await page.locator('.world-album-bar').count(),1,'world prize progress missing');
 await page.locator('.world-quest-step').first().click();
 await page.locator('.overlay [data-action=closemodal]').click();
 assert(await page.locator('#gameCanvas').isVisible(),'maze canvas not visible');
 const layout=await page.evaluate(()=>window.LabyrintheTest.getRun().map.layout.style);
 assert.equal(layout,'petals','unicorn world architecture differs unexpectedly');
 await page.locator('[data-action=map]').first().click();
 await page.screenshot({path:'qa-screens/maze-phone.png',fullPage:true});
 await page.setViewportSize({width:800,height:600});
 await page.waitForTimeout(160);
 await page.screenshot({path:'qa-screens/maze-tablet-landscape.png',fullPage:true});
 const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth,canvas:document.getElementById('gameCanvas').getBoundingClientRect().width}));
 assert(dims.scroll<=dims.viewport+3,'tablet horizontal overflow: '+JSON.stringify(dims));
 assert(dims.canvas>=220&&dims.canvas<=720,'maze canvas wrong size: '+JSON.stringify(dims));
 assert.deepEqual(exceptions,[],'unexpected JS errors: '+exceptions.join(' | '));
 console.log('PASS browser: 28 illustrated worlds, 112 souvenirs, 12 medals, 4 camp buildings, mobile and tablet canvas, no JS errors');
 await browser.close();
}
main().catch(e=>{console.error(e);process.exit(1);});
