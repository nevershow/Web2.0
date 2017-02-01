var global = {
   game_area: null,
   pics: [],
   empty: null,
   time: null,
   step: null,
   start: false,
   firstload: true,
   difficulty: 1,
   timeId: null
}

window.onload = function() {
   if (global.firstload == true) { // if firstload, init the variable
      global.firstload = false;
      global.game_area = document.getElementById('fifteen');
      global.step = document.getElementById('step');
      global.time = document.getElementById('time');
      global.difficulty = document.getElementsByTagName('select')[0];
   }
   else { // remove the old puzzle
      while (global.game_area.hasChildNodes())
         global.game_area.removeChild(global.game_area.firstChild);
   }
   createPuzzle();  // create the puzzle

   global.empty = document.getElementById('empty');
   global.pics = document.getElementById('fifteen').children;
   for (var i = 0; i + 1 < global.pics.length; ++i) {
      global.pics[i].onclick = Move; // set click listener
   }

   if (global.start == true) {
      initPos(global.difficulty.selectedIndex + 1);  // init the pics' position
      global.time.textContent = '00:00';
      global.step.textContent = 0;
      global.timeId = setInterval(showTime, 1000);
   }

   document.getElementById('restart').onclick = function() {
      clearInterval(global.timeId);
      global.start = true;
      window.onload();  // reload the page
   }
}

function createPuzzle() { // create a 4x4 puzzle
   var frag = document.createDocumentFragment();
   for (var i = 1; i <= 4; ++i) {
      for (var j = 1; j <= 4; ++j) {
         if (i == 4 && j == 4) {
            var empty = document.createElement("div");
            empty.setAttribute('id', 'empty');
            empty.setAttribute('class', 'row4 col4');
            frag.appendChild(empty);
            break;
         }
         var pic = document.createElement("div");
         pic.setAttribute("id", "pic" + ((i - 1) * 4 + j));
         pic.setAttribute("class", "row" + i + " col" + j);
         frag.appendChild(pic);
      }
   }
   document.getElementById("fifteen").appendChild(frag);
}

function Move() {
   if (!global.start)  // if not start game, don't move the pic
      return;
   var clickPos = this.className.match(/[0-9]/g); // the pic be clicked
   var emptyPos = empty.className.match(/[0-9]/g); // the empty pic's position
   if (isValid(clickPos, emptyPos)) { // is the click pos valid
      var temp = this.className;
      this.className = empty.className;
      global.empty.className = temp;
      ++global.step.innerHTML;
      if (isDone())
         success();
   }
}

function initPos(difficulty) { // init pics' position, 3 kinds of difficulty
   var arr = [];
   if (difficulty == 1)
      arr = [10, 11, 14];
   else if (difficulty == 2)
      arr = [5, 6, 7, 9, 10, 11, 13, 14];
   else arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];

   arr.sort(function() {  // sort arr randomly in order to swap three pics
      return Math.random() - 0.5;
   });

   // swap three pics each time, the puzzle must be solved
   //more difficult mode will swap more pics
   for (i = 0; i < difficulty * 3; i += 3) {
      var temp = global.pics[arr[i]].className;
      global.pics[arr[i]].className = global.pics[arr[i + 1]].className;
      global.pics[arr[i + 1]].className = global.pics[arr[i + 2]].className;
      global.pics[arr[i + 2]].className = temp;
   }
}

function showTime() { // show the game time
   var curTime = global.time.textContent.split(':'),
      min = parseInt(curTime[0]),
      sec = parseInt(curTime[1]);
   if (sec == 59) {
      ++min, sec = 0;
   }
   else {
      ++sec;
   }
   if (min < 10)
      min = '0' + min;
   if (sec < 10)
      sec = '0' + sec;
   global.time.innerHTML = min + ':' + sec
}

function isValid(a, b) { // is the click position valid
   return (a[0] == b[0] && Math.abs(a[1] - b[1]) == 1)
            || (a[1] == b[1] && Math.abs(a[0] - b[0]) == 1);
}

function isDone() { // is the puzzle solved
   var done = true, pos = [];
   for (var i = 0; i < global.pics.length; ++i) {
      pos = global.pics[i].className.match(/[0-9]/g);
      id = global.pics[i].id.match(/[0-9]+/);
      if (id && id[0] != (pos[0] - 1) * 4 + parseInt(pos[1])) {
         done = false;
         break;
      }
   }
   return done;
}

function success() { // if success, alert the time and step
   clearInterval(global.timeId);
   var curTime = global.time.textContent.split(':');
   var diff = global.difficulty.selectedIndex,
   str = '恭喜你通过' + global.difficulty[diff].textContent + ',用时';
   if (parseInt(curTime[0]))
      str += parseInt(curTime[0]) + '分';
   if (parseInt(curTime[1]))
      str += parseInt(curTime[1]) + '秒';
   str += ',走了' + global.step.textContent + '步\n';
   if (diff == 2)
      str += '是在下输了!';
   else
      str += '你可以继续挑战' + global.difficulty[diff + 1].textContent + '!';
   global.start = false;
   alert(str);
}
