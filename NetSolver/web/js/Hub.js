
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
	};

