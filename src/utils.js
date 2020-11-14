const axios = require('axios');
const env = require('dotenv').config({ path: '../config/config.env' });
const gifApiKey = process.env.GIPHY_API_KEY;
let recipeApi = `http://www.recipepuppy.com/api/`;

function cleanString(str){
    return str.replace(/([^a-zA-Z ]|\\n)/g, "");
}

function verifyKeywords(keywords){
    if(keywords.length<=3){
        keywords.sort();
        return keywords;
    }else{
        return false;
    }
}

async function getRecipes(keywords){
    if(keywords){
        recipeApi = `http://www.recipepuppy.com/api/?i=${keywords}`;
    }
    const response = await axios.get(recipeApi);
    const recipes = response.data.results.map(async(recipe) => {
        let { title, ingredients, href } = recipe;
        title = cleanString(title);
        recipe = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${recipe.title}&api_key=${gifApiKey}&limit=1`)
            .then((response) =>{
                return({
                    "title": title,
                    "ingredients": ingredients.split(','),
                    "link": href,
                    "gif": response.data.data[0].embed_url
                });
            });
        recipes.push(recipe);
    });
    await Promise.all(recipes);
    return recipes.filter(recipe => Object.keys(recipe).length !== 0);
}

module.exports = utils.js;