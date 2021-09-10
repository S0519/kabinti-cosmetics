$("#btn-category").click(function(){
    const catgoryName=$("input[name=cat-title]").val();
    const catgoryImage=$("input[name=cat-image]").val();
    if(!catgoryName || !catgoryImage){
        SoloAlert.alert({
            title:"All feilds are required!"
        })
    }
    else{
        const categoryInfo={
            name:catgoryName.toLowerCase(),
            imageUrl:catgoryImage
        }
        axios.post("/add-category",categoryInfo)
        .then(({data})=>{
            SoloAlert.alert({
                title:data.message,
                icon: "success"
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
})