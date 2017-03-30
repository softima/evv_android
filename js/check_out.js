$(document).ready(function(){
				
	$("#pageLoader").show(); 
	$("#form_id").hide(); 
	$("#button_id").hide();
    document.addEventListener("deviceready",onDeviceReady,false);       
});

    function onDeviceReady() {
   
    	 navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 5000, enableHighAccuracy:true });
    	document.addEventListener("backbutton", onBackKeyDown, false);
        var element = document.getElementById('deviceProperties');
		}
 function onSuccess(position) { 
	var networkState = navigator.connection.type;
    if (networkState == Connection.NONE)
    {
  		window.location='./first_screen.html';
                return true;
 
    }
    else
    {
    	

    	
	var sch_uuid = getURLParameters('sch_uuid');
	sch_uuid=sch_uuid;
	

	 $.ajax({
          url:"https://mmportal.ondemandhc.net/services/session/token",
          type:"get",
          dataType:"text",
          timeout:20000,
           crossDomain: true,
          error:function (jqXHR, textStatus, errorThrown) {
        	  if(textStatus==="timeout") {
				  bootbox.dialog({
					  closeButton: false,
        			  message: "Problem connecting with server. Please try after sometime.",
        			  title: "Alert",
        			  buttons: {
        			    success: {
        			      label: "OK",
        			      className: "btn-danger",
        			      callback: function() {
        			    	  
        			    	  exit_app();
        			      }
        			    
        			    }
        			    
        			    
        			  }
        			});
					
					}
					
          },
          success: function (token) { 

		  	var token =token;
	var header = "X-CSRF-TOKEN";
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
	
      $.ajax({
              url: 'https://mmportal.ondemandhc.net/m_service/m_resources/get_checkout_visit_details',
              type: "post",
      		  data: 'sch_uuid='+sch_uuid,
              dataType: "json",
              timeout:20000,
              crossDomain: true,
              
              
			  error: function (jqXHR, textStatus, errorThrown) {
				
				
             bootbox.dialog({
            	 closeButton: false,
  message: "Problem  connecting with server. Please try after sometime.",
  title: "Alert",
  buttons: {
    success: {
      label: "OK",
      className: "btn-danger",
      callback: function() {

      }
    
    }
    
    
  }
});
              },
			                success: function (data) {
			                	
			                	  $("#pageLoader").hide(); 
			                	  $("#form_id").show(); 
			    				   $("#button_id").show(); 
		 var json = data;
 var patient_name = json.patientdata[0].patient_name;
 var visit_type = json.patientdata[0].visit_type;
 var scheduled_time = json.patientdata[0].sch_start_timestamp+' - '+json.patientdata[0].sch_end_timestamp;
 var checked_in_time = json.patientdata[0].checked_in_time;
 var checked_in_duration = json.patientdata[0].checked_in_duration;
 var check_in_timestamp=json.patientdata[0].check_in_timestamp;
 var server_time=data.server_time;



  $("#exampleInputpatientname1").html(patient_name);
  $("#exampleInputvisittype1").html(visit_type);
  $("#exampleInputscheduledtime1").html(scheduled_time);
  $("#checked_in_time_temp").html(checked_in_time);
  $("#checked_in_time_temp_hid").val(checked_in_duration);
  $("#check_in_timestamp").val(check_in_timestamp);
  $("#server_time").val(server_time);
  
  devicesec=deviceMobileTime();
  
  var  server_time= $('#server_time').val();
  
  var devicesec=hmsToSecondsOnly(devicesec);
  
  var server_time=hmsToSecondsOnly(server_time);
  
  
  if(devicesec-server_time > 1800 || devicesec-server_time < -2)
 	{
 	  $('#hidden_timecheck').val('1');
 	   $('#duration_time_temp').html('Improper Time'); 
 	  $('#timer').html('Improper Time'); 
 	 $("#check_out").prop('disabled', true);
 	  
 	}

  
  
  	  
										  }
            });
  
  
  }
			
}); 

  return false;
}
	}
		
		
		
		
		
	
		
 var map;

function initialize() {
  var mapOptions = {
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'You are Here'
      });
latitude = position.coords.latitude;
longitude = position.coords.longitude;
$('input#latitude').val(latitude);
$('input#longitude').val(longitude);
      map.setCenter(pos);
      return pos;
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);


