export default class Planet {
  constructor(data) {
    this.name = data.name
    this.climate = data.climate
    this.gravity = data.gravity
    this.terrain = data.terrain
    this.population = data.population
    this.url = data.url
  }

  get BasicTemplate() {
    return `<p onclick="app.controllers.swController.getPlanet('${this.url}')">${this.name}</p>`
  }

  get DetailedTemplate() {
    return `
        <h1>${this.name}</h1>
        <p>Terrain: ${this.terrain}</p>
        <p>Climate: ${this.climate}</p>
        <p>Gravity: ${this.gravity}</p>
        <p>Population: ${this.population}</p>
        `
  }
}