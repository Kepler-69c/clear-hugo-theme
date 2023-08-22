// modified code from: https://gist.github.com/cmod/5410eae147e4318164258742dd053993

window.addEventListener("load", (event) => {
    var fuse; // holds our search engine
    var searchVisible = false;
    var firstRun = true; // allow us to delay loading json data unless search activated
    var resultsAvailable = false; // Did we get any search results?

    const linkGrid = document.querySelector("header .linkGrid");
    const searchBtn = linkGrid.querySelector('button[aria-label="searchToggle"]'); 
    const searchIcon = linkGrid.querySelector(".feather-search");
    const closeIcon = linkGrid.querySelector(".feather-x");
    const searchInpt = linkGrid.querySelector("#searchInpt"); // input box for search
    const searchMenu = document.querySelector(".menu[usage='search']");

    const list = document.querySelector('.searchResults'); // targets the <ul>
    var first = list.firstChild; // first child of search list
    var last = list.lastChild; // last child of search list
    const searchResultsHeading = document.querySelector('.menu[usage="search"] h1'); // input box for search
    const noResults = document.querySelector('.noResult'); // input box for search

    // ==========================================
    // The keyboard event listeners running the show
    //

    searchBtn.addEventListener('click', toggleSearchMenu);
    searchInpt.onkeyup = e => executeSearch(searchInpt.value);

    document.addEventListener('keydown', function (event) {
        if (event.metaKey && event.key === '/') { // cmd + / toggles search
          toggleSearchMenu();
        }
      
        if (event.key === 'Escape') { // ESC closes search box
          if (searchVisible) {toggleSearchMenu()}
        }
      
        if (event.key == 'ArrowDown') { // next result
          if (searchVisible && resultsAvailable) {
            console.log("down");
            event.preventDefault(); // stop window from scrolling
            if (document.activeElement == searchInpt) { first.focus(); } // if the currently focused element is the main input --> focus the first <li>
            else if (document.activeElement == last) { last.focus(); } // if we're at the bottom, stay there
            else { document.activeElement.parentElement.nextSibling.firstElementChild.focus(); } // otherwise select the next search result
          }
        }

        if (event.key == 'ArrowUp') { // previous result
          if (searchVisible && resultsAvailable) {
            event.preventDefault(); // stop window from scrolling
            if (document.activeElement == searchInpt) { searchInpt.focus(); } // If we're in the input box, do nothing
            else if (document.activeElement == first) { searchInpt.focus(); } // If we're at the first item, go to input box
            else { document.activeElement.parentElement.previousSibling.firstElementChild.focus(); } // Otherwise, select the search result above the current active one
          }
        }
    })

    function toggleSearchMenu() {
        if (firstRun) loadSearch(), firstRun = false; // load json data on first run

        searchInpt.value = "";
        searchMenu.classList.toggle('menuOpen');
        searchIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        linkGrid.classList.toggle('linkGridActive');

        searchVisible = !searchVisible;
        searchVisible ? searchInpt.focus() : searchInpt.blur(); // (un)focus the input
    }

    // ==========================================
    // using the index we loaded on CMD-/, run 
    // a search query (for "term") every time a letter is typed
    // in the search box
    //
    function executeSearch(term) {
        let results = fuse.search(term); // the actual query being run using fuse.js
        let searchitems = ''; // our results bucket
        
        if (results.length === 0) { // no results based on what was typed into the input box
            resultsAvailable = false;
            searchitems = '';
            if (term !== "") {
            noResults.classList.remove('hidden')
            } else {
            noResults.classList.add('hidden')
            }
        } else { // build our html 
            noResults.classList.add('hidden')
            if (term !== "") {
            searchResultsHeading.classList.remove('hidden');
            }
        
            for (let item in results.slice(0, 5)) { // only show first 5 results
            const title = `<a href="${results[item].item.permalink}">${results[item].item.title}</a>`;
            const date = results[item].item.date ? new Date(results[item].item.date).toUTCString().substring(0, 16) : '';
            const contents = results[item].item.summary;
        
            searchitems = searchitems + `<li>${title}<small class="caption" style="margin: 0;">${date} | ${contents}</small></li>`;
            }
            resultsAvailable = true;
        }
        
        list.innerHTML = searchitems;
        if (results.length > 0) {
            first = list.firstChild.firstElementChild; // first result container — used for checking against keyboard up/down location
            last = list.lastChild.firstElementChild; // last result container — used for checking against keyboard up/down location
        }
    }
       
    // ==========================================
    // fetch some json without jquery
    //
    function fetchJSONFile(path, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
            }
        };
        httpRequest.open('GET', path);
        httpRequest.send();
    }
    
    // ==========================================
    // load our search index, only executed once
    // on first call of search box (CMD-/)
    //
    function loadSearch() {
        const lang = document.querySelector('head > meta[name="lang"]')?.getAttribute?.('content');
        fetchJSONFile(`${lang ? "/" + lang : ""}/index.json`, function (data) {
    
            var options = { // fuse.js options; check fuse.js website for details
            shouldSort: true,
            location: 0,
            distance: 100,
            threshold: 0.4,
            minMatchCharLength: 2,
            keys: [
                'title',
                'permalink',
                'contents',
                'summary'
            ]
            };
            fuse = new Fuse(data, options); // build the index from the json file
        });
    }
});