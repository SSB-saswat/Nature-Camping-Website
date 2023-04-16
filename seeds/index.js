const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
}
const db = mongoose.connection;

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  const c = new Campground({ title: "purple field" });
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      author: "6437eeb539b19a52bd567de2",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore sit excepturi suscipit libero illo ducimus, aliquam labore sed perferendis quos! Dolorem debitis a excepturi, praesentium aliquid alias cumque. Quibusdam, culpa.",
      price: price,
      images: [
        {
          url: "https://res.cloudinary.com/dlnkua4pf/image/upload/v1681544445/YelpCamp/apm9j2bky9ayush2qicr.jpg",
          filename: "YelpCamp/apm9j2bky9ayush2qicr",
        },
        {
          url: "https://res.cloudinary.com/dlnkua4pf/image/upload/v1681544445/YelpCamp/y8agbuossuqzi8dgqs8v.jpg",
          filename: "YelpCamp/y8agbuossuqzi8dgqs8v",
        },
        {
          url: "https://res.cloudinary.com/dlnkua4pf/image/upload/v1681544445/YelpCamp/y8agbuossuqzi8dgqs8v.jpg",
          filename: "YelpCamp/y8agbuossuqzi8dgqs8v",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
