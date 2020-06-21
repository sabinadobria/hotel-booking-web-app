$(document).ready(function() {

	 var token = getCookie("access_token");
	 if(token!=null && token!="") {
			var id = get("id");
			getSearchResults(id);
	 } else {
		 document.location.href="login";
	 }
});

function get(name){
	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(name[1]);
	}


function getSearchResults(id) {


    $.ajax({
	        type: "GET",
	        url: api_url+"/bookings",
	        contentType: 'application/x-www-form-urlencoded',
	        beforeSend: function(request) {
	            request.setRequestHeader("Authorization", "Bearer "+ getCookie("access_token"));
	          },
	        success: function (result) {
	        		 $("#searchContainerResultGrid").html('');
                			 console.log("result", result);



                		 if(result.searchResults!=null && result.searchResults!==undefined) {

                			 for(var i=0;i<result.searchResults.length;i++) {


                				 constructDiv(result.searchResults[i]);


                			 }
                		 }
	        	},
	        error: function (data) {
	        	$(".alert-danger").html("Booking failed. Please try once again");
				$(".alert-danger").show();
				$(".alert-success").hide();
	        }
	    });

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1);
        if (c.indexOf(name) === 0)
            return c.substring(name.length, c.length);
    }
    return "";
}


function constructDiv(objIdx) {
	 $("#searchContainerResultGrid")
	 .append("<div class=\"card\"><div class=\"card-header\"><div class=\"bold\"></div>"+
	 "<div class=\"bold\">Hotel: "+objIdx.hotelName+"</div>"+
	 "<div>Number of rooms: "+objIdx.rooms+"</div>"+
	 "<div>Selected date: "+objIdx.selectedDate+"</div>"+

	 "<div class=\"clearfix\">"+
	 "<button type=\"button\" class=\"btn btn-success float-right\" id=\"id-edit\" data-toggle=\"modal\" data-id="+objIdx.id+" data-target=\"#exampleModal\">Manage booking</button><div>  </div>"+
	 "<button type=\"button\" class=\"btn btn-danger float-right \" style=\"margin-right: 10px;\"onclick=\"deleteRez("+objIdx.id+")\">Delete booking</button>"+
	 "</div></div> </div>");

     	 $("#searchContainerResultGrid").append("<div class=\"clearfix\">&nbsp;&nbsp</div>");


}





function deleteRez(id) {

    var token = getCookie("access_token");
	 if(token!=null && token!="") {
		 $.ajax({
         	        type: "Delete",
         	        url: api_url+"/bookings/delete/" + id,
         	        contentType: 'application/x-www-form-urlencoded',
         	        beforeSend: function(request) {
                    	            request.setRequestHeader("Authorization", "Bearer "+ getCookie("access_token"));
                    	          },
         	        success: function (data) {
         	        	$(".alert-success").html("Reservation successfully deleted");
         				$(".alert-success").show();
         				$(".alert-danger").hide();
                        location.reload();
         	        	},
         	        error: function (data) {
         	        	$(".alert-danger").html("Booking failed. Please try once again");
         				$(".alert-danger").show();
         				$(".alert-success").hide();
         	        }
         	    });
	 } else {
		 document.location.href="login";
	 }

}

function edit(id) {
 $("#searchContainerResultGrid")
 	 .append("<div class=\"modal\" tabindex=\"-1\" role=\"dialog\"><div class=\"modal-dialog\" role=\"document\">"+
 +"<div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\">Modal title</h5>" +
+"<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span>"+
+"</button></div><div class=\"modal-body\"><p>Modal body text goes here.</p></div><div class=\"modal-footer\">"+
+"<button type=\"button\" class=\"btn btn-primary\">Save changes</button><button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>"+
+" </div> </div> </div></div>")

//$("#searchContainerResultGrid")
//	 .append("<div><p>aaaaaaaaaa</p></div>")



}

function managebook() {

	var rooms = $("#id-rooms").val();
	var date = $("#id-date").val();
	var id = $("#id-edit").attr("data-id")


//	console.log("selectedVal", selectedVal);
//		console.log("bday", bday);
//				console.log("mybookid", myBookId);


	  if(date==null || date=="")
		  {
		  $(".alert-danger").html("Please choose Date");
			$(".alert-danger").show();
			return;
		  }
	    var formData = {
	            'id': id,
	            'rooms': rooms,
	            'date': date
	        };
	  $.ajax({
	        type: "POST",
	        url: api_url+"/bookings/manage",
	        data        : formData,
	        contentType: 'application/x-www-form-urlencoded',
	        beforeSend: function(request) {
	            request.setRequestHeader("Authorization", "Bearer "+ getCookie("access_token"));
	          },
	        success: function (data) {
	            location.reload();
	        	$(".alert-success").html("Reservation was successfully updated");
				$(".alert-success").show();
				$(".alert-danger").hide();

	        	},
	        error: function (data) {
	        	$(".alert-danger").html("Booking failed. Please try once again");
				$(".alert-danger").show();
				$(".alert-success").hide();
	        }
	    });

    $("#exampleModal").hide();

}

function openbookings() {

	 var token = getCookie("access_token");
	 if(token!=null && token!="") {
		 window.location.href= "/bookings";
		// window.location.href="bookingpage?id="+id;
	 } else {
		 document.location.href="login";
	 }
}