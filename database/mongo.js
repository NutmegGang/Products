

const informationSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  campus: { type: String, required: false },
  name: {type: String, required: true},
  slogan: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  default_price: {type: String, required: true},
  created_at: {type: Date, default: Date.now}
  features: [
    {
      feature: String,
      value: String
    }
  ]
})







// const featuresSchema = new mongoose.Schema({
//   feature: String,
//   value: String
// })

