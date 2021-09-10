module.exports=function Cart(oldCart){
    this.items = oldCart.items||{};
    this.totalQty=oldCart.totalQty||0;
    this.totalPrice=oldCart.totalPrice||0;

     this.add=function(item,id){
        let storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item:item,qty:0,price:0}
        }
        storedItem.qty++;
        storedItem.price=storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    this.updateQuantity=function(quantity,id){
        if(quantity>this.items[id].qty){
            this.items[id].qty=quantity;
            this.items[id].price=this.items[id].item.price*quantity;
            this.totalQty+=1;
            this.totalPrice+=this.items[id].item.price;
        }
        else{
            this.items[id].qty=quantity;
            this.items[id].price=this.items[id].item.price*quantity;
            this.totalQty=this.totalQty-1;
            this.totalPrice=this.totalPrice-this.items[id].item.price;
        }
    }
    this.deleteItem=function(itemId){
            this.totalQty=this.totalQty-this.items[itemId].qty;
            this.totalPrice=this.totalPrice-this.items[itemId].price
            delete this.items[itemId];
            
        }
    this.constructCart=function(){
        let cartArray=[];
        for(var id in this.items){
            cartArray.push(this.items[id]);
        }
        return cartArray;
    }
   

}