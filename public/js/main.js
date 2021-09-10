$("#btnMenu").click(function(){
    $('.main-nav-links').toggleClass('active')
})
$('#show-login').click(function(){
    $('#login-modal').addClass('show')

})
$('#show-register').click(function(){
    $('#register-modal').addClass('show')
})

$('.btn-close').click(function(){
    $('.popup-container').removeClass('show');
})



  