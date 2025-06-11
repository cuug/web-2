class Pizza {
    static pizzaTypes = {
        'Маргарита' : { price: 500, calories: 300 },
        'Пепперони' : { price: 800, calories: 400 },
        'Баварская' : { price: 700, calories: 450 }
    };

    static pizzaSizes = {
        'Большая' : { price: 200, calories: 200 },
        'Маленькая' : { price : 100, calories: 100 }
    };

    static topings = {
        'Сливочная мацарелла' : { price: 50, calories: 20 },
        'Сырный борт' : {
            'Маленькая' : { price: 150, calories: 50 },
            'Большая' : { price: 300, calories: 50 }
        },
        'Чеддер и пармезан' : {
            'Маленькая' : { price: 150, calories: 50 },
            'Большая' : { price: 300, calories: 50}
        }
    }

    constructor(type, size) {
        this.type = type;
        this.size = size;
        this.topingsList = [];
    }

    addTopping(topping) {
        if(!Pizza.topings[topping]) 
            throw new Error('Такой добавки не существует');

        if(!this.topingsList.includes(topping)) {
            this.topingsList.push(topping);
        }
    }

    removeTopping(topping) {
        this.topingsList = this.topingsList.filter(t => t != topping);
    }

    getToppings() {
        return this.topingsList;
    }

    getSize() {
        return this.size;
    }

    getStuffing() {
        return this.type;
    }

    calculatePrice() {
        let price = Pizza.pizzaTypes[this.type].price + Pizza.pizzaSizes[this.size].price;

        for (const topping of this.topingsList) {
            if (typeof Pizza.topings[topping] === 'object' && !Pizza.topings[topping].price) {
                price += Pizza.topings[topping][this.size].price;
            } else {
                price += Pizza.topings[topping].price;
            }
        }

        return price;
    }

    calculateCalories() {
        let calories = Pizza.pizzaTypes[this.type].calories + Pizza.pizzaSizes[this.size].calories;

        for (const topping of this.topingsList) {
            if (typeof Pizza.topings[topping] === 'object' && !Pizza.topings[topping].calories) {
                calories += Pizza.topings[topping][this.size].calories;
            } else {
                calories += Pizza.topings[topping].calories;
            }
        }

        return calories;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let selectedPizza = new Pizza('Маргарита', 'Маленькая');

    const pizzaOptions = document.querySelectorAll('.pizza-option');
    const sizeOptions = document.querySelectorAll('.size-option');
    const addOptions = document.querySelectorAll('.toping-option');
    const addToCartBtn = document.querySelector('.add-to-cart');

    if (pizzaOptions.length > 0) pizzaOptions[0].classList.add('selected');
    if (sizeOptions.length > 0) sizeOptions[0].classList.add('selected');

    pizzaOptions.forEach((el) => {
        el.addEventListener('click', () => {
            pizzaOptions.forEach(p => p.classList.remove('selected'));
            el.classList.add('selected');
            
            const name = el.dataset.name;
            selectedPizza = new Pizza(name, selectedPizza.size);
            updateDisplay();
        });
    });

    sizeOptions.forEach((btn) => {
        btn.addEventListener('click', () => {
            sizeOptions.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            const size = btn.textContent.trim();
            selectedPizza.size = size;
            updateDisplay();
        });
    });

    addOptions.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('selected');
            
            const toppingText = card.querySelector('div').textContent.trim();
            let toppingName;
            
            switch(toppingText) {
                case 'Сырный бортик': toppingName = 'Сырный борт'; break;
                case 'Сливочная моцарелла': toppingName = 'Сливочная мацарелла'; break;
                default: toppingName = toppingText;
            }
            
            if (card.classList.contains('selected')) {
                selectedPizza.addTopping(toppingName);
            } else {
                selectedPizza.removeTopping(toppingName);
            }
            
            updateDisplay();
        });
    });

    function updateDisplay() {
        const price = selectedPizza.calculatePrice();
        const calories = selectedPizza.calculateCalories();
        document.getElementById('totalPrice').textContent = price;
        document.getElementById('totalCalories').textContent = calories;
    }

    updateDisplay();
});