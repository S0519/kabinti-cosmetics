$(".btn-send").click(function(){
    const firstName = $("input[name=first-name]").val();
    const lastName = $("input[name=last-name]").val();
    const userEmail = $("input[name=email]").val();
    const message = $("textarea[name=message]").val();
    if(!firstName || !lastName || !userEmail || !message){
        SoloAlert.alert({title:"All feilds are required"});
    }
    else{
        const contactInfo={
            firstName:firstName,
            lastName:lastName,
            userEmail:userEmail,
            message:message
        }
        axios.post("/api/send-email",contactInfo)
        .then(({data})=>{
            SoloAlert.alert({
                title:data.message,
                body:"We will get back to you soon.",
                icon: "success",
                onOk : ()=>{
                    window.location.replace("/");
              }
            });
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
})