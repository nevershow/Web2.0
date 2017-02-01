window.onload = function () {
   document.onselectstart = function() {return false;};
   var game_area = document.getElementById('game_area'),
      start_stop = document.getElementById('start_stop'),
      randomNum = 0;

   //insert 60 moles
   game_area.insertAdjacentHTML("beforeEnd", "<hr/>");
   for (var i = 0; i < 60; i++) {
      game_area.insertAdjacentHTML("beforeEnd", "<div class='moles'><div></div></div>");
   }
   game_area.insertAdjacentHTML("beforeEnd", "<hr/>");

   // 3 kinds of mole
   moles = document.getElementsByClassName('moles');
   moles_wrong = document.getElementsByClassName('moles_wrong');
   mole_random = document.getElementsByClassName('mole_random');

   // get 3 input boxes
   score = document.getElementById('score');
   game_statu = document.getElementById('game_statu');
   time = document.getElementById('time');

   //Init
   timeId = 0;
   time.value = 0;
   score.value = 0;
   game_statu.value = "Game Over";

   for (var i = 0; i < 60; ++i) {
      moles[i].onclick = function() {
         if (game_statu.value == "Playing") {
            if (this.className === 'mole_random') {
               this.className = 'moles_wrong';
               ++score.value;
               randomNum = Math.round(Math.random() * 59);
               moles_wrong[randomNum].className = 'mole_random';
            }
            else {
               --score.value;
            }
         }
      };
   }

   start_stop.onclick = function() {
      if (game_statu.value == "Game Over") {
         while (moles.length) {
            moles[0].className = 'moles_wrong';
         }

         time.value = 30;
         score.value = 0;
         game_statu.value = "Playing";
         randomNum = Math.round(Math.random() * 59);
         moles_wrong[randomNum].className = 'mole_random';
         timeId = setInterval(changeTime, 1000);
      }

      else if (game_statu.value == "Playing") {
         game_statu.value = "Stop";
         clearInterval(timeId);
         while (moles_wrong.length) {
            moles_wrong[0].className = 'moles';
         }
      }

      else {
         while (moles.length) {
            moles[0].className = 'moles_wrong';
         }
         game_statu.value = "Playing";
         timeId = setInterval(changeTime, 1000);
      }
      this.blur();
   };
};

function changeTime() {
   --time.value;
   if (time.value == 0) {
      mole_random[0].className = 'moles';
      while (moles_wrong.length) {
         moles_wrong[0].className = 'moles';
      }
      game_statu.value = "Game Over";
      clearInterval(timeId);
      alert("Game Over.\nYour score is " + score.value);
   }
}
