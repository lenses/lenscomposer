var Lenses = function(){
  return {

    getAllElData: function(){

      var elements = document.querySelector('th-connector').children;
      var els = [];

      for (var i=0; i<elements.length; i++){
        var element_id = elements[i].dataset && elements[i].dataset.componentId ? elements[i].dataset.componentId : null;
        var element_state = elements[i].getState ? JSON.parse(elements[i].getState()) : "";


        var el_data = {
          id: element_id,
          tagname: elements[i].tagName.toLowerCase(),
          classlist: elements[i].className,
          final_result: elements[i].className == "final-result",
          currentstate: element_state
        };
        els.push(el_data);
      }
      return els;
    },

    getElData: function(id) {
    },

    getFinalEl: function() {
    },

  };

}();

$(document).ready(function(){


  $('#create_lens').bind("click", function(){
      var element_data = Lenses.getAllElData();

      $.ajax({
        type: "POST",
        url: "/lenses",
        data: {
              "name" : "demo_name",
              "author": "demo_author",
              "els": JSON.stringify(element_data),
        },
        dataType: 'json',
        success: function(d, s, xhr){
          $('#status').html("You've created a new lens with ID:" + d);
        },
        error: function(xhr, s, e){
          console.log("error");
          $('#status').html("You've created a new lens with ID:" + e);
        }
      });
  });

  /* Put request to update an existing lens
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
  }*/


});

