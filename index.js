document.addEventListener('DOMContentLoaded', ()=> {
    const parts = {
        cpu: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/cpu.json',
        gpu: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/video-card.json',
        ram: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/memory.json',
        storage: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/internal-hard-drive.json'
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
                else {
                    fetch(parts[checkbox.value])
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        var filteredData = data.filter( op => op.name.includes(optionSelected) && op.price !== null)
                        console.log(filteredData)
                    })
                }
            }   
        })
    })


      
})