window.onload = function(){}, setInterval(function(){date_duration()}, 1000);

function onBackKeyDown(e) {

	  e.preventDefault();
	 
	}

function date_duration() {
	
	
	var devicesec=deviceMobileTime();
	 
	 var  server_time= $('#server_time').val();
	 
	 
	 var devicesec=hmsToSecondsOnly(devicesec);
	 
	 var server_time=hmsToSecondsOnly(server_time);
	 
	 
	 if( devicesec-server_time==-6.666)
		{
		 
		  $('#hidden_timecheck').val('1');
		   $('#duration_time_temp').html('Improper Time'); 
		   $('#time1').html('Improper Time'); 
		   $("#check_out").prop('disabled', true);
		  
		}
		else{
			$("#check_out").prop('disabled', false);
var date = new Date();
currentHours = date.getHours();
currentHours = ("0" + currentHours).slice(-2);
min = date.getMinutes();
min = ("0" + min).slice(-2);
sec = date.getSeconds();
sec = ("0" + sec).slice(-2);
    var now = new Date(),
        now = currentHours+':'+min;
      
    $('#time1').html(now);
    
    //$('#time1').html(now);
    
    var  checked_in_time_temp= $('#checked_in_time_temp_hid').val();
    if(checked_in_time_temp!='')
     {
    	
        var checked_in_time_temp = new Date(checked_in_time_temp);;
        var curr_date_checked_in_time_temp = checked_in_time_temp.getDate();
        var curr_month_checked_in_time_temp = checked_in_time_temp.getMonth()+1;
        var curr_year_checked_in_time_temp = checked_in_time_temp.getFullYear();
        var d1 = '' + curr_year_checked_in_time_temp  + ' ' + curr_month_checked_in_time_temp + ' ' + curr_date_checked_in_time_temp+ ' ' +checked_in_time_temp.getHours() + ':' +checked_in_time_temp.getMinutes() ;
        var d1 = new Date(d1);


     var mydate = new Date();
     var curr_date = mydate.getDate();
     var curr_month = mydate.getMonth()+1;
     var curr_year = mydate.getFullYear();
     var mydatestr = '' + curr_year  + ' ' + curr_month + ' ' + curr_date+ ' ' +mydate.getHours() + ':' +mydate.getMinutes() ;

     var d3 = new Date(mydatestr);

     
     
     
     //x=d1.getTime() - d2.getTime();
     // x=d2.getTime() - d1.getTime();
      x=d3.getTime() - d1.getTime();

     
     //Time difference in milli seconds
    // document.write("Your Operation took  " + (d2.getTime() - d1.getTime()) + " milliseconds");
      checkintimediff=msToTime(x);
      var hidden_timecheck=$('#hidden_timecheck').val();
     
      $('#duration_time_temp').html(checkintimediff);
      
      var  check_in_timestamp= $('#check_in_timestamp').val();
      //alert("check in timestamp"+ check_in_timestamp);
     var zone=timezoneDetect(check_in_timestamp);
     //alert("zone detect"+zone);
     
      
      if(zone=='false')
       {
   	   
   	   $('#duration_time_temp').html('Improper Timezone');
   	   $('#timer').html('Improper Time'); 
 	 $("#check_out").prop('disabled', true);
       }
    /*  devicesec=deviceMobileTime();
      var  server_time= $('#server_time').val();
    
      var devicesec=hmsToSecondsOnly(devicesec);
      var server_time=hmsToSecondsOnly(server_time);
      
      
      if(devicesec-server_time>180)
   	{
   	  
   	   $('#duration_time_temp').html('Improper Time'); 
   	}*/
    	
     }
    
		}        
}
		




/*

function date() {
	
    var time = new Date();
    var hours = addZero(time.getHours());
    var minutes = addZero(time.getMinutes());
   
    var current_time = hours + ":" + minutes;
   
    //now = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
   
    //$('#time').html(now);
    $('#time1').html(current_time);
   var  checked_in_time_temp= $('#checked_in_time_dur').val();
    if(checked_in_time_temp!='')
     {
     var d1 = new Date(checked_in_time_temp);
          
  // Do your operations
   
  //End Time
  var d2 = new Date();
  //x=d1.getTime() - d2.getTime();
   x=d2.getTime() - d1.getTime();
  
  //Time difference in milli seconds
 // document.write("Your Operation took  " + (d2.getTime() - d1.getTime()) + " milliseconds");
   checkintimediff=msToTime(x);
   
   $('#duration_time_temp').html(checkintimediff);
     }
   
}

*/




















