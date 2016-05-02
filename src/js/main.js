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



  ////////////////////////////// TRACKER
  //////////////////////////////////////
  function tracker(){
    var scrollTop = $(window).scrollTop();

    $('.tracker-section').each(function(){
      var top = $(this).position().top;
      var id = $(this).attr('id');

      if(top < scrollTop + 50){
        $('.tracker-link[href="#'+id+'"').addClass('tracker-current');
      }else{
        $('.tracker-link[href="#'+id+'"').removeClass('tracker-current');
      }
    });
  }

  $(window).scroll(function(){
    tracker();
  });
});