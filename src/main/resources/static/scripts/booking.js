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
	
	var uri = "/search/hotels/"+id;

	
	 $.ajax({url : api_url + uri, success: function(result){
		 

			 $("#searchContainerResultGrid").html('');
		 
		 
		 
		 if(result.searchResults!=null && result.searchResults!==undefined) {
			 
			 for(var i=0;i<result.searchResults.length;i++) {
				 
				 if(result.searchResults[i].reviewUsername==="write a review")
					 {
						 result.searchResults[i].reviewTitle="";
						 result.searchResults[i].reviewText="";
						 result.searchResults[i].reviewUsername="";
					 }
					 
				 var ratingsDiv = "<span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span>";
				 if(result.searchResults[i].ratings!=null && result.searchResults[i].ratings!=undefined && result.searchResults[i].ratings!=="") {
					
						if(Math.round(result.searchResults[i].ratings)>=5) {
							ratingsDiv= "<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span>";
						}
						if(Math.round(result.searchResults[i].ratings)<=4) {
							
							ratingsDiv= "<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span>";
						}
						if(Math.round(result.searchResults[i].ratings)<=3) {
							ratingsDiv= "<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span>";
						}
						if(Math.round(result.searchResults[i].ratings)<=2) {
							ratingsDiv= "<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span>";
						}
						if(Math.round(result.searchResults[i].ratings)<=1) {
							ratingsDiv= "<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star \"></span><span class=\"fa fa-star \"></span><span class=\"fa fa-star \"></span><span class=\"fa fa-star \"></span>";
						}
				 }
				
				 constructDiv(ratingsDiv, result.searchResults[i]);
				 
				
			 }
		 } 
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


function constructDiv(ratingsDiv, objIdx) {
	 $("#searchContainerResultGrid").append("<div class=\"card\"><div class=\"card-header bg-danger searchResultHeader\">"+objIdx.name+
			 "</div><div class=\"card-body\"><div class=\"fontSize20\"><i class=\"material-icons location-icon\">location_on</i>"+objIdx.address+", "+objIdx.city+", "+objIdx.province+", "+objIdx.postalcode+"</div><div>" +
			 ratingsDiv +
			 		"<div class=\"bold\">Review(s)</div><div class=\"themeColor\">"+objIdx.reviewUsername+"</div><div>"+objIdx.reviewTitle+"</div><div>"+objIdx.reviewText+"</div><div class=\"bold\">Country</div><div>"+objIdx.country+"</div><div class=\"bold\">Price</div><div>"+objIdx.price+"</div><div class=\"bold\">Categories:</div><div>"+objIdx.categories+"</div>" +
			 				"<div class=\"form-group\"><label for=\"sel1\">Rooms: </label><select style=\"width: 20%;\" class=\"form-control\" id=\"sel1\" name=\"sellist1\"><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option></select></div>" +
			 				"<div class=\"form-group\"><label for=\"people1\">Persons: </label><select style=\"width: 20%;\" class=\"form-control\" id=\"people1\" name=\"peoplelist1\"><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option></select></div>" +
			 				" <div>From:<br/><input type=\"date\" id=\"bday\"> </div><BR/> <div>Until:<br/><input type=\"date\" id=\"lday\"> </div><BR/> <button type=\"button\" class=\"btn btn-success float-left\" onclick=\"booksuccess("+objIdx.id+")\">Book Now</button><BR/>" +
			 						"<div class=\"clearfix\"><BR/><div id=\"map\"></div></div></div> </div>");
	 
	 
	 
	 $("#searchContainerResultGrid").append("<div class=\"clearfix\">&nbsp;&nbsp</div>");


	 
}





function booksuccess(id) {
	var selectedVal = $("#sel1").val();
	var peopleVal = $("#people1").val();
	var bday = $("#bday").val();
	var lday = $("#lday").val();
	  if(bday==null || bday=="" || lday==null || lday=="")
		  {
		  $(".alert-danger").html("Please choose Date");
			$(".alert-danger").show();
			return;
		  }
	    var formData = {
	            'id'              : id,
	            'rooms'             : selectedVal,
	            'people': peopleVal,
	            'date'             : bday,
	            'leavedate' : lday
	        };
	  $.ajax({
	        type: "GET",
	        url: api_url+"/book/confirm",
	        data        : formData,
	        contentType: 'application/x-www-form-urlencoded',
	        beforeSend: function(request) {
	            request.setRequestHeader("Authorization", "Bearer "+ getCookie("access_token"));
	          },
	        success: function (data) {
	        	$(".alert-success").html("Room(s) are booked successfully");
				$(".alert-success").show();
				$(".alert-danger").hide();
	        	},
	        error: function (data) {
	        	$(".alert-danger").html("Booking failed. Please try once again");
				$(".alert-danger").show();
				$(".alert-success").hide();
	        }
	    });
	
	
}