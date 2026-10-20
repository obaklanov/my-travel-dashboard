//DOM elements
const tipsButton = document.querySelector(".tips-button") 
const tipsList = document.querySelector(".tips-list")
const selectedDestination = document.querySelector(".selected-destination")
const selectedCapital = document.querySelector(".selected-capital")
const selectedBudget = document.querySelector(".selected-budget")
const selectedRegion = document.querySelector(".selected-region")
const destinationBox = document.querySelector(".destination-box")
const maxBudgetInput = document.querySelector("#max-budget")
const destinationStatus = document.querySelector(".destination-status")
const destinationLoadStatus = document.querySelector(".destination-load-status")


//Data
let destinations = []


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
    if (destinationList.length === 0) {
        destinationStatus.textContent = "No destinations match the current criteria"
        return;
    }
    destinationStatus.textContent = ""
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
        const destinationsCopy = destinations.slice()
        destinationsCopy.sort(compareBudgets)
        renderDestinations(destinationsCopy)
    } else {
        const maxBudget = Number(maxBudgetInput.value)
        function matchesEnteredBudget(destination) {
            return destination.budget <= maxBudget
        }
        const matchingDestinations = destinations.filter(matchesEnteredBudget)
        matchingDestinations.sort(compareBudgets)
        renderDestinations(matchingDestinations)
    }
}

function compareBudgets(a, b) {
    return a.budget - b.budget
}

async function loadDestinations() {
    maxBudgetInput.disabled = true
    destinationStatus.textContent = "Loading destinations..."
    destinationLoadStatus.textContent = "Loading destination data..."
    try {
        const response = await fetch("./destinations.json")
        if (response.ok === false) {
            console.log("Could not load destinations", response.status)
            destinationStatus.textContent = "Could not load destinations. Please try again later."
            destinationLoadStatus.textContent = "Destination data could not be loaded. Reload the page to try again."
            return;
        } else {
            const loadedDestinations = await response.json()
            if (Array.isArray(loadedDestinations) === false) {
                console.log("Expected an array of destinations")
                destinationStatus.textContent = "Destination data has an unexpected format."
                destinationLoadStatus.textContent = "Destination data could not be loaded. Reload the page to try again."
                return;
            } 
            for (const destination of loadedDestinations) {
                if (destination === null || typeof destination !== "object" || Array.isArray(destination)) {
                    console.log("Invalid destination entry", destination)
                    destinationStatus.textContent = "Destination data contains an invalid entry"
                    destinationLoadStatus.textContent = "Destination data could not be loaded. Reload the page to try again."
                    return;
                }
                if (typeof destination.name !== "string" || destination.name.trim() === "") {
                    console.log("Invalid destination name", destination)
                    destinationStatus.textContent = "Destination data contains an invalid name"
                    destinationLoadStatus.textContent = "Destination data could not be loaded. Reload the page to try again."
                    return;
                }
                if (typeof destination.capital !== "string" || destination.capital.trim() === "") {
                    console.log("Invalid destination capital", destination)
                    destinationStatus.textContent = "Destination data contains an invalid capital"
                    destinationLoadStatus.textContent = "Destination data could not be loaded. Reload the page to try again."
                    return;
                }
                if (typeof destination.region !== "string" || destination.region.trim() === "") {
                    console.log("Invalid destination region", destination)
                    destinationStatus.textContent = "Destination data contains an invalid region"
                    destinationLoadStatus.textContent = "Destination data could not be loaded. Reload the page to try again."
                    return;
                }
                if (typeof destination.page !== "string" || destination.page.trim() === "") {
                    console.log("Invalid destination page", destination)
                    destinationStatus.textContent = "Destination data contains an invalid page"
                    destinationLoadStatus.textContent = "Destination data could not be loaded. Reload the page to try again."
                    return;
                }
                if(Number.isFinite(destination.budget) === false || destination.budget <0) {
                    console.log("Invalid budget for destination", destination.name)
                    destinationStatus.textContent = "Destination data contains an invalid budget"
                    destinationLoadStatus.textContent = "Destination data could not be loaded. Reload the page to try again."
                    return;
                } 
            }
            destinations = loadedDestinations
            maxBudgetInput.disabled = false
            handleBudgetInput()
            destinationLoadStatus.textContent = "Data loaded this session at " + new Date().toLocaleString();
        } 
    }
    catch (error) {
        console.log("Destination loading failed", error);
        destinationLoadStatus.textContent = "Destination data could not be loaded. Reload the page to try again."
        destinationStatus.textContent = "Could not load destinations. Please try again later."
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
    loadDestinations()
}



