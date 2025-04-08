const weights_weapon = {
'2 INT': 3, '4 INT': 5, '6 INT': 1,
'2 STR': 3, '4 STR': 5, '6 STR': 1,
'2 VIT': 3, '4 VIT': 5, '6 VIT': 1,
'2 DEX': 3, '4 DEX': 5, '6 DEX': 1,
'50 HP': 7, '100 HP': 1,
'25 MP': 7, '50 MP': 1,
'1 Stam': 1,
'20 HP Regen': 2, '40 HP Regen': 1,
'20 MP Regen': 2, '40 MP Regen': 1,
'5 Radius': 3, '10 Radius': 1,
'3 Magic': 3, '6 Magic': 1,
'5 Crit': 3, '10 Crit': 1};
const weights_armor = {
'2 INT': 3, '4 INT': 5, '6 INT': 1,
'2 STR': 3, '4 STR': 5, '6 STR': 1,
'2 VIT': 3, '4 VIT': 5, '6 VIT': 1,
'2 DEX': 3, '4 DEX': 5, '6 DEX': 1,
'50 HP': 7, '100 HP': 1,
'25 MP': 7, '50 MP': 1,
'1 Stam': 1,
'20 HP Regen': 2, '40 HP Regen': 1,
'20 MP Regen': 2, '40 MP Regen': 1,
'5 Heal': 3, '10 Heal': 1,
'5 Warding': 3, '10 Warding': 1,
'5 Block': 3, '10 Block': 1};
const values = {
'STR':1,'INT':1,'DEX':1,'VIT':1,'Stam':4,
'HP':0.04,'MP':0.08,'HP Regen':0.05,'MP Regen':0.05,
'Crit':1,'Block':1,'Radius':1,'Heal':1,'Magic':5/3,'Warding':1};
const atk = {4:7,6:5,8:4,10:3,12:2,14:1};
const hg = {3:7,4:5,5:4,6:3,7:2,8:1};
const tiers7 = {0:'#70f1ff',10:'#3280ff',20:'#a537ff',40:'#eb2a57',60:'#ff800e',80:'#ffee00',95:'#00c880',110:'#01ff00'};
const tiers3 = {0:'#70f1ff',4:'#3280ff',8:'#a537ff',15:'#eb2a57',25:'#ff800e',35:'#ffee00',45:'#00c880',55:'#01ff00'};
const statColors = {
'STR':'#c6905a','INT':'#57c4c5','DEX':'#c68abc','VIT':'#c68688','HP':'#e12228','HP Regen':'#ff4b50','MP':'#0097fe','MP Regen':'#59bbfe',
'Crit':'#ffee00','Block':'#ffee00','Radius':'#00c880','Heal':'#00c880','Magic':'#70f1ff','Warding':'#70f1ff','Stam':'#69fa5e'};
const shorten = {
'STR':'STR','INT':'INT','DEX':'DEX','VIT':'VIT','Stam':'STAM',
'HP':'HP','MP':'MP','HP Regen':'HPR','MP Regen':'MPR',
'Crit':'CRIT','Block':'BLK','Radius':'ABR','Heal':'HLS','Magic':'MAG','Warding':'WRD',
'ATK':'ATK','DEF':'DEF','UPG':'UPG','Nothing':'None'};
const lengthen = {
'STR':'Strength','INT':'Intelligence','DEX':'Dexterity','VIT':'Vitality','Stam':'Stamina',
'HP':'Health','MP':'Mana','HP Regen':'HP Recovery','MP Regen':'MP Recovery',
'Crit':'Crit Chance','Block':'Block Chance','Radius':'Ability Radius','Heal':'Heal/Shield','Magic':'Magic Damage','Warding':'Warding'};
const checkboxes = {
'STR':'#strcheck','INT':'#intcheck','DEX':'#dexcheck','VIT':'#vitcheck','Stam':'#stmcheck',
'HP':'#hpcheck','MP':'#mpcheck','HP Regen':'#hprcheck','MP Regen':'#mprcheck',
'Crit':'#crtcheck','Block':'#crtcheck','Radius':'#abrcheck','Heal':'#abrcheck','Magic':'#magcheck','Warding':'#magcheck'};
const possible1 = {
'STR':[2,4,6],'INT':[2,4,6],'DEX':[2,4,6],'VIT':[2,4,6],
'HP':[50,100],'MP':[25,50],'HP Regen':[20,40],'MP Regen':[20,40],'Stam':[1],
'Crit':[5,10],'Block':[5,10],'Radius':[5,10],'Heal':[5,10],'Warding':[5,10],'Magic':[3,6]};
const possible2 = {
'STR':[2,4,6,8,10,12],'INT':[2,4,6,8,10,12],'DEX':[2,4,6,8,10,12],'VIT':[2,4,6,8,10,12],
'HP':[50,100,150,200],'MP':[25,50,75,100],'HP Regen':[20,40,60,80],'MP Regen':[20,40,60,80],'Stam':[1,2],
'Crit':[5,10,15,20],'Block':[5,10,15,20],'Radius':[5,10,15,20],'Heal':[5,10,15,20],'Warding':[5,10,15,20],'Magic':[3,6,9,12]};
const atk_stats = new Set(['Crit','Magic','Radius']); const def_stats = new Set(['Block','Warding','Heal']);
var type = 'atk'; var mode = 'general'; var pts=0;

