"use strict";
window.onload = function() {
   var maze = document.getElementById('maze'),
      start = document.getElementById('start'),
      end = document.getElementById('end'),
      boundary = document.getElementsByClassName('boundary'),
      statu = document.getElementById('statu'),
      inside = false,
      gamebegin = false,
      gameover = true;

   maze.onmouseleave = function() {
      inside = false;
   };

   start.onmouseenter = function() {
      if (!gamebegin) {
         statu.id = 'statu';
         maze.id = 'maze_game';
         gamebegin = true;
         gameover = false;
      }
      inside = true;
   };

   for (var i = 0; i < boundary.length; ++i) {
      boundary[i].onmouseenter = function() {
         if (gamebegin) {
            this.className = 'wall';
            statu.innerHTML = 'You Lose';
            statu.id = 'result';
            maze.id = 'maze';
            inside = gamebegin = false;
            gameover = true;

            this.onmouseleave = function() {
               this.className = 'boundary';
            };
         }
      };
   }

   end.onmouseenter = function() {
      if (inside) {
         statu.innerHTML = 'You Win';
      } else {
         statu.innerHTML = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
      }
      statu.id = 'result';
      maze.id = 'maze';
      gamebegin = inside = false;
      gameover = true;
   };
};
