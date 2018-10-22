$(document).ready(function() {
  //START OF DOC READY

  $('#sections').on('change', function() {
    const selected = $(this).val();

    // MY FUNCTION
    let url = 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json';
    url +=
      '?' +
      $.param({
        'api-key': '42ab6a5236364b609385636b553df245'
      });
    event.preventDefault();
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'JSON'
    })
      .done(function(data) {
        $('.results').empty();
        $.each(data.results, function(key, value) {
          $('.results').append(
            '<p>' +
              value.abstract +
              '<img src=' +
              value.multimedia[2].url +
              '>' +
              '</p>'
          );
        });
      })
      .fail(function() {
        $('.results').empty();
        $('.results').append("Sorry, we can't disply the content right now.");
      });

    //End of my function
  }); //End of #sections function
}); //END OF DOC READY
