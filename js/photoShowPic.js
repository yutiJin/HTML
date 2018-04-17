
function preparePlaceholder() {
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "img/placeholder.jpg");
	placeholder.setAttribute("alt", "my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var dectext = document.createTextNode("Click an image to look the show");
	description.appendChild(dectext);
	var gallery = document.getElementById("imagegallery");
	inserAfter(description, gallery);
	inserAfter(placeholder, description);
}

function showPic(whichpic) {
	if(!document.getElementById("placeholder")) return false;
//	console.log("you are good");
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	if(!document.getElementById("description")) return false;
	if(whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	}else {
		var text = "";
	}
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
	}
	return true;
}

function prepareGallery() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this) ? false : true;
		}
	}
}
addLoadEvent(showPic);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);