import ingredientsDao from "../../dao/IngredientsDao";
import {Ingredient} from "../../models/Ingredient";

function ingredientCard(item: Ingredient)  {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const cardHeader = document.createElement("h2");
  cardHeader.setAttribute("class", "card-header");
  cardHeader.innerText = item.name;
  card.appendChild(cardHeader);
  const cardContent = document.createElement("div");
  cardContent.setAttribute("class", "card-content");
  const image = document.createElement("img");
  image.setAttribute("class", "card-image");
  image.setAttribute("src", `https://spoonacular.com/cdn/ingredients_250x250/${item.image}`)
  cardContent.appendChild(image);
  card.appendChild(cardContent);
  return card;
}

export async function getIngredients() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const ids = await ingredientsDao.ingredientIds();
  const randomIds: Array<string> = [];
  const usedIndexes: Array<number> = [];
  const min = 0;
  const max = ids.length - 1;
  const numberOfIngredients = urlParams.get("amount") ?? 10;

  while (usedIndexes.length < numberOfIngredients) {
    const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
    if (usedIndexes.includes(randomIndex)) continue;
    usedIndexes.push(randomIndex);
    randomIds.push(ids[randomIndex]);
  }

  const promiseCollection: Array<Promise<Ingredient>> = randomIds.map(id => ingredientsDao.ingredientById(id));
  const collection = await Promise.allSettled(promiseCollection);
  const ingredientsList = document.getElementById("card-container") as HTMLUListElement;
  collection.forEach((it) => {
    console.log("it", it)
    const card = ingredientCard((it as {status: string, value: Ingredient}).value);
    ingredientsList.appendChild(card)
  })
}

const handleGoBack = () => {
  window.location.href = "/"
}

window.addEventListener('load', getIngredients)
document.getElementById("go-back-button")?.addEventListener("click", handleGoBack)
