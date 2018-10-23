$(document).ready(function() {
  //START OF DOC READY

  $('#sections').on('change', function() {
    $('.loading').append(
      '<img src="images/ajax-loader.gif" class="loading-image">'
    );
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
        $('div.selector').addClass('selected');

        let filteredData = data.results
          .filter(function(info) {
            return info.multimedia.length > 4;
          })
          .slice(0, 12);

        $.each(filteredData, function(key, value) {
          $('.results').append(
            `<a href="${
              value.url
            }" target="_blank"><article style="background: url(${
              value.multimedia[4].url
            }) no-repeat center; background-size: cover;"><p>${
              value.abstract
            }</p></article></a>`
          );
        });
      })
      .fail(function() {
        $('.results').empty();
        $('.results').append(
          `<p class="fail">Sorry, we can't display the content right now.</p>`
        );
      })
      .always(function() {
        $('.loading-image').remove();
      });
    //End of my function
  }); //End of #sections function
}); //END OF DOC READY
