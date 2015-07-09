$(document).ready(function() {
  fetchIdeas();
  createIdea();
  editForm();
});

function fetchIdeas() {
  $.ajax({
    type: 'GET',
    url: '/ideas',
    success: function(ideas) {
      for(var i = 0; i < ideas.length; i++) {
        $(".box-area").append("<br><div id='boxed-in'><div style='display: none;'>" + ideas[i].id + "</div><h5 class='center-align'>" +
          ideas[i].title + "</h5><p>" +
          ideas[i].body + "</p>" +
          "<button class='edit buttons'>Edit</button>  <button class='delete'>Delete</button>  <button class='up buttons'>Up</button>  <button class='down buttons'>Down</button>" +
          "</div><br>"
        )
      }
    }
  })
  .done(function(){
    deleteIdea();
    thumbsUp();
    thumbsDown();
    editForm();

  })
}

function createIdea() {
  $("#create_button").on('click', function(){
    var ideaParams = { idea: {title: $("#title").val(), body: $("#body").val()} }
    clearForm()
    $.ajax({
      type: 'POST',
      url: '/ideas.json',
      data: ideaParams,
      success: function(response) {
        addToIdeas(response);

      }
    }).done(function(){
        deleteIdea();
        thumbsUp();
        thumbsDown();
        editForm();

      })

  })
}

function addToIdeas(idea) {
  $(".box-area").prepend("<br><div id='boxed-in'><div style='display: none;'>" + idea.id + "</div><h5>" +
    idea.title + "</h5><p>" +
    idea.body + "</p>" +
    "<button id='edit buttons'>Edit</button>  <button class='delete'>Delete</button>  <button class='up buttons'>Up</button>  <button class='down buttons'>Down</button>" +
    "</div><br>"
  )

}

function clearForm() {
  $("#title").val('');
  $("#body").val('');
}

function deleteIdea() {
  $(".delete").on('click', function() {
    var container = $(this).parent();
    var ideaIdParams = $(this).parent().children(":first").text();
    $.ajax({
      type: 'DELETE',
      url: '/ideas/' + ideaIdParams,
      data: ideaIdParams,
      success: function() {
      }
    }).then(removeDeleted(container, ideaIdParams));
  });
}

function removeDeleted(container, ideaIdParams) {
  container.empty();
}

function thumbsUp() {
  $(".up").on('click', function() {
    var container = $(this).parent();
    var ideaIdParams = $(this).parent().children(":first").text();
    $.ajax({
      type: 'PUT',
      url: '/ideas/thumbsup/' + ideaIdParams,
      data: ideaIdParams,
      success: function() {

      }
    })
  });
}

function thumbsDown() {
  $(".down").on('click', function() {
    var container = $(this).parent();
    var ideaIdParams = $(this).parent().children(":first").text();
    $.ajax({
      type: 'PUT',
      url: '/ideas/thumbsdown/' + ideaIdParams,
      data: ideaIdParams,
      success: function() {

      }
    })
  });
}

function editForm() {
  $(".edit").on('click', function() {
    var ideaIdParams = $(this).parent().children(":first").text();
    window.location.href = "/ideas/" + ideaIdParams + "/edit";
  })
}
