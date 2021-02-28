const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const oneRepMaxSchema = Schema({
 //_id: Schema.Types.ObjectId, 
  liftName: String, 
  weight: Number,
  user: {
    required: true, 
    type: Schema.Types.ObjectId,
    ref: 'User'
  } 
}); 

const OneRepMax = mongoose.model('OneRepMax', oneRepMaxSchema);

module.exports = OneRepMax; 