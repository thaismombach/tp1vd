var dataContent;
var _dataContent;
var quantElem = 10;
var page = 0;
var numPages = 0;
var sortOrder = 1;
var sortColumn = -1;

var idx, latestIdx;
var tableHeader;

$(document).ready(function () {
  //load table from a file
  d3.csv("data/dados.csv", function(error, data) {

    tableHeader = Object.keys(data[0]);

    _dataContent = dataContent = data.map(function(d) {
      return Object.keys(d).map(function(k){
        return d[k]; 
      });
    });

    numPages = Math.ceil(dataContent.length/quantElem);

    var tHead = d3.select("thead");

    tHead.append("tr")
      .selectAll('th')
      .data(tableHeader).enter()
      .append("th")
      .text(function (column) { return column; });

    updateTableBody(dataContent, page); 

    var table = document.getElementById("tabelaDados");
    var title = table.getElementsByTagName("th");
    for (i = 0; i < title.length; i++) {
      title[i].addEventListener("click", sortTable);
    }

  });
});

$('#next').click(function() {
  if (page == numPages-1) return;
  page++;

  updateTableBody(_dataContent, page);
  document.getElementById('currentPage').innerHTML = page+1;
});

$('#last').click(function() {
  if (page == 0) return;
  page--;

  updateTableBody(_dataContent, page);
  document.getElementById('currentPage').innerHTML = page+1;
});

function searchTable() {
  numPages = 0;
  var filter = document.getElementById("campoBusca").value;
  filter = filter.toUpperCase();
  _dataContent = []; 
  for (var i = 0; i < dataContent.length; i++) {
    var property = Object.values(dataContent[i])
    for (var j = 0; j < property.length; j++){
      elem = property[j].toUpperCase();
      if (elem) {
        if (elem.indexOf(filter) > -1) {
          numPages++;
          _dataContent.push(dataContent[i])
          break;
        } 
      }
    }
  }
  numPages = Math.ceil(numPages/quantElem);
  updateTableBody(_dataContent, 0);
}

function sortTable() {
  var n = $(this).closest('th').index();
  idx = $(this).closest('th');

  sortOrder = !(sortColumn == n && sortOrder == 1);
  sortColumn = n;

  _dataContent = _dataContent.sort(function(a, b) {
    if (sortOrder) {
      if (latestIdx) latestIdx.html(tableHeader[latestIdx.index()]);
      latestIdx = idx;
      idx.html(tableHeader[n] + "<i class='fa fa-sort-asc fa-fw' aria-hidden='true'></i>");
      return d3.ascending(a[sortColumn], b[sortColumn]);
    }
    else {
      if (latestIdx) latestIdx.html(tableHeader[latestIdx.index()]);
      latestIdx = idx;
      idx.html(tableHeader[n] + "<i class='fa fa-sort-desc fa-fw' aria-hidden='true'></i>");
      return d3.descending(a[sortColumn], b[sortColumn]);
    }
  });
  updateTableBody(_dataContent, 0); 

}

function updateTableBody(data, p){
  page = p;
  var table = document.getElementById("tabelaDados");
  table.getElementsByTagName('tbody')[0].innerHTML = '';

  var tBody = d3.select("tbody");
  var rows = tBody.selectAll('tr')
      .data(data.slice(page*quantElem, (page+1)*quantElem))
      .enter()
      .append('tr');

  // create a cell in each row for each column
  var cells = rows.selectAll('td')
    .data(function (d) { return d; })
    .enter()
    .append('td')
    .text(function (d) { return d; });

  document.getElementById('currentPage').innerHTML = 1;
}
