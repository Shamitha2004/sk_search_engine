const express = require('express');
const app = express();
app.use(express.json()); 

const PORT = 3000;

const articles = [];

app.post('/articles', (req, res) => {
  const { title, content, tags } = req.body;
  const id = `article-${articles.length + 1}`; 
  const date = new Date().toISOString();

  const article = { id, title, content, tags, date };
  articles.push(article);

  res.json({ message: 'Article added successfully', id });
});


app.get('/articles/:id', (req, res) => {
    const { id } = req.params; 
    const article = articles.find((article) => article.id === id); 
    if (!article) {
      return res.status(404).json({ message: 'Article not found' }); 
    }
  
    res.json(article); 
  });
  
  
  app.get('/articles/search', (req, res) => {
    const { keyword } = req.query; 
  
    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required' }); 
    }
  
    
    const results = articles.filter((article) =>
      article.title.toLowerCase().includes(keyword.toLowerCase()) ||
      article.content.toLowerCase().includes(keyword.toLowerCase())
    );
  
    res.json({ results }); 
});
    

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});