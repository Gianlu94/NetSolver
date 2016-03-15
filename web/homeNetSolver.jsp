<%-- 
    Document   : homeNetSolver
    Created on : 15-Mar-2016, 08:59:13
    Author     : gianluke
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
        <title>HomePageNetSolver</title>
		<link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="./css/general.css" rel="stylesheet">
		<script src ="./bootstrap/js/jquery-2.1.0.min.js"></script>
		<script src="./bootstrap/js//bootstrap.min.js"></script>
		<script src="./js/HomePageNetSolver.js"></script>
    </head>
    <body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-3 col-md-offset-1">
				 <h1 id="titleHome" >NetSolver</h1>
			</div>
		</div>
		<hr>
	
		<div class="panel panel-default col-md-6 col-md-offset-1">
			<div class="panel-heading ">
                <ul class="nav panel-tabs">
					<li><button type="button" href="#tab1"  data-toggle="tab" 
						class="btn btn-primary pull-left">Get A Problem</button>
					</li>
					<li><button type="button" href="#tab2"  data-toggle="tab" 
						class="btn btn-primary pull-right">Define network 
							requirments</button>
					</li>
				</ul>    
			</div>
			<div class="panel-body contentPanelHome">
				<div class="tab-content">
					<div class="tab-pane active" id="tab1">
						<ul class="nav nav-tabs" id="product-table">
							<li><a href="#extended" data-toggle="tab">Extended</a>
							</li>
							<li><a href="#compact" data-toggle="tab">Compact</a>
							</li>
						</ul>
						<div class="tab-content">
							<div class="tab-pane active" id="extended">
							</div>
							<div class="tab-pane" id="compact">
							</div>
						</div>
					</div>
					<div class="tab-pane" id="tab2">To develop</div>
				</div>
			</div>
		</div>
		
		<div class="panel panel-default col-md-6 col-md-offset-1">
			<div class="panel-heading">
				<h4>Your solution</h4>
				<ul class="nav nav nav-tabs nav-tabs-horizontal">
					<li class="active"><a href="#hostsD" data-toggle="tab">Host</a></li>
					<li><a href="#switchD" data-toggle="tab">Switch</a></li>
					<li><a href="#routersD" data-toggle="tab">Routers</a></li>
					<li><a href="#switchD" data-toggle="tab">Modems</a></li>
					<li><a href="#hubD" data-toggle="tab">Hubs</a></li>
				</ul>   
			</div>
			<div class="panel-body contentPanelHomeSolutionProblem">
				<div class="tab-content">
					<div class="tab-pane active" id="hostsD">
					</div>
					<div class="tab-pane" id="switchD">
						To develop
					</div>
					<div class="tab-pane" id="routersD">
						To develop
					</div>
					<div class="tab-pane" id="modemsD">
						To develop
					</div>
					<div class="tab-pane" id="hubsD">
						To develop
					</div>
				</div>
			</div>
		</div>
		
		
	</div>
    </body>
</html>
