/* import express from 'express' */
const express = require('express')
const database = require('mime-db')

const app = express()
const port = 3000

//npm init
//npm install --save-dev nodemon
//npm install express
//npm install ejs

app.set('view engine', 'ejs')
app.set('views', './templates/views')

app.get("/profile", (req, res) => {
  

  const data = {
    info: {
        name: "Christina",
        posts: [
        {
          body: `
            <h2>Look at this picture</h2>
            <img src='https://picsum.photos/400/400' />`,
        },
      ],
    },
  };
  res.render("profile", data);
});

app.get("/user", (req, res) => {
    res.send("This is a user's page.")
})

app.get("/register", (req, res) => {
    res.send("You are registered.")
})

app.get("/login", (req, res) => {
    res.send("You are logged in.")
})

app.get('/', (req, res) => {
    const data = {
        user: {
        
            id: "1",
            name: "Lucas",
            email: "lucasl@codingtemple.com",
            favoriteColor: "blue",
            posts: [
                {
                    id: "1",
                    body: `
                    <h2>Welcome to coding temple</h2>
                    <p>this is your picture</p>
                    <img src='https://picsum.photos/100/100' />
                    <a href="https://google.com">See More</a>`
                },
                {
                    id: "2",
                    body: "This is post 2",
                    img: `<img src='https://picsum.photos/200/300'>`
                },
                {
                    id: "3",
                    body: "This is post 3",
                    img: 'https://picsum.photos/200/300'
                }
            ],
            cart: [
                {
                    id: "1",
                    name: "T-Shirt",
                    description: "This is a t-shirt",
                    img: `<img src='https://picsum.photos/200/300'>`
                },
                {
                    id: "2",
                    name: "Shoe",
                    description: "This is a shoe",
                    img: `<img src='https://picsum.photos/200/300'>`
                }
            ]
        }
    }
    res.render('home', data)
    })

app.get('/calculator/:num1/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)
    console.log(num1, num2)
    if (isNaN(num1) || isNaN(num2)) {
        console.log(num1)
        res.status(400).send('Number parameters are not valid integers.')
        return
    }

    const data = {
        addition: num1 + num2,
        subtraction: num1 - num2,
        multiplication: num1 * num2,
        division: (num2 === 0) ? 'Cannot divide by zero' : num1 / num2,
        exponential: num1 ** num2
    }

    res.send(data)
})

const userData = [
    {
        id: "1",
        name: "Lucas",
        email: "lucasl@codingtemple.com",
        favoriteColor: "blue",
        posts: [
            {
                id: "1",
                body: "This is a post"
            },
            {
                id: "2",
                body: "This is post 2"
            },
            {
                id: "3",
                body: "This is post 3"
            }
        ],
        cart: [
            {
                id: "1",
                name: "T-Shirt",
                description: "This is a t-shirt"
            },
            {
                id: "2",
                name: "Shoe",
                description: "This is a shoe"
            }
        ]
    },
    {
        id: "2",
        name: "Christopher",
        email: "christophert@codingtemple.com",
        favoriteColor: "green",
        posts: [
            {
                id: "4",
                body: "This is post 4"
            },
            {
                id: "5",
                body: "This is post 5"
            },
            {
                id: "6",
                body: "This is post 6"
            }
        ],
        cart: [
            {
                id: "3",
                name: "T-Shirt",
                description: "This is a t-shirt"
            },
            {
                id: "4",
                name: "Hat",
                description: "This is a hat"
            }
        ]
    },
    {
        id: "3",
        name: "Joel",
        email: "joelc@codingtemple.com",
        favoriteColor: "red",
        posts: [
            {
                id: "7",
                body: "This is post 7"
            },
            {
                id: "8",
                body: "This is post 8"
            },
            {
                id: "9",
                body: "This is post 9"
            }
        ],
        cart: [
            {
                id: "5",
                name: "Shoe",
                description: "This is a t-shirt"
            },
            {
                id: "6",
                name: "Pants",
                description: "These are pants"
            }
        ]
    }
]

/* 
* Create a route to return all of the userData
*/
app.get('/users', (req, res) => {
    res.send(userData)
})

/* 
* Create a route to return a user's cart based on their user id
*/
app.get('/users/:uid/cart', (req, res) => {
    const uid = req.params.uid
    for (const user of userData) {
        if (user.id === uid) {
            return res.send(user.cart)
        }
    }
    res.status(404).send(`User with ID ${uid} is not found`)
}) 

/* 
* Create a route to check if a product is in a user's cart
* send back either true or false
*/

function searchUser(uid) {
    for (const user of userData) {
        if (user.id === uid) {
            return user
        }
    }
}

/* 
* Create a route to return a user's cart based on their user id
*/
app.get('/users/:uid/cart', (req, res) => {
    const uid = req.params.uid
    
    const user = searchUser(uid)

    if (user) {
        return res.send(user.cart)
    }

    res.status(404).send(`User with ID ${uid} not found.`)
})

/* 
* Create a route to check if a product is in a user's cart
* send back either true or false
*/
app.get('/users/:uid/in-cart/:productName', (req, res) => {
    const uid = req.params.uid
    const productName = req.params.productName

    const user = searchUser(uid)
    
    for (const product of user.cart) {
        if (product.name.toLowerCase() == productName.toLowerCase()) {
            return res.send(true)
        }
    }

    res.send(false)
})

in
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})