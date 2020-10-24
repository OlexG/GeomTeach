const socket = io()
var ourname = ""
var inclass = false;
var answered = false;

function joinClass(){
  let code = document.getElementById('codeInput').value;
  let name = document.getElementById('nameInput').value;
  socket.emit("join_class", {code:code, name:name})
  ourname = name
}

socket.on('joined_class', () => {
  inclass = true
  document.getElementById('inputForm').remove();
})


socket.on('invalid_code', () => {
  document.getElementById('error').innerText = "Invalid code"
})

socket.on('display_slide', (link) => {
  div = document.getElementById('slideDisplayStudent');
  div.innerHTML = ""
  var input = document.createElement("TEXTAREA");
  input.type="notes";
  input.id="notes";
  input.cols="150"
  var img = document.createElement("IMG");
  img.id = "curSlide";
  img.src = link;div;
  div.appendChild(img);
  div.appendChild(input);

  if (inclass = true){
    document.getElementById('curSlide').src = link;
  }
})

socket.on('display_leaderboard', (students) => {
  div = document.getElementById('slideDisplayStudent');
  div.removeChild(div.childNodes[1])

  var list = document.createElement("ul")

  for(let i = 0;i<students.length;i++){
    let student = students[i]
    let li = document.createElement("li")
    li.innerHTML = "<h1>"+ (i + 1) + " " + student.name +": "+student.points + "</h1>"
    list.appendChild(li)
  }

  div.appendChild(list)
  console.log(students)
})


socket.on('display_quiz', (obj) => {
  answered = false;
  div = document.getElementById('slideDisplayStudent');
  div.removeChild(div.childNodes[1])
  var bigdiv = document.createElement("DIV");
  bigdiv.className = "flexDownDiv";

  var text = document.createElement("H1");
  text.innerText = obj.question;
  bigdiv.appendChild(text);
  var options = document.createElement("SELECT")
  options.id = "answers";
  bigdiv.classList.add("select");
  var option1 = document.createElement("OPTION")
  option1.value = 1;
  option1.innerText = obj.option1;

  var option2 = document.createElement("OPTION")
  option2.value = 2;
  option2.innerText = obj.option2;

  var option3 = document.createElement("OPTION")
  option3.value = 3;
  option3.innerText = obj.option3;

  var button = document.createElement("BUTTON")
  button.className = "btn btn-primary"
  button.addEventListener("click", () => {
    if (!answered){
      if (document.getElementById("answers")){
        socket.emit("answer", {name:ourname, value: document.getElementById("answers").value});
      }
      answered = true;
    }
  });
  button.innerText = "Submit"


  options.appendChild(option1);
  options.appendChild(option2);
  options.appendChild(option3);
  bigdiv.appendChild(options);
  bigdiv.appendChild(button);
  div.appendChild(bigdiv);
})
