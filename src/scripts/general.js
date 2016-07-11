var header_menu     = document.getElementById("header_menu");
var sidebar         = document.getElementById("sidebar");
var sidebarCloseBtn = document.getElementById("sidebar_header_close");


function toggleSidebar() {
	sidebar.classList.toggle("hide");
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