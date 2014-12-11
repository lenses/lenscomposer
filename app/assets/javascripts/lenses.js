$(document).ready(function(){  
  
  // Select create/update lens buttons 
  // Only works if event listener is in vanilla JS
  var create_lens_button = document.querySelector('#create_lens'),
      update_lens_button = document.querySelector('#update_lens');

  // Post request to create a new lens
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

  // Put request to update an existing lens
  if (update_lens_button){
    update_lens_button.addEventListener("click", function(){ 
      var lens_id = this.dataset ? this.dataset.lensId : "";
      var element_data = getElementData();

      $.ajax({
        type: "PUT",
        url: "/lenses/"+lens_id,
        data: { "lens": {"id": lens_id,"components_attributes": element_data}},
        dataType: 'json',
        success: function(e){
          $('#status').html("You've successfully updated the lens with ID:" + e);
        },
        error: function(e){
        }
      });
    });
  }

  // Get relevent info for each component in th-connector
  function getElementData(){

      var elements = document.querySelector('th-connector').children;
      var element_data = {};

      for (var i=0; i<elements.length; i++){
        var element_id = elements[i].dataset && elements[i].dataset.componentId ? elements[i].dataset.componentId : null,
            element_state = elements[i].getState ? elements[i].getState() : "";
        
        element_data[i] = {
          id: element_id,
          tagname: elements[i].tagName.toLowerCase(),
          classlist: elements[i].className,
          final_result: elements[i].className == "final-result",
          currentstate: element_state
          // Also pass styles?
        }
      }
    return element_data;
  }

});

