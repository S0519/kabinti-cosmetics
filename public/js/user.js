$('.btn-logout').click(function(){

    SoloAlert.confirm({
        title:"Do you want to logout?",
      }).then(value => {
        if(value){
            axios.get('/api/user/logout')
            .then((result)=>{
                window.location.reload();
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{
            //do nothing
        }
      })
    })

$('#btn-login').click(function(){
    const email=$('input[name=user-email]').val();
    const password=$('input[name=user-password]').val();
    const userObject={
        email:email,
        password:password
    }
    console.log(userObject);
    axios.post('/api/user/signin',userObject)
    .then(({data})=>{
        SoloAlert.alert({
            title:data.message,
            icon: "success",
            onOk : ()=>{
                $('.popup-container').removeClass('show');
                console.log(data);
                if(data.isAdmin){
                    window.location.replace("/admin");
                }
                else{
                    window.location.reload();
                }
               
            }
          });

        
    })
    .catch((err)=>{
        SoloAlert.alert({
            title:"User not found!",
            icon: "error"
          });
    })
})

$('#btn-register').click(function(){
    const fullname=$('input[name=fullname]').val();
    const email=$('input[name=email]').val();
    const password=$('input[name=password]').val();
    const confirmPassword=$('input[name=c-password]').val();
    if(!fullname || !email || !password || !confirmPassword){
        SoloAlert.alert({title:"All feilds are required"});
    }
    else{
        if(validateEmail(email)){
            if(validatePassword(password)){
                if(password==confirmPassword){
                    const userObject={
                        fullname:fullname,
                        email:email,
                        password:password,
                        role:false
                    }
                    axios.post('/api/user/signup',userObject)
                    .then(({data})=>{
                        SoloAlert.alert({
                            title:data.message,
                            icon: "success"
                          });
                       
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                   
                }
                else{
                    SoloAlert.alert({title:"Password mismatch!"});
                }
            }
            else{
            }
        }
        else{
            SoloAlert.alert({title:"Invalid email!",body:"e.g: user@domain.com"});
        }
    }
})


const validateEmail = (email)=>{
    const validRegex =  new RegExp("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)");
    return validRegex.test(email); 
  }
  
  
  const validatePassword = (password)=>{
      const lowerCase = new RegExp("[a-z]");
      const upperCase = new RegExp("[A-Z]");
      const digits = new RegExp("[0-9]");
      
      if(password.length>=8){
          if(lowerCase.test(password)){
              if(upperCase.test(password)){
                  if(digits.test(password)){
                      return true;
                  }
                  else{
                    SoloAlert.alert({title:"Password must contain a digit."});
                    return false;        
                  }
              }
              else{
                SoloAlert.alert({title:"Password must contain an uppercase letter."});
                return false;
              }
          }
          else{
            SoloAlert.alert({title:"Password must contain a lowercase letter."});
            return false;
          }
      }
      else{
        SoloAlert.alert({title:"Password must be of length 8."});
        return false;
      }
  
  }
