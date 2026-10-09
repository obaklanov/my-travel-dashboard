//DOM elements
const tipsButton = document.querySelector(".tips-button");
const tipsList = document.querySelector(".tips-list");
const destinationCards = document.querySelectorAll(".destination-card");
const selectedDestination = document.querySelector(".selected-destination");
const selectedCapital = document.querySelector(".selected-capital")
const selectedBudget = document.querySelector(".selected-budget")
const selectedRegion = document.querySelector(".selected-region")

//Data
const destinations = [
    {
        name: "Vietnam",
        capital: "Hanoi",
        budget: 40,
        region: "Southeast Asia"
    },
    {
        name: "Thailand",
        capital: "Bangkok",
        budget: 60,
        region: "Southeast Asia"
    },
    {
        name: "Indonesia",
        capital: "Jakarta",
        budget: 50,
        region: "Southeast Asia"
    },
    {
        name: "Malaysia",
        capital: "Kuala Lumpur",
        budget: 45,
        region: "Southeast Asia"
    }    
]
//Functions (do what)
function toggleTravelTips() {
    const isHidden = tipsList.classList.contains("hidden");

    if (isHidden === false) {
        tipsList.classList.add("hidden");
        tipsButton.classList.add("extra-space");
        tipsButton.textContent = "Show Travel Tips";
    } else {      
            tipsList.classList.remove("hidden");
            tipsButton.classList.remove("extra-space");
            tipsButton.textContent = "Hide Travel Tips";
    } 
}

function selectDestination(card) {
    for (const otherCard of destinationCards) {
        otherCard.classList.remove("selected-card");
    }

    card.classList.add("selected-card");

    const destinationName = card.dataset.country;

    const selectedData = destinations.find(
        destination => destination.name === destinationName
    );

    if (selectedData === undefined) {
        return;
    }

    if (selectedDestination !== null) {
        selectedDestination.textContent =
            `Selected destination: ${selectedData.name}`;
    }

    if (selectedCapital !== null) {
        selectedCapital.textContent =
            `Capital: ${selectedData.capital}`;
    }

    if (selectedBudget !== null) {
        selectedBudget.textContent =
            `Budget: $${selectedData.budget}/day`;
    }

    if (selectedRegion !== null) {
        selectedRegion.textContent =
            `Region: ${selectedData.region}`;
    }
}

//Events (when)
if (tipsButton !== null && tipsList !== null) {
    tipsButton.addEventListener("click", toggleTravelTips);
}

for (const card of destinationCards) {
    card.addEventListener("click", function() {
        selectDestination(card)
    });
}