//actual code that runs
outcomes = simulate(weights_weapon);
summ = summarize(outcomes);
points = summ[0];
summary = summ[1];
totals = compile(points);

populateSummary(summary);
populateTable(outcomes);
populatePoints(totals,pts);
populateDropdowns();
 
//window.addEventListener("resize",rsz,true);//Resize listener
function sum(arr){return arr.reduce((a,b)=>a+b,0);}
function splitRoll(roll){return roll?[parseInt(roll.split(' ')[0]),roll.split(' ').slice(1).join(' ')]:'';}
function getColor(tiers,pts){
    let color;
    for(const tier of Object.keys(tiers)){
        if(pts>=tier){color=tiers[tier];}}
    return color;
}//get hex code from tier list & points

function simulate(weights,startStats=new Set(),startRolls=new Set()){
    const total = sum(Object.values(weights));
    const keys = Object.keys(weights);
    const outcomes = {};
    for(const r1 of keys){
        for(const r2 of keys){
            const stats = new Set(startStats);//init stats
            const rolls = new Set(startRolls);//init rolls
            const s1 = splitRoll(r1)[1];//get stat 1 type
            const s2 = splitRoll(r2)[1];//get stat 2 type
            const a1 = rolls.has(r1)?0.95:stats.has(s1)?0.45:0.2;//stat 1 apply chance
            const a2 = rolls.has(r2)?0.95:stats.has(s2)?0.45:0.2;//stat 2 apply chance
            stats.add(s1);rolls.add(r1);// apply roll 1 to simulate both applying
            const a3 = rolls.has(r2)?0.95:stats.has(s2)?0.45:0.2;//stat 2 apply chance if stat 1 applies
            const pn = (1-a1)*(1-a2);//chance of nothing
            const p1 = (1-a3)*a1;//chance of roll 1 alone
            const p2 = (1-a1)*a2;//chance of roll 2 alone
            const pb = a1*a3;//chance of both rolls applying
            const keyList = ['Nothing|Nothing',r1+'|Nothing',r2+'|Nothing',[r1,r2].sort().join('|')];//key list for outcomes
            for(let k of keyList){
                if(!(k in outcomes)) outcomes[k]=0;}//initialize keys
            const c = weights[r1]*weights[r2]/total/total; //chance of both rolls being selected from weights
            outcomes[keyList[0]] += pn * c;//add chance of nothing to totals
            outcomes[keyList[1]] += p1 * c;//add chance of roll 1 to totals
            outcomes[keyList[2]] += p2 * c;//add chance of roll 2 to totals
            outcomes[keyList[3]] += pb * c;}}// add chance of both to totals
    return outcomes;
}//create list of all possible outcomes of 2 rolls from a curse
function summarize(outcomes){
    points={};summary={};
    for(const key of Object.keys(outcomes)){
        rolls = key.split('|');//split into two roll strings
        r1=rolls[0];r2=rolls[1];stats={};point=0;//initialize stuff
        if(r1!='Nothing'){
            roll = splitRoll(r1);
            stats[roll[1]] = roll[0];}//add roll 1 to stats obj
        if(r2!='Nothing'){
            roll = splitRoll(r2);
            if(roll[1] in stats){stats[roll[1]]+=roll[0];}
            else{stats[roll[1]]=roll[0];}}//add roll 2 to stats obj
        for(const stat of Object.keys(stats)){//for each stat
            point += stats[stat]*values[stat];//add to score
            if(stat in summary){//if stat present in summary
                if(stats[stat] in summary[stat]){summary[stat][stats[stat]] += outcomes[key];}//add probability
                else{summary[stat][stats[stat]] = outcomes[key];}}//initialize
            else{summary[stat] = {};summary[stat][stats[stat]] = outcomes[key];}}//initialize
        if(point in points){points[point] += outcomes[key];}//add probability to points
        else{points[point] = outcomes[key];}}//initialize
    return [points,summary];
}//summarize into points odds and stat odds; returns [points,summary]
function compile(rpoints){
    const points = {};//initialize
    const total = sum(Object.values(atk));//total atk weight    
    for(const score of Object.keys(rpoints)){
        for(const a of Object.keys(atk)){
            const prob = rpoints[score] * atk[a]/total;//combined probability
            const newScore = parseInt(score)+parseInt(a);//total score
            if(newScore in points){points[newScore]+=prob;}//add
            else{points[newScore]=prob;}}}//initialize
    return points;
}//get total points odds including main roll

