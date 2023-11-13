document.addEventListener('DOMContentLoaded', ()=> {
    const checkboxes = document.querySelectorAll('.ckbox')

    // checkboxes.forEach((checkbox)=> {
    //     // checkbox.addEventListener('change', ()=>{
    //     checkbox.addEventListener('change', ()=> {
    //         var anyCheck = Array.from(checkboxes).some(checkbox => checkbox.checked);
    //         saveChks(checkboxes);
    //         if (anyCheck){
    //             document.querySelector('body').style.backgroundColor = 'red';

    //         } else{
    //             document.querySelector('body').style.backgroundColor = 'white'
    //         }
    //     })

    //     // })

    // })
    // loadChks()
    // function saveChks(item){
    //     let checkboxes = localStorage.setItem('chkboxes', JSON.stringify(item))
    // };
    // function loadChks(){
    //     let checkboxes = JSON.parse(localStorage.getItem('chkboxes'))
    // };


    // const urls = [
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/case-fan.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/case.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/cpu-cooler.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/cpu.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/headphones.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/internal-hard-drive.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/keyboard.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/memory.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/monitor.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/motherboard.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/mouse.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/power-supply.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/thermal-paste.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/video-card.json',
    //     'https://github.com/docyx/pc-part-dataset/blob/main/data/json/wired-network-card.json'

    // ];

    // const promises = urls.map(url => fetch(url).then(response => response.json()));

    // Promise.all(promises)
    //     .then(dataArray => {

    //         const caseFan = dataArray[0]
    //     })
    //     .then(
    //         console.log(caseFan)
    //     )

    // var gpu = 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/video-card.json';

    // fetch(gpu)
    // .then(response => {
    //     return response.json()
    // })
    // .then(data => {
    //     var filteredData = data.filter(gpu => gpu.chipset.includes('Radeon'))
    //     console.log(filteredData)
    // })


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
    
        // if (chkbox.checked == true){
        //     fetch(parts.ram)
        //     .then(response => {
        //         return response.json()
        //     })
        //     .then(data => {
        //         var filteredData = data.filter(ram => ram.name.includes(' ' + optionsSelectedRam))
        //         console.log(filteredData)
        //     })
        // }
        // const optionsRam = document.querySelector('.selector.three');
        // const optionsSelectedRam = optionsRam.options[optionsRam.selectedIndex].text;
        // const optionFour_ram = document.getElementById('4gb').innerHTML;

    })
    // })

      
})
