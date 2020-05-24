//'use strict'
export default {
ajaxDown(url, me){
        return new Promise(function(resolve, reject) {

            var request = new XMLHttpRequest();
       
            request.onreadystatechange = function(){
if (request.readyState == 4) {
    if (request.status == 200) {
        //console.log(JSON.parse(request.responseText)); 
        resolve(JSON.parse(request.responseText))
            } else {
             reject('loh')   
            }    
} 
}

            request.open('POST', url);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(me);


        })


                         
    }

};