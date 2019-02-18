//private
import Person from "../models/person.js";
import Planet from "../models/planet.js"
//Creates an object to send requests from
let _peopleApi = axios.create({
    baseURL: 'https://swapi.co/api/people'
})

let _planetsApi = axios.create({
    baseURL: 'https://swapi.co/api/planets'
})


let _state = {
    people: [],
    nextPrevPeople: {
        nextUrl: '',
        previousUrl: ''
    },
    activePerson: {},
    planets: [],
    nextPrevPlanets: {
        nextUrl: '',
        previousUrl: ''
    },
    activePlanet: {}
}

let _subscribers = {
    people: [],
    nextPrevPeople: [],
    activePerson: [],
    planets: [],
    nextPrevPlanets: [],
    activePlanet: []
}

//HANDLES ALL ASYNC
function setState(prop, value) {
    _state[prop] = value
    _subscribers[prop].forEach(fn => fn());
}


//public
export default class StarWarsService {
    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }
    //get local data
    get People() {
        //Breaks Refrences of each object in state
        return _state.people.map(p => new Person(p))
    }

    get Next() {
        return _state.nextPrevPeople.nextUrl
    }

    get Previous() {
        return _state.nextPrevPeople.previousUrl
    }

    get ActivePerson() {
        //Creates a new object that is a copy of the active person (breaking refrence)
        return new Person(_state.activePerson)
    }

    //getters for planets
    get Planets() {
        return _state.planets.map(p => new Planet(p))
    }
    get NextPlanet() {
        return _state.nextPrevPlanets.nextUrl
    }
    get PreviousPlanet() {
        return _state.nextPrevPlanets.previousUrl
    }
    get ActivePlanet() {
        return new Planet(_state.activePlanet)
    }


    //make a call to swapi api to get all people
    getAllApiPeople(url = '') {
        _peopleApi.get(url)
            //Happens after data comes back
            .then(response => {
                //all axios requests return 'data' in the response
                let people = response.data.results.map(d => new Person(d))
                let urlData = {
                    nextUrl: response.data.next,
                    previousUrl: response.data.previous
                }
                setState('nextPrevPeople', urlData)
                setState('people', people)
            })
            .catch(err => {
                console.error(err)
            })
    }
    getOneApiPerson(url) {
        _peopleApi.get(url)
            .then(res => {
                setState('activePerson', new Person(res.data))
            })
            .catch(err => {
                console.error(err)
            })
    }

    //make a call to swapi api to get all planets
    getAllApiPlanets(url = '') {
        _planetsApi.get(url)
            //happens after data comes back
            .then(response => {
                let planets = response.data.results.map(d => new Planet(d))
                let urlData = {
                    nextUrl: response.data.next,
                    previousUrl: response.data.previous
                }
                setState('nextPrevPlanets', urlData)
                setState('planets', planets)
            })
            .catch(err => {
                console.error(err)
            })
    }

    getOneApiPlanet(url) {
        _planetsApi.get(url)
            .then(res => {
                setState('activePlanet', new Planet(res.data))
            })
            .catch(err => {
                console.error(err)
            })
    }

}