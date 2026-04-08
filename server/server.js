const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const jsonData = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(jsonData) || [];
  } catch (error) {
    console.error("Помилка читання файлу:", error);
    return [];
  }
};

const saveData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Помилка запису у файл:", error);
  }
};

app.get('/api/inventory', (req, res) => {
  const inventory = readData();
  res.json(inventory);
});

app.get('/api/inventory/:id', (req, res) => {
  const inventory = readData();
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).json({ message: "Предмет не знайдено" });
});

app.post('/api/register', upload.single('photo'), (req, res) => {
  const { inventory_name, description } = req.body;
  if (!inventory_name) return res.status(400).json({ message: "Назва обов'язкова" });

  const inventory = readData();
  const newItem = {
    id: Date.now(),
    inventory_name,
    description,
    photo_url: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null,
    updated_at: new Date().toISOString()
  };

  inventory.push(newItem);
  saveData(inventory);
  res.status(201).json(newItem);
});

app.put('/api/inventory/:id', (req, res) => {
  const inventory = readData();
  const index = inventory.findIndex(i => i.id === parseInt(req.params.id));
  
  if (index === -1) return res.status(404).json({ message: "Не знайдено" });

  inventory[index] = { 
    ...inventory[index], 
    ...req.body,
    updated_at: new Date().toISOString()
  };
  
  saveData(inventory);
  res.json(inventory[index]);
});

app.put('/api/inventory/:id/photo', upload.single('photo'), (req, res) => {
  const inventory = readData();
  const index = inventory.findIndex(i => i.id === parseInt(req.params.id));
  
  if (index === -1) return res.status(404).json({ message: "Не знайдено" });

  if (req.file) {
    inventory[index].photo_url = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    inventory[index].updated_at = new Date().toISOString();
    saveData(inventory);
  }
  
  res.json(inventory[index]);
});

app.delete('/api/inventory/:id', (req, res) => {
  let inventory = readData();
  inventory = inventory.filter(i => i.id !== parseInt(req.params.id));
  saveData(inventory);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено: http://localhost:${PORT}`);
});