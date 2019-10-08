let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let newCountryButton = document.querySelector("#new-country")
let resultTextElement = document.querySelector('#result')

let countryCode = getCountryCode()
let countryName = getCountryName(countryCode)
let userAnswer = ""

randomCountryElement.innerHTML = countryName

submitButton.addEventListener("click", async function(){ //fetches the correct answer and checks if it matches user answer.
	userAnswer = userAnswerElement.value
	
	let countriesAndCapitalsURL = "https://api.worldbank.org/v2/country/"+countryCode+"?format=json"
	let randomCapital = "not working"
	
	await fetch(countriesAndCapitalsURL) // await to ensure that fetch is finished and the randomCapital var is populated before we move on.
		.then( (res) => res.json())
		.then( function(countryData){		
			randomCapital = countryData[1][0].capitalCity
		})
		.catch( err=> {
			console.log(err)
			window.alert(err)
		})
	
	if(userAnswer.toLowerCase() == randomCapital.toLowerCase()){ // I tried to use Levenshtein but their files were giving me errors.
		resultTextElement.innerHTML = `Correct! The capital of ${countryName} is ${randomCapital}!`
	} else {
		resultTextElement.innerHTML = `Incorrect! The capital of ${countryName} is ${randomCapital}.`
	}
})

newCountryButton.addEventListener("click", function(){ //gets new values and clears everything out.
	countryCode = getCountryCode()
	countryName = getCountryName(countryCode)
	userAnswerElement.value = ""
	randomCountryElement.innerHTML = countryName
	resultTextElement.innerHTML = ""
})

function getCountryCode(){ //selects a number between 1 and the length of the country list. Picks the country at that index, returns code.
	let countryArrayLength = countriesAndCodes.length
	console.log(countryArrayLength)
	let randomPossition = Math.floor(Math.random() * countryArrayLength)
	let randCountryCode = countriesAndCodes[randomPossition]["alpha-2"]
	
	return(randCountryCode)
}

function getCountryName(countryCode){ //finds the name associated with the country code. 
	let name = ""
	countriesAndCodes.forEach(function(country){
		if(country["alpha-2"] == countryCode){
			name = country.name
		}
	})
	return(name)
}