/*
 *The MIT License (MIT)

 *Copyright (c) 2016 GianLuke

 *Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
 *associated documentation files (the "Software"), to deal in the Software without restriction, including 
 *without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
 *of the Software, and to permit persons to whom the Software is 
 *furnished to do so, subject to the following conditions:

 *The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 *the Software.

 *THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 *COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 *ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

	//array to keep current hubs

	var arrayHub = [];

	var HubInterface = {


		//reset array Hub
		resetArrayHub : function(){
			arrayHub.length = 0;
			HubInterface.createHub("0");
		},


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
			if (index < arrayHub.length){
				return arrayHub[index].idS;
			}
		},

		//get hub object from its id
		getHub : function (id){
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

