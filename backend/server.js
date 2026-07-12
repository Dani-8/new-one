import express from "express"
import cors from "cors";

// later add your own database to fetch and send data from/to
// ill use a local data temporaly just to improve the backend backbone
import foods from "./data";
const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())



// GET all foods
app.get('/api/foods', (req, res) => {
    res.json(foods)
})

// GET single food
app.get('/api/foods/:id', (req, res) => {
    const food = foods.find(f => f.id === req.params.id)
    if (!food) return res.status(404).json({ error: 'Food not found' })
    res.json(food)
})

// POST new food (admin only)
app.post('/api/foods', (req, res) => {
    const newFood = { ...req.body, id: `food_${Date.now()}` }
    foods.push(newFood)
    res.status(201).json(newFood)
})

// PUT update food
app.put('/api/foods/:id', (req, res) => {
    const idx = foods.findIndex(f => f.id === req.params.id)
    if (idx === -1) return res.status(404).json({ error: 'Food not found' })
    foods[idx] = { ...foods[idx], ...req.body }
    res.json(foods[idx])
})

// DELETE food
app.delete('/api/foods/:id', (req, res) => {
    foods = foods.filter(f => f.id !== req.params.id)
    res.status(204).send()
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
