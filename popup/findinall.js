'use strict';
var txtSearch = document.getElementById('txtSearch');
var btnPrevious = document.getElementById('btnPrevious');
var btnNext = document.getElementById('btnNext');
var divResults = document.getElementById('divResults');
var divError = document.getElementById('divError');

btnNext.addEventListener('click', findAll);
btnPrevious.addEventListener('click', queryAlternativa);

function findAll() {
    insereDiv('testando');

    try {
        var query = browser.tabs.query({currentWindow: true});
        query.then(insertTable, onQueryError);
    } catch (e) {
        console.error(e);
        insereDiv(e.message);
    }
}

function onQueryError(error) {
    var msgError = "Error: ${error}";
    console.error(`${error}`);
    insereDiv(msgError);
    insereDiv('deu merda');
}

function insereDiv(string) {
    var div = document.createElement('div');
    div.innerHTML = string;
    document.body.appendChild(div);
}

function criaLinha(colunas) {
    var tr = document.createElement('tr');
    if (isArray(colunas)) {
        for (let i = 0; i < colunas.length; i++) {
            td.appendChild(coluna[i]);
        }
    } else {
        td.appendChild(colunas);
    }
    return tr;
}

function criarColuna(texto) {
    var td = document.createElement('td');
    td.textContent = texto;
    return td;
}

function isArray(objeto) {
    return Object.prototype.toString.call(objeto) === '[object Array]';
}

function insertTable(tabs) {
    divResults.innerHTML = '';

    var tbl = document.createElement('table');

    tbl.appendChild(criarLinha(criarColuna(tabs.toString)));

    var i = 0;
    if (tabs.length > 0) {
        for (tab of tabs) {
            var colunas = [];

            i++;
            colunas.push(criarColuna(i));
            colunas.push(criarColuna(tab.Title));
            colunas.push(criarColuna(tab.toString()));

            tbl.appendChild(criarLinha(colunas));
        }
    } else {
        tbl.appendChild(criarLinha(criarColuna('Sem resultados')));
    }
    divResults.appendChild(tbl);
}

// Retirada da MDN
function logTabs(tabs) {
  for (var tab of tabs) {
    // tab.url requires the `tabs` permission
    console.log(tab.url);
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function queryAlternativa() {
    var querying = browser.tabs.query({});
    querying.then(logTabs, onError);
}
