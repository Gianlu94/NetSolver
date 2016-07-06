/*
	This file contains methods that generate appropriate data (host,switch,hub...)
	for the given problem
		problemFolder : Int
		problemFile: Int
	
 */

module.exports = {

	generateHost : function (problemFolder, problemFile){
		if ((problemFolder == 1) && (problemFile == 1)) {
			return Math.floor((Math.random() * 3) + 1);
		}
		else if ((problemFolder == 1) && (problemFile == 2)) {
			return Math.floor((Math.random() * 1 + Math.random() ) + 2);
		}
		else if ((problemFolder == 1) && (problemFile == 3)) {
			return Math.floor((Math.random() * 1 + Math.random() ) + 2);
		}
		else if((problemFolder == 2) && (problemFile == 1)) {
			return Math.floor((Math.random() * 1 + Math.random() ) + 2);
		}
	},

	generateSwitch : function (problemFolder, problemFile){
		if ((problemFolder == 1) && (problemFile == 2)) {
			return Math.floor((Math.random() * 3) + 1);
		}
		else if((problemFolder == 2) && (problemFile == 1)) {
			return Math.floor((Math.random() * 3) + 1);
		}
	},

	generateHub : function (problemFolder, problemFile){
		//For now keep simple
		if ((problemFolder == 1) && (problemFile == 3)) {
			return 1;
		}
	}

}