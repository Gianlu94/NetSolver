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