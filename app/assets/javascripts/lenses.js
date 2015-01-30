var Lenses = function(){
  return {

    getAllElData: function(){

      var els = document.querySelector('th-connector').children;
      var els_data = [];

      for (var i = 0; i < els.length; i++) {

        els_data.push(this.getElData(els[i]));

      }

      return els_data;

    },
    getElData: function(el) {

        var el_id = el.dataset && el.dataset.componentId ? el.dataset.componentId : null;
        var el_state = el.getState ? JSON.parse(el.getState()) : "";

        var el_data = {

          id: el_id,
          tagname: el.tagName.toLowerCase(),
          classlist: el.className,
          final_result: el.className == "final-result",
          currentstate: el_state

        };

        return el_data;

    },
    saveLens: function(lens){
      // var lens = document.querySelector('th-lens-composer');
      return lens.saveLens();
    },
    getAuthor: function(lens){
      // var lens = document.querySelector('th-lens-composer');
      return lens.lensAuthor;
    },
    getTitle: function(lens){
      // var lens = document.querySelector('th-lens-composer');
      return lens.lensTitle;
    },
    getFinalResult: function(lens){
      return lens.getFinalResult();
    }


  };

}();

$(document).ready(function(){


  $('#create_lens').bind("click", function(){
      
      var lens = document.querySelector('th-lens-composer'),
          element_data,
          author, 
          title,
          finalResult;

      if (lens){ // this is for th-lens-composer
          element_data = Lenses.saveLens(lens);
          author = Lenses.getAuthor(lens) || "Author";
          title = Lenses.getTitle(lens) || "Name of Lens";
          finalResult = Lenses.getFinalResult(lens);

      //TODO: fix saving for th-connector...somewhere it went wrong...
      } else { // this is for th-connector
          element_data = Lenses.getAllElData();
          author = "author";
          name = "name";
      }


      $.ajax({
        type: "POST",
        url: "/lenses",
        data: {
              "name" : title,
              "author": author,
              "els": JSON.stringify(element_data),
              "final_result": JSON.stringify(finalResult)
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

