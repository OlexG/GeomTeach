const socket = io()
var curslide = 0;

function createCode(){
  socket.emit("create_class")
}
function startClass(){
  socket.emit("start_class")
}
socket.on("created_class",(code)=>{
  document.getElementById('codeDisplay').innerText = code;
  document.getElementById('error').innerText = "";
  console.log(code);
})

socket.on("started_class",(code)=>{
  document.getElementById('centerDiv').remove();
  socket.emit("next_slide")
})

document.getElementById("curSlide")
  .addEventListener("click", function(event) {
    socket.emit("next_slide")
  });

socket.on('invalid_code', () => {
  document.getElementById('error').innerText = "Invalid Code";
})

socket.on('display_slide', (link) => {
  document.getElementById('curSlide').src = link;
  document.getElementById('displayDescription').innerText = "Currently displaying: slide";
})

socket.on('display_quiz', (link) => {
  document.getElementById('displayDescription').innerText = "Currently displaying: quiz";
})

socket.on('display_leaderboard', (link) => {
  document.getElementById('displayDescription').innerText = "Currently displaying: leaderboard";
})
