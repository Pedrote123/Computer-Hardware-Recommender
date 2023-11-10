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

    const mouse = 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/mouse.json';
    const cpu = 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/cpu.json';
    const ram = 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/memory.json';
    // fetch(mouse)
    // .then(response => {
    //     return response.json();
    // })
    // .then(data => {
    //     console.log('Data fetched:', data); // Check if data is fetched correctly

    //     // for (let i in data) {
    //     //     if (Array.isArray(data[i])) {
    //     //         data[i] = data[i].filter(item => item.price !== 'null');
    //     //     }
    //     // }
    //     var filteredData = data.filter(filt => filt.price !== null)
    //     console.log('Filtered data:', filteredData); // Check if data is filtered correctly
    // })
    // .catch(error => {
    //     console.error('Error fetching or processing data:', error);
    // });

    fetch(cpu)
    .then(response => {
        return response.json();
    })
    .then(data => {
        return data.filter(cpu => cpu.name.includes('Intel' && 'i7'))
    })
    .then(filteredData => {
        return filteredData.filter(cpu => cpu.price !== null && cpu.price < 100)
    })
    .then(endData => {
        console.log('CPUs compatibles', endData)
    })
    .catch(e => {
        console.log('Error:', e)
    })
    // document.querySelectorAll('.selector').forEach( e => {
    document.addEventListener('submit', (event) =>{
        event.preventDefault()
        const optionFour_ram = document.getElementById('4gb').innerHTML;
        fetch(ram)
        .then(response => {
            return response.json()
        })
        .then(data => {
            var filteredData = data.filter(ram => ram.name.includes(' ' + optionFour_ram))
            console.log(filteredData)
        })
    })
    // })

})
