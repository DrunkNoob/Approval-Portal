function aj(){

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'approvalportal.php');
    
    var formData = new FormData(document.forms.sogForm);
    formData.append('serial', document.querySelectorAll('.sog-item').length);
    
    xhr.send(formData);

    xhr.onreadystatechange=function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            let res = JSON.parse(xhr.responseText);
            console.log(res);
           if (res['ok']===true) {
                alert(res['result']);
           } else {
               alert(res['result']);
           }
            
        }
    }
}


function createApproversItem(){

    let typeSelect = document.getElementById('typeSog').selectedIndex;
    let categorySelect = document.getElementById('categorySog').selectedIndex;
    let valuationPriceSelect = parseFloat(document.getElementById('valuationPriceSog').value);
    
     if (typeSelect===0) {
           if (categorySelect===0) {
                  console.log('Разовые закупки: Закупки для целей монтажа');
                  console.log(valuationPriceSelect);
                      switch (true) {
                          case valuationPriceSelect<100000:
                              console.log('<100000');
                              var a = 2;
                              break;
                          case valuationPriceSelect>=100000 && valuationPriceSelect<300000:
                              console.log('100000-300000');
                              var a = 3;
                              break;
                          case valuationPriceSelect>=300000 && valuationPriceSelect<1000000:
                              console.log('300000-1000000');
                              var a = 6;
                              break;
                          case valuationPriceSelect>=1000000 && valuationPriceSelect<15000000:
                              console.log('1000000-15000000');
                              var a = 9;
                              break;
                          case valuationPriceSelect>=15000000:
                              console.log('>15000000');
                              var a = 9;
                              break;
                    
                          default:
                          console.log('Не найдено');
                                    }
                                    
                     } else {
                  console.log('Разовые закупки: Иные закупки');
                  console.log(valuationPriceSelect);
                      switch (true) {
                          case valuationPriceSelect<100000:
                              console.log('<100000');
                              var a = 2;
                              break;
                          case valuationPriceSelect>=100000 && valuationPriceSelect<300000:
                              console.log('100000-300000');
                              var a = 1;
                              break;
                          case valuationPriceSelect>=300000 && valuationPriceSelect<1000000:
                              console.log('300000-1000000');
                              var a = 4;
                              break;
                          case valuationPriceSelect>=1000000 && valuationPriceSelect<15000000:
                              console.log('1000000-15000000');
                              var a = 7;
                              break;
                          case valuationPriceSelect>=15000000:
                              console.log('>15000000');
                              var a = 7;
                              break;
                    
                          default:
                          console.log('Не найдено');
                                    }
                     };
        } else {
           if (categorySelect===0) {
                  console.log('Рамочные соглашения: Закупки для целей монтажа');
                  console.log(valuationPriceSelect);
                  switch (true) {
                      case valuationPriceSelect<100000:
                          console.log('<300000');
                          var a = 2;
                          break;
                      case valuationPriceSelect>=300000 && valuationPriceSelect<3000000:
                          console.log('300000-3000000');
                          var a = 6;
                          break;
                      case valuationPriceSelect>=3000000 && valuationPriceSelect<15000000:
                          console.log('3000000-15000000');
                          var a = 9;
                          break;
                      case valuationPriceSelect>=15000000:
                          console.log('1000000-15000000');
                          var a = 10;
                          break;
                
                      default:
                      console.log('Не найдено');
                                }

                    } else {
                  console.log('Рамочные соглашения: Иные закупки');
                  console.log(valuationPriceSelect);
                      switch (true) {
                          case valuationPriceSelect<300000:
                              console.log('<300000');
                              var a = 2;
                              break;
                          case valuationPriceSelect>=300000 && valuationPriceSelect<3000000:
                              console.log('300000-3000000');
                              var a = 5;
                              break;
                          case valuationPriceSelect>=3000000 && valuationPriceSelect<15000000:
                              console.log('3000000-15000000');
                              var a = 8;
                              break;
                          case valuationPriceSelect>=15000000:
                              console.log('>15000000');
                              var a = 8;
                              break;
                    
                          default:
                          console.log('Не найдено');
                                    }
                    };
        }

        var sogItemQuantity = document.querySelectorAll('.sog-item').length;
        for (let j = 2; j < sogItemQuantity; j++) {
            //добавить цикл удаления добавленных строк
            sogList.querySelector('tbody').removeChild(document.querySelectorAll('.sog-item')[2].children[1].parentNode);
        }  
   
        for (let i = 0; i < a; i++) { 

            addSogItem();
          }      
     
    return 0;	
    }
     
    function createSogItem(){
        const statusu = document.createElement('select');
        statusu.type = 'select';
        statusu.className = 'form-control';
        const rr = document.createElement('option');
        rr.value = 'R';
        rr.innerText = 'R';
        const aa = document.createElement('option');
        aa.value = 'A';
        aa.innerText = 'A';
        statusu.appendChild(rr);
        statusu.appendChild(aa);

        const selectSog = document.createElement('select');
        selectSog.innerText = 'select';
        selectSog.className = 'form-control';

        for (let i = 0; i < sogUsers.length; i++) { 
            const sogUs = document.createElement('option');
            sogUs.value = sogUsers[i].value;
            sogUs.innerText = sogUsers[i].text;
            selectSog.appendChild(sogUs);        

          }

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'deleteButton';
        deleteButton.innerHTML = '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>';
    
        const listCol1 = document.createElement('td');
        listCol1.appendChild(statusu);
        const listCol2 = document.createElement('td');
        listCol2.appendChild(selectSog);
        const listCol3 = document.createElement('td');
        listCol3.appendChild(deleteButton);
        const listItem = document.createElement('tr');
        listItem.className = 'sog-item';
        listItem.appendChild(listCol1);
        listItem.appendChild(listCol2);
        listItem.appendChild(listCol3);

        bindEvents(listItem);

        return listItem;
    }	
    
    function bindEvents(sogItem){
        const deleteButton = sogItem.querySelector('button.deleteButton');
        deleteButton.addEventListener('click', deleteSogItem);
    }

    
    function addSogItem() {
        const sogItem = createSogItem();
        sogList.querySelector('tbody').appendChild(sogItem);
        sort();
    }
    
    function deleteSogItem(){
        const listItem = this.parentNode;
        sogList.querySelector('tbody').removeChild(listItem.parentNode);
        sort();
    }

    const sogList = document.getElementById('sog-list');
    const sogItems = document.querySelectorAll('.sog-item');
    const sogUsers= document.getElementById('sogUsers');
    const addApprover = document.getElementById('addApprover');
    const typeSog = document.getElementById('typeSog');
    const categorySog = document.getElementById('categorySog');
    const valuationPriceSog = document.getElementById('valuationPriceSog');
    const create = document.getElementById('create');
    
    typeSog.addEventListener('change', createApproversItem);
    categorySog.addEventListener('change', createApproversItem);
    valuationPriceSog.addEventListener('change', createApproversItem);
    addApprover.addEventListener('click', addSogItem);
    create.addEventListener('click', aj);

    function init(){
        sogItems.forEach(function(item,i){
            if(i===0){}else{bindEvents(item);}
          });
    }

    init();

    function sort(){
        for (let i = 1; i < document.querySelectorAll('.sog-item').length; i++) {
        document.querySelectorAll('.sog-item')[i].children[0].children[0].name = 'statusu'+i;
        document.querySelectorAll('.sog-item')[i].children[1].children[0].name = 'sog'+i;    
        }
    }

    function vfioSog () {
       var vfio = document.getElementsByName('vfio')[0].value;
       document.querySelectorAll('.sog-item')[1].children[1].children[0].value = vfio;
    }

    function prov(){
        var prov = $('select[name=prov]').val();
    
            switch (prov) {
                case '1':
                $('#pprov').prop('disabled', true);
                break;
                case '0':
                $('#pprov').prop('disabled', false);
                break;
            }
    }
    
    $('#pprov').prop('disabled', true);
    $('select[name=prov]').change(function(){
        prov();
    });
