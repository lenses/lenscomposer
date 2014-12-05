$(document).ready(function(){
  $('#create_lens').bind('click', function(){
    var el= $('.final-result')[0];
    var tag = $('.final-result').prop('outerHTML'),
        tagName = el.tagName.toLowerCase(),
        currentState = el.getState(),
        classList = el.className;
        // console.log(el.className);

    $.ajax({
      type: "POST",
      url: "/lenses",
      data: {
        lensinfo: {
          tag: tag,
          tagname: tagName,
          currentstate: currentState,
          classlist: classList
        }
      },
      success: function(e){
        $('#status').html("You've created a new lens with ID:" + e);
      },
    });
  });
});

