$(function() {
   nums = $('.num');
   sum = $('#sum');
   buttons = $('.button');
   info_bar = $('#info-bar');
   $('#at-plus-container').mouseleave(init);
   $('.apb').click(fiveClick);
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

function calc () {
   if (!$(this).hasClass('wait')) {
      var ans = 0;
      for (var i = 0; i < 5; i++)
         ans += parseInt(nums.eq(i).text());
      sum.text(ans);
      info_bar.addClass('wait');
   }
}

function fiveClick () {
   if (nums.text())
      return;
   var times = 0;
   nums.text('...');
   nums.show();
   for (var i = 0; i < 5; i++) {
      $.ajax({
         type: "GET",
         url: "/" + i,
         success: function(res) {
            if (nums.text()) {
               var index = $(this)[0]['url'][1];
               nums.eq(index).text(res);
               buttons.eq(index).addClass('clicked');
               buttons.removeClass('wait');
               ++times;
               if (times == 5) {
                  info_bar.removeClass('wait');
                  setTimeout(calc, 500);
               }
            }
         }
      });
   };
}
