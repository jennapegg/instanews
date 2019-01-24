$(document).ready(function() {
  //START OF DOC READY

  const $results = $('.results');
  const selectedClass = 'selected';

  $('#sections').on('change', function(event) {
    event.preventDefault();
    $('.loading').append(
      '<img src="images/ajax-loader.gif" class="loading-image">'
    );
    const selected = $(this).val();
    getStories(selected);
  }); //end of on change function

  function getStories(selected) {
    let site = `https://api.nytimes.com/svc/topstories/v2/${selected}.json?api-key=z02USe7Tr09FugQM1vWLpKXwV32eiImi`;

    $.ajax({
      url: site,
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
    $results.empty();
    $('div.selector').addClass(selectedClass);

    let filteredData = data.results
      .filter(info => {
        return info.multimedia.length > 4;
      })
      .slice(0, 12);

    for (let value of filteredData) {
      $results.append(
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
    $results.empty();
    $('.selector')
      .addClass(selectedClass)
      .append(
        `<p class="fail">Sorry! There was a problem, please try again.</p>`
      );
  } //end of failure function
}); //END OF DOC READY
