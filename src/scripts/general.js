var header_menu                = document.getElementById("header_menu");
var sidebar                    = document.getElementById("sidebar");
var sidebarCloseBtn            = document.getElementById("sidebar_header_close");
var sidebarItemsSection        = document.querySelectorAll("#sidebar .section");
var sidebarItemsSectionHeaders = document.querySelectorAll("#sidebar .section .header");


function toggleSidebar() {
	sidebar.classList.toggle("hide");
}

function hideAllSections() {
	for (var i = 0; i<sidebarItemsSection.length; i++) {
		sidebarItemsSection[i].classList.remove("show");
	}
}

sidebarCloseBtn.onclick = toggleSidebar;
header_menu.onclick = toggleSidebar;

document.body.onscroll = function() {
	var slideshow = document.getElementById("slideshow");
	var headerSolidBackground = document.getElementById("header_solidbackground");
	var complete = slideshow.clientHeight - headerSolidBackground.clientHeight;
	var scroll = document.body.scrollTop;
	var alpha = scroll / complete;
	headerSolidBackground.style.opacity = alpha;
};

for (var i = 0; i<sidebarItemsSectionHeaders.length; i++) {
	sidebarItemsSectionHeaders[i].addEventListener("click", function(item) {
		if (!item.target.parentElement.classList.contains("show")) hideAllSections();
		item.target.parentElement.classList.toggle("show");
	});
}