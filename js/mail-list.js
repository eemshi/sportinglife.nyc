function parseSendInBlueSignupError(originalMsg, email)
{
    msg = '';

    if (originalMsg == 'invalidEmail') {
        msg = "Invalid email address. Please try again.";
    }
    else if (originalMsg == 'emailExist') {
        msg = email + ' is already subscribed.';
    }
    else {
        msg = 'There was an error subscribing this address. Please try again later.';
    }

    return msg;
}

$('#mail-list-signup').submit(function(e){
    e.preventDefault();
    $(this).closest('.result').removeClass('error').removeClass('success').html('<i class="sprite  sprite--loading"></i>');

    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        cache       : false,
        dataType    : 'json',
        error       : function(err) {
            msg = parseSendInBlueSignupError(err.result.result, $('#mail-list-signup .email').val());
            $('#mail-list-signup .result').addClass('error');
            $('#mail-list-signup .result').html(msg);
        },
        success     : function(data) {
            if (data.result.result == 'success'){
                $('#mail-list-signup .result').removeClass('error').addClass('success');
                $('#mail-list-signup .result').html('Almost finished...<br>Please check your inbox for a link to confirm your address.');
            }
            else {
                msg = parseSendInBlueSignupError(data.result.result, $('#mail-list-signup .email').val());
                $('#mail-list-signup .result').removeClass('success').addClass('error');
                $('#mail-list-signup .result').html(msg);
            }
        }
    });
});

$(document).on('opening', '.js-mail-list-signup', function () {
  $('#mail-list-signup .result').removeClass('success').removeClass('error').html("");
  $('#mail-list-signup .email').val("").focus();
});
