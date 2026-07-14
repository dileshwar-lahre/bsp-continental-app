import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Crucial Error: Please define the MONGODB_URI inside .env.local');
}

// Global caching system to prevent multiple concurrent connections in development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If active connection already exists, return it instantly
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000, // Wait up to 8 seconds before throwing error
    };

    console.log('🔄 Attaching production database client to fresh bspsaas cluster...');

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('🚀 Awesome! MongoDB Connected Successfully to bspsaas database.');
      return mongooseInstance;
    }).catch((error) => {
      console.error('❌ Mongoose Connection Error:', error.message);
      cached.promise = null; // Clear broken cache promise threads
      throw error;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; 
    throw e;
  }

  return cached.conn;
}

export default dbConnect;