
var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var code = "";
var classStarted = false;
var students = [];
var sequence = [["images/1.PNG"],
["quiz", "option 1", "option 2", "option 3", "Sample question?", "1"],
["leaderboard"],
["images/2.PNG"],
["quiz", "option 1", "option 2", "option 3", "Sample question?", "2"],
["leaderboard"],
["images/3.PNG"],
["images/4.PNG"]]
var cur = 0
app.use(express.static('client'))

io.on('connection', (socket) => {

  socket.on('create_class',()=>{
      if (code == ""){
        code = [...Array(6)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
      }
      console.log(code)
      socket.emit('created_class',code)
  })
  socket.on('start_class', () => {
    if (code != ""){
      classStarted = true;
      socket.emit('started_class')

    }
    else{
      socket.emit('invalid_code')
    }
  })
  socket.on('join_class', (n_code) => {
    console.log(n_code)
    console.log(code)
    if (n_code.code == code && code != ""){
      students.push({name:n_code.name, points:0})
      console.log(students)
      socket.emit('joined_class')
    }
    else{
      socket.emit('invalid_code')
    }
  })

  socket.on('next_slide', (n_code) => {
    if (sequence[cur][0] != "leaderboard" && sequence[cur][0] != "quiz"){
      io.emit('display_slide', sequence[cur][0]);
    }
    if (sequence[cur][0] == "quiz"){
      io.emit('display_quiz', {option1: sequence[cur][1], option2: sequence[cur][2], option3:sequence[cur][3], question: sequence[cur][4] })
    }

    if (sequence[cur][0] == "leaderboard"){
      students.sort((a,b)=>{
        return b.points-a.points
      })
      io.emit('display_leaderboard', students)
    }
    cur = (cur + 1) % 8;
  })
  socket.on('answer', (obj) => {
    for (var x = 0; x < students.length; x++){
      if (students[x].name == obj.name){
        if (obj.value == sequence[cur - 1][5]){
          students[x].points++;
        }
        else{
          console.log(obj.value)
          console.log(sequence[cur - 1][5])
          students[x].points--;
        }
        break;
      }
    }
    console.log(students);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
