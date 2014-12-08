$(document).ready(function(){  
  
  // Only works if event listener is in vanilla JS
  var create_lens_button = document.querySelector('#create_lens'),
      update_lens_button = document.querySelector('#update_lens');

  if (create_lens_button){
    create_lens_button.addEventListener("click", function(){ 

      var element_data = getElementData();

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
  }

  if (update_lens_button){
    update_lens_button.addEventListener("click", function(){ 

      var element_data = getElementData();

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
  }



  function getElementData(){
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
    return element_data;
  }


  // add event handler for update action

});

