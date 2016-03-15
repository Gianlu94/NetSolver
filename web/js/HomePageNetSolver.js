/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
	Octopus.init();
});

var Model = {
	init : function(){
		this.row=0;
	},
	
	incrementAndGet : function(){
		this.row++;
		return this.row;
	},
	
	decrement : function(){
		if (this.row >= 1){
			this.row--;
			//alert("***Decrement"+this.row);
		}
	},
	
	rowIndex : function(){
		if (this.row > 0){
			return this.row;
		}
		else{
			return -1;
		}
	}
}

var Octopus = {
	
	init : function(){
		Model.init();
		ViewHome.init();
	},
	
	incrementRow : function(){
		return Model.incrementAndGet();
	},
	
	decrement : function(){
		Model.decrement();
	},
	
	getRow : function(){
		return Model.rowIndex();
	}
	
}




var ViewHome = {
	init : function(){
		$("#getP").click(function(){
			$("#panelYourSolution").show();
		});
		
		$("#panelYourSolution").hide();
		
		$("#add_row").click(function(){
			var row = Octopus.incrementRow();
			//alert("***ROW  "+ row);
			var rowH = "<tr id='row"+row+"'>"+
						"<td><input type='text' name='name"+row+
						"' placeholder='HostName' class='form-control'/></td>"+
						"<td><input type='text' name='ip"+row+
						"' placeholder='Ip address' class='form-control'/></td>"+
						"<td><input type='text' name='net"+row+
						"' placeholder='Netmask' class='form-control'/></td>"+
						"<td><input type='text' name='gat"+row+
						"' placeholder='Gateway' class='form-control'/></td>"+
						"<td><input type='text' name='ser"+row+
						"' placeholder='Service' class='form-control'/></td>";
			$("#tableH").append(rowH);
		});
		
		$("#delete_row").click(function(){
			var row = Octopus.getRow();
			alert("***ROW" + row);
			$("#row"+row).remove();
			//alert("***ROW" + row);
			Octopus.decrement();
			
		});
		
		$("#extended").append("ciiancsnfvbsfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbfbffbf\n\
		fbffbffbbbbbbbbbbbbbbbbbbbb\n\
		vffvsfvvvvvvvvvvvvf");
	
		$("#compact").append("dvsfvfsvfsvsfvfsvfv\n\
		vfsvfsfvfsvsf\n\
		cdvdvd");
	}
}

