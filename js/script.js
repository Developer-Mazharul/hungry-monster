const input = document.getElementById("search-input");
const mealItems = document.getElementById("item-search");
const rows = document.getElementById("rows");
const button = document.getElementById("button");
button.addEventListener("click", caseWork);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    caseWork();
  }
});
// API //
function caseWork() {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      let everyItem = "";
      if (data.meals) {
        data.meals.map((meal) => {
          everyItem += `<div class="col-md-3">
                    <div class="seat" mealId="${meal.idMeal}">
                      <a href="#">
                        <img src = "${meal.strMealThumb}" id="meal-images" class="w-100 img-fluid">
                        <p id="meal-paragraph">${meal.strMeal}
                        </p>
                    </a>
                    </div>
                </div>`;
        });
        rows.classList.remove("fault");
      } else {
        everyItem = '';
        rows.classList.add("fault");
      }
      if (input.value === "") {
        everyItem = '';
        rows.classList.add("fault");
      }
      document.getElementById("rows").innerHTML = everyItem;
    });
}
rows.addEventListener("click", (e) => {
  const meals = e.path.find((seat) => {
    if (seat.classList) {
      return seat.classList.contains("seat");
    } else {
      return false;
    }
  });
  if (meals) {
    const mealId = meals.getAttribute("mealId");
    getMealsId(mealId);
  }
});
function getMealsId(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.meals[0]);
      const meal = data.meals[0];
      allMealContent(meal);
      mealItems.style.display = 'none';
    });
}
function allMealContent(meal) {
  let strIngredient = [];
  for (let i = 1; i <= 15; i++) {
    if (meal[`strIngredient${i}`]) {
        strIngredient.push(
            `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`
        );
    }
  }
  let mealDetails= `
  <div class="rows mt-3 mb-3">
      <div class="col-md-6 m-auto">
          <div id="meal-substance">
              <img src="${meal.strMealThumb}" class="img-fluid" />
          </div>
          <div class="meal-text">
              <h2>${meal.strMeal}</h2>
          </div>
              <span id="indgra-heading">text-details</span>
          <ul id="text-details">
          ${strIngredient.map(ingradient=>`<li><span><i class="fas fa-check-square"></i></span> ${ingradient}</li>`).join(' ')}
          </ul>
      </div>
  </div>
  `
  document.getElementById("meal-details").innerHTML = mealDetails;
}