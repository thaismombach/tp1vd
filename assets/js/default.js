var dataContent;
var quantElem = 20;
var page = 0;
var numPages = 0;

$(document).ready(function () {
  //load table from a file
  d3.csv("data/dados.csv", function(error, data) {

    var tableHeader = Object.keys(data[0]);  

    dataContent = data.map(function(d) {
      return Object.keys(d).map(function(k){
        return d[k]; 
      });
    });

    numPages = Math.ceil(dataContent.length/quantElem);

    var tHead = d3.select("thead");
    var tBody = d3.select("tbody");

    tHead.append("tr")
      .selectAll('th')
      .data(tableHeader).enter()
      .append("th")
        .text(function (column) { return column; });

    var rows = tBody.selectAll('tr')
        .data(dataContent.slice(page*quantElem, (page+1)*quantElem))
        .enter()
        .append('tr');

    // create a cell in each row for each column
    var cells = rows.selectAll('td')
      .data(function (d) { return d; })
      .enter()
      .append('td')
        .text(function (d) { return d; });

    var table = document.getElementById("tabelaDados");
    var title = table.getElementsByTagName("th");
    for (i = 0; i < title.length; i++) {
      title[i].addEventListener("click", sortTable);
    }

  });
});

$('#next').click(function() {
  if (page == 73) return;
  page++;
  var table = document.getElementById("tabelaDados");
  table.getElementsByTagName('tbody')[0].innerHTML = '';

  var tBody = d3.select("tbody");
  console.log(tBody);
  var rows = tBody.selectAll('tr')
      .data(dataContent.slice(page*quantElem, (page+1)*quantElem))
      .enter()
      .append('tr');

  // create a cell in each row for each column
  var cells = rows.selectAll('td')
    .data(function (d) { return d; })
    .enter()
    .append('td')
      .text(function (d) { return d; });

  document.getElementById('currentPage').innerHTML = page+1;
});

$('#last').click(function() {
  if (page == 0) return;
  page--;
  var table = document.getElementById("tabelaDados");
  table.getElementsByTagName('tbody')[0].innerHTML = '';

  var tBody = d3.select("tbody");
  var rows = tBody.selectAll('tr')
      .data(dataContent.slice(page*quantElem, (page+1)*quantElem))
      .enter()
      .append('tr');

  // create a cell in each row for each column
  var cells = rows.selectAll('td')
    .data(function (d) { return d; })
    .enter()
    .append('td')
        .text(function (d) { return d; });

  document.getElementById('currentPage').innerHTML = page+1;
});

function searchTable() {
  var filter = document.getElementById('campoBusca').value;
  filter = filter.toUpperCase();
  var _table = document.getElementById('tabelaDados');
  tr = _table.getElementsByTagName('tr');
  for (var i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName('td');
    for (var j = 0; j < td.length; j++){
      var cur = td[j].innerHTML.toUpperCase();
      if (cur) {
        if (cur.indexOf(filter) > -1) {
          tr[i].style.display = '';
          break;
        }
        else tr[i].style.display = 'none';
      }
    }
  }
}

function sortTable() {
  var idx = $(this).closest('th').index();
  var rows, x, y, shouldSwitch, switchcount = 0;
  var table = document.getElementById("tabelaDados");
  var switching = true;
  //Set the sorting direction to ascending:
  var dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("tr");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (var i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[idx];
      y = rows[i + 1].getElementsByTagName("td")[idx];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
      else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++; 
    }
    else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function paginationDec(){

}

function paginationInc(){

}

// function sortTable() {
//   var n = $(this).closest('th').index();

//   sortOrder = !(sortColumn == n && sortOrder == 1);
//   sortColumn = n;

//   _tableBody = _tableBody.sort(function(a, b) {
//     if (sortOrder) {
//       return d3.ascending(a[sortColumn], b[sortColumn]);
//     }
//     else {
//       return d3.descending(a[sortColumn], b[sortColumn]);
//     }
//   });
//   console.log(_tableBody);

//   // updateTableBody(_tableBody, page); 

// }

// function updateTableBody(table, p){
//   console.log(table.length + " " + quantElem)
//   if (table.length > quantElem)
//     table = table.slice(p*quantElem, (p+1)*quantElem);

//   var tBody = d3.select("tbody");
//   var rows = tBody.selectAll('tr').data(table);

//   var cells = rows.selectAll('td')
//     .data(function (d) { return d; })
//       .text(function (d) { return d; });
// }

// function searchTable() {
//   var filter = document.getElementById("campoBusca").value;
//   filter = filter.toUpperCase();
//   _tableBody = []; 
//   for (var i = 0; i < tableBody.length; i++) {
//     var property = Object.values(tableBody[i])
//     for (var j = 0; j < property.length; j++){
//       elem = property[j].toUpperCase();
//       if (elem) {
//         if (elem.indexOf(filter) > -1) {
//           console.log(filter + " " + elem);
//           _tableBody.push(tableBody[i])
//           break;
//         } 
//       }
//     }
//   }

//   updateTableBody(_tableBody, page);
// }