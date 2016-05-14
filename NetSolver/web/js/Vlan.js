
    //array to keep current vlans
    var arrayVlan = [];

    var VlanInterface = {

        //create and add one vlan
        createVlan: function (id) {
            var Vlan = {
                idV : id
            };

            arrayVlan.push(Vlan);

        },

        //delete vlan from its id
        deleteVlan : function (pos){
            arraySwitch.splice(pos,1);
        },

        //get number of Vlan
        getVlanLength : function(){
            return arrayVlan.length;
        },

        //get vlan number
        getVlanNumber : function (pos) {
            return $("#vNumber"+pos).val();
        },

        //get name Vlan
        getVlanName : function(pos){
            return $("#vName"+pos).val();
        },

        //get SwitchPort
        getVlanSwitchPort : function (pos) {
            return $(".btnVl"+pos).text();
        },

		//check if the given vlan already exist
		checkIfVlanAlreadyExist : function (pos) {
			//console.log("VLAN "+VlanInterface.getVlanNumber(pos));
			var vlanNumber = VlanInterface.getVlanNumber(pos);
			var vlanName =  VlanInterface.getVlanName(pos);
			var trovato = false;
			for (var i = 0; i < VlanInterface.getVlanLength() && !trovato; i++){
				if (i != pos){
					if ((vlanNumber == VlanInterface.getVlanNumber(i)) ||
						(vlanName.indexOf == VlanInterface.getVlanName(i))){
							trovato = true;
					}
				}
			}
			return trovato;
		}

    };