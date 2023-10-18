document.addEventListener('DOMContentLoaded', ()=> {
    const checkboxes = document.querySelectorAll('.ckbox')

    checkboxes.forEach((checkbox)=> {
        // checkbox.addEventListener('change', ()=>{
        checkbox.addEventListener('change', ()=> {
            var anyCheck = Array.from(checkboxes).some(checkbox => checkbox.checked);
            saveChks(checkboxes);
            if (anyCheck){
                document.querySelector('body').style.backgroundColor = 'red';

            } else{
                document.querySelector('body').style.backgroundColor = 'white'
            }
        })

        // })

    })
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

    const mouse = 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/mouse.json';
    fetch(mouse)
    .then(response => {
        return response.json();
    })
    .then(data =>{
        for(let i in data) {
            if (Array.isArray(data[i])){
                data[i] = data[i].filter(item => item.price !== null);
            }
        }
        console.log(data)
    }
    )
})
