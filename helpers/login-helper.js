var db=require('../config/connection')
var collection=require('../config/collections')
const Promise=require('promise')

module.exports={
    doLogin:(userData)=>{
        let response={}
       return new Promise(async(resolve,reject)=>{
        let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
        var status=false
        if(user)
        {
            if(userData.password===user.password){
                status=true;
                console.log('login success')
                response.user=user
                response.status=true
                resolve(response)
                
            }else{
                console.log('login failed')
                reject({status:false})
            }
        }else{
            console.log('email not found login failed')
            reject({status:false})
        }

       }) 
    }
}