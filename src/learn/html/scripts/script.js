/** CONFIGURATION **/

var chapter = 1;           // Default chapter
var chapters = 30;          // Number of chapters in chapters folder
var instantrun = true;     // Instant run by default
var showCurricula = true; // Show curricula

/** CONFIGURATION END **/


var instantrun_checkbox = document.querySelector("#bv_instantrun");
var instantrun_fab = document.querySelector("#bv_run_fab");

var editor = ace.edit("code");
var result = document.querySelector("#result");

function reload() {
	result.innerHTML = editor.getValue();
	var scripts = result.querySelectorAll("script");
	console.log("Updating...");
	for (var i=0; i<scripts.length; i++) {
		console.log("Loading JS...");
		try {
			eval(scripts[i].innerHTML);
		} catch (e) {
			console.log("JS error!");
		}

		console.log("JS loaded");
	}
}

function loadInstantRun() {
	value = !instantrun_checkbox.checked;
	if (value) {
		instantrun_fab.classList.remove("hide");
		editor.session.off('change', reload);
	} else {
		instantrun_fab.classList.add("hide");
		editor.session.on('change', reload);
		reload();
	}
}

editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/html");

if (instantrun) instantrun_checkbox.checked = true;


result.innerHTML = editor.getValue();
if (instantrun) editor.session.on('change', reload);

instantrun_checkbox.addEventListener("click", loadInstantRun);
document.querySelector("#bv_run_fab").addEventListener("click", reload);
loadInstantRun();

if (!showCurricula) {
	curricula = document.querySelector("html.realhtml > body > #content > #curricula");
	curricula.style.display = "none";
}


var controls_plus = document.querySelectorAll(".bv_controls_plus");
for (var i=0; i<controls_plus.length; i++) {
	controls_plus[i].addEventListener("click", function(e) {
		control_plus = e.target;
		column = control_plus.parentElement.parentElement;
		flex = column.style.flexGrow != ""? parseFloat(column.style.flexGrow) : 1;
		flex += 0.2;
		column.style.flexGrow = flex;
	});
}

var controls_minus = document.querySelectorAll(".bv_controls_minus");
for (var i=0; i<controls_minus.length; i++) {
	controls_minus[i].addEventListener("click", function(e) {
		control_minus = e.target;
		column = control_minus.parentElement.parentElement;
		flex = column.style.flexGrow != ""? parseFloat(column.style.flexGrow) : 1;
		flex -= 0.2;
		column.style.flexGrow = flex;
	});
}

var controls_next = document.querySelectorAll(".bv_controls_next");
for (var i=0; i<controls_next.length; i++) {
	controls_next[i].addEventListener("click", function(e) {
		if (chapter < chapters) {
			chapter++;
			var iframe = document.querySelector("iframe#bv_curricula_iframe");
			iframe.src = "chapters/chapter" + chapter + ".html";
		}
	});
}

var controls_prev = document.querySelectorAll(".bv_controls_prev");
for (var i=0; i<controls_prev.length; i++) {
	controls_prev[i].addEventListener("click", function(e) {
		if (chapter > 1) {
			chapter--;
			var iframe = document.querySelector("iframe#bv_curricula_iframe");
			iframe.src = "chapters/chapter" + chapter + ".html";
		}
	});
}

if(window.location.hash) {
	chapter = window.location.hash.substr(1);
	var iframe = document.querySelector("iframe#bv_curricula_iframe");
	iframe.src = "chapters/chapter" + chapter + ".html";
}
