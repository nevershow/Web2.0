"use strict";
window.onload = function() {
   var tables = getAllTables();
   makeAllTablesFilterable(tables);
}

function getAllTables () {
   return document.getElementsByTagName("table");
}

function makeAllTablesFilterable (tables) {
   for (var i = 0; i < tables.length; ++i) {
      tables[i].num = i;
      makeTableFilterable(tables[i]);
   }
}

function makeTableFilterable (table) {
   table.insertAdjacentHTML("beforeBegin", "<input type = text placeholder = \"Type here and search ...\" id = tmp>");   //create a textbox for search
   var inputId = 'search' + table.num;
   document.getElementById('tmp').id = inputId;
   var trs = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr'),
       input = document.getElementById(inputId);

   input.oninput = function () {
      var txt = this.value,
      reg = new RegExp(txt, "g"),  // regular experssion(global)
      even = 0;

      for (var i = 0; i < trs.length; ++i) {
         var find = false;
         trs[i].style["display"] = "table-row";

         for (var j = 0; j < trs[i].cells.length; ++j) {
            trs[i].cells[j].innerHTML = trs[i].cells[j].innerHTML.replace(/<\/?span>/g, "");  //use reg to delete <span> and </span>

            if (txt && trs[i].cells[j].textContent.match(txt)) {
               trs[i].cells[j].innerHTML= trs[i].cells[j].innerHTML.replace(reg, "<span>" + txt + "</span>");  // highlight the search txt
               find = true;
            }
         }

         if (txt && !find)
            trs[i].style["display"] = "none";
         else {
            ++even;
            if (even % 2 === 0)  // change background-color
               trs[i].style["background-color"] = "rgb(221, 221, 221)";
            else trs[i].style["background-color"] = "white";
         }
      }
   }
};
