export default class Person {
    constructor(data) {
        this.name = data.name
        this.gender = data.gender
        this.hairColor = data.hair_color || data.hairColor
        this.eyeColor = data.eye_color || data.eyeColor
        this.movies = data.movies || data.films.length
        this.url = data.url
    }




    get BasicTemplate() {
        return `<p onclick="app.controllers.swController.getPerson('${this.url}')" class="${this.gender}">${this.name}</p>`
    }

    get DetailedTemplate() {
        return `
        <h1>${this.name}</h1>
        <p>Hair: ${this.hairColor}</p>
        <p>Eyes: ${this.eyeColor}</p>
        <p>Movies: ${this.movies}</p>
        `
    }
}