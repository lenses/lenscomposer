var Lenses = function(){
  return {

    getLinearState: function(lens){
      var data = {};
      data.author = lens.lensAuthor;
      data.name = lens.lensTitle;
      data.type = "linear";
      data.linear_data = lens.getState();
      data.final_result = lens.getFinalResult();
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
      // TODO: why doesn't adding this event listener down below achieve the same result? I just want to have it once within $(document).ready
      document.addEventListener('polymer-ready', function(){
        var lenscomposer = document.querySelector('th-lens-composer');

        lenscomposer.lensTitle = lens.title;
        lenscomposer.lensAuthor = lens.author;
        lenscomposer.recreateLens(lens.linear_data);

      })
    },
    buildConnectorLens: function(lens){
      document.addEventListener('polymer-ready', function(){
        var connector = document.querySelector('th-connector'),
            elements = lens.connector_data.elements, 
            connections = lens.connector_data.connections;

        connector.scaffoldFromData(elements, connections);
      })

    },
    createEl: function(final_result){
      document.addEventListener('polymer-ready', function(){
        
        var componentName = final_result.componentName,
            componentState = final_result.componentState,
            pathToEl = "/assets/bower_components/" + componentName + "/" +componentName+ ".html"; 
        
        // Dynamically import element and create it with attrs saved in componentState
        Polymer.import([pathToEl], function(){     
          var component = document.createElement(componentName);
          
          for (var attr in componentState){
            component[attr] = componentState[attr]
          }
          component.showOptions = false;
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
      
      $.ajax({
        type: "POST",
        url: "/lenses",
        data: element_data,
        dataType: 'json',
        success: function(d, s, xhr){
          window.location.replace("/lenses/"+d+"/edit");
          // $('#status').html("You've created a new lens with ID:" + d);
        },
        error: function(xhr, s, e){
          console.log("error");
            
          $('#status').html("Your lens could not be saved: " + e);
        }
      });
  });

  // Display/hide embed code for iframe
  $('#embed').bind('click', function(){
    $('#embed-tag').slideToggle();
  })



});

