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

                fetch(parts[checkbox.value])
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (checkbox.value == 'gpu'){
                        var filteredData = data.filter( op => op.chipset.includes(optionSelected) && op.price !== null)
                        return filteredData
                    }
                    else if (checkbox.value == 'storage') {
                        var storageCapacity = document.querySelector('.StorageCapacityInput').value
                        var filteredData = data.filter(storage => storage.type == optionSelected && storage.capacity <= storageCapacity && storage.price !== null)
                        return filteredData
                    }
                    else if (checkbox.value == 'powerSupply'){
                        var option2 = document.querySelector('.selector.efficiency')
                        var optionSelected2 = option2.options[option2.selectedIndex].value
                        console.log(optionSelected2)
                        var filteredData = data.filter(power => power.wattage <= optionSelected && power.wattage >= optionSelected - 50 && power.efficiency == optionSelected2)
                        return filteredData
                    }
                    else{
                        var filteredData = data.filter( op => op.name.includes(optionSelected) && op.price !== null)
                        return filteredData
                    }
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
                    ndiv = document.querySelectorAll('.dataDiv')
                    console.log(ndiv[1])
                    ndiv.forEach((l) => {
                        if (l.querySelector('ul')){
                            return datas
                        }
                        else {
                            datas.forEach((j) => {
                                var product = document.createElement('ul')
                                l.appendChild(product)
                            })
                            return datas
                        }
                    })
                    return datas

                    // var myObject = { key1: 'value1', key2: 'value2', key3: 'value3' };
                    // var miObjeto = Object.keys(myObject)
                    // var values = [];
                    // console.log(miObjeto);
                })
                .then(data => {
                    ndiv = document.querySelectorAll('.dataDiv')
                    ndiv.forEach((l) => {
                        var firstRow = l.querySelectorAll('ul')[0]
                        var dataKeys = Object.keys(data[0])
                        var categoryQuantity = dataKeys.length
                        if (firstRow.hasChildNodes()){
                            if (l.getAttribute('value') !== checkbox.value){
                                dataKeys.forEach((word)=>{
                                    word = word.charAt(0).toUpperCase() + word.substring(1)
                                    word = word.replaceAll('_', ' ')
                                    console.log(word)
                                    var category = document.createElement('li')
                                    category.innerHTML = word
                                    firstRow.appendChild(category)
                                })
                                product = l.querySelectorAll('ul')
                                product = Array.from(product).slice(1)
                                dataKeys = Object.keys(data[0])
                                var dataValues = []
                                data.forEach(obj => {
                                    var dataValuesObjects = Object.values(obj)
                                    dataValues.push(dataValuesObjects)
                                })
                                categoryQuantity = dataKeys.length
            
                                product.forEach((item, k) => {
                                    for (let n = 0; n < categoryQuantity; n++){
                                        var characteristics = document.createElement('li')
                                        characteristics.innerHTML = String(dataValues[k][n])
                                        item.appendChild(characteristics)
                                    }
                                })
                                return data
                            }
                            else {
                                return data
                            }
                        } else {
                            dataKeys.forEach((word)=>{
                                word = word.charAt(0).toUpperCase() + word.substring(1)
                                word = word.replaceAll('_', ' ')
                                console.log(word)
                                var category = document.createElement('li')
                                category.innerHTML = word
                                firstRow.appendChild(category)
                            })
                            product = l.querySelectorAll('ul')
                            product = Array.from(product).slice(1)
                            dataKeys = Object.keys(data[0])
                            var dataValues = []
                            data.forEach(obj => {
                                var dataValuesObjects = Object.values(obj)
                                dataValues.push(dataValuesObjects)
                            })
                            categoryQuantity = dataKeys.length
        
                            product.forEach((item, k) => {
                                for (let n = 0; n < categoryQuantity; n++){
                                    var characteristics = document.createElement('li')
                                    characteristics.innerHTML = String(dataValues[k][n])
                                    item.appendChild(characteristics)
                                }
                            })
                            return data
                        }
                    })

                })
                    //Por algún motivo que mi cerebro desconoce, se crean y se añaden a la misma
            }  
        }) 
    })   
})
