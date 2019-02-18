//private
import StarWarsService from "./starWarsService.js";


let _swService = new StarWarsService()

function drawPeople() {
    let people = _swService.People
    let template = ''
    people.forEach(p => {
        template += p.BasicTemplate
    })
    //handles people list
    document.getElementById('sw-info').innerHTML = template
    document.getElementById('buttons').innerHTML = `
    <button ${_swService.Previous ? '' : 'disabled'} onclick="app.controllers.swController.getPeople('${_swService.Previous}')">Previous</button>
    <button ${_swService.Next ? '' : 'disabled'} onclick="app.controllers.swController.getPeople('${_swService.Next}')">Next</button>
    `
}

function drawActivePerson() {
    document.getElementById('active-item').innerHTML = _swService.ActivePerson.DetailedTemplate
}

function drawPeopleButton() {
    let template = `<button onclick="app.controllers.swController.triggerPeople()">People</button>`
    document.getElementById('people-button').innerHTML = template

}

//draw planets function
function drawPlanets() {
    let planets = _swService.Planets
    let template = ''
    planets.forEach(p => {
        template += p.BasicTemplate
    })
    //handles planet list
    document.getElementById('sw-info').innerHTML = template
    document.getElementById('buttons').innerHTML = `
    <button ${_swService.PreviousPlanet ? '' : 'disabled'} onclick="app.controllers.swController.getPlanets('${_swService.PreviousPlanet}')">Previous</button>
    <button ${_swService.NextPlanet ? '' : 'disabled'} onclick="app.controllers.swController.getPlanets('${_swService.NextPlanet}')">Next</button>
    `
}

function drawActivePlanet() {
    document.getElementById('active-item').innerHTML = _swService.ActivePlanet.DetailedTemplate
}
function drawPlanetsButton() {
    let template = `<button onclick="app.controllers.swController.triggerPlanets()">Planet</button>`
    document.getElementById('planet-button').innerHTML = template

}

//public
export default class StarWarsController {
    constructor() {
        //add subscribers to service
        _swService.addSubscriber('activePerson', drawActivePerson)
        _swService.addSubscriber('people', drawPeople)
        _swService.addSubscriber('planets', drawPlanets)
        _swService.addSubscriber('activePlanet', drawActivePlanet)

        drawPeopleButton()
        drawPlanetsButton()
    }

    triggerPeople() {
        _swService.getAllApiPeople()
        document.getElementById('active-item').innerHTML = ''
    }

    getPeople(url) {
        _swService.getAllApiPeople(url)
    }
    getPerson(url) {
        debugger
        _swService.getOneApiPerson(url)
    }

    getPlanets(url) {
        _swService.getAllApiPlanets(url)
    }

    getPlanet(url) {
        _swService.getOneApiPlanet(url)
    }

    triggerPlanets() {
        _swService.getAllApiPlanets()
        document.getElementById('active-item').innerHTML = ''
    }

}