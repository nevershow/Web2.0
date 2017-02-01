$(function() {
   var inputs = $('input');
   inputs.focus(function() {
      $(this).removeClass('errorinput');
      $(this).next().text('');
   });
   inputs.blur(function() {
      var id = $(this).attr('id'), valid = true;
      if (checkform.isFieldValid(id, $(this).val()) == false) {
         $(this).addClass('errorinput');
         $(this).next().text(checkform.getErrorMessage(id));
      }
      else
         $(this).next().text('');
   });


   $('img').click(function(){
      var pwd = $(this).prev().prev(), type = pwd.attr('type');
      if (type == 'password') {
         pwd.attr('type', 'text');
         $(this).attr('src', '../images/openeye.png');
      }
      else {
         pwd.attr('type', 'password');
         $(this).attr('src', '../images/closeeye.png');
      }
   });

   $('button').click(function(){
      return $('.error').text() == '';
   });
});
