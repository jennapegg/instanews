$(document).ready(function() {
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  url +=
    "?" +
    $.param({
      "api-key": "42ab6a5236364b609385636b553df245"
    });

  $("button").on("click", function() {
    $.ajax({
      url: url,
      method: "GET"
    })
      .done(function(data) {
        // $('.results').empty();
        $('.results').append('<p>' + data.home.[U.S] + '</p>');
  })
      })
      
      .fail(function(err) {
        throw err;
      });
  });
}); //END OF DOC READY
