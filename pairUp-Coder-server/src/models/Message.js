const mongoose = require("mongoose")

// Define the message schema
const messageSchema = new mongoose.Schema({
  content: { 
    type: String,
    // validate: {
    //   validator: function (value) {
    //     // Ensure either content or mediaUrl is provided
    //     return value || this.mediaUrl;
    //   },
    //   message: 'Either content or mediaUrl is required',
    // },
    required : true
  },
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  receiver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'read'], 
    default: 'sent' 
  },
  reactions: [
    {
      emoji: { type: String }, // The emoji used for the reaction
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // User who reacted
    }
  ],  
}, {
  timestamps: true  
});

// Index sender and receiver for faster lookup
messageSchema.index({ sender: 1, receiver: 1, timestamps: -1 });

 module.exports = mongoose.model("Message" , messageSchema)
