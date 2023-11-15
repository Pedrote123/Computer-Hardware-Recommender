document.addEventListener('DOMContentLoaded', ()=> {
    const parts = {
        cpu: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/cpu.json',
        gpu: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/video-card.json',
        ram: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/memory.json',
        storage: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/internal-hard-drive.json',
        powerSupply: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/power-supply.json'
    }

    document.addEventListener('submit', (event) =>{
        event.preventDefault()
        var chkbox = document.querySelector('.ckbox.ram')
        var selectores = document.querySelectorAll('.selector');
        var checkboxessss = document.querySelectorAll('.ckbox')
        checkboxessss.forEach((checkbox, i) => {
            if (checkbox.checked){
                var Options = selectores[i];
                var optionSelected = Options.options[Options.selectedIndex].value;
                if (checkbox.value == 'gpu'){
                    fetch(parts[checkbox.value])
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        var filteredData = data.filter( op => op.chipset.includes(optionSelected) && op.price !== null)
                        console.log(filteredData)
                    })
                } else if (checkbox.value == 'storage') {
                    fetch(parts[checkbox.value])
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        var storageCapacity = document.querySelector('.StorageCapacityInput').value
                        var filteredData = data.filter(storage => storage.type == optionSelected && storage.capacity <= storageCapacity && storage.price !== null)
                        console.log(filteredData)
                    })
                }
                else if (checkbox.value == 'powerSupply'){
                    fetch(parts[checkbox.value])
                    .then(response => {return response.json()})
                    .then(data => {
                        var option2 = document.querySelector('.selector.efficiency')
                        var optionSelected2 = option2.options[option2.selectedIndex].value
                        console.log(optionSelected2)
                        var filteredData = data.filter(power => power.wattage <= optionSelected && power.wattage >= optionSelected - 50 && power.efficiency == optionSelected2)
                        console.log(filteredData) 
                    })
                }
                else {
                    fetch(parts[checkbox.value])
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        var filteredData = data.filter( op => op.name.includes(optionSelected) && op.price !== null)
                        return filteredData
                    })
                    .then(displayed => {
                        if (document.querySelector('.dataDiv')){
                            if (checkbox.value !== document.querySelector('.dataDiv').getAttribute('value')){
                                var ndiv = document.createElement('div')
                                document.body.appendChild(ndiv)
                                ndiv.setAttribute('value', checkbox.value)
                                ndiv.classList.add('dataDiv')
                                ndiv.innerHTML = 'Hola'
                                return displayed
                            }
                            else{ 
                                return displayed
                            }

                        } else {
                            var ndiv = document.createElement('div')
                            document.body.appendChild(ndiv)
                            ndiv.setAttribute('value', checkbox.value)
                            ndiv.classList.add('dataDiv')
                            ndiv.innerHTML = 'Hola'
                            return displayed
                        }
                    })
                    .then(datas => {
                        ndiv = document.querySelector('.dataDiv')
                        datas.forEach((model, j) => {
                            var product = document.createElement('ul')
                            ndiv.appendChild(product)
                        })
                        var myObject = { key1: 'value1', key2: 'value2', key3: 'value3' };
                        var miObjeto = Object.keys(myObject)
                        var values = [];
                        console.log(miObjeto);
                    })
                    //Hacer que las tablas aparezcan, modificarle el nombre a las variables de ndiv.
                }
            }   
        })
    })


      
})
