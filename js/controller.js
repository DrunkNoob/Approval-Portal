'use strict'
import Model from './model.js';
import View from './view.js';
//import agreementPage from './pages/agreement.js';
import indexPage from './pages/index.js';





const newagreementNavNode = document.querySelector('[data-role=nav-newagreement]')
const usersNavNode = document.querySelector('[data-role=nav-users]')
const registrationNavNode = document.querySelector('[data-role=nav-registration]')
const aboutNavNode = document.querySelector('[data-role=nav-about]')
const profileNavNode = document.querySelector('[data-role=nav-profile]')

let activeNavNode;

function setActiveNavNod(node) {
    if(activeNavNode) {
        activeNavNode.classList.remove('active')
    }
    activeNavNode.classList.add('active')
    
}





//принимаем из router действие и обрабатываем
export default {
    async indexRoute() {
        const index = await Model.ajaxDown('main.php')
        .then(value => {
            return value;
        })
        .catch(error=>console.log('Error!!!')); 
        indexPage.setData(index);
        indexPage.render();



            //const resultsNode = document.querySelector('#results');
            //resultsNode.innerHTML = View.render('index', index);
    },
    async agreementRoute(params) {
            //console.log(params.id);

            const agreement = await Model.ajaxDown('agreement.php', params.id)
            .then(value => {
                return value;
            })
            .catch(error=>console.log('Error!!!')); 

            console.log(agreement);

            const resultsNode = document.querySelector('#results');
            resultsNode.innerHTML = View.render('agreement', agreement);
           // agreementPage.setData(agreement.items);
            //agreementPage.render();
        //}
        
    },
    async usersRoute() {
        const users = await Model.ajaxDown('users.php')
        .then(value => {
            return value;
        })
        .catch(error=>console.log('Error!!!')); 


        const resultsNode = document.querySelector('#results');
            resultsNode.innerHTML = View.render('users', users);
    },

    async registrationRoute() {
        const resultsNode = document.querySelector('#results');
            resultsNode.innerHTML = View.render('registration');
    },

    
    async aboutRoute() {
        const resultsNode = document.querySelector('#results');
        resultsNode.innerHTML = View.render('about');
    },
    async profileRoute() {
        const resultsNode = document.querySelector('#results');
            resultsNode.innerHTML = View.render('profile');
    },
    async newagreementRoute() {
        //console.log('neprofilews');
        const resultsNode = document.querySelector('#results');
        resultsNode.innerHTML = View.render('newagreement');
    }     
};