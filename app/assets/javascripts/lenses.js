$(document).ready(function(){
  $('#create_lens').bind('click', function(){
    
    var tag = $('#final_result').prop('outerHTML'),
        tagName = $('#final_result')[0].tagName.toLowerCase(),
        currentState = $('#final_result')[0].getState();

    $.ajax({
      type: "POST",
      url: "/lenses",
      data: {
        taginfo: {
          tag: tag,
          tagname: tagName,
          currentstate: currentState  
        }
      },
      success: function(e){
        $('#status').html("You've created a new element with ID:" + e);
      },
    });
  });
});

