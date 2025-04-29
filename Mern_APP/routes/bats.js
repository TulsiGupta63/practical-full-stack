const express = require('express');
const router = express.Router();
const Bat = require('../models/bat');


router.get('/', async (req, res) => {
    const bats = await Bat.find({});
    res.render('bats/index', { bats });
});


router.get('/new', (req, res) => {
    res.render('bats/new');
});


router.post('/', async (req, res) => {
    const bat = new Bat(req.body.bat);
    await bat.save();
    res.redirect('/bats');
});


router.get('/:id', async (req, res) => {
    const bat = await Bat.findById(req.params.id);
    res.render('bats/show', { bat });
});


router.get('/:id/edit', async (req, res) => {
    const bat = await Bat.findById(req.params.id);
    res.render('bats/edit', { bat });
});


router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const bat = await Bat.findById(id);
    const { price, image, desc, brandAmbassador } = req.body.bat;
    bat.price = price;
    bat.image = image;
    bat.desc = desc;
    bat.brandAmbassador = brandAmbassador;
    await bat.save();
    res.redirect(`/bats/${id}`);
});


router.post('/:id/delete', async (req, res) => {
    const { id } = req.params;
    await Bat.findByIdAndDelete(id);
    res.redirect('/bats');
});

module.exports = router;

