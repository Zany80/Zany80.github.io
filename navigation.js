var cookies={};

document.addEventListener("DOMContentLoaded", function(event) {
	var observer = new MutationObserver(mutations=>{
		mutations.map(mutation=>{
			Array.from(mutation.addedNodes).map(node=>{
				if (node.tagName === "SCRIPT") {
					var s = document.createElement("script");
					s.text=node.text;
					if (node.parentElement !== null) {
						if (typeof(node.parentElement.added) === 'undefined')
							node.parentElement.added = [];
						node.parentElement.added[node.parentElement.added.length] = s;
						node.parentElement.removeChild(node);
					}
					document.head.appendChild(s);
				}
			})
		})
	})
	observer.observe(document.getElementById("content"), {childList: true, subtree: true,attributes: false});
	load("/header.html", "header", true);
	var change = false;
	// Map the cookies
	//~ var cookies = {};
	var c = document.cookie.split("; ");
	for (var s in document.cookie.split("; ")) {
		cookies[c[s].split("=")[0]] = c[s].split("=")[1];
		//~ console.log(c[s].split("=")[0] + " set to " + c[s].split("=")[1]);
	}
	// First, check if contents is set
	if (cookies.hasOwnProperty("contents")) {
		change = true;
		for (var s in cookies.contents.split(",")) {
			//~ console.log(s + " is " + cookies.contents.split(",")[s]);
			load(cookies["page_" + cookies.contents.split(",")[s]], cookies.contents.split(",")[s], true);
		}
		document.cookie = "contents=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	}
	else {
		cookies = document.cookie.split(";");
		// If it's not, try content first then handle the rest
		for (var s in cookies) {
			var key = cookies[s].split("=")[0];
			key=key.split(' ').join('');
			var value = cookies[s].split("=")[1];
			if (key == "page" || key == "page_content") {
				console.log("Loading "+value+" into content...");
				document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
				load(value, "content", true);
				change = true;
				break;
			}
		}
		for (var s in cookies) {
			var key = cookies[s].split("=")[0];
			key=key.split(' ').join('');
			var value = cookies[s].split("=")[1];
			// For compatibility with older pages, support 'page' as content
			// TODO: update the site to use a central script so that changes can be easier
			if (key == "page" || key == "page_content")
				continue;
			if (key.startsWith("page_")) {
				var dom_id = key.substring(5);
				if (document.getElementById(dom_id) == null) {
					continue;
				}
				console.log("Loading "+value+" into "+dom_id+"...");
				document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
				load(value, dom_id, true);
				change = true;
			}
		}
	}
	if (change)
		return;
	load("/main.html", "content");
	window.history.pushState({"content":document.getElementById("content").innerHTML,"title":document.title},"", "/");
});
function freeScripts(node){
	if (node === null)
		return;
	if (typeof(node.added) === 'object') {
		for (var script in node.added) {
			document.head.removeChild(node.added[script]);
		}
		node.added = {};
	}
	for (var child in node.children) {
		freeScripts(node.children[child]);
	}
}
function load(url, id, replace) {
	if (document.getElementById(id) === null) {
		console.error("Element of ID "+id + " does not exist!");
		return;
	}
	freeScripts(document.getElementById(id));
	var xhr = new XMLHttpRequest();
	var completed = false;
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById(id).innerHTML = xhr.responseText;
			document.getElementById(id).style="height:auto;";
			if (document.getElementById(id).getElementsByTagName("title").length > 0)
				document.title = document.getElementById(id).getElementsByTagName("title")[0].innerText;
			if (replace)
				window.history.replaceState({content:xhr.responseText,"title":document.title,element:id},"", url);
			else
				window.history.pushState({content:xhr.responseText,"title":document.title,element:id},"", url);
			completed = true;
		}
	};
	xhr.open("GET", url, false);
	xhr.send();
}
window.onpopstate=function(e) {
	if (e.state) {
		document.getElementById(e.state.element).innerHTML = e.state.content;
		document.title = e.state.title;
	}
}
