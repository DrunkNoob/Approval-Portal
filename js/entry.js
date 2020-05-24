import Model from './model.js';
import View from './view.js';
import Router from './router.js';

(async () => {
    try {
        //загружаем главную страницу
        
       
            const index = await Model.ajaxDown('main.php')
            .then(value => {
                return value;
            })
            .catch(error=>console.log('Error!!!')); 
            //indexPage.setData(index);
            //indexPage.render();
    
    
    
                const resultsNode = document.querySelector('#results');
                resultsNode.innerHTML = View.render('index', index);
        




        //const resultsNode = document.querySelector('#results');
        
        //resultsNode.innerHTML = View.render('index');

        function tableClick(){
        var me = this.id;
        console.log(me);
        location.hash = "agreement/" + me;
        }
               
        const tableItem = document.querySelectorAll('.tableSubmit');
        tableItem.forEach(function(elem){
        elem.addEventListener('click', tableClick);
        })


        Router.init('index');
        } catch (e) {
            console.error(e);
            alert('Ошибка: ' + e.message);
        }
})();