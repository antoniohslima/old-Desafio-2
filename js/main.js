const data = {
    "insurances": [{
        "id": 3322,
        "name": "Amil"
    }, {
        "id": 3293,
        "name": "Bradesco"
    }, {
        "id": 99231,
        "name": "Hapvida"
    }, {
        "id": 1322,
        "name": "CASSI"
    }, {
        "id": 23111,
        "name": "Sulamérica"
    }],
    "guides": [{
        "number": "3210998321",
        "start_date": "2022-04-23T19:18:47.210Z",
        "patient": {
            "id": 9321123,
            "name": "Augusto Ferreira",
            "thumb_url": "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    }, {
        "number": "287312832",
        "start_date": "2022-04-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro",
            "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2022-04-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José",
            "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2022-04-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos",
            "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2022-04-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposo"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2022-04-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grante pra colocar text ellipsis testando nome com paciente grande"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 221
    }]

}

const patientInformations = data.guides;

let dayOne = document.getElementById('first-date').value;
let lastDay = document.getElementById('last-date').value

const areDatesValid = () => {
    const firstDate = document.getElementById('first-date').value;
    const secondDate = document.getElementById("last-date").value;

    if (!firstDate || !secondDate) return false

    return (secondDate >= firstDate)
}

const createPags = (array, itensPerPage) => {
    const pageBar = document.querySelector('.pagination');

    const totalPatients = array.length

    if (totalPatients === 0 || !areDatesValid()) {
        pageBar.innerHTML = '<li class="page-item"><button class="page-link" href="#"></button></li>';
        return
    }

    const totalPages = Math.ceil(totalPatients / itensPerPage);

    pageBar.innerHTML = `<li class="page-item"><button class="page-link" href="#" onclick="renderTableWFilters()" >Primeira</button></li>`;

    pageBar.innerHTML += `<li class="page-item"><button class="page-link" href="#" onclick="renderTableWFilters(${currentPage}, 'previous')" >Anterior</button></li>`;

    for (let i = 1; i <= totalPages; i++) {
        let selected = currentPage + 1
        let activated = (selected === i) ? 'active' : ''
        pageBar.innerHTML += `<li class="page-item"><button class="page-link ${activated}" href="#" onclick="renderTableWFilters(${i - 1})" >${i}</button></li>`
    }

    pageBar.innerHTML += `<li class="page-item"><button class="page-link" href="#" onclick="renderTableWFilters(${currentPage}, 'next')">Próxima</button></li>`

    pageBar.innerHTML += `<li class="page-item"><button class="page-link" href="#" onclick="renderTableWFilters(0, 'last')" >Última</button></li>`
}

const selectorInsurance = () => {
    const selector = document.querySelector('.form-select');

    let selectorItem = '<option class="selector-item" id="insurance-default" value="">Todos</option>'

    data.insurances.forEach(element => {
        selectorItem += `<option class="selector-item" id="${element.id}" value="${element.id}">${element.name}</option>`
    });

    selector.innerHTML = selectorItem;
}

const table = document.querySelector('.information-table');

const addToTable = (array) => {

    let readableDate;

    let readablePrice;

    let tableItens = ''

    array.forEach(element => {
        let isDeleted = ''

        if (element.health_insurance.is_deleted) isDeleted = 'class="deleted-Insurance" title="Convênio Apagado"'

        readablePrice = element.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        readableDate = moment(element.start_date).format('DD/MM/YYYY');

        tableItens += `
        <tr>
        <td>${readableDate}</td>
        <td>${element.number}</td>
        <td class="patient-name"> <img src="${element.patient.thumb_url || 'https://i.pinimg.com/474x/8f/1b/09/8f1b09269d8df868039a5f9db169a772.jpg'}" class="profile-pic"/> ${element.patient.name}</td>
        <td ${isDeleted}> ${element.health_insurance.name}</td>
        <td>${readablePrice}</td>
        </tr>`

    });

    table.innerHTML = tableItens;
}

const init = () => {
    selectorInsurance();
    addToTable(patientInformations);
}
init()

let currentPage = 0;
let ordered = false;

const changeOrder = () => {
    const iconUpDown = document.querySelector('.fa');

    if(!ordered){
        iconUpDown.classList.remove('fa-chevron-up');
        iconUpDown.classList.add('fa-chevron-down');
        ordered = true;
        renderTableWFilters(currentPage)
        return
    }
    if(ordered){
        iconUpDown.classList.remove('fa-chevron-down');
        iconUpDown.classList.add('fa-chevron-up');
        ordered = false;
        renderTableWFilters(currentPage)
        return
    }
}

const renderTableWFilters = (pageLink = 0, specialButton = '') => {

    const pagination = [];
    const pageItens = 2;

    const insuranceSelected = ~~document.getElementById('selected').value;

    const personFinder = document.getElementById('person-Finder').value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    dayOne = document.getElementById('first-date').value;
    lastDay = document.getElementById('last-date').value;

    if (!areDatesValid()) {
        createPags([], 2)
        return table.innerHTML = `<tr class="error-text"><td colspan="5" > Nenhuma guia encontrada
        </td></tr>`
    }

    if (!personFinder && !insuranceSelected && !dayOne && !lastDay) {
        return init()
    }

    const filteredTable = patientInformations.filter(element => {

        const formatedPatient = element.patient.name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        const patientDate = moment(element.start_date).format('YYYY-MM-DD');

        let isValid = true

        if (dayOne && lastDay && dayOne > patientDate || lastDay < patientDate) {
            isValid = false;
        }

        if (personFinder && !element.number.includes(personFinder) && !formatedPatient.includes(personFinder)) {
            isValid = false;
        }

        if (insuranceSelected && element.health_insurance.id !== insuranceSelected) {
            isValid = false;
        }

        return isValid
    });

    if (ordered) {
        filteredTable.sort((x, y) => {
            if (moment(x.start_date) > moment(y.start_date)) return 1;
            if (moment(x.start_date) < moment(y.start_date)) return -1;

            return 0;
        });
    } else {
        filteredTable.sort((x, y) => {
            if (moment(x.start_date) > moment(y.start_date)) return -1;
            if (moment(x.start_date) < moment(y.start_date)) return 1;

            return 0;
        });
    }

    if (filteredTable.length === 0) {
        createPags(filteredTable, 2)
        return table.innerHTML = `<tr class="error-text"><td colspan="5" > Nenhuma guia encontrada
        </td></tr>`
    }

    for (let i = 0; i < filteredTable.length; i += pageItens) {
        pagination.push(filteredTable.slice(i, i + pageItens))
    }

    if (specialButton === '') {
        currentPage = pageLink;
        addToTable(pagination[pageLink]);
    }

    else if (specialButton === 'last') {
        currentPage = (pagination.length - 1);
        addToTable(pagination[pagination.length - 1]);
    }

    else if (specialButton === 'previous' && pageLink !== 0) {
        currentPage = pageLink - 1;
        addToTable(pagination[pageLink - 1]);
    }

    else if (specialButton === 'next' && pageLink !== (pagination.length - 1)) {
        currentPage = pageLink + 1;
        addToTable(pagination[pageLink + 1]);
    }

    createPags(filteredTable, 2);
    
}

const atualMonthFilter = () => {
    document.getElementById('first-date').value = moment().startOf('month').format('YYYY-MM-DD');
    document.getElementById('last-date').value = moment().endOf('month').format('YYYY-MM-DD');
    renderTableWFilters();
}
atualMonthFilter();


const todayFilter = () => {
    document.getElementById("first-date").value = moment().format('YYYY-MM-DD');
    document.getElementById("last-date").value = moment().format('YYYY-MM-DD');
    renderTableWFilters();
}