function newTable(elem,name,x,y,clss="table"){
    var table = $("<table id="+name+" class="+clss+">");
    for(let i=0;i<y;i++){
        row = "<tr>";
        for(let j=0;j<x;j++){
            row+="<td id=\""+name+"_x"+j+"y"+i+"\" data-x="+j+" data-y="+i+"></td>";}
        table.append($(row+"</tr>"));}
    table.append($("</table>"));
    $('#'+elem).html(table);
}//create table at elem location of given size
function populateStat(obj,elem,stat){
    const y = Object.keys(obj[stat]).length + 1; const x=3;
    const name = stat.replace(' ','');
    newTable(elem,name,x,y);
    $('#'+name).css('color',statColors[stat]||'White');
    $('#'+name+'_x0y0').text(shorten[stat]);
    $('#'+name+'_x1y0').text("Exactly");
    $('#'+name+'_x2y0').text("At Least");
    for(let i=1;i<y;i++){
        $('#'+name+'_x0y'+i).text(Object.keys(obj[stat])[i-1]);
        $('#'+name+'_x1y'+i).text(Number.parseFloat(100*Object.values(obj[stat])[i-1]).toFixed(4).slice(0,6)+'%');
        $('#'+name+'_x2y'+i).text(Number.parseFloat(100*sum(Object.values(obj[stat]).slice(i-1))).toFixed(4).slice(0,6)+'%');
        let z;
        $('#'+name+'_x1y'+i).attr('title','Chance of getting exactly '+Object.keys(obj[stat])[i-1]+' '+stat+'\nApprox. 1/'+((z=parseFloat((1/Object.values(obj[stat])[i-1]).toPrecision(2)))>1000?z/1000+'k':z));
        $('#'+name+'_x2y'+i).attr('title','Chance of getting at least '+Object.keys(obj[stat])[i-1]+' '+stat+'\nApprox. 1/'+((z=parseFloat((1/sum(Object.values(obj[stat]).slice(i-1))).toPrecision(2)))>1000?z/1000+'k':z));
        $('#'+name+'_x1y'+i).css('color','White');
        $('#'+name+'_x2y'+i).css('color','White');}        
}//create table and populate with stats
function populateSummary(obj){
    populateStat(obj,'Str','STR');
    populateStat(obj,'Int','INT');
    populateStat(obj,'Dex','DEX');
    populateStat(obj,'Vit','VIT');
    populateStat(obj,'Mp','MP');
    populateStat(obj,'Hp','HP');
    populateStat(obj,'Mpr','MP Regen');
    populateStat(obj,'Hpr','HP Regen');
    if(type=='atk'){
        populateStat(obj,'Mag','Magic');
        populateStat(obj,'Rad','Radius');
        populateStat(obj,'Crt','Crit');}
    else{
        populateStat(obj,'Mag','Warding');
        populateStat(obj,'Rad','Heal');
        populateStat(obj,'Crt','Block');}
    populateStat(obj,'Stm','Stam');
    const mainRolls = {};
    const total = sum(Object.values(atk));
    for(const key of Object.keys(atk)){
        if(mode=='headgear'){mainRolls[key/2+1]=atk[key]/total;}
        else{mainRolls[key]=atk[key]/total;}}
    const name = mode=='headgear'?'UPG':type=='atk'?'ATK':'DEF';
    populateStat(new Object({[name]:mainRolls}),'Atk',name);
}//populate summary table of tables
function populateTable(outcomes){
    const rolls = type=="atk"?Object.keys(weights_weapon):Object.keys(weights_armor);
    rolls.push('Nothing');
    newTable('table','tab',29,29,'big');
    for(let i=1;i<29;i++){
        $('#tab_x0y'+i).text(rolls[i-1]=='Nothing'?'None':(splitRoll(rolls[i-1])[0]+' '+shorten[splitRoll(rolls[i-1])[1]]));
        $('#tab_x'+(29-i)+'y0').text(rolls[i-1]=='Nothing'?'None':(splitRoll(rolls[i-1])[0]+' '+shorten[splitRoll(rolls[i-1])[1]]));
        $('#tab_x0y'+i).css('color',statColors[splitRoll(rolls[i-1])[1]]||'White');
        $('#tab_x'+(29-i)+'y0').css('color',statColors[splitRoll(rolls[i-1])[1]]||'White');}
    for(let i=1;i<29;i++){
        for(let j=1;j<=i;j++){
            $('#tab_x'+(29-i)+'y'+(j)).text((100*outcomes[[rolls[i-1],rolls[j-1]].sort().join('|')]).toFixed(4).slice(0,6)+'%');
            $('#tab_x'+(29-i)+'y'+(j)).attr('title','Chance of getting '+rolls[i-1]+' and '+rolls[j-1]+'\nApprox. 1/'+((z=parseFloat((1/outcomes[[rolls[j-1],rolls[i-1]].sort().join('|')]).toPrecision(2)))>1000?z/1000+'k':z));}}
}//populate large table of all outcomes
function populatePoints(chances,score=0){
    newTable('points','pts',4,30,'ptable');
    const points = Object.keys(chances);
    $('#pts_x0y0').text("Pts");
    $('#pts_x1y0').text("Exactly");
    $('#pts_x2y0').text("At Least");
    $('#pts_x3y0').text("Total");
    for(let i=1;i<30;i++){
        $('#pts_x0y'+i).text(Object.keys(chances)[i-1]);
        $('#pts_x1y'+i).text(Number.parseFloat(100*Object.values(chances)[i-1]).toFixed(5).slice(0,7)+'%');
        $('#pts_x2y'+i).text(Number.parseFloat(100*sum(Object.values(chances).slice(i-1))).toFixed(5).slice(0,7)+'%');
        $('#pts_x1y'+i).attr('title','Chance of getting exactly '+Object.keys(chances)[i-1]+' points\nApprox. 1/'+((z=parseFloat((1/Object.values(chances)[i-1]).toPrecision(2)))>1000?z/1000+'k':z));
        $('#pts_x2y'+i).attr('title','Chance of getting at least '+Object.keys(chances)[i-1]+' points\nApprox. 1/'+((z=parseFloat((1/sum(Object.values(chances).slice(i-1))).toPrecision(2)))>1000?z/1000+'k':z));
        $('#pts_x3y'+i).text(parseInt(Object.keys(chances)[i-1])+score);
        $('#pts_x3y'+i).css('color',getColor(mode=='general'?tiers7:tiers3,score+parseInt(Object.keys(chances)[i-1])));}
}//populate points table of tier odds
function populateDropdowns(){
    const possibilities = new Set(Object.keys(possible1)).difference(mode=='offhand'?new Set():type=='atk'?def_stats:atk_stats);
    let d1='<option></option>';let d2='<option></option>';//d1: possible rolls; d2: possible rolls + double rolls
    for(const stat of possibilities){
        const header = '<optgroup label="'+lengthen[stat]+'">';
        d1 += header;d2 += header;
        for(const amt of possible1[stat]){d1+='<option>'+amt+' '+stat+'</option>';}
        for(const amt of possible2[stat]){d2+='<option>'+amt+' '+stat+'</option>';}
        d1 += '</optgroup>';d2 += '</optgroup>';}
    for(let i=1;i<7;i++){$('#curse'+i+1).html(d2);$('#curse'+i+2).html(d1);}
}//populate dropdowns of cursed rolls

