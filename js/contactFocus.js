function focusLabels () {
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for (var i = 0; i < labels.length; i++) {
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLabels);

function resetFields(whichform) {
	if(Modernizr.input.placeholder) return;
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.type == "submit") continue;
		var check = element.placeholder || element.getAttribute('placeholder');
		if(!check) continue;
//		onfocus在tab键或单击表单字段触发
		element.onfocus = function() {
			var text = this.placeholder || this.getAttribute('placeholder');
			if (this.value == text) {
				this.className = '';
				this.value = "";
			}
		}
//		把焦点移出表单字段时触发
		element.onblur = function() {
			if(this.value == "") {
				this.className = 'placeholder';
				this.value = this.placeholder || this.getAttribute('placeholder');
			}
		}
		element.onblur();
	}
}
//addLoadEvent(resetFields);


function isFilled(field) {
	if(field.value.replace(' ', '').length == 0) return false;
	var placeholder = field.placeholder || field.getAttribute('placeholder');
	return(field.value != placeholder);
}
function isEmail(field) {
//	indexOf()方法返回调用string对象中第一次出现的指定值的索引
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
function validateForm(whichform) {
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if(element.required == 'require') {
			if(!isFilled(element)) {
				alert("Please fill in the '+element.name+' field.");
				return false;
			}
		}
		if(element.type == "email") {
			if(!isEmail(element)) {
				alert("The "+element.name+" field must be a vaild email address."); 
				return false;
			}
		}
	}
	return true;
}

//ajax
function getHTTPObject() {
	if(typeof XMLHttpRequest == "undefined"){
		XMLHttpRequest = function() {
			try { return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch(e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch(e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP");}
				catch(e) {}
			return false;
		}
	}
	return new XMLHttpRequest();
}
function displayAjaxLoading(element) {
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src", "img/loading.gif");
	content.setAttribute("alt", "Loading...");
	element.appendChild(content);
}
function submitFormWithAjax(whichform, thetarget) {
	var request = getHTTPObject();
	if(!request) return false;
	displayAjaxLoading(thetarget);
	var dataParts = [];
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
	}
	var data = dataParts.join("&");
	request.open('POST',whichform.getAttribute("action"), true); //异步请求
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if(request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				}else {
					thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
				}
			}else {
				thetarget.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}
	}
	request.send(data);
	return true;
}

//遍历文档中的所有form对象
function prepareForms() {
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);	
		thisform.onsubmit = function() {
			if(!validateForm(this)) return false;
			var article = document.getElementsByTagName('article')[0];
			if(submitFormWithAjax(this, article)) return false;
			return true;
		}
	}
}
addLoadEvent(prepareForms);