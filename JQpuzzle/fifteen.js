var global = {
   game_area: null,
   pics: null,
   empty: null,
   time: null,
   step: null,
   start: false,
   difficulty: null,
   timeId: null
};

$(function() {
   createPuzzle();  // create the puzzle
   $('#restart').click(reStart);
});

function createPuzzle() { // create a 4x4 puzzle
   global.game_area = $('#fifteen');
   for (var i = 0; i < 4; ++i)
      for (var j = 1; j <= 4; ++j)
         $('<div></div>', {
            id: 'pic' + (i * 4 + j), class : 'row' + (i + 1) + ' col' + j
         }).appendTo(global.game_area);
   initGlobal();
}

function initGlobal() {   // init the global variable
   global.pics = global.game_area.children();
   global.pics.last().attr('id', 'empty');
   global.empty = $('#empty');
   global.time = $('#time');
   global.step = $('#step');
   global.difficulty = $('select')[0];
   global.pics.click(Move);
}

function reStart() {  // on click restart button
   clearInterval(global.timeId);
   global.start = true, global.time.text('00:00'), global.step.text(0);
   if (!isDone()) {
      global.game_area.empty();
      createPuzzle();
   }
   initPos(global.difficulty.selectedIndex + 1);  // init the pics' position
   global.timeId = setInterval(showTime, 1000);
}

function Move() {  // move the pic
   if (!global.start) return;  // if not start game, don't move the pic
   var clickPos = this.className.match(/[0-9]/g); // the pic be clicked
   var emptyPos = empty.className.match(/[0-9]/g); // the empty pic's position
   if (isValid(clickPos, emptyPos)) { // is the click pos valid
      swapClassName(this, global.empty[0]);
      ++global.step[0].textContent;
      if (isDone()) success();
   }
}

function swapClassName(a, b) { // swap two class name
   var temp = a.className;
   a.className = b.className;
   b.className = temp;
}

function randomArr(diff) {
   var arr = [10, 11, 14];
   if (diff == 2)
      arr = [5, 6, 7, 9, 10, 11, 13, 14];
   else if (diff == 3)
      arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
   arr.sort(function() {return Math.random() - 0.5;});
   return arr;
}

function initPos(diff) { // init pics' position, 3 kinds of difficulty
   var arr = randomArr(diff);
   // swap three pics each time, the puzzle must be solved
   //more difficult mode will swap more pics
   for (i = 0; i < diff * 3; i += 3) {
      swapClassName(global.pics[arr[i]], global.pics[arr[i + 1]]);
      swapClassName(global.pics[arr[i + 1]], global.pics[arr[i + 2]]);
   }
}

function showTime() { // show the game time
   var curTime = global.time.text().split(':'),
      min = curTime[0] * 1, sec = curTime[1] * 1;
   min += Math.floor((sec + 1) / 60);
   sec = (sec + 1) % 60;
   if (min < 10) min = '0' + min;
   if (sec < 10) sec = '0' + sec;
   global.time.html(min + ':' + sec);
}

function isValid(a, b) { // is the click position valid
   return (a[0] == b[0] && Math.abs(a[1] - b[1]) == 1)
            || (a[1] == b[1] && Math.abs(a[0] - b[0]) == 1);
}

function isDone() { // is the puzzle solved
   var done = true;
   global.pics.each(function() {
      var pos = this.className.match(/[0-9]/g), id = this.id.match(/[0-9]+/);
      if (id && id[0] != (pos[0] - 1) * 4 + parseInt(pos[1]))
         done = false;
   });
   return done;
}

function strToAlert(curTime, diff) { // return a str to alert
   var str = '恭喜你通过' + global.difficulty[diff].textContent + ',用时';
   if (curTime[0] * 1) str += curTime[0] * 1 + '分';
   if (curTime[1] * 1) str += curTime[1] * 1 + '秒';
   str += ',走了' + global.step.text() + '步\n';
   if (diff == 2)
     return (str + '是在下输了!');
   return str + '你可以继续挑战' + global.difficulty[diff+1].textContent+'!';
}

function success() { // if success, alert the time and step
   clearInterval(global.timeId);
   global.start = false;
   var curTime = global.time.text().split(':'),
      diff = global.difficulty.selectedIndex;
   alert(strToAlert(curTime, diff));
}
