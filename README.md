# GeomTeach
GeomTeach is a combination between Kahoot and Peardeck. It attempts to combine the fun aspects of Kahoot and the beneficial aspects of Peardeck. 

How to Use
Install the project onto your system. Install node js. Open cmd and cd into the project file path. Type the command "npm init". Install express, https and socket.io through npm install module-name. Type, node index.js. Visit localhost:30000/students/ for the student view and localhost:3000/teachers/ for the teacher view. 

How it Works
The current slide and the current students are stored on the node js server as variables and are served to the client through socket.io. The presentation is stored as images on the file system of the server. The project only allows support for one class currently.

Technology
Socket.io, Boostrap, HTML, Javascript, Node Js, CSS

File Structure
Client folder - contains the presentation images and the html/javascript files of the client
index.js - file in the root folder which contains all server logic

Problems
A major problem was DOM manipulation and setting everything app without frontend libraries like React.js and Vue.js. Early on we decided that we would not have enough time to set these libraries up however around halfway through we realized that setting them up might have been a better idea. Regardless, we had to settle for what we had. After a lot of errors and some hard work we managed to get a semi working project done. 

Issues
Currently, the app does not support multiple classes. Also, to change the presentation you have to directly change the images in the image folder and change the "sequence" array to add quizes/leaderboard displays.

Future Improvements
If we are to continue this project we would add integration with google slides and aditional "item" options (currenty we only have quiz, slide and leaderboard). Also, multiclass support would be added.
