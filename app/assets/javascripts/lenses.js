$(document).ready(function(){
  $('#create_lens').bind('click', function(){
    var tag = $('#final_result').prop('outerHTML');
    console.log(tag);
    $.ajax({
      type: "POST",
      url: "/lenses",
      data: {
        tag: tag,
      },
      success: function(e){
        $('#status').html("You've created a new element with ID:" + e);
      },
    });
  });
});

