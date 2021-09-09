const addToCart=(productId)=>{
    axios.post("/api/cart/add",{productId})
    .then(({data})=>{
        alert(data.message);
        window.location.reload();    
    })
    .catch(err=>{
        console.log(err);
    })
}


const cartIncrement=(id)=>{
    const quantity=parseInt($(`#qty-${id}`).text(),10)+1;
    axios.post('/api/cart/update-quantity',{id:id,quantity:quantity})
    .then(()=>{
        window.location.reload();
    })
    .catch((err)=>{
        console.log(err);
    })
}
const cartDecrement=(id)=>{
    const quantity=parseInt($(`#qty-${id}`).text(),10)-1;
    if(quantity<1){
        alert("quantity must be one");
    }
    else{
    axios.post('/api/cart/update-quantity',{id:id,quantity:quantity})
    .then(()=>{
        window.location.reload();
    })
    .catch((err)=>{
        console.log(err);
    })
    }
    
}

const deleteCartItem=(itemId)=>{
    SoloAlert.confirm({
        title:"The item will be removed from the cart!",
        body:"Do you want to proceed?",
      }).then(value => {
          if(value){
            axios.delete(`/api/cart/delete-item/${itemId}`)
            .then(result=>{
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
   
}

$('.btn-checkout').click(function(){
    window.location.replace('/checkout')
})
