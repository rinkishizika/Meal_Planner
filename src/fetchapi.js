function buttonClicked() {
    var search = document.getElementById('meal').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        displayProducts(data.meals);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function displayProducts(meals) {
    var html = '';

    meals.forEach((meal) => {
        var ingredientsList = '<ul>';
        for (var j = 1; j <= 20; j++) {
            var ingredient = meal[`strIngredient${j}`];
            var measure = meal[`strMeasure${j}`];

            if (ingredient && ingredient.trim() !== '') {
                ingredientsList += `<li>${ingredient} - ${measure}</li>`;
            }
        }
        ingredientsList += '</ul>';

        var instructionsList = meal.strInstructions.split('\r\n').filter(step => step.trim() !== '');

        var youtubeLink = meal.strYoutube;
        var pic = meal.strMealThumb;

        html += `
            <div class="meals">
                <div class="meals-recipe">
                    <img src="${pic}" alt="meal(s)">
                </div>
                <div class="desc">
                    <h2>${meal.strMeal}</h2>
                    <h3>Instructions:</h3>
                    <ul>${instructionsList.map(step => `<li>${step}</li>`).join('')}</ul>
                    <h3>Ingredients:</h3>
                    ${ingredientsList}
                    <h4>Video Reference:</h4>
                    <a href="${youtubeLink}" target="_blank">${youtubeLink}</a>
                </div>
            </div>`;
    });

    document.getElementById('display').innerHTML = html;
}

