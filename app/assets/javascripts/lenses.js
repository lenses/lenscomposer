var Lenses = function(){
  return {

    getLinearState: function(lens){
      var data = {};
      data.author = lens.lensAuthor;
      data.name = lens.lensTitle;
      data.type = "linear";
      data.linear_data = JSON.stringify(lens.saveLens());
      data.final_result = JSON.stringify(lens.getFinalResult());
      return data;

    },
    getConnectorState: function(connector){
      var data = {};
        data.author = '';
        data.name = '';
        data.type = "connector";
        data.connector_data = connector.dumpStateDataAsString();
        data.final_result = {};
      return data;
    },
    buildLinearLens: function(lens){
      document.addEventListener('polymer-ready', function(){
        var lenscomposer = document.querySelector('th-lens-composer');
        lenscomposer.lensTitle = lens.title;
        lenscomposer.lensAuthor = lens.author;
        lenscomposer.recreateLens(JSON.parse(lens.linear_data));

      })
    },
    buildConnectorLens: function(lens){
      document.addEventListener('polymer-ready', function(){
        var connector = document.querySelector('th-connector'),
            elements = JSON.parse(lens.connector_data).elements, 
            connections = JSON.parse(lens.connector_data).connections;

        connector.scaffoldFromData(elements, connections);
      })

    },
    createEl: function(final_result){
      document.addEventListener('polymer-ready', function(){
        
        final_result = JSON.parse(final_result);
        var componentName = final_result.componentName,
            componentState = JSON.parse(final_result.componentState), // TODO: why does it need to be parsed so much? Has is been stringified too many times?
            pathToEl = "/assets/bower_components/" + componentName + "/" +componentName+ ".html"; 
        
        Polymer.import([pathToEl], function(){     
          var component = document.createElement(componentName);
          
          for (var attr in componentState){
            component[attr] = componentState[attr]
          }
          component.style.width = "100%";
          component.style.height = "100%";
          document.querySelector('body').appendChild(component);
        })
      })
    }
  };

}();

$(document).ready(function(){

  var lens = gon.lens, // object that holds info to recreate lens
      final_result = gon.final_result; 
  
  // If lens exists (only on edit page), recreate the lens
  if(lens && lens.type == "linear"){ 
    Lenses.buildLinearLens(lens);
  } else if (lens && lens.type === "connector"){
    Lenses.buildConnectorLens(lens);
  }

  // If final_result exists (only on show page), recreate the element
  if(final_result){
    Lenses.createEl(final_result);
  }

  // Create new lens callback
  $('#create_lens').bind("click", function(){
      console.log('create lens begin')
      var lenscomposer = document.querySelector('th-lens-composer'),
          connector = document.querySelector('th-connector'),
          element_data = lenscomposer ? Lenses.getLinearState(lenscomposer) : connector ? Lenses.getConnectorState(connector) : null;
      
        console.log(element_data)

      $.ajax({
        type: "POST",
        url: "/lenses",
        data: element_data,
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

