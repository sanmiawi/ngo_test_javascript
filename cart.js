var jsonStr = '{"jsCart":[]}';
var obj = JSON.parse(jsonStr);
jsonStr = JSON.stringify(obj);	
// localStorage.setItem("cart", JSON.stringify(obj));			

$(document).ready(function() {
//	'use strict';
	
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
		$('#prod_id').focus();
	});
	
});

function add_item(prod_id, prod_desc, qty, price){
	if(typeof(Storage) !== "undefined"){	
		try{
			obj = JSON.parse(localStorage.cart);
			var cnt = 0;
			var itms = 0;
			console.log(obj['jsCart'].length);
			if(obj['jsCart'].length <= 0){
				obj['jsCart'].push({"prod_id":"" + prod_id + "", "prod_desc":"" + prod_desc + "","qty":"" + qty + "","price":"" + price + ""});	
				localStorage.setItem("cart", JSON.stringify(obj));				
				
				$("#result").removeClass("no-show");
				$("#recp_body").append( "<tr id='" + prod_id + "'><td>" + prod_id + "</td><td>" + prod_desc + "</td><td>" + qty + "</td><td>" + price + "</td><td><a onClick=\"get_item('" + prod_id + "')\" href='#' target='_self'>View</a>&nbsp;&nbsp;<a onClick=\"delete_item('" + prod_id + "')\" href='#' target='_self'>Delete</a></td></tr>");				
			}else{
				$.each(obj['jsCart'], function(i, ob) {
					cnt += 1;						
					console.log(ob.prod_id);
					if(prod_id == ob.prod_id){
						ob.prod_desc = prod_desc;
						ob.qty = qty;
						ob.price = price;

						localStorage.setItem("cart", JSON.stringify(obj));
						itms += 1;
	//					$("#prd_" + prod_id).html("");
						$("#prd_" + prod_id).html("<td>" + prod_id + "</td><td>" + prod_desc + "</td><td>" + qty + "</td><td>" + price + "</td><td><a onClick=\"get_item('" + prod_id + "')\" href='#' target='_self'>View</a>&nbsp;&nbsp;<a onClick=\"delete_item('" + prod_id + "')\" href='#' target='_self'>Delete</a></td>");

						return;
					}else if(cnt == obj['jsCart'].length && itms == 0){
						obj['jsCart'].push({"prod_id":"" + prod_id + "", "prod_desc":"" + prod_desc + "","qty":"" + qty + "","price":"" + price + ""});	
						localStorage.setItem("cart", JSON.stringify(obj));				
						
						$("#result").removeClass("no-show");
						$("#recp_body").append( "<tr id='" + prod_id + "'><td>" + prod_id + "</td><td>" + prod_desc + "</td><td>" + qty + "</td><td>" + price + "</td><td><a onClick=\"get_item('" + prod_id + "')\" href='#' target='_self'>View</a>&nbsp;&nbsp;<a onClick=\"delete_item('" + prod_id + "')\" href='#' target='_self'>Delete</a></td></tr>");					
					}			
				});	
			}			
		}catch(err){
			obj = JSON.parse(jsonStr);
			obj['jsCart'].push({"prod_id":"" + prod_id + "", "prod_desc":"" + prod_desc + "","qty":"" + qty + "","price":"" + price + ""});	
			localStorage.setItem("cart", JSON.stringify(obj));				
			
			$("#result").removeClass("no-show");
			$("#recp_body").append( "<tr id='prd_" + prod_id + "'><td>" + prod_id + "</td><td>" + prod_desc + "</td><td>" + qty + "</td><td>" + price + "</td><td><a onClick=\"get_item('" + prod_id + "')\" href='#' target='_self'>View</a>&nbsp;&nbsp;<a onClick=\"delete_item('" + prod_id + "')\" href='#' target='_self'>Delete</a></td></tr>");				
			
			console.log("Error : " + err);			
		}
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
			console.log("Your cart is empty. Please add some items. \n\nError : " + err);
		}
	}else{
		alert("Please upgrade your browser.");
	}
}	

function get_items(){
	var str_str = "";
	if(typeof(Storage) !== "undefined"){	
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
	}else{
		alert("Please upgrade your browser.");
	}	
}	

function delete_item(id){
	if(id !== "" && typeof(Storage) !== "undefined"){		
		try{
			var obj = JSON.parse(localStorage.cart);
			$.each(obj['jsCart'], function(i, ob) {
				if(ob.prod_id == id){
	//				delete ob;
					obj['jsCart'].splice(i, 1);
					localStorage.setItem("cart", JSON.stringify(obj));	
					$('#prd_' + id).detach();
				}
			});	
		}catch(err){
			
		}
	}else{
		alert("Please upgrade your browser.");
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
	$('#result').html("");
}