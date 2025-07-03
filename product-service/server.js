const express = require('express');
const mysql = require('mysql2/promise');
const promClient = require('prom-client');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Prometheus metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);

app.use(cors());
app.use(express.json());

// Middleware for metrics
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration.observe(
      { method: req.method, route: req.route?.path || req.path, status_code: res.statusCode },
      duration
    );
    httpRequestTotal.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode
    });
  });
  next();
});

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'microservices_db'
};

let db;

async function initDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    
    // Create products table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert sample data
    const [existing] = await db.execute('SELECT COUNT(*) as count FROM products');
    if (existing[0].count === 0) {
      await db.execute(`
        INSERT INTO products (name, description, price, stock) VALUES
        ('Laptop', 'High-performance laptop', 999.99, 10),
        ('Mouse', 'Wireless mouse', 29.99, 50),
        ('Keyboard', 'Mechanical keyboard', 89.99, 25)
      `);
    }
  } catch (error) {
    console.error('Database connection error:', error);
    setTimeout(initDB, 5000);
  }
}

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'product-service' });
});

app.get('/products', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock]
    );
    res.status(201).json({ id: result.insertId, name, description, price, stock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
  });
});