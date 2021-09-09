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

$('.btn-filter').click(function(){
    const category=$(this).text()
    $('.filter-cont button.btn-active').removeClass('btn-active');
    const query = category=="Cosmetics"?"all":category
    $(this).addClass('btn-active');
    window.location.replace(`/products/${query}`)
    
})


  