function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function msToTime(duration) {
var milliseconds = parseInt((duration%1000)/100)
, seconds = parseInt((duration/1000)%60)
, minutes = parseInt((duration/(1000*60))%60)
, hours = parseInt((duration/(1000*60*60))%24);

var hours = addZero(hours);
var minutes = addZero(minutes);
return hours + ":" + minutes;
}




function deviceMobileTime() {
    var d = new Date();
  
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    device_time = h + ":" + m + ":" + s;
    return device_time;
}

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}




function timezoneDetect(timezone)
		 {
			   var date = new Date();
				//alert("time zones"+date.toTimeString());
				var removev=date.toTimeString();
				var v=removev.replace(/\s/g, '');
				var zonetiming = v.substr(0,v.indexOf('G'));
				zone=v.match(/\((.*?)\)/)[1];
				
			 if(timezone=='Asia/Calcutta')
				{
				 mobiletimezone='IST';
				}
			 else if(timezone=='America/New_York')
				 {
				 mobiletimezone='EST';
				 }
			 
			 if(zone==mobiletimezone)
				 {
				 zonedetection='true';
				 }
			 else
				{
				 zonedetection='false';
				} 
			 
			 
			 return zonedetection;
			 
		 }






	$(document).ready(function(){
		
    $("#check_out_form").submit(function(event)
	{
    	$('#check_out').html('Loading...');
		$('#check_out').prop('disabled', true);
		$('#exampleInputexpenses1').prop('disabled', true);
		$('#exampleInputmileage1').prop('disabled', true);

		var networkState = navigator.connection.type;
    if (networkState == Connection.NONE)
    {
    	window.location='./first_screen.html';
        return true;
    }
    else
    {
	
		var latitude=$('input#latitude').val();
		var longitude=$('input#longitude').val();
		var imgData=$('input#imgData').val();
		/*var visit_uuid = getURLParameters('visit_uuid');
		var visit_type_id = getURLParameters('visit_type_id');
		var patient_uuid = getURLParameters('patient_uuid');
		var user_id = getURLParameters('user_id');
		var device_uuid = device.uuid;*/
		
	 var exampleInputexpenses1=$("#exampleInputexpenses1").val();
	  
	if(exampleInputexpenses1 == "")
	{
		$('#check_out').html('Loading...');
		$('#check_out').prop('disabled', false);
		$('#exampleInputexpenses1').prop('disabled', false);
		$('#exampleInputmileage1').prop('disabled', false);

		$('#check_out').html('Check-Out');
	 bootbox.dialog({
		 closeButton: false,
  message: "Please enter Expenses.",
  title: "Alert",
  buttons: {
    success: {
      label: "OK",
      className: "btn-danger",
      callback: function() {
  }
  }
  }
}); 
	
	return false;
	}
	else
	{
	}
	
	var exampleInputmileage1=$("#exampleInputmileage1").val();
	if(exampleInputmileage1 == "")
	{
		$('#check_out').html('Loading...');
		$('#check_out').prop('disabled', false);
		$('#exampleInputexpenses1').prop('disabled', false);
		$('#exampleInputmileage1').prop('disabled', false);

		$('#check_out').html('Check-Out');
	 bootbox.dialog({
		 closeButton: false,
  message: "Please enter Mileage.",
  title: "Alert",
  buttons: {
    success: {
      label: "OK",
      className: "btn-danger",
      callback: function() {
  }
  }
  }
}); 
	
	return false;
	}
		
	else
	{
	return fun_submit();
		
	}
	}
	
	});
});

	
		$(document).ready(function () {
  //called when key is pressed in textbox
  $("#exampleInputmiledge1").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("").show().fadeOut("slow");
               return false;
    }
   });
});

		$(document).ready(function () {
  //called when key is pressed in textbox
  $("#exampleInputexpenses").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("").show().fadeOut("slow");
               return false;
    }
   });
});
		
		
	var isSign = false;
		var leftMButtonDown = false;
		
		jQuery(function(){
			//Initialize sign pad
			init_Sign_Canvas();
		});
		
		function fun_submit() {
			if(isSign) {

				var canvas = $("#canvas").get(0);
				var imgData = canvas.toDataURL();
											
			
				
	var device_uuid = device.uuid;
	var latitude=$('input#latitude').val();
	var longitude=$('input#longitude').val();
	var sch_uuid = getURLParameters('sch_uuid');
	var patient_uuid = getURLParameters('patient_uuid');
	var employee_uuid = getURLParameters('employee_uuid');
	var business_uuid = getURLParameters('business_uuid');
	var visit_type_id = getURLParameters('visit_type_id');
	var visit_date = getURLParameters('visit_date');
	var check_in_time = getURLParameters('check_in_time');
	var expenses=$('input#exampleInputexpenses1').val();
	var mileage=$('input#exampleInputmileage1').val();
	var reason_codes=$('input#reason_codes').val();
	var duration=$('input#exampleInputminutesspent').val();
	event.preventDefault();
	 
	//sch_uuid=Math.random();.
	
	
	
	
	$.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });

		$.ajax({
          url:"https://mmportal.ondemandhc.net/services/session/token",
          type:"get",
          dataType:"text",
          timeout:20000,
           crossDomain: true,
          error:function (jqXHR, textStatus, errorThrown) {
        	  $('#check_out').prop('disabled', false);
      		$('#exampleInputexpenses1').prop('disabled', false);
      		$('#exampleInputmileage1').prop('disabled', false);

      		$('#check_out').html('Check-Out');
        	  if(textStatus==="timeout") {
				  bootbox.dialog({
					  closeButton: false,
        			  message: "Problem connecting with server. Please try after sometime.",
        			  title: "Alert",
        			  buttons: {
        			    success: {
        			      label: "OK",
        			      className: "btn-danger",
        			      callback: function() {
        			    	  
        			    	  onBackKeyDown();
        			      }
        			    
        			    }
        			    
        			    
        			  }
        			});
					
					}
		  },
          success: function (token) {   
		
   	var device_uuid = device.uuid;
	var d = document.getElementById("device_uuid");
	var token =token;
	var header = "X-CSRF-TOKEN";
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
	
            $.ajax({
              url: 'https://mmportal.ondemandhc.net/m_service/m_resources/employee_visit_check_out',
              type: "POST",
	  		  //data: 'device_uuid='+'8dc6cf319947e729',
      		  data: { imgData:imgData, device_unique_id:device_uuid,latitude:latitude,longitude:longitude,sch_uuid:sch_uuid,expenses:expenses,mileage:mileage},
              dataType: "json",
              timeout:20000,
              crossDomain: true,
              
			  error: function (jqXHR, textStatus, errorThrown) {
				  $('#check_out').prop('disabled', false);
					$('#exampleInputexpenses1').prop('disabled', false);
					$('#exampleInputmileage1').prop('disabled', false);

					$('#check_out').html('Check-Out');
		bootbox.dialog({
			closeButton: false,
		  message: "Problem connecting with server. Please try after sometime.",
		  title: "Alert",
		  buttons: {
		    success: {
		      label: "OK",
		      className: "btn-danger",
		      callback: function() {
		  }
		  }
		  }
		}); 
 	return false;
               
              },
              success: function (data) {
			 
			 bootbox.dialog({
  closeButton: false,
  message: data.response_message,
  title: "Information",
  buttons: {
    success: {
      label: "OK",
      className: "btn-success",
      callback: function() {
  var sch_uuid = getURLParameters('sch_uuid');
 
    window.location="check_out_summary.html?sch_uuid="+sch_uuid;
    
      }
    
    }
    
    
  }
});
 	
 	
	      return false;
		  }
 
});

	} 
	});
	}
			else 
			{
				$('#check_out').html('Loading...');
				$('#check_out').prop('disabled', false);
				$('#exampleInputexpenses1').prop('disabled', false);
				$('#exampleInputmileage1').prop('disabled', false);

				$('#check_out').html('Check-Out');
				bootbox.dialog({
	closeButton: false,		
  message: "Patient Signature is required.",
  title: "Alert",
  buttons: {
    success: {
      label: "OK",
      className: "btn-danger",
      callback: function() {
  }
  }
  }
}); 
				return false;
			}
		}
		
		
		
		function init_Sign_Canvas() {
			isSign = false;
			leftMButtonDown = false;
			
			//Set Canvas width
			var sizedWindowWidth = $(window).width();
			if(sizedWindowWidth > 700)
				sizedWindowWidth = $(window).width() / 2;
			else if(sizedWindowWidth > 400)
				sizedWindowWidth = sizedWindowWidth - 100;
			else
				sizedWindowWidth = sizedWindowWidth - 50;
			 
			 $("#canvas").width(299);
			 $("#canvas").height(125);
			 $("#canvas").css("border","1px solid #000");
			
			 var canvas = $("#canvas").get(0);
			
			 canvasContext = canvas.getContext('2d');

			 if(canvasContext)
			 {
				 canvasContext.canvas.width  = sizedWindowWidth;
				 canvasContext.canvas.height = 200;

				 canvasContext.fillStyle = "#fff";
				 canvasContext.fillRect(0,0,sizedWindowWidth,200);
				 
				 canvasContext.moveTo(50,150);
				 canvasContext.lineTo(sizedWindowWidth-50,150);
				 canvasContext.stroke();
				
				 canvasContext.fillStyle = "#000";
				 canvasContext.font="20px Arial";
				 canvasContext.fillText("x",40,155);
			 }
			 // Bind Mouse events
			 $(canvas).on('mousedown', function (e) {
				 if(e.which === 1) { 
					 leftMButtonDown = true;
					 canvasContext.fillStyle = "#000";
					 var x = e.pageX - $(e.target).offset().left;
					 var y = e.pageY - $(e.target).offset().top;
					 canvasContext.moveTo(x, y);
				 }
				 e.preventDefault();
				 return false;
			 });
			
			 $(canvas).on('mouseup', function (e) {
				 if(leftMButtonDown && e.which === 1) {
					 leftMButtonDown = false;
					 isSign = true;
				 }
				 e.preventDefault();
				 return false;
			 });
			
			 // draw a line from the last point to this one
			 $(canvas).on('mousemove', function (e) {
				 if(leftMButtonDown == true) {
					 canvasContext.fillStyle = "#000";
					 var x = e.pageX - $(e.target).offset().left;
					 var y = e.pageY - $(e.target).offset().top;
					 canvasContext.lineTo(x,y);
					 canvasContext.stroke();
				 }
				 e.preventDefault();
				 return false;
			 });
			 
			 //bind touch events
			 $(canvas).on('touchstart', function (e) {
				leftMButtonDown = true;
				canvasContext.fillStyle = "#000";
				var t = e.originalEvent.touches[0];
				var x = t.pageX - $(e.target).offset().left;
				var y = t.pageY - $(e.target).offset().top;
				canvasContext.moveTo(x, y);
				
				e.preventDefault();
				return false;
			 });
			 
			 $(canvas).on('touchmove', function (e) {
				canvasContext.fillStyle = "#000";
				var t = e.originalEvent.touches[0];
				var x = t.pageX - $(e.target).offset().left;
				var y = t.pageY - $(e.target).offset().top;
				canvasContext.lineTo(x,y);
				canvasContext.stroke();
				
				e.preventDefault();
				return false;
			 });
			 
			 $(canvas).on('touchend', function (e) {
				if(leftMButtonDown) {
					leftMButtonDown = false;
					isSign = true;
				}
			 
			 });
		}
		
		
		
		
		function getURLParameters(paramName)
		{
		    var sURL = window.document.URL.toString();
		    if (sURL.indexOf("?") > 0)
		    {
		        var arrParams = sURL.split("?");
		        var arrURLParams = arrParams[1].split("&");
		        var arrParamNames = new Array(arrURLParams.length);
		        var arrParamValues = new Array(arrURLParams.length);

		        var i = 0;
		        for (i = 0; i<arrURLParams.length; i++)
		        {
		            var sParam =  arrURLParams[i].split("=");
		            arrParamNames[i] = sParam[0];
		            if (sParam[1] != "")
		                arrParamValues[i] = unescape(sParam[1]);
		            else
		                arrParamValues[i] = "No Value";
		        }

		        for (i=0; i<arrURLParams.length; i++)
		        {
		            if (arrParamNames[i] == paramName)
		            {
		                //alert("Parameter:" + arrParamValues[i]);
		                return arrParamValues[i];
		            }
		        }
		        return "No Parameters Found";
		    }
		}
		
		function onError(error)
		{
            
			
        }