function update(){
    let rolls = new Set(); let stats = new Set(); let score = 0;
    //scroll work
    for(let i=1;i<7;i++){
        if($('#cursecheck'+i).is(':checked')){
            $('#curse'+i+'1').prop('disabled',false);
            $('#curse'+i+'2').prop('disabled',false);
            let r1=$('#curse'+i+'1').find(":selected").text();
            let r2=$('#curse'+i+'2').find(":selected").text();
            if(!(r1 in weights_weapon||r1 in weights_armor||!r1)){
                $('#curse'+i+'2').prop('disabled',true);
                $('#curse'+i+'2').prop("selectedIndex", 0);
                let num = splitRoll(r1)[0];
                if(num==10){r1=4+' '+splitRoll(r1)[1];r2=6+' '+splitRoll(r1)[1];}//10 -> 4 + 6
                else if(num%3==0&&num!=12){r1=(num/3)+' '+splitRoll(r1)[1];r2=(2*num/3)+' '+splitRoll(r1)[1];}//3 -> 2 + 3
                else{r1=(num/2)+' '+splitRoll(r1)[1];r2=r1;}}//2 -> 1 + 1
            rolls.add(r1);stats.add(splitRoll(r1)[1]);
            rolls.add(r2);stats.add(splitRoll(r2)[1]);
            let scrollScore = 0; scrollScore += parseInt($('#atk'+i).val())||0;
            if(mode=='headgear'){scrollScore += scrollScore - 2;} //headgear points map
            if(r1){scrollScore += splitRoll(r1)[0] * values[splitRoll(r1)[1]];}
            if(r2){scrollScore += splitRoll(r2)[0] * values[splitRoll(r2)[1]];}
            $('#a'+i).text(mode=='offhand'?'Atk/Def:':mode=='headgear'?'Upgrade:':type=='atk'?'Attack:':'Defense:');
            score += scrollScore;
            const color = scrollScore>0?getColor(mode=='general'?tiers7:tiers3,scrollScore*(mode=='general'?7:3)):'#262626';
            $('#scroll'+i).css('border-color',color);}
        else{
            $('#curse'+i+'1').prop('disabled',true);
            $('#curse'+i+'2').prop('disabled',true);
            let scrollScore = parseInt($('#atk'+i).val())||0;
            $('#a'+i).text('Points:');
            score += scrollScore;
            const color = scrollScore>0?getColor(mode=='general'?tiers7:tiers3,scrollScore*(mode=='general'?7:3)):'#262626';
            $('#scroll'+i).css('border-color',color);}}//update scroll states
    const color = score>0?getColor(mode=='general'?tiers7:tiers3,score):'';
    $('#final').css('border-color',color||'#262626');
    $('#score').css('color',color||'white');
    $('#score').text(score);
    //stat work
    for(const stat of Object.keys(checkboxes)){
        if(type=='atk'&&def_stats.has(stat)){continue;}//skip irrelevant stats
        if(type=='def'&&atk_stats.has(stat)){continue;}//skip irrelevant stats
        if(stats.has(stat)){$(checkboxes[stat]).prop('disabled',true);$(checkboxes[stat]).prop('checked',true);continue;}//skip & disable if on scrolls already
        if($(checkboxes[stat]).prop('disabled')){$(checkboxes[stat]).prop('disabled',false);$(checkboxes[stat]).prop('checked',false);} //re-enable if removed
        if($(checkboxes[stat]).is(':checked')){stats.add(stat);}}//add from checks
    //YIPPEE SIMULATION
    let outcomes = simulate(type=='atk'?weights_weapon:weights_armor,stats,rolls);
    let summ = summarize(outcomes);
    let points = summ[0];
    let summary = summ[1];
    let totals = compile(points);

    populateSummary(summary);
    populateTable(outcomes);
    populatePoints(totals,score);
}//collect states of all inputs & re-run simulations
function reset(){
    for(let i=1;i<7;i++){
        $('#cursecheck'+i).prop("checked",true);
        $('#curse'+i+'1').prop("selectedIndex", 0);
        $('#curse'+i+'2').prop("selectedIndex", 0);
        $('#curse'+i+'1').prop('disabled',false);
        $('#curse'+i+'2').prop('disabled',false);
        $('#atk'+i).val('');}
    for(const chk of Object.values(checkboxes)){$(chk).prop('checked',false);$(chk).prop('disabled',false);}
    update();
}
function setType(t='atk'){
    type=t;
    if(t=='atk'){
        $('label[for="crtcheck"]').text('CRIT');
        $('label[for="abrcheck"]').text('ABR');
        $('label[for="magcheck"]').text('MAG');}
    else{
        $('label[for="crtcheck"]').text('BLK');
        $('label[for="abrcheck"]').text('HEAL');
        $('label[for="magcheck"]').text('WRD');}
    update();
}//set type of scroll (atk/def); just a convenient way to change checkboxes too lol
function setMode(m='general'){
    if(m=='general'){
        $('#scroll3').removeAttr('style');
        $('#scroll4').removeAttr('style');
        $('#scroll5').removeAttr('style');
        $('#scroll6').removeAttr('style');
        $('#offhandPlaceholder').css('display','none');
        $('#headgearPlaceholder').css('display','none');
        $('#offhandSettings').css('display','none');
        $('#headgearSettings').css('display','none');}
    else if(m=='headgear'){
        $('#scroll3').css('display','none');
        $('#scroll4').css('display','none');
        $('#scroll5').css('display','none');
        $('#scroll6').css('display','none');
        $('#headgearPlaceholder').removeAttr('style');
        $('#offhandPlaceholder').css('display','none');
        $('#headgearSettings').removeAttr('style');
        $('#offhandSettings').css('display','none');}
    else if(m=='offhand'){
        $('#scroll3').css('display','none');
        $('#scroll4').css('display','none');
        $('#scroll5').css('display','none');
        $('#scroll6').css('display','none');
        $('#offhandPlaceholder').removeAttr('style');
        $('#headgearPlaceholder').css('display','none');
        $('#offhandSettings').removeAttr('style');
        $('#headgearSettings').css('display','none');
        $('#atkradio').prop('checked',true);}
    mode=m;
    reset();
    populateDropdowns();
}//set mode (general/headgear/offhand)
