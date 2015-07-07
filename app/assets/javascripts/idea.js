$(document).ready(function() {
  fetchIdeas();
  createIdea();
})

function fetchIdeas() {
  $.ajax({
    type: 'GET',
    url: '/ideas',
    success: function(ideas) {
      for(var i = 0; i < ideas.length; i++) {
        $("#individual-idea-box").append("<div id='boxed-in'><h5>" +
          ideas[i].title + "</h5><p>" +
          ideas[i].body + "</p></div>"
        )
      }
    }
  })
}

function createIdea() {
  $("#create_button").on('click', function(){
    var ideaParams = { idea: {title: $("#title").val(), body: $("#body").val()} }

    $.ajax({
      type: 'POST',
      url: '/ideas.json',
      data: ideaParams,
      success: function() {
        fetchIdeas()
      }
    })
  })
}
