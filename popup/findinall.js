'use strict';
var txtSearch = document.getElementById('txtSearch');
var btnPrevious = document.getElementById('btnPrevious');
var btnNext = document.getElementById('btnNext');
var divResults = document.getElementById('divResults');

btnNext.addEventListener('click', findAll);

function findAll() {
    var query = browser.tabs.query({});
    query.then(insertTable, onQueryError);
}

function onQueryError(error) {
    console.log("Error: ${error}");
}

function insertTable(tabs) {
    divResults.innerHTML = '';
    var tbl = document.createElement('table');
    if (tabs.length > 0) {
        for (tab of tabs) {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = tab.Title;
            tr.appendChild(td);
            tbl.appendChild(tr);
        }
    } else {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = 'No results';
        tr.appendChild(td);
        tbl.appendChild(tr);
    }
    divResults.appendChild(tbl);
}
