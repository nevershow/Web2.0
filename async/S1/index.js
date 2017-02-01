$(function() {
   nums = $('.num');
   sum = $('#sum');
   buttons = $('.button');
   info_bar = $('#info-bar');
   $('#at-plus-container').mouseleave(init);
   buttons.click(getRandomNumber);
   info_bar.click(calc);
});

function init () {
   setTimeout(function () {
      nums.text('');
      nums.hide();
      sum.text('');
      info_bar.addClass('wait');
      $('li').removeClass('clicked');
      $('li').removeClass('wait');
   }, 500);
}

function isFiveClick() {
   var done = true;
   for (var i = 0; i < 5 && done; i++)
      done = buttons.eq(i).hasClass('clicked');
   if (done)
      info_bar.removeClass('wait');
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
   if (nums.eq(index).text() == '' && $(this).hasClass('wait') == false) {
      nums.eq(index).text('...');
      nums.eq(index).show();
      buttons.addClass('wait');
      $(this).removeClass('wait');

      $.get('/', function (res) {
         if (nums.text()) {
            nums.eq(index).text(res);
            buttons.eq(index).addClass('clicked');
            buttons.removeClass('wait');
            isFiveClick();
         }
      });
   }
}
