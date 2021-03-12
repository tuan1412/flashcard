const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const FlashcardModel = require('./models/flashcard');

require('dotenv').config();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.urlencoded({ urlencoded: true }));

const clientFolder = process.env.NODE_ENV === 'production' ? 'build' : 'public';
app.use(express.static(clientFolder));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html/home.html'));
});

app.get('/create', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html/create.html'));
});

app.get('/edit/flashcards/:flashcardId', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html/edit.html'));
})


app.get('/flashcards/random', async (req, res) => {
  try {
    const { category } = req.query;
  
    let randomCards;

    if (category === 'all') {
      randomCards = await FlashcardModel.aggregate().sample(1);
    } else {
      randomCards = await FlashcardModel.aggregate().match({ category }).sample(1);
    };

    if (!randomCards.length) {
      return res.send({ success: false, data: null });
    }

    return res.send({ success: true, data: randomCards[0] });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      data: null
    })
  }
});


app.get('/flashcards/:id', async (req, res) => {
  try {
    const { id } = req.params;
  
    const foundCard = await FlashcardModel.findById(id);

    if (!foundCard) {
      return res.send({ success: false, data: null });
    }

    return res.send({ success: true, data: foundCard });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      data: null
    })
  }
});

app.put('/flashcards/:id', async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.body)

    const newFlashcard = await FlashcardModel.findByIdAndUpdate(id, req.body, { new: true });
    console.log(newFlashcard)
    res.send({
      success: true,
      data: newFlashcard
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      data: null
    })
  }
});

app.put('/flashcards/:id/check-remember', async (req, res) => {
  try {
    const { id } = req.params;
    const { isRemember } = req.body;

    const newFlashcard = await FlashcardModel.findByIdAndUpdate(id, { isRemember }, { new: true });
    res.send({
      success: true,
      data: newFlashcard
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      data: null
    })
  }
});

app.post('/flashcards', async (req, res) => {
  try {
    const newFlashcard = await FlashcardModel.create(req.body);
    res.send({
      success: true,
      data: newFlashcard
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      data: null
    })
  }
});

app.listen(process.env.PORT || 8080);
