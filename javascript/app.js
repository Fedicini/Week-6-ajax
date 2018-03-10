

var animals = ["snakes","guinea pigs","pigs","dolphins","rhino","cow"];
var apikey = "U6EWPqdBdP6mFhVK8EU30dTXtGtVjPBX";
$(document.body).on("click",".user-button",function(){
    var name = $(this).attr("data-name")
    displayimage(name);
})
$(document.body).on("click","#submit",function(){
    $("#button-display").empty();
    var newName = $("#button-input").val().trim();
    animals.push(newName);
    appendButton();
})

var appendButton = function(){
    
    for(var i=0;i<animals.length;i++){
        var newBtn = $("<div>").attr("data-name",animals[i]);
        newBtn.attr("class","user-button");
        newBtn.text(animals[i]);
        $("#button-display").append(newBtn);
    }


}
appendButton()

function displayimage(name){
    var queryurl = "https://api.giphy.com/v1/gifs/search?q="+name+"&api_key="+apikey+"&limit=10";
    $.ajax({
        url: queryurl,
        method: "GET"
    }).then(function(response){
        //console.log(response);
        for(var j=0;j<response.data.length;j++){
            var stillUrl = response.data[j].images.fixed_height_still.url;
            var animateUrl = response.data[j].images.fixed_height.url;
            //console.log(stillUrl);
            var newImage = $("<img>").attr("src",animateUrl);
            newImage.attr("data-state","animate")
            newImage.attr("class","gif")
            newImage.attr("data-still",stillUrl)
            newImage.attr("data-animate",animateUrl)
            $("#image-display").prepend(newImage);
        }
        
    })
    
    
}
$(document.body).on("click",".gif",function(){
    console.log("clicked");
    var state = $(this).attr("data-state")

    if(state==="animate"){
        
        $(this).attr("src",$(this).attr("data-still"))
        $(this).attr("data-state", "still");
        console.log($(this).attr("src"));
        console.log($(this).attr("data-state"));
        console.log($(this).attr("data-still"))
        console.log($(this).attr("data-animate"))
    }
     if(state==="still"){
        $(this).attr("data-state","animate");
        $(this).attr("src",$(this).attr("data-animate"))
        console.log($(this).attr("src"));
        console.log($(this).attr("data-state"));
     }
})