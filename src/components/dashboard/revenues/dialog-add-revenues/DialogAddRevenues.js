class DialogAddRevenues extends HTMLElement {
  constructor() {
    super();

    fetch(
      "src/components/dashboard/revenues/dialog-add-revenues/DialogAddRevenues.html"
    )
      .then((response) => response.text())
      .then((text) => (this.innerHTML = text));
  }

  connectedCallback() {
    setTimeout(() => {
      createSelectElement();
      disableFutureDates();
    }, 1000);
  }

  disconnectedCallback() {}
}

const typeRevenues = [
  {
    name: "Investimento",
  },
  {
    name: "Outros",
  },
  {
    name: "Férias",
  },
  {
    name: "13 Sálario",
  },
  {
    name: "PLR",
  },
  {
    name: "Aposentaria",
  },
  {
    name: "Aluguel",
  },
  {
    name: "Salario",
  },
];

const createSelectElement = () => {
  const label = document.createElement("label");
  label.textContent = "Tipo de Receita";
  document.querySelector(".select-container").appendChild(label);

  const select = document.createElement("select");

  select.classList.add("form-control");
  select.classList.add("typeRevenue");

  const optionSelected = document.createElement("option");
  optionSelected.selected = true;
  optionSelected.textContent = "Selecione o tipo de receita";

  const options = typeRevenues
    .filter((_, index) => index <= 7)
    .map(revenue => {
      const option = document.createElement('option');
      option.textContent = revenue.name;
      option.value = revenue.name
      return option;
    })


  select.append(optionSelected);
  select.append(...options)

  document.querySelector(".select-container").appendChild(select);
};

const formatCurrency = (event) => {
  const filterValue = event.target.value.replace(/\D/g, '');

  const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
  }).format(parseFloat(filterValue / 100))

  event.target.value = currency;

}


const disableFutureDates = () => {
  const inputDate = document.querySelector('.dateEntry');
  const date = new Date();

  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();

  if(month < 10) {
    month = '0' + month.toString();
  }

  if(day < 10) {
    day = '0' + day.toString();
  }

  let maxDate = year + '-' + month + '-' + day

  inputDate.max = maxDate;
}

const handleAddrevenues = (event) => {
  event.preventDefault();

  const {typeRevenues, value, dateEntry, fixedRevenue} = selectInputsDom();

  if(!verifyFieldFill(typeRevenues, value, dateEntry, fixedRevenue)) {
    const buttonAddRevenues = document.querySelector('.add-revenues')
    buttonAddRevenues.removeAttribute('data-dismiss');
    alert('Preencha os campos vazios!');
    return;
  } 

  fixedRevenue ? registerFixedRecipe() : registerMonthlyRecipe();
}


const registerFixedRecipe = () => {
  console.log('registrar receita fixa -->> ')
}

const registerMonthlyRecipe = () => {
  console.log('registrar receita para mes atual -->> ')
}

const verifyFieldFill = (typeRevenues, value, dateEntry, fixedRevenue) => 
  typeRevenues !== '' && value !== '' && value !== undefined && dateEntry !== '' && !fixedRevenue !== '';

const selectInputsDom = () => {
  const typeRevenues = document.querySelector('.typeRevenue').value;
  let value = 100;
  const dateEntry = document.querySelector('.dateEntry').value;
  const fixedRevenue = document.querySelector('.fixedRevenue').checked;
  const user = localStorage.getItem('user');
  

  return {
    typeRevenues,
    value,
    dateEntry,
    fixedRevenue,
    user
  }
}

if ("customElements" in window) {
  customElements.define("app-dialog-add-revenues", DialogAddRevenues);
}
