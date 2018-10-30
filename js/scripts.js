$(document).ready(function() {
  //START OF DOC READY

  $('#sections').on('change', function(event) {
    event.preventDefault();
    $('.loading').append(
      '<img src="images/ajax-loader.gif" class="loading-image">'
    );
    const selected = $(this).val();
    getStories(selected);
  }); //end of on change function

  function getStories(selected) {
    let url = `https://api.nytimes.com/svc/topstories/v2/${selected}.json`;
    url +=
      '?' +
      $.param({
        'api-key': '42ab6a5236364b609385636b553df245'
      });

    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'JSON'
    })
      .done(data => {
        appendStories(data);
      })
      .fail(() => {
        failure();
      })
      .always(() => {
        $('.loading-image').remove();
      });
  } // end of getStories/ajax function

  function appendStories(data) {
    $('.results').empty();
    $('div.selector').addClass('selected');

    let filteredData = data.results
      .filter(info => {
        return info.multimedia.length > 4;
      })
      .slice(0, 12);

    for (let value of filteredData) {
      $('.results').append(
        `<a href="${
          value.url
        }" target="_blank"><article style="background: url(${
          value.multimedia[4].url
        }) no-repeat center; background-size: cover;"><p>${
          value.abstract
        }</p></article></a>`
      );
    } //end of for...of loop
  } //end of append stories function

  function failure() {
    $('.results').empty();
    $('.selector')
      .addClass('selected')
      .append(
        `<p class="fail">Sorry! There was a problem, please try again.</p>`
      );
  } //end of failure function
}); //END OF DOC READY
