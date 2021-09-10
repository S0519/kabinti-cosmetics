$('.btn-filter').click(function(){
    $(".side-nav").addClass("sidenav-show");
})

$('.close-sidenav').click(function(){
    $(".side-nav").removeClass("sidenav-show");
})


const getCategory=(queryId)=>{
    const query= queryId=="all"?"all":$(`#${queryId}`).val().toLowerCase();
    window.location.replace(`/products/${query}`);
}


$(function(){
    $('.filter-cont button.btn-active').removeClass('btn-active');
    const query = window.location.pathname;
    const tokens = query.split("/");
    const parameter=tokens[2]
        if(parameter=="Skin"){
            $(".btn-skin").addClass("btn-active");
        }
        else if(parameter=="Hair"){
            $(".btn-hair").addClass("btn-active");
        }
        else{
            $(".btn-cosmetic").addClass("btn-active");
        }
    
})