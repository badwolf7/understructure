// Virgil JS
//
// Holly Springsteen
//
// Calculations                16
//   - confidenceInterval      44
//   - npsScore                91
//   - sampleSize              114
//   - sigma                   150
// Page Flow                   172
// Tracker                     195



$(function(){
  ///////////////////////// CALCULATIONS
  //////////////////////////////////////
  var pf = 0;

  function conLevCheck(conLev){
    if(conLev === undefined || conLev === '' || conLev !== 95 || conLev !== 99){
      if(conLev === '95'){
        conLev = 95;
      }else if(conLev === '99'){
        conLev = 99;
      }else{
        conLev = 95;
      }
    }

    return conLev;
  }

  function popCheck(pop){
    if(pop === undefined || pop === ''){
      pop = 0;
    }

    return pop;
  }


  var calc = {
    "confidenceInterval": function(conLev,ss,pop,perc){
      // set value for confidence level
      conLev = conLevCheck(conLev);
      var conLevels = {
        "95": 3.8416,
        "99": 6.6564
      }
      var conLevel = conLevels[conLev];


      // sample size check
      if(ss === undefined || ss === '' || ss <= 0){
        ss = 384;
      }


      // population check
      pop = popCheck(pop);


      // percentage check
      if(perc === undefined || perc === ''){
        perc = 50;
      }
      if(perc < 1){
        perc = 1;
      }
      if(perc > 99){
        perc = 99;
      }


      //
      if (pop == 0){
        pf = 1
      }else{
        pf = (pop - ss) / (pop - 1)
      }

      conInt = Math.sqrt(conLevel * (perc / 100) * (1 - perc / 100) / ss * pf) * 100;

      // round and display
      pf=parseInt(conInt);
      conInt=Math.round((conInt-pf)*100);

      return pf+conInt/100;
    },
    "npsScore": function(promoters,detractors,total){
      // promoters (% / count)
      // detractors (% / count)
      // total (count)
      //   total is optional, only used when sending counts

      if(total === undefined){
        if(promoters > 0 || promoters < 100){
          if(detractors > 0 || detractors < 100){
            return promoters - detractors;
          }else{
            return "detractors percent must be between 0 and 100";
          }
        }else{
          return "promoters percent must be between 0 and 100";
        }
      }else{
        var pPerc = (promoters / total) * 100;
        var dPerc = (detractors / total) * 100;

        return pPerc - dPerc;
      }
    },
    "sampleSize": function(conLev,conInt,pop){
      // set value for confidence level
      conLev = conLevCheck(conLev);
      var conLevels = {
        "95": 1.96,
        "99": 2.58
      }
      var conLevel = conLevels[conLev];


      // confidence interval check (±val)
      if(conInt === undefined || conInt === ''){
        conInt = 5;
      }
      if(conInt < 0.1){
        conInt = 0.1;
      }
      if(conInt > 50){
        conInt = 50;
      }

      // population size check
      pop = popCheck(pop);


      // set sample size
      if (pop == 0) {
        ss = ((conLevel *conLevel) * 0.25) / ((conInt / 100) *(conInt / 100))
      }else {
        ss = ((conLevel *conLevel) * 0.25) / ((conInt / 100) *(conInt / 100));
        ss=ss/(1+(ss-1)/pop)
      }

      // return sample size val
      return parseInt(ss+.5);
    },
    "sigma": function(top, bottom){
      // only top is required
      if(bottom === undefined || bottom === '' || bottom === null){
        bottom = 1;
      }
      if(top === undefined || top === '' || top === null){
        return "must define a top value";
      }

      var sum = 0

      for (var i = bottom; i <= top; i++) {
        sum += i

        if(i >= top){
          return sum;
        }
      }
    }
  }





  //////////////////////////// PAGE FLOW
  //////////////////////////////////////
  // based on href will flow page to location rather than jump
  function pageFlow(e,obj){
    var loc = $(obj).attr('href');
    var locTop = $(loc).offset().top;

    $('body').animate(
      {"scrollTop": locTop},
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
  var trackerTop = $('.tracker').parent('nav').position().top;

  function tracker(){
    var scrollTop = $(window).scrollTop();


    if(trackerTop > scrollTop + 75){
      $('.tracker').parent('nav').css({
        'position':'absolute',
        'top':'initial'
      });
    }else{
      $('.tracker').parent('nav').css({
        'position':'fixed',
        'top':'75px'
      });
    }


    $('.tracker-section').each(function(){
      var top = $(this).position().top;
      var id = $(this).attr('id');

      if(!$('.tracker-link[href="#'+id+'"').hasClass('tracker-current')){
        if(top < scrollTop + 50){
          $('.tracker-link').removeClass('tracker-current');
          $('.tracker ul').removeClass('visible');


          $('.tracker-link[href="#'+id+'"').addClass('tracker-current');


          $('.tracker-link[href="#'+id+'"').parent('li').parent('ul').addClass('visible');
          $('.tracker-link[href="#'+id+'"').parent('li').parent('ul').parent('li').parent('ul').addClass('visible');
          $('.tracker-link[href="#'+id+'"').parent('li').parent('ul').parent('li').parent('ul').parent('li').parent('ul').addClass('visible');
        }else{
          $('.tracker-link[href="#'+id+'"').parent('li').removeClass('tracker-current');
        }
      }
    });
  }
  tracker();

  $(window).scroll(function(){
    tracker();
  });
});