$(function() {
   nums = $('.num');
   sum = $('#sum');
   seq = $('#seq');
   $('#at-plus-container').mouseleave(init);
   buttons = $('.button');
   info_bar = $('#info-bar');
   buttons.click(getRandomNumber);
   info_bar.click(calc);
   var arr = ['A', 'B', 'C', 'D', 'E'];
   $('.apb').click(function(){
      if (!seq.text() && !sum.text()) {
         arr.sort(function() {return Math.random() - 0.5;});
         seq.text(arr.join(''));
         buttons.filter('.' + arr[0]).click();
      }
   });
});

function init () {
   setTimeout(function () {
      nums.text('');
      nums.hide();
      sum.text('');
      seq.text('');
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

function getRandomNumber() {
   var index = buttons.index($(this));
   if (seq.text() && !nums.eq(index).text() && !$(this).hasClass('wait')) {
      nums.eq(index).text('...');
      nums.eq(index).show();
      buttons.addClass('wait');
      $(this).removeClass('wait');
      $.get('/', function (res) {
         if (nums.text()) {
            nums.eq(index).text(res);
            buttons.eq(index).addClass('clicked');
            buttons.removeClass('wait');

            var ct = seq.text().indexOf(buttons.eq(index).attr('class')[0]);
            if (ct == 4)
               info_bar.removeClass('wait');
            setTimeout(function(){
               if (ct == 4)
                  calc();
               else {
                  buttons.filter('.' + seq.text()[ct + 1]).click();
               }
            }, 500);
         }
      });
   }
}
