var gamestr=""
const player=document.getElementById("character")
const gold=document.getElementById("coin")
var block_x=0
var block_y=1
var coin_x=0
var coin_y=0
var dead=true
var this_block
var choice
var points=-1
var turn=0
var highscore=0
player.style.top=block_y*10-5+"vh"
document.getElementById("high").innerHTML=highscore
for (i=0;i<10;i++){
  for (j=0;j<10;j++){
    gamestr+="<div id='s"+j+i+"' class='square'></div>"
  }
  gamestr+="<br>"
}
function startgame(){
  dead=false
  check()
  player.style.height="10vh"
  player.style.width="10vh"
  player.style.opacity="100%"
  player.classList.remove("dead")
  document.getElementById("start").style.opacity="0"
  if (turn==0){
    document.getElementById("start").innerHTML="REVIVE"
  }
  turn+=1
}
document.getElementById("board").innerHTML=gamestr
player.style.height=100/length+"vh"
player.style.width=100/length+"vh"
function check(){
  check_block=document.getElementById("s"+block_y+block_x)
  if (check_block.style.opacity=="0"){//boxShadow!="none"
    dead=true
    player.classList.add("dead")
    document.getElementById("start").style.opacity="100%"
    player.style.height="50vh"
    player.style.width="50vh"
    player.style.opacity="0"
    block_x=0
    block_y=1
    dead=true
    points=0
    player.style.top=block_y*10-5+"vh"
    document.getElementById("points_thing").innerHTML=points
    player.style.left=block_x*10+"vh"
  }else if (block_x==coin_x && block_y==coin_y){
    makecoin()
    if (points>highscore){
      highscore=points
      document.getElementById("high").innerHTML=highscore
    }
  }
}
function choice(li){
  return li[Math.floor(Math.random()*li.length)]
}
makecoin()
if (choice([true,false,false,false,false])){
  console.log("jackpot!!")
  document.getElementById("character").innerHTML="<img src='octopus.png' id='octopus'>"
  document.getElementById("board").style.backgroundImage="url('octopus.png')"
  document.getElementById("points_thing").innerHTML="YOU LOOK SO CONFUSED!!! LOL"
  document.getElementById("points_thing").style.color="white"
}
function makecoin(){
  points+=1
  document.getElementById("points_thing").innerHTML=points
  document.getElementById("points_thing").style.color="black"
  coin_x=choice([1,2,3,4,5,6,7,8,9,0])
  coin_y=choice([1,2,3,4,5,6,7,8,9,0])
  gold.style.top=coin_y*10-4+"vh"
  gold.style.left=coin_x*10+"vh"
}
function change(){
  for (i=0;i<10;i++){
    for (j=0;j<10;j++){
      var this_block=document.getElementById("s"+j+i)
      h=choice([true,false])
      if (h){
        this_block.style.opacity="100%"
        this_block.style.marginTop="0"
      }else{
        this_block.style.opacity="0%"
        this_block.style.marginTop="5vh"
      }
    }
  }
  document.getElementById("s"+block_y+block_x).style.opacity="100%"
  document.getElementById("s"+block_y+block_x).style.boxShadow="0 2vh maroon"
  document.getElementById("s"+block_y+block_x).style.marginTop="0"
}
change()
setInterval(function(){change()},1000)
for (i=0;i<10;i++){
  for (j=0;j<10;j++){
    thissquare=document.getElementById("s"+j.toString()+i)
    thissquare.style.left=i*10+"vh"
    thissquare.style.top=j*10+"vh"
  }
}
function up(){
  if (block_y!=0 && !dead){
    block_y--
    player.style.top=block_y*10-5+"vh"
    check()
  }
}
function left(){
  if (block_x!=0 && !dead){
    block_x--
    player.style.left=block_x*10+"vh"
    check()
  }
}
function right(){
  if (block_x!=9 && !dead){
    block_x++
    player.style.left=block_x*10+"vh"
    check()
  }
}
function down(){
  if (block_y!=9 && !dead){
    block_y++
    player.style.top=block_y*10-5+"vh"
    check()
  }
}
document.addEventListener("keydown",event => {
  if (event.keyCode==38){
    up()
  }else if (event.keyCode==37){
    left()
  }else if (event.keyCode==39){
    right()
  }else if (event.keyCode==40){
    down()
  }
})