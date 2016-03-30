var express = require ("express");

var app = express();
var path = require("path");
var fs = require("fs");


/*app.use(express.static(path.join(__dirname+"/NetSolver/web/bootstrap/css/bootstrap.min.css")));
app.use(express.static(path.join(__dirname+"/NetSolver/web/bootstrap/js/jquery-2.1.0.min.js")));
app.use(express.static(path.join(__dirname+"/NetSolver/web/css/geneal.css")));
app.use(express.static(path.join(__dirname+"/NetSolver/web/bootstrap/js/bootstrap.min.js")));
app.use(express.static(path.join(__dirname+"/NetSolver/web/js/HomePageNetSolver.js")));
app.use(express.static('/NetSolver/web/bootstrap'));
app.use(express.static('/NetSolver/web/css'));
app.use(express.static('/NetSolver/web/js'));
*/

//define static files
app.use(express.static(__dirname+"/NetSolver/web/css" ));
app.use(express.static(__dirname+"/NetSolver/web/js" ));

//manage  the request of a network problem
app.get("/Tracer", function(req,res){
	 fs.readFile(path.join(__dirname+"/Traces/trac1.txt"), function(err, file) {  
            if(err) {  
                // write an error response or nothing here  
                return;  
            }
            var array = file.toString().split(" ");
            var array2 ="";
            
   		    for(var i = 0; i < array.length;i++) {
   		    	switch (array[i]){
   		    		case "-network-" :
   		    			array[i]="192.168.100.0/28";
   		    			break;
   		    		case "-hosts-" :
   		    			array[i]="5 hosts";
   		    			break;
   		    		default : break;
   		    	}
   		    	/*if (array[i]=="-network-"){
   		    		//console.log(i+"  "+ array[i]+"\n");
   		    		array[i]="192.168.100.0/28";
   		    	}
   		    	else{
   		    		//array2[i]=array[i]+" ";
   		    		console.log(i+"  "+ array[i]+"\n");
   		    	}
   		    	  else{
   		    		//array2[i]=array[i]+" ";
   		    		//console.log(i+"  "+ array[i]+"\n");
   		    	}*/
   		    	array2 = array2 +" "+array[i];
    		} 
            res.writeHead(200, { 'Content-Type': 'text/html' });  
            res.end(array2.toString(), "utf-8");  
        });
	//res.sendFile(path.join(__dirname+"/Tracer/trac1.txt"));
});

//load homePage
app.get("/NetSolver/web/homeNetSolver.html", function(req,res){
	res.sendFile(path.join(__dirname+"/NetSolver/web/homePageNetSolver.html"));
});

//server up
app.listen(3000, function(){
	  console.log('Server up: http://localhost:3000');
});

