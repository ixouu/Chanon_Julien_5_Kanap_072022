const apiUrl = "http://localhost:3000/api/products";

//Initialize class Collection
class Collection{

// Fetch the API, transform API Data to JSON format, iterate through the DOM and insert new card with the method insertCard
    async fetchProducts(){
        fetch(apiUrl)
        .then(response => {
            if (response.status !== 200){
                return;
            } else {
                return response.json();
            }
        })
        .then(jsonListProduct =>{
            for (let jsonProduct of jsonListProduct){
                let productCard = new Card(jsonProduct);
                productCard.insertCard();
            }
        })
    }
}

// Initialize class Card and create card template
class Card{
    constructor(jsonProduct){
        this.a = document.createElement('a');
        this.a.setAttribute('href', `./product.html?id=${jsonProduct._id}`);
        this.name = jsonProduct.name;
        this.imageUrl = jsonProduct.imageUrl;
        this.description = jsonProduct.description;
        this.altTxt = jsonProduct.altTxt;
    }

// HTML content is added
    insertCard(){
        this.a.innerHTML =`
        <article>
            <img src="${this.imageUrl}" alt="${this.altTxt}">
            <h3 class="productName">${this.name}</h3>
            <p class="productDescription">${this.description}</p>
        </article>`;
        document.getElementById('items').append(this.a);
    }
}

// Create a new Collection and fetch the products
let collection = new Collection;
collection.fetchProducts();