$(function(){
  //////////////////////////// PAGE FLOW
  //////////////////////////////////////
  // based on href will flow page to location rather than jump
  function pageFlow(e,obj){
    var loc = $(obj).attr('href');
    var locTop = $(loc).offset().top;

    $('body').animate(
      {scrollTop: locTop},
      1000,
      'swing'
    );
  }
  $('.page-link').click(function(e){
    e.preventDefault();
    var obj = $(this);
    pageFlow(e, obj);
  });
});