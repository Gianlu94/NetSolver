
    //array to keep current vlans
    var arrayVlan = [];

    var VlanInterface = {

        //create and add one vlan
        createVlan: function (id) {
            //Switch object {id:number,list of ports}
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
        }

    };