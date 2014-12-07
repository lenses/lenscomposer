$(document).ready(function(){  
  
  // Only works if event listener is in vanilla JS
  document.querySelector('#create_lens').addEventListener("click", function(){ 
    
    var el= $('.final-result')[0];
    var tag = $('.final-result').prop('outerHTML'),
        tagName = el.tagName.toLowerCase(),
        currentState = el.getState(),
        classList = el.className;

    var elements = document.querySelector('th-connector').children;
    var element_data = {};
    for (var i=0; i<elements.length; i++){
      console.log(elements[i].getState());
      element_data[i] = {
        tagname: elements[i].tagName.toLowerCase(),
        classlist: elements[i].className,
        final_result: elements[i].className == "final-result",
        currentstate: elements[i].getState()
      }
    }

    console.log(element_data);

    $.ajax({
      type: "POST",
      url: "/lenses",
      data: { "lens": {"components_attributes": element_data}},
      dataType: 'json',
      success: function(e){
        $('#status').html("You've created a new lens with ID:" + e);
      },
    });
  });

  // add event handler for update action

});

