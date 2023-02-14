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
let currentPage = 1;
let itemsPerPage = 3;

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
            buildPagination(arr);
        })
}

const createPagination = () => {
    let paginationHTML = `
        <ul class="pagination">
            <li class="page-item">
                <button type="button" class="btn btn-outline-dark page-link prev" disabled>Anterior</button>
            </li>
            <li class="page-item">
                <button type="button" class="btn btn-outline-dark page-link next" disabaled>Próximo</button>
            </li>
        </ul>
    `;

    return paginationHTML;
}

const buildPagination = (arr) => {
    const pagination = document.querySelector('.my-pagination');

    const paginationHTML = createPagination();
    pagination.innerHTML = paginationHTML;

    const pageLinks = pagination.querySelectorAll('.page-item');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    updateTableRows(paginate(arr, itemsPerPage, currentPage));

    for(const pageLink of pageLinks) {
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            const clickedLink = event.target.closest('.page-link');
           
            if(clickedLink.textContent === 'Anterior') {
                currentPage--;
                next.disabled = false;
            } else if(clickedLink.textContent === 'Próximo') {
                currentPage++;
                prev.disabled = false;
            }

            const nextPageData = paginate(arr, itemsPerPage, currentPage);
            if(nextPageData.length === 0) {
                clickedLink.disabled = true;
                return;
            }

            updateTableRows(nextPageData);

            const prevLink = pagination.querySelector('.page-link.prev');
            const nextLink = pagination.querySelector('.page-link.next');

            if(currentPage === 1) {
                prevLink.disabled = true;
            } else {
                prevLink.disabled = false;
            }

            if(currentPage === Math.ceil(arr.length / itemsPerPage)) {
                nextLink.disabled = true;
            } else {
                nextLink.disabled = false;
            }


        })
    }

}

const paginate = (arr, itemsPerPage, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return arr.slice(startIndex, startIndex + itemsPerPage);
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