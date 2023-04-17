const express = require('express');
const router = express.Router();

const beerStyles = [
    { id: 1, name: "Pilsen", minTemp: -4, maxTemp: 6 },
    { id: 2, name: "IPA", minTemp: -6, maxTemp: 7 },
    { id: 3, name: "Stout", minTemp: 6, maxTemp: 8 },
    { id: 4, name: "Pale Ale", minTemp: -5, maxTemp: 5 },
    { id: 5, name: "Weissbier", minTemp: -3, maxTemp: 5 },
    { id: 6, name: "Dunkel", minTemp: 4, maxTemp: 6 },
];

// Get all beer styles
router.get('/', (req, res) => {
    res.json(beerStyles);
});

// Get a beer style by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const style = beerStyles.find((s) => s.id === id);
    if (style) {
        res.json(style);
    } else {
        res.status(404).json({ message: "Style not found" });
    }
});

// Create a new beer style
router.post('/', (req, res) => {
    const style = req.body;
    const id = beerStyles.length + 1;
    style.id = id;
    beerStyles.push(style);
    res.status(201).json(style);
});

// Update a beer style by id
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const styleIndex = beerStyles.findIndex((style) => style.id === id);
    if (styleIndex === -1) {
        res.status(404).json({ message: "Style not found" });
    } else {
        const style = req.body;
        if (!style.name && !style.minTemp && !style.maxTemp) {
            res.status(400).json({ message: "Bad request" });
        } else {
            const updatedStyle = { ...beerStyles[styleIndex], ...style };
            beerStyles[styleIndex] = updatedStyle;
            res.json(updatedStyle);
        }
    }
});

// Delete a beer style by id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const styleIndex = beerStyles.findIndex((style) => style.id === id);
    if (styleIndex === -1) {
        res.status(404).json({ message: "Style not found" });
    } else {
        beerStyles.splice(styleIndex, 1);
        res.json({ message: "Style deleted" });
    }
});

module.exports = router;
