/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
	
	var arraySwitch = [];
	
	var SwitchInterface = {
	
		createSwitch : function(id){
			//Switch object
			var Switch = {
				idS:id,
				p1:1,
				p2:2,
				p3:3,
				p4:4,
				p5:5,
				p6:6,
				p7:7,
				p8:8
			};
		
			arraySwitch.push(Switch);
		
		},
		
		getSwitch : function (id){
			for (var i = 0; i<arraySwitch.length();i++){
				var Switch = arraySwitch[i];
				if (Switch.id == id)
					return Switch;
			}
		},
		
		deleteSwitch : function (id){
			var removed = false;
			for (var i = 0; i<arraySwitch.length() && !removed;i++){
				var Switch = arraySwitch[i];
				if (Switch.id == id){
					console.log("Swtich "+Switch.id+" removed");
					arraySwitch.splice(i,1);
					removed = true;
				}
			}
		},
		
		getSwitchPort : function(id){
			var arrayPorts = [];
			var Switch = getSwitch(id);
			if (Switch.p1 != 0){
				arrayPorts.push(Switch.p1);
			}
			if (Switch.p2 != 0){
				arrayPorts.push(Switch.p2);
			}
			if (Switch.p3 != 0){
				arrayPorts.push(Switch.p3);
			}
			if (Switch.p4 != 0){
				arrayPorts.push(Switch.p4);
			}
			if (Switch.p5 != 0){
				arrayPorts.push(Switch.p5);
			}
			if (Switch.p6 != 0){
				arrayPorts.push(Switch.p6);
			}
			if (Switch.p7 != 0){
				arrayPorts.push(Switch.p7);
			}
			if (Switch.p6 != 0){
				arrayPorts.push(Switch.p8);
			}
			return arrayPorts;
		},
		
		SetSwitchPort : function(id,port){
			for (var i = 0; arraySwitch.length; i++){
				if (arraySwitch[i].id == id){
					if (port == 1){
						arraySwitch[i].p1 = 1;
					}
					else if(port == 2){
						arraySwitch[i].p2 = 2;
					}
					else if(port == 3){
						arraySwitch[i].p3 = 3;
					}
					else if(port == 4){
						arraySwitch[i].p4 = 4;
					}
					else if(port == 5){
						arraySwitch[i].p5 == 5;
					}
					else if(port == 6){
						arraySwitch[i].p6 == 6;
					}
					else if(port == 7){
						arraySwitch[i].p7 == 7;
					}
					else if(port == 8){
						arraySwitch[i].p8 == 8;
					}
					
				}
			}
			
		}
	
	};
});




