//DOM elements
const tipsButton = document.querySelector(".tips-button") 
const tipsList = document.querySelector(".tips-list")
const selectedDestination = document.querySelector(".selected-destination")
const selectedCapital = document.querySelector(".selected-capital")
const selectedBudget = document.querySelector(".selected-budget")
const selectedRegion = document.querySelector(".selected-region")
const destinationBox = document.querySelector(".destination-box")
const maxBudgetInput = document.querySelector("#max-budget")


//Data
const destinations = [
    {
        name:"Vietnam",
        capital: "Hanoi",
        budget: 40,
        region: "Southeast Asia",
        page: "vietnam.html"
    }, {
        name:"Thailand",
        capital: "Bangkok",
        budget: 60,
        region: "Southeast Asia",
        page: "thailand.html"
    }, {
        name:"Indonesia",
        capital: "Jakarta",
        budget: 50,
        region: "Southeast Asia",
        page: "indonesia.html"        
    }, {
        name:"Malaysia",
        capital: "Kuala Lumpur",
        budget: 45,
        region: "Southeast Asia",
        page: "malaysia.html"     
    }
]

//Practice create one card


//Functions (what happens?)
function toggleTravelTips () {
    tipsList.classList.toggle("hidden")
    if (tipsList.classList.contains("hidden")) {
        tipsButton.textContent = "Show travel tips"
    } else {
        tipsButton.textContent = "Hide travel tips"
    }
}

function selectDestination(card) {
    const currentCards = destinationBox.querySelectorAll(".destination-card")
    for (const otherCard of currentCards) {
        otherCard.classList.remove("selected-card")
    }
    card.classList.add("selected-card")
    const country = card.dataset.country
    for (const destination of destinations) {
        if (destination.name === country) {
            selectedDestination.textContent = destination.name
            selectedCapital.textContent = destination.capital
            selectedBudget.textContent = "Budget: $" + destination.budget + "/day"
            selectedRegion.textContent = destination.region
        }
    }
}

function handleDestinationClick(event) {
    selectDestination(event.currentTarget);
}

function renderDestinations(destinationList) {
    destinationBox.replaceChildren()
    selectedDestination.textContent = "No destination selected"
    selectedCapital.textContent = ""
    selectedBudget.textContent = ""
    selectedRegion.textContent = ""
    for (const destination of destinationList) {
        const card = document.createElement("div")
        card.classList.add("destination-card")
        card.dataset.country = destination.name
        card.addEventListener("click",handleDestinationClick)
        const heading = document.createElement("h3")
        heading.textContent = destination.name
        card.append(heading)
        const capital = document.createElement("p")
        capital.textContent = destination.capital
        card.append(capital)
        const budget = document.createElement("p")
        budget.textContent = destination.budget
        card.append(budget)
        const region = document.createElement("p")
        region.textContent = destination.region
        card.append(region)
        const link = document.createElement("a")
        link.textContent = destination.name
        link.href = destination.page
        card.append(link)
        destinationBox.append(card)
    }
}

function handleBudgetInput() {
    if (maxBudgetInput.value === "") {
        renderDestinations(destinations)
    } else {
        const maxBudget = Number(maxBudgetInput.value)
        function matchesEnteredBudget(destination) {
            return destination.budget <= maxBudget
        }
        const matchingDestinations = destinations.filter(matchesEnteredBudget)
        renderDestinations(matchingDestinations)
    }
}

//Events (when it happens?)
if (tipsButton !== null && tipsList !== null) {
    tipsButton.addEventListener("click", toggleTravelTips)
}

if (maxBudgetInput !== null) {
    maxBudgetInput.addEventListener("input",handleBudgetInput)
}

//Initialization (page setup)
if (destinationBox !== null) {
    renderDestinations(destinations)
}

