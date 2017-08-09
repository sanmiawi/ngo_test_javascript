var jsonStr = '{"jsCart":[]}';
var obj = JSON.parse(jsonStr);
jsonStr = JSON.stringify(obj);			

$(document).ready(function() {
	'use strict';
	
	$("#cart_frm").on('submit', function(evt){
		evt.preventDefault();
		
		var prod_id = $('#prod_id').val();
		var prod_desc = $('#prod_desc').val();
		var qty = $('#qty').val();
		var price = $('#price').val();
		
		add_item(prod_id, prod_desc, qty, price);
		
		$('#prod_id').val("");
		$('#prod_desc').val("");
		$('#qty').val("");
		$('#price').val("");		
	});
	
});

function add_item(prod_id, prod_desc, qty, price){
	if(typeof(Storage) !== "undefined"){
		obj['jsCart'].push({"prod_id":"" + prod_id + "", "prod_desc":"" + prod_desc + "","qty":"" + qty + "","price":"" + price + ""});	
		localStorage.setItem("cart", JSON.stringify(obj));
		
		$("#result").removeClass("no-show");
		$("#recp_body").append( "<tr id='" + prod_id + "'><td>" + prod_id + "</td><td>" + prod_desc + "</td><td>" + qty + "</td><td>" + price + "</td><td><a onClick=\"get_item('" + prod_id + "')\" href='#' target='_self'>View</a>&nbsp;&nbsp;<a onClick=\"delete_item('" + prod_id + "')\" href='#' target='_self'>Delete</a></td></tr>");	
	}else{
		alert("Please upgrade your browser.");
	}
}

function get_item(id){
	if(id !== "" && typeof(Storage) !== "undefined"){
		try{		
			var obj = JSON.parse(localStorage.cart);
			$.each(obj['jsCart'], function(i, ob) {
				if(ob.prod_id == id){
					alert("" + ob.prod_id + ".   " + ob.prod_desc + "   " + ob.qty + "    " + ob.price + "");
				}	
			});			
		}catch(err){
			console.log("Error : " + err);
		}
	}
}	

function get_items(){
	var str_str = "";
	try{
		var obj = JSON.parse(localStorage.cart);
		$.each(obj['jsCart'], function(i, ob) {
		  
			try{
				str_str += "" + ob.prod_id + ".   " + ob.prod_desc + "   " + ob.qty + "    " + ob.price + "\n";
			}catch(err){
				console.log("Error : " + err);
			}				
		});	

		if(str_str == ""){
			str_str = "Your cart is empty. Please add some items.";
		}
		alert(str_str);		
	}catch(err){
		alert("Your cart is empty. Please add some items.");	
	}
}	

function delete_item(id){
	try{
		var obj = JSON.parse(localStorage.cart);
		$.each(obj['jsCart'], function(i, ob) {
			if(ob.prod_id == id){
//				delete ob;
				obj['jsCart'].splice(i, 1);
				localStorage.setItem("cart", JSON.stringify(obj));	
				$('#' + id).detach();
			}
		});	
	}catch(err){
		
	}

	if(obj['jsCart'].length <= 0){
		$("#result").addClass("no-show");
	}
}	

function empty_cart(){
	try{
		var obj = JSON.parse(localStorage.cart);
		delete obj['jsCart'];
		localStorage.removeItem("cart");
	}catch(err){
		alert("Cart is empty.");
	}
	
	$('#recp_body').html("");
}