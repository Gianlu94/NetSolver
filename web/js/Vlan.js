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
            arrayVlan.splice(pos,1);
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
		
		//check if the given vlan already exist
		checkIfVlanAlreadyExist : function (pos) {
			var vlanNumber = VlanInterface.getVlanNumber(pos);
			var vlanName =  VlanInterface.getVlanName(pos);
			var trovato = false;

			
			for (var i = 0; i < VlanInterface.getVlanLength() && !trovato; i++){
				if (i != pos){
					if ((vlanNumber == VlanInterface.getVlanNumber(i)) ||
						(vlanName == VlanInterface.getVlanName(i))){
							trovato = true;
					}
				}
			}
			return trovato;
		}

    };
