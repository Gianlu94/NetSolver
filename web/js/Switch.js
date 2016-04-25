


	//array to keep current switches
	var arraySwitch = [];

	//interface to deal with switches
	var SwitchInterface = {

		//create and add one switch
		createSwitch : function(id){
			//Switch object {id:number,list of ports}
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

		//get switch's id from index
		getSwitchId : function (index){
			if (index < arraySwitch.length){
				return arraySwitch[index].idS;
			}
		},

		//get switch object from its id
		getSwitch : function (id){
			for (var i = 0; i<arraySwitch.length;i++){
				var Switch = arraySwitch[i];
				if (Switch.idS == id)
					return Switch;
			}
		},

		//delete switch from its id
		deleteSwitch : function (id){
			var removed = false;
			for (var i = 0; i<arraySwitch.length && !removed;i++){
				var Switch = arraySwitch[i];
				if (Switch.idS == id){
					arraySwitch.splice(i,1);
					removed = true;
				}
			}
		},

		//get switch'ports (0 = not empty port)
		getSwitchPorts : function(id){
			var arrayPorts = [];
			var Switch = SwitchInterface.getSwitch(id);
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
			if (Switch.p8 != 0){
				arrayPorts.push(Switch.p8);
			}
			return arrayPorts;
		},

		//set a specific port of a switch as not free anymore
		SetSwitchPort : function(id,port){
			var found = false;
			for (var i = 0; arraySwitch.length && !found; i++){
				if (arraySwitch[i].idS == id){
					found = true;
					if (port == 1){
						arraySwitch[i].p1 = 0;
					}
					else if(port == 2){
						arraySwitch[i].p2 = 0;
					}
					else if(port == 3){
						arraySwitch[i].p3 = 0;
					}
					else if(port == 4){
						arraySwitch[i].p4 = 0;
					}
					else if(port == 5){
						arraySwitch[i].p5 = 0;
					}
					else if(port == 6){
						arraySwitch[i].p6 = 0;
					}
					else if(port == 7){
						arraySwitch[i].p7 = 0;
					}
					else if(port == 8){
						arraySwitch[i].p8 = 0;
					}
					
				}
			}
			
		},

		//release the port of a spefic switch
		releaseSwitchPort : function (id,port){
			var found = false;
			for (var i = 0; arraySwitch.length && !found; i++){
				if (arraySwitch[i].idS == id){
					found = true;
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
						arraySwitch[i].p5 = 5;
					}
					else if(port == 6){
						arraySwitch[i].p6 = 6;
					}
					else if(port == 7){
						arraySwitch[i].p7 = 7;
					}
					else if(port == 8){
						arraySwitch[i].p8 = 8;
					}
					
				}
			}
		},

		//get the number of the current switches
		getArraySwitchLength : function(){
			return arraySwitch.length;
		},
	
	};





