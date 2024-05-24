const express = require('express');
const app = express();
const fs = require('fs');

app.get('/products', (req, res) => {
  fs.readFile('./products.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Məhsul məlumatları tapılmadı');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  fs.readFile('./products.json', 'utf8', (err, data) => {
    if (err) {
    console.error('Dosya okuma hatası:', err);
      res.status(500).send('Məhsul məlumatları tapılmadı');
    } else {
      const products = JSON.parse(data);
      const product = products.find(p => p.id === productId);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send('Məhsul tapılmadı');
      }
    }
  });
});

app.get('/page', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  fs.readFile('./products.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Məhsul məlumatları oxunmadı');
    } else {
      const products = JSON.parse(data);
      const paginatedProducts = products.slice(offset, offset + limit);
      res.send(paginatedProducts);
    }
  });
});

const Host = 5000;
app.listen(Host, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('localhost:' + Host);
    }
});