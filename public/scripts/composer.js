$(document).ready(function() {
  const button = document.getElementById('return-to-top');
  const scrollFunction = () => {
    if (window.scrollY > 500) {
      button.classList.remove('hidden');
    }  
    if (window.scrollY < 500) {
      button.classList.add('hidden');
    }
  }
  
  $(window).on('scroll', function() {

    scrollFunction();
  });
  function returnToTop() {
      document.documentElement.scrollTop = 0;
    }
  
  $('#return-to-top').on('click', () => {
    returnToTop();
  });
});