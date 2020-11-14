const express = require('express');
const server = express();
const axios = require('axios');
const gifApiKey = 'vAZWFoOLsCXSwpC9zf9UJVKObAhokJ6C';
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

server.get('/recipes/', async function (req, res){
    try{
        let keywords = req.query.i.split(',');
        if(verifyKeywords(keywords)){
            let myRecipes = await getRecipes(keywords);
            return res.json({ "keywords": keywords, "recipes": myRecipes });
        }else{
            res.send('Erro: utilize no maximo 3 ingredientes').sendStatus(400);
        }
    }catch (error){
        console.log(error);
        res.send('Serviço indisponível no momento...');
    }
});

server.listen(3001, () => {
    console.log('Server is up!');
});