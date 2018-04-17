//添加odd，className 想修改奇数的颜色来着，但是和下面的行数一起就总是有错
//function stripeTable() {
//	if(!document.getElementsByTagName) return false;
//	var tables = document.getElementsByTagName("table");
//	for (var i = 0; i < tables.length; i++) {
//		var odd = false;
//		var rows = tables[0].getElementsByTagName("tr");
//		for (var j = 1; j < rows.length; j++) {
//			if (odd == true) {
//				addClass(rows[j], "odd");
//				odd = false;
//			} else{
//				odd = true;
//			}
//		}
//	}
//}

function highlightRows() {
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("td");
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
//		console.log("you are good");
		rows[i].onmouseover = function() {
			addClass(this, "highlight");
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		}
	}
}
//addLoadEvent(stripeTable);
addLoadEvent(highlightRows);
