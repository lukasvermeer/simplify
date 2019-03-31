
/* Add event listener to toggle the extension
chrome.browserAction.onClicked.addListener(function (tab) {

});
*/


// Add nojank style to html tag
var htmlEl = document.getElementsByTagName('html')[0];
htmlEl.classList.add('nojank');

// Add keyboard shortcut for toggling on/off custom style
function toggleNoJank(event) {
	// If Cmd+J was pressed, toggle nojank
	if (event.metaKey && event.which == 74) {
		htmlEl.classList.toggle('nojank');
		event.preventDefault();		
	}
}
window.addEventListener('keydown', toggleNoJank, false);

// Add noJank Toggle button
window.addEventListener('load', function() {
	var elem = document.createElement("div");
	elem.id = 'nojankToggle';
	elem.addEventListener('click', toggleNoJank, false);
	document.body.insertBefore(elem, document.body.childNodes[0]);
}, false);

// Hide Search box by default
htmlEl.classList.add('hideSearch');


// Set up urlHashes to track and update for closing Search and leaving Settings
var closeSearchUrlHash = location.hash.substring(1, 7) == "search" ? "#inbox" : location.hash;
var closeSettingsUrlHash = location.hash.substring(1, 9) == "settings" ? "#inbox" : location.hash;
window.onhashchange = function() {
	if (location.hash.substring(1, 7) != "search") {
		closeSearchUrlHash = location.hash;
	}
	if (location.hash.substring(1, 9) != "settings")  {
		closeSettingsUrlHash = location.hash;
		htmlEl.classList.remove('inSettings');
	}
	if (location.hash.substring(1, 9) == "settings")  {
		htmlEl.classList.add('inSettings');
	}
}

// Show back button if page loaded on Settings
if (location.hash.substring(1, 9) == "settings") {
	htmlEl.classList.add('inSettings');
}

/* Focus search input – NOT WORKING
function toggleSearchFocus() {
	var searchInput = document.querySelectorAll('input[aria-label="Search mail"]')[0];

	// We are about to show Search if hideSearch is still on the html tag
	if (htmlEl.classList.contains('hideSearch')) {
		searchInput.blur();
	} else {
		searchInput.focus();
	}
}
*/


// Setup search event listeners
function initSearch() {
	// See if Search form has be added to the dom yet
	var headerBar = document.getElementById('gb');
	var searchForm = (headerBar) ? headerBar.getElementsByTagName('form')[0] : false;

	// Setup Search functions to show/hide Search at the 
	// right times if we have access to the search field
	if (searchForm) {
		// Add .gb_vd, Gmail's own class to minimize search
		searchForm.classList.toggle('gb_vd');
		
		// Add function to search button to toggle search open/closed
		var searchButton = document.getElementsByClassName('gb_Ue')[0];
		var searchIcon = searchButton.getElementsByTagName('svg')[0];
		searchIcon.addEventListener('click', function() {
			htmlEl.classList.toggle('hideSearch');
			searchForm.classList.toggle('gb_vd');
			// toggleSearchFocus();
		}, false);

		// Add functionality to search close button to close search and go back
		var searchCloseButton = document.getElementsByClassName('gb_Xe')[0];
		var searchCloseIcon = searchCloseButton.getElementsByTagName('svg')[0];
		searchCloseIcon.addEventListener('click', function() {
			htmlEl.classList.toggle('hideSearch');
			searchForm.classList.add('gb_vd');
			location.hash = closeSearchUrlHash;
			// toggleSearchFocus();
		}, false);

		// If the search field gets focus and hideSearch hasn't been applied, add it
		var searchInput = document.querySelectorAll('input[aria-label="Search mail"]')[0];
		searchInput.addEventListener('focus', function() { 
			htmlEl.classList.remove('hideSearch');
		}, false );
	} else {
		// Call init function again if the search field wasn't loaded yet
		setTimeout(initSearch, 200);
	}
}

// Setup settigs event listeners
function initSettings() {
	// See if settings gear has be added to the dom yet
	var backButton = document.querySelector('header#gb div[aria-label="Go back"] svg');

	if (backButton) {
		// Add eventListener to Back button (conditional on urlHash = settings)
		var backButton = document.querySelector('header#gb div[aria-label="Go back"] svg');
		backButton.addEventListener('click', function() {		
			if (location.hash.substring(1, 9) == "settings") {
				location.hash = closeSettingsUrlHash;
				htmlEl.classList.remove('inSettings');
			}
		}, false);
	} else {
		// Call init function again if the gear button field wasn't loaded yet
		setTimeout(initSettings, 200);
	}
}

// Initialize everything
function init() {
	initSearch();
	initSettings();
}
window.addEventListener('DOMContentLoaded', init, false);

