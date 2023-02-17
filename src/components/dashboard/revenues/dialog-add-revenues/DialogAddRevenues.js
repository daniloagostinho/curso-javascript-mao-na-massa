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

if ("customElements" in window) {
  customElements.define("app-dialog-add-revenues", DialogAddRevenues);
}
