$(function() {
   var inputs = $('input'), hints = $('.hints');
   inputs.focus(function() {
      $(this).removeClass('errorinput');
      hints.hide();
      $(this).next().next().text('');
      $(this).next().show();
   });

   inputs.blur(function() {
      $(this).next().hide();
      var id = $(this).attr('id'), valid = true;
      if (id == 'repeat') {
         if ($(this).val() != $('#password').val()) {
            $(this).addClass('errorinput');
            checkform.form.repeat.status = false;
            $(this).next().next().text(checkform.getErrorMessage(id));
            valid = false;
         }
         else checkform.form.repeat.status = true;
      }
      else if (checkform.isFieldValid(id, $(this).val()) == false) {
         valid = false;
         $(this).addClass('errorinput');
         $(this).next().next().text(checkform.getErrorMessage(id));
      }
   });

   $('img').click(function() {
      var pwd = $(this).prevUntil('label').eq(2), type = pwd.attr('type');
      if (type == 'password') {
         pwd.attr('type', 'text');
         $(this).attr('src', '../images/openeye.png');
      }
      else {
         pwd.attr('type', 'password');
         $(this).attr('src', '../images/closeeye.png');
      }
   });

   $('#reset').click(function(){
      window.location.href = '/regist';
   });

   $('#submit').click(function() {
      inputs.blur();
      return $('.error').text() == '';
   });
});
