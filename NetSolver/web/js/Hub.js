
	//array to keep current hubs

	var arrayHub = [];

	var HubInterface = {

		//create and add one hub
		createHub: function (id) {
			//Hub object {id:number,list of ports}
			var Hub = {
				idS: id,
				p1: 1,
				p2: 2,
				p3: 3,
				p4: 4,
				p5: 5,
				p6: 6,
				p7: 7,
				p8: 8
			};
			arrayHub.push(Hub);

		},

		//get switch's id from index
		getHubId : function (index){
			if (index < arraySwitch.length){
				return arraySwitch[index].idS;
			}
		},

		//get hub object from its id
		getHub : function (id){
			console.log("Getting hub "+id);
			for (var i = 0; i<arrayHub.length;i++){
				var Hub = arrayHub[i];
				if (Hub.idS == id)
					return Hub;
			}
		},

		//delete hub from its id
		deleteHub : function (id){
			var removed = false;
			for (var i = 0; i<arrayHub.length && !removed;i++){
				var Hub = arrayHub[i];
				if (Hub.idS == id){
					arrayHub.splice(i,1);
					removed = true;
				}
			}
			console.log("LENGTH AFTER DELETION "+arrayHub.length);
		},

		//get hub's ports (0 = not empty port)
		getHubPorts : function(id){
			var arrayPorts = [];
			var Hub = HubInterface.getHub(id);
			if (Hub.p1 != 0){
				arrayPorts.push(Hub.p1);
			}
			if (Hub.p2 != 0){
				arrayPorts.push(Hub.p2);
			}
			if (Hub.p3 != 0){
				arrayPorts.push(Hub.p3);
			}
			if (Hub.p4 != 0){
				arrayPorts.push(Hub.p4);
			}
			if (Hub.p5 != 0){
				arrayPorts.push(Hub.p5);
			}
			if (Hub.p6 != 0){
				arrayPorts.push(Hub.p6);
			}
			if (Hub.p7 != 0){
				arrayPorts.push(Hub.p7);
			}
			if (Hub.p8 != 0){
				arrayPorts.push(Hub.p8);
			}
			return arrayPorts;
		},

		//set a specific port of a hub as not free anymore
		setHubPort : function(id,port){
			var found = false;
			for (var i = 0; arrayHub.length && !found; i++){
				if (arrayHub[i].idS == id){
					found = true;
					if (port == 1){
						arrayHub[i].p1 = 0;
					}
					else if(port == 2){
						arrayHub[i].p2 = 0;
					}
					else if(port == 3){
						arrayHub[i].p3 = 0;
					}
					else if(port == 4){
						arrayHub[i].p4 = 0;
					}
					else if(port == 5){
						arrayHub[i].p5 = 0;
					}
					else if(port == 6){
						arrayHub[i].p6 = 0;
					}
					else if(port == 7){
						arrayHub[i].p7 = 0;
					}
					else if(port == 8){
						arrayHub[i].p8 = 0;
					}

				}
			}

		},

		//release the port of a spefic hub
		releaseHubPort : function (id,port){
			var found = false;
			for (var i = 0; arrayHub.length && !found; i++){
				console.log("Release HUb port id = "+id + " ids = "+arrayHub[i].idS);
				if (arrayHub[i].idS == id){
					found = true;
					if (port == 1){
						arrayHub[i].p1 = 1;
					}
					else if(port == 2){
						arrayHub[i].p2 = 2;
					}
					else if(port == 3){
						arrayHub[i].p3 = 3;
					}
					else if(port == 4){
						arrayHub[i].p4 = 4;
					}
					else if(port == 5){
						arrayHub[i].p5 = 5;
					}
					else if(port == 6){
						arrayHub[i].p6 = 6;
					}
					else if(port == 7){
						arrayHub[i].p7 = 7;
					}
					else if(port == 8){
						arrayHub[i].p8 = 8;
					}

				}
			}
		},

		//get the number of the current switches
		getArrayHubLength : function(){
			return arrayHub.length;
		}

	};

