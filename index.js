document.addEventListener('DOMContentLoaded', ()=> {
    const parts = {
        cpu: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/cpu.json',
        gpu: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/video-card.json',
        ram: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/memory.json',
        mouse: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/mouse.json'

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
                        var filteredData = data.filter( op => op.chipset.includes(optionSelected))
                        console.log(filteredData)
                    })
                } else {
                    fetch(parts[checkbox.value])
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        var filteredData = data.filter( op => op.name.includes(optionSelected))
                        console.log(filteredData)
                    })
                }
            }   
        })
    })


      
})
