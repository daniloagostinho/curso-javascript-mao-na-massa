class Revenues extends HTMLElement {
    constructor() {
        super();

        

        fetch('src/components/dashboard/revenues/Revenues.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text)


    }

    connectedCallback () {
        setTimeout(() => {
            defineInitMonth();
            getRegisterRevenues();
            initTableConfig();
        }, 1000)
    }

    disconnectedCallback() {
        
    }
}

let monthSelected;
let emptyResponse;
let arrRevenues;
let tbody;

const defineInitMonth = () => {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', {month: 'long'});
    let letterDateString = dateString[0].toUpperCase() + dateString.substring(1)
    monthSelected == undefined ? (monthSelected = letterDateString) : monthSelected
}

const getRegisterRevenues = async () => {
    const spinner = document.querySelector('.spinner-border');
    const blockRevenuesSearch = document.querySelector('.block-revenues-search');
    const myPagination = document.querySelector('.my-pagination');
    const blockRegisterRecipes = document.querySelector('.block-register-recipes');

    spinner.style.display = 'block';

    const user = localStorage.getItem('user');

    window.getRegisterRevenues('http://localhost:3000/list/revenues', monthSelected, user)
        .then(response => response.json())
        .then(response => {
            let arr = [];

            if(response.result.length === 0) {
                emptyResponse = true;
                blockRegisterRecipes.style.display = 'block';
            } else {
                response.result.forEach(revenue => {
                    arr.push(revenue.user.month.listMonth)
                })
                emptyResponse = false;
                blockRevenuesSearch.style.display = 'block';
                myPagination.style.display = 'block';
                blockRegisterRecipes.style.display = 'none';
                arrRevenues = arr;
            }
            spinner.style.display = 'none';
            buildTable(arr);
            updateTableRows(arr);
        })
}

const buildTable = (arr) => {
    
}

const initTableConfig = () => {
    let table = document.createElement('table');
    table.classList.add('table');

    const thead = document.createElement('thead');
    table.appendChild(thead);

    thead.innerHTML = '';

    const titlesTable = [
        "Tipo de Receita",
        "Valor",
        "Data de Entrada",
        "Id",
        "Ações"
    ];

    const headerRow = document.createElement('tr');
    
    titlesTable.forEach(title => {
        const headerCell = document.createElement('th');
        headerCell.textContent = title;
        headerRow.appendChild(headerCell)
    })
    
    thead.appendChild(headerRow);
    document.querySelector('.table-container').appendChild(table);
    
    tbody = document.createElement('tbody');
    table.appendChild(tbody)
}

const updateTableRows = (arr) => {
    tbody.innerHTML = '';

    arr.forEach(item => {
        console.log(item)
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.typeRevenue}</td>
            <td>${item.value}</td>
            <td>${item.dateEntry}</td>
            <td>${item._id}</td>
            <td>
                <img class="image" src="${item.actions[0]}" />
                <img class="image" src="${item.actions[1]}" />
            </td>
        `;

        tbody.appendChild(tr)
    })
}

if('customElements' in window) {
    customElements.define('app-revenues', Revenues)
}