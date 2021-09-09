$(".btn-add").click(function(){
    const productInfo={
        title:$('input[name=title]').val(),
        price:$('input[name=price]').val(),
        discount:$('input[name=discount]').val(),
        quantity:$('input[name=quantity]').val(),
        category:$('select[name=category]').find(":selected").val(),
        breifDesc:$('input[name=brief-desc]').val(),
        imageUrl:$('input[name=imgUrl]').val(),
        fullDesc:$('textarea[name=full-desc]').val()
    }
    axios.post("/api/product/add",productInfo)
    .then(({data})=>{
        SoloAlert.alert({
            title:data.message,
            icon: "success"
          });
    })
    .catch((err)=>{
        console.log(err)
    })
    console.log(productInfo)
})