import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Real Estate Backend Debug Report');
console.log('===================================\n');

// Check Node.js version
console.log('📋 Environment Info:');
console.log(`   Node.js version: ${process.version}`);
console.log(`   Platform: ${process.platform}`);
console.log(`   Architecture: ${process.arch}\n`);

// Check if critical files exist
const criticalFiles = [
  'package.json',
  'config.env',
  'server.js',
  'models/User.js',
  'models/Property.js',
  'routes/auth.js',
  'middleware/errorHandler.js'
];

console.log('📁 File System Check:');
criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// Check uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('\n📁 Creating uploads directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('   ✅ uploads/ directory created');
}

// Check environment variables
console.log('\n🔧 Environment Variables:');
const envPath = path.join(__dirname, 'config.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = ['PORT', 'NODE_ENV', 'MONGODB_URI', 'JWT_SECRET'];
  
  envVars.forEach(varName => {
    const hasVar = envContent.includes(`${varName}=`);
    console.log(`   ${hasVar ? '✅' : '❌'} ${varName}`);
  });
} else {
  console.log('   ❌ config.env file not found');
}

// Check node_modules
console.log('\n📦 Dependencies:');
const nodeModulesExists = fs.existsSync(path.join(__dirname, 'node_modules'));
console.log(`   ${nodeModulesExists ? '✅' : '❌'} node_modules directory`);

if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = Object.keys(packageJson.dependencies || {});
  console.log(`   📋 ${deps.length} dependencies listed`);
  
  // Check if main dependencies exist
  const mainDeps = ['express', 'mongoose', 'cors', 'dotenv', 'jsonwebtoken'];
  mainDeps.forEach(dep => {
    const hasDepDir = fs.existsSync(path.join(__dirname, 'node_modules', dep));
    console.log(`   ${hasDepDir ? '✅' : '❌'} ${dep}`);
  });
}

console.log('\n💡 Recommendations:');
if (!nodeModulesExists) {
  console.log('   🔧 Run: npm install');
}

console.log('   🔧 Make sure MongoDB is running locally on port 27017');
console.log('   🔧 Or update MONGODB_URI in config.env to use MongoDB Atlas');
console.log('   🔧 Check that no other process is using port 5000');

console.log('\n✅ Debug report complete. Try running: npm start');
