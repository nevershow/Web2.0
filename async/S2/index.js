$(function() {
   nums = $('.num');
   sum = $('#sum');
   buttons = $('.button');
   info_bar = $('#info-bar');
   buttons.click(getRandomNumber);
   clickapb = false;
   $('#at-plus-container').mouseleave(init);
   $('.apb').click(function(){
      clickapb = true;
      buttons.eq(0).click();
   });
});

function init () {
   setTimeout(function () {
      clickapb = false;
      nums.text('');
      nums.hide();
      sum.text('');
      info_bar.addClass('wait');
      $('li').removeClass('clicked');
      $('li').removeClass('wait');
   }, 500);
}

function calc () {
   if ($(this).hasClass('wait') == false) {
      var ans = 0;
      for (var i = 0; i < 5; i++)
         ans += parseInt(nums.eq(i).text());
      sum.text(ans);
      info_bar.addClass('wait');
   }
}

function getRandomNumber() {
   var index = buttons.index($(this));
   if (clickapb && !nums.eq(index).text() && !$(this).hasClass('wait')) {
      nums.eq(index).text('...');
      nums.eq(index).show();
      buttons.addClass('wait');
      $(this).removeClass('wait');
      $.get('/', function (res) {
         if (nums.text()) {
            nums.eq(index).text(res);
            buttons.eq(index).addClass('clicked');
            buttons.removeClass('wait');
            if (index == 4)
               info_bar.removeClass('wait');
            setTimeout(function() {
               if (index == 4)
                  calc();
               else
                  buttons.eq(index + 1).click();
            }, 500);
         }
      });
   }
}
