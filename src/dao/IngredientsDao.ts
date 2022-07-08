import {Ingredient} from "../models/Ingredient";
import {apiKey} from "./apiKey";

class IngredientsDao {
  baseurl = "https://api.spoonacular.com/food/ingredients"

  async ingredientIds(): Promise<Array<string>> {
    const cachedAtAsString = localStorage.getItem("ingredients-cache-date")
    if (cachedAtAsString) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const cachedAt = new Date(cachedAtAsString);
      cachedAt.setHours(0,0,0,0);

      const cachedIngredients = localStorage.getItem("cached-ingredients");
      if (cachedIngredients != null && today.toISOString() === cachedAt.toISOString()) {
        console.log("return cached hit")
        return Promise.resolve(JSON.parse(cachedIngredients));
      }
    }

    const ingredients = await fetch("https://spoonacular.com/application/frontend/downloads/top-1k-ingredients.csv")
      .then(response => response.text())
      .then(result => result.split("\n").map(it => it.split(";")[1]))

    localStorage.setItem("cached-ingredients", JSON.stringify(ingredients));

    return Promise.resolve(ingredients);
  }

  async ingredientById(id: string): Promise<Ingredient> {
    return fetch(`${this.baseurl}/${id}/information?apiKey=${apiKey}`)
      .then(response => response.json())
      .then(json => json as Ingredient)
  }
}

const ingredientsDao = new IngredientsDao();
export default ingredientsDao;
