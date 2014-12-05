$(document).ready(function(){
  $('#create_lens').bind('click', function(){
    
    var tag = $('.final-result').prop('outerHTML'),
        tagName = $('.final-result')[0].tagName.toLowerCase(),
        currentState = $('.final-result')[0].getState();

    $.ajax({
      type: "POST",
      url: "/lenses",
      data: {
        lensinfo: {
          tag: tag,
          tagname: tagName,
          currentstate: currentState  
        }
      },
      success: function(e){
        $('#status').html("You've created a new lens with ID:" + e);
      },
    });
  });
});

