
// Function to save settings
function saveOptions(e) {
	if (e.target.nodeName == "INPUT" || e.target.nodeName == "LABEL"){
		let checkToggle = document.getElementById('kbsToggle').checked;
		let checkMenu = document.getElementById('kbsMenu').checked;
		let checkMinimizeSearch = document.getElementById('minimizeSearch').checked;
		let checkHideAddons = document.getElementById('hideAddons').checked;
		let checkDateGrouping = document.getElementById('dateGrouping').checked;

		chrome.storage.local.set({
			kbsToggle: checkToggle,
			kbsMenu: checkMenu,
			minimizeSearch: checkMinimizeSearch,
			hideAddons: checkHideAddons,
			dateGrouping: checkDateGrouping
		});
	}
}

// Restores select box and checkbox state using the preferences
function restoreOptions() {
	// Save settings when user interacts with page
	document.addEventListener('click', saveOptions);

	// Use default values to initialize settings
	chrome.storage.local.get({
		kbsToggle: false,
		kbsMenu: false,
		minimizeSearch: false,
		hideAddons: false,
		dateGrouping: false
	}, function(items) {
		document.getElementById('kbsToggle').checked = items.kbsToggle;
		document.getElementById('kbsMenu').checked = items.kbsMenu;
		document.getElementById('minimizeSearch').checked = items.minimizeSearch;
		document.getElementById('hideAddons').checked = items.hideAddons;
		document.getElementById('dateGrouping').checked = items.dateGrouping;
	});
}
document.addEventListener('DOMContentLoaded', restoreOptions);


// Change Ctrl button to Cmd for Mac
window.addEventListener('load', function(){
	if (window.navigator.platform.indexOf('Mac') >= 0) {
		document.getElementById('systemKey1').innerText = 'Cmd';
		document.getElementById('systemKey2').innerText = 'Cmd';
	}	
}, false)


// Function to make toggles work
function toggleSwitch() {
    console.log('click');
    this.toggleClass('toggle-button-selected');
}
const toggles = document.getElementsByClassName("toggle-button");
for (let i = 0; i < toggles.length; i++) {
    console.log('Adding event listener #' + i);
    toggles[i].addEventListener('click', toggleSwitch, false);
}

/*
Array.from(toggles).forEach(function(element) {
	element.addEventListener('click', toggleSwitch);
});
*/
// Array.from(toggles, c => c.addEventListener('click', toggleSwitch));