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
        this.topingsList.filter(t => t != topping);
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

const examplePizza = new Pizza('Маргарита', 'Большая');
examplePizza.addTopping('Сырный борт');
examplePizza.addTopping('Чеддер и пармезан');

console.log('Размер пиццы:', examplePizza.getSize());
console.log('Тип пиццы:', examplePizza.getStuffing());
console.log('Добавки:', examplePizza.getToppings().join(', '));
console.log('Цена:', examplePizza.calculatePrice());
console.log('Калории:', examplePizza.calculateCalories());