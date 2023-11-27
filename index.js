document.addEventListener('DOMContentLoaded', ()=> {
    const parts = {
        cpu: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/cpu.json',
        gpu: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/video-card.json',
        ram: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/memory.json',
        storage: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/internal-hard-drive.json',
        powerSupply: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/power-supply.json'
    }

    const existingDivOptions = {};

    document.addEventListener('submit', (event) =>{
        event.preventDefault()
        var selectores = document.querySelectorAll('.selector');
        var checkboxessss = document.querySelectorAll('.ckbox')
        var Budget = document.getElementById('budget').value
        if (Budget == null || Budget === ''){
            Budget = 10000
        }

        checkboxessss.forEach((checkbox, i) => {
            if (checkbox.checked){
                var Options = selectores[i];
                var optionSelected = Options.options[Options.selectedIndex].value;
                var DivOptionValue = checkbox.value;

                if (existingDivOptions[DivOptionValue]) {
                    return;
                }
                existingDivOptions[DivOptionValue] = true;

                var DivOption = document.createElement('div')
                DivOption.classList.add('DivOption')
                DivOption.style.userSelect = 'none'
                DivOption.setAttribute('value', DivOptionValue)
                document.body.appendChild(DivOption)

                fetch(parts[checkbox.value])
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (checkbox.value == 'gpu'){
                        var filteredData = data.filter( op => op.chipset.includes(optionSelected) && op.price !== null && op.price <= Budget)
                        return filteredData
                    }
                    else if (checkbox.value == 'storage') {
                        var storageCapacity = document.querySelector('.StorageCapacityInput').value
                        if (storageCapacity == null || storageCapacity === ''){
                            storageCapacity = 100000
                        }
                        var filteredData = data.filter(storage => storage.type == optionSelected && storage.capacity <= storageCapacity && storage.price !== null && storage.price <= Budget)
                        return filteredData
                    }
                    else if (checkbox.value == 'powerSupply'){
                        var option2 = document.querySelector('.selector.efficiency')
                        var optionSelected2 = option2.options[option2.selectedIndex].value
                        var filteredData = data.filter(power => power.wattage <= optionSelected && power.wattage >= optionSelected - 50 && power.efficiency == optionSelected2 && power.price !== null && power.price <= Budget)
                        return filteredData
                    }
                    else{
                        var filteredData = data.filter( op => op.name.includes(optionSelected) && op.price !== null && op.price <= Budget)
                        return filteredData
                    }
                })
                .then(displayed => {
                    var tableDiv = document.querySelectorAll('.tDiv')
                    var found = false
                    if (tableDiv.length > 0){
                        tableDiv.forEach((tabl)=>{
                            if (tabl.getAttribute('value') == checkbox.value){
                                found = true
                                return displayed
                            }
                        })
                        if (!found){
                            CreateTable(checkbox.value, CreateUlandLi)
                        }
                    }
                    else{
                        CreateTable(checkbox.value, CreateUlandLi);
                    }
                    function CreateTable(checkboxValue, ulcreator){
                        var table = document.createElement('div')
                        table.classList.add('tDiv')
                        table.style.display = 'none';
                        table.setAttribute('value', checkboxValue)


                        var showButon = document.createElement('div')
                        showButon.innerHTML = String(checkbox.value.toUpperCase())
                        showButon.classList.add('ShwButton')
                        DivOption.appendChild(showButon)
                        DivOption.addEventListener('click', ()=>{
                            if (table.classList.contains('tDiv')){
                                table.classList.remove('tDiv')
                                table.classList.add('tDivClicked')
                                table.style.display = 'flex';
                            } else{
                                table.classList.remove('tDivClicked')
                                table.classList.add('tDiv')
                                setTimeout(()=>{
                                    table.style.display = 'none';
                                },2000)
                            }

                        })
                        DivOption.appendChild(table)
                        ulcreator(table)
                    }
                    function CreateUlandLi(table){
                        var dataValues = []
                        var dataKeys = Object.keys(displayed[0])
                        displayed.forEach((obj) => {
                            var dataValuesObjects = Object.values(obj)
                            dataValues.push(dataValuesObjects)
                        })
                        for (let n = 0; n < displayed.length; n++){
                            var tUl = document.createElement('ul')
                            tUl.classList.add('row')
                            table.appendChild(tUl)
                        }
                        var uls = table.querySelectorAll('ul')
                        dataKeys = dataKeys.map((word) => {
                            return word.charAt(0).toUpperCase() + word.substring(1).replaceAll('_', ' ');
                        });
                        uls.forEach((ul, l) => {
                            if (l > 0) {
                                for (let m = 0; m < dataKeys.length; m++) {
                                    var tLi = document.createElement('li');
                                    ul.appendChild(tLi);
                                    tLi.innerHTML = String(dataValues[l][m]);
                                }
                            } else {
                                for (let m = 0; m < dataKeys.length; m++) {
                                    var tLi = document.createElement('li');
                                    ul.appendChild(tLi);
                                    ul.classList.add('firstRow')
                                    tLi.innerHTML = String(dataKeys[m]);
                                }
                            }
                        });


                    }
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
            }  


        })



    })   
})