"use strict";
window.onload = function() {
   var tables = getAllTables();
   makeAllTablesSortableAndFilterable(tables);
}

function getAllTables () {
   return document.getElementsByTagName("table");
}

function makeAllTablesSortableAndFilterable (tables) {
   for (var i = 0; i < tables.length; ++i) {
      tables[i].num = i;
      makeTableSortable(makeTableFilterable(tables[i]));
   }
}

function cmp (col) {
   return function (x, y) {  // sort in lexicographic order, not in ascll order
      var xText = x.cells[col].textContent.toLowerCase();
      var yText = y.cells[col].textContent.toLowerCase();
      if (isNaN(xText) || isNaN(yText)) {  // x or y is string
         if (xText > yText) return 1;
         else if (xText < yText) return -1;
         else return x.rowIndex - y.rowIndex;  // stable sort
      }
      else return (xText - yText);  // x, y are number
   }
}

function makeTableSortable (table) {
   var ths = table.getElementsByTagName('th'); // get thead's cells
   for (var i = 0; i < ths.length; ++i) {
      ths[i].onclick = function() {
         var arr = new Array(),
            tbody = table.getElementsByTagName("tbody")[0],
            even = 0;
         for (var j = 0; j < tbody.rows.length; ++j) {
            tbody.rows[j].style["background-color"] = "white"; // reset color
            arr[j] = tbody.rows[j];  // get tbody's rows and store in an array
         }

         if (this.className === "ascend") {
            this.className = "descend";
            arr.reverse();  // arr was sorted, just reverse it
         }
         else if (this.className === "descend") {
            this.className = "ascend";
            arr.reverse();  // arr was sorted, just reverse it
         }
         else {            //first click, sort arr from small to large
            for (var j = 0; j < ths.length; ++j)
               ths[j].className = "";
            this.className = "ascend";
            arr.sort(cmp(this.cellIndex));
         }

         for (var j = 0; j < arr.length; ++j)
            tbody.removeChild(tbody.rows[0]); //clear the old tbody

         for (var j = 0; j < arr.length; ++j) {
            tbody.insertRow(j);
            tbody.rows[j].innerHTML = arr[j].innerHTML;
            tbody.rows[j].style["display"] = arr[j].style["display"];
            tbody.rows[j].style["background-color"] = arr[j].style["background-color"];
            if (tbody.rows[j].style["display"] != "none")
               ++even;
            if (even && even % 2 === 0)
               tbody.rows[j].style["background-color"] = "rgb(221, 221, 221)";
         }
      };
   }
   return table;
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
   return table;
};
