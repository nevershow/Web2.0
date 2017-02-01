$(function() {
   var arr = ['A', 'B', 'C', 'D', 'E'];
   $('#at-plus-container').mouseleave(init);
   $('.apb').click(function() {
      if (!$('#seq').text()) {
         arr.sort(function() {return Math.random() - 0.5;});
         $('#seq').text(arr.join(''));
         Robot(arr[0]);
      }
   });
});

function init () {
   $('#seq').text('');
   $('#message').text('');
   setTimeout(function () {
      $('.num').text('');
      $('.num').hide();
      $('#sum').text('');
      $('#bubble').addClass('wait');
      $('li').removeClass('clicked');
      $('li').removeClass('wait');
   }, 500);
}

function Robot(firstclick) {
   var obj = {'A': AHandler, 'B':BHandler, 'C':CHandler,
            'D':DHandler, 'E':EHandler, 'bubble':bubbleHandler};
   callback = function (err, currentSum) {
      if (err) {
         $('#message').text(err);
         $('#message').css('color', 'red');
         var ct = err[0];
         if (obj[ct])
            obj[ct](currentSum, obj, callback);
         else
            obj['bubble'](currentSum, obj, callback);
      }
   }
   obj[firstclick](0, obj, callback);
}
function AHandler (currentSum, obj, callback) {
   $('.num').eq(0).text('...');
   $('.num').eq(0).show();
   $('.button').addClass('wait');
   $('.A').removeClass('wait');
   $.get('/', function (res) {
      if ($('#seq').text() == '')
         return;
      if (Math.random() > 0.5) {
         callback('A:这不是个天大的秘密', currentSum);
      }
      else {
         $('#message').text('A:这是个天大的秘密');
         $('#message').css('color', 'black');
         $('.num').eq(0).text(res);
         $('.button').eq(0).addClass('clicked');
         $('.button').removeClass('wait');
         currentSum += parseInt(res);
         var index = $('#seq').text().indexOf('A'),
            nextclick = $('#seq').text()[index + 1];
         if (nextclick)
            obj[nextclick](currentSum, obj, callback);
         else
            obj['bubble'](currentSum, obj, callback);
      }
   });
}

function BHandler (currentSum, obj, callback) {
   $('.num').eq(1).text('...');
   $('.num').eq(1).show();
   $('.button').addClass('wait');
   $('.B').removeClass('wait');
   $.get('/', function (res) {
      if ($('#seq').text() == '')
         return;
      if (Math.random() > 0.5) {
         callback('B:我知道', currentSum);
      }
      else {
         $('#message').text('B:我不知道');
         $('#message').css('color', 'black');
         $('.num').eq(1).text(res);
         $('.button').eq(1).addClass('clicked');
         $('.button').removeClass('wait');
         currentSum += parseInt(res);
         var index = $('#seq').text().indexOf('B'),
            nextclick = $('#seq').text()[index + 1];
         if (nextclick)
            obj[nextclick](currentSum, obj, callback);
         else
            obj['bubble'](currentSum, obj, callback);
      }
   });
}

function CHandler (currentSum, obj, callback) {
   $('.num').eq(2).text('...');
   $('.num').eq(2).show();
   $('.button').addClass('wait');
   $('.C').removeClass('wait');
   $.get('/', function (res) {
      if ($('#seq').text() == '')
         return;
      if (Math.random() > 0.5) {
         callback('C:你知道', currentSum);
      }
      else {
         $('#message').text('C:你不知道');
         $('#message').css('color', 'black');
         $('.num').eq(2).text(res);
         $('.button').eq(2).addClass('clicked');
         $('.button').removeClass('wait');
         currentSum += parseInt(res);
         var index = $('#seq').text().indexOf('C'),
            nextclick = $('#seq').text()[index + 1];
         if (nextclick)
            obj[nextclick](currentSum, obj, callback);
         else
            obj['bubble'](currentSum, obj, callback);
      }
   });
}

function DHandler (currentSum, obj, callback) {
   $('.num').eq(3).text('...');
   $('.num').eq(3).show();
   $('.button').addClass('wait');
   $('.D').removeClass('wait');
   $.get('/', function (res) {
      if ($('#seq').text() == '')
         return;
      if (Math.random() > 0.5) {
         callback('D:他知道', currentSum);
      }
      else {
         $('#message').text('D:他不知道');
         $('#message').css('color', 'black');
         $('.num').eq(3).text(res);
         $('.button').eq(3).addClass('clicked');
         $('.button').removeClass('wait');
         currentSum += parseInt(res);
         var index = $('#seq').text().indexOf('D'),
            nextclick = $('#seq').text()[index + 1];
         if (nextclick)
            obj[nextclick](currentSum, obj, callback);
         else
            obj['bubble'](currentSum, obj, callback);
      }
   });
}

function EHandler (currentSum, obj, callback) {
   $('.num').eq(4).text('...');
   $('.num').eq(4).show();
   $('.button').addClass('wait');
   $('.E').removeClass('wait');
   $.get('/', function (res) {
      if ($('#seq').text() == '')
         return;
      if (Math.random() > 0.5) {
         callback('E:才不怪', currentSum);
      }
      else {
         $('#message').text('E:才怪');
         $('#message').css('color', 'black');
         $('.num').eq(4).text(res);
         $('.button').eq(4).addClass('clicked');
         $('.button').removeClass('wait');
         currentSum += parseInt(res);
         var index = $('#seq').text().indexOf('E'),
            nextclick = $('#seq').text()[index + 1];
         if (nextclick)
            obj[nextclick](currentSum, obj, callback);
         else
            obj['bubble'](currentSum, obj, callback);
      }
   });
}

function bubbleHandler (currentSum, obj, callback) {
   $('#bubble').removeClass('wait');
   $.get('/', function (res) {
      if ($('#seq').text() == '')
         return;
      if (Math.random() > 0.5) {
         callback('大气泡:楼主同步调用战斗力感人，目测超过' + currentSum, currentSum);
      }
      else {
         $('#message').text('大气泡:楼主异步调用战斗力感人，目测不超过' + currentSum);
         $('#message').css('color', 'black');
         $('#bubble').addClass('wait');
         $('#sum').text(currentSum);
      }
   });
}
