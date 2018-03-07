$(document).ready(function(){
	$(".lead").css("opacity" , "0");
	$("#start-btn").click(function(){
		$(".start").hide();
		$(".lead").css("opacity" , "1");

		var time = 60;
		$("#time").html(time);
		var ti2 = setInterval(function(){
			time -= 1;
			$("#timer").html(time);
			if (time<=0){
				clearInterval(ti);
				clearInterval(ti2);
				$(".ball").off('click');
				$(".lead").css({"position" : "absolute" , "width" : "780px" , "transition" : " width 1s" , "z-index" : "100" });
				$(".timer").hide();
				$(".lead").css("justify-content" , "center");
				$(".Score").html("Your Final Score is " + score);	
			}

		},1000);

		if(document.getElementById("easy").checked == true){
			var multp = 30;
		}
		else if(document.getElementById("medium").checked == true){
			var multp = 50;
		}
		else if(document.getElementById("hard").checked == true){
			var multp = 70;
		}
		var ball = [];
		var bcount = 7;
		// $("#ball8").click(function(){
		// 	var xtime = $("#ball8").attr("etime");
		// 	time = time + parseInt(xtime);
		// 	$("#ball8").hide();
		// });
		var score = 0;
		var widf = 40;
		for (var i = 0; i <= bcount ; i++) {
			ball[i] = new Object;
			ball[i].width = widf;
			ball[i].height = widf;
			ball[i].x = 0;
			ball[i].y =0;
			ball[i].maxX = 770- ball[i].width;
			ball[i].maxY = 480 - ball[i].height;
			ball[i].velX = 1;
			ball[i].velY = 1;
			ball[i].senseX = 1;
			ball[i].senseY = 1;
			ball[i].points = (bcount-i+1)*10;
			ball[i].radius = ball[i].width/2;
			widf += 4;
		}

		function position(balll , ind){

			var x = Math.random() * balll.maxX;
			var y = Math.random() * balll.maxY;
			balll.x  = x;
			balll.y = y;
			for(var j = 0 ; j<ind ; j++ ){
				x1 = x + (balll.width/2);
				y1 = y + (balll.height/2);
				x2 = ball[j].x + (ball[j].width/2);
				y2 =  ball[j].y + (ball[j].width/2);
				var dist =Math.sqrt(((y2-y1)*(y2-y1)) + ((x2-x1)*(x2-x1)));
				if(dist<=balll.radius+ball[j].radius){
					position(ball[ind] , ind);
				}

			};
			balll.velX = (Math.random() * 4) +(8-ind)/3;
			balll.velY = (Math.random() * 4) +(8-ind)/3;
			$("#ball"+ind).css("margin-left" , x);
			$("#ball"+ind).attr("point" , balll.points);
			$("#ball"+ind).css("margin-top" , y);
			$("#ball"+ind).css("width" , balll.width);
			$("#ball"+ind).css("height" , balll.height);
			$("#ball"+ind).css("z-index" , ind);
		}
		for(var i = 0 ; i<=bcount ; i++){
			position(ball[i] , i);
		}
		// $("#ball8").css({"display" : "flex" , "width" : "45px" , "height" : "45px"});
		// ball[8].width = 45;
		// ball[8].height = 45;
		// ball[8].radius = ball[8].width/2
		function collide(ball1 , ball2){
			var x1 = ball1.x +  ball1.radius;
			var y1 = ball1.y + ball1.radius;
			var x2 = ball2.x + ball2.radius;
			var y2 = ball2.y +ball2.radius;
			var dist =Math.sqrt(((y2-y1)*(y2-y1)) + ((x2-x1)*(x2-x1)));
			if(dist<=ball1.radius+ball2.radius){
			// 	if(ball1.senseX == ball2.senseX){
			// 		if(ball1.velX>=ball2.velX){
			// 			ball1.senseX = -ball1.senseX;
			// 		}
			// 		else{
			// 			ball2.senseX = -ball2.senseX;
			// 		}
			// 	}
			// 	else{
			// 		ball1.senseX = -ball1.senseX;
			// 		ball2.senseX = -ball2.senseX;
			// 	}
			// 	if(ball1.senseY == ball2.senseY){
			// 		if(ball1.velY>=ball2.velY){
			// 			ball1.senseY = -ball1.senseY;
			// 		}
			// 		else{
			// 			ball2.senseY = -ball2.senseY;
			// 		}
			// 	}
			// 	else{
			// 		ball1.senseY = -ball1.senseY;
			// 		ball2.senseY = -ball2.senseY;
			// 	}
			// 	ball1.x = ball1.x + (ball1.senseX * ball1.velX*multp)/60;
			// 	ball2.x = ball2.x + (ball2.senseX * ball2.velX*multp)/60;
			// 	ball1.y = ball1.y + (ball1.senseY * ball1.velY*multp)/60;
			// 	ball2.y = ball2.y + (ball2.senseY * ball2.velY*multp)/60;
			// }
			var tempsense = ball1.senseX;
			ball1.senseX = ball2.senseX;
			ball2.senseX = tempsense;
			tempsense = ball1.senseY;
			ball1.senseY = ball2.senseY;
			ball2.senseY = tempsense;
			var tempv = ball1.velX;
			ball1.velX = ball2.velX;
			ball2.velX = tempv;
			tempv = ball1.velY;
			ball1.velY = ball2.velY;
			ball2.velY = tempv;
			// ball1.x = balll.senseX*7 + ball1.x;
			// ball2.x = ball2.senseX*7 + ball2.x;
			// ball1.y = balll.senseY*7 + ball1.y;
			// ball2.y = ball2.senseY*7 + ball2.y;


		}
	}
	function newpos(ball){
		for(var i = 0 ; i<=bcount ; i++){
			for(var j = i+1 ; j<=bcount ; j++){
				collide(ball[i] ,ball[j]);
			};
		};
		for (var i =0 ; i<=bcount ; i++){
			if ((ball[i].x + ((ball[i].velX)/60)*multp) >= ball[i].maxX){
				ball[i].senseX = -1;
			}
			else if((ball[i].x - ((ball[i].velX)/60)*multp) <=0){
				ball[i].senseX = 1;
			}
			if(ball[i].senseX == 1){
				var newX = ball[i].x + ((ball[i].velX)/60)*multp;
			}
			else{
				var newX = ball[i].x - ((ball[i].velX)/60)*multp;
			};
			ball[i].x = newX;
			$("#ball"+i).css("margin-left" , newX);

			if ((ball[i].y + ((ball[i].velY)/60)*multp) >= ball[i].maxY){
				ball[i].senseY = -1;
			}
			else if((ball[i].y - ((ball[i].velY)/60)*multp) <=0){
				ball[i].senseY = 1;
			}
			if(ball[i].senseY == 1){
				var newY = ball[i].y + ((ball[i].velY)/60)*multp;
			}
			else{
				var newY = ball[i].y - ((ball[i].velY)/60)*multp;
			};
			ball[i].y = newY;
			$("#ball"+i).css("margin-top" , newY);
		}
	};

	$(".ball").click(function(){
		score += parseInt($(this).attr("point"));
		$("#score").html(score);
	});
	var ti = setInterval(function() {newpos(ball)}, 1000/60);
	// var et = setInterval(function(){$("#ball8").css("display" , "flex"); window.setTimeout(function(){ $("#ball8").css("display" , "none");} , 1000); } , 1000);
});
}); 