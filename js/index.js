console.log('page loaded');


function tableClick(){
    
    //const tableSubmit = tableItem.querySelector('tr.tableSubmit');
    //const tableTr = (this).id;

    //console.log(sogList.querySelector('tbody').tableItem[this].id);

    console.log(this.id);
}

function deleteSogItem(){
    const listItem = this.parentNode;
    sogList.querySelector('tbody').removeChild(listItem.parentNode);
}
const tableSogList = document.getElementById('tableSogList');


const tableItem = document.querySelectorAll('.tableSubmit');
tableItem.forEach(function(elem){
    elem.addEventListener('click', tableClick);
})
