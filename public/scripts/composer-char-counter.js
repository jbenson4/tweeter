$(document).ready(function() {
  
  $('#tweet-text').on('input', function(data) {
    const charRemaining = 140 - $(this).val().length;
    const parent = this.closest('form');
    const counter = $(parent).find('.counter');

    counter.text(charRemaining);
  })

});