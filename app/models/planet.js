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
    return `<li onclick="app.controllers.swController.getPlanet('${this.url}')">${this.name}</li>`
  }

  get DetailedTemplate() {
    return `
        <h3>${this.name}</h3>
        <p>Terrain: ${this.terrain}</p>
        <p>Climate: ${this.climate}</p>
        <p>Gravity: ${this.gravity}</p>
        <p>Population: ${this.population}</p>
        `
  }
}