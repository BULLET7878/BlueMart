import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Product from "./models/Product.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const productsToSeed = [
    {
      name: "Potato 500g",
      category: "Vegetables",
      price: 25,
      offerPrice: 20,
      imageFiles: ["potato_image_1.png", "potato_image_2.png", "potato_image_3.png", "potato_image_4.png"],
      description: ["Fresh and organic", "Rich in carbohydrates", "Ideal for curries and fries"],
    },
    {
      name: "Tomato 1 kg",
      category: "Vegetables",
      price: 40,
      offerPrice: 35,
      imageFiles: ["tomato_image.png"],
      description: ["Juicy and ripe", "Rich in Vitamin C", "Perfect for salads and sauces", "Farm fresh quality"],
    },
    {
      name: "Carrot 500g",
      category: "Vegetables",
      price: 30,
      offerPrice: 28,
      imageFiles: ["carrot_image.png"],
      description: ["Sweet and crunchy", "Good for eyesight", "Ideal for juices and salads"],
    },
    {
      name: "Spinach 500g",
      category: "Vegetables",
      price: 18,
      offerPrice: 15,
      imageFiles: ["spinach_image_1.png"],
      description: ["Rich in iron", "High in vitamins", "Perfect for soups and salads"],
    },
    {
      name: "Onion 500g",
      category: "Vegetables",
      price: 22,
      offerPrice: 19,
      imageFiles: ["onion_image_1.png"],
      description: ["Fresh and pungent", "Perfect for cooking", "A kitchen staple"],
    },
    {
      name: "Apple 1 kg",
      category: "Fruits",
      price: 120,
      offerPrice: 110,
      imageFiles: ["apple_image.png"],
      description: ["Crisp and juicy", "Rich in fiber", "Boosts immunity", "Perfect for snacking and desserts"],
    },
    {
      name: "Orange 1 kg",
      category: "Fruits",
      price: 80,
      offerPrice: 75,
      imageFiles: ["orange_image.png"],
      description: ["Juicy and sweet", "Rich in Vitamin C", "Perfect for juices and salads"],
    },
    {
      name: "Banana 1 kg",
      category: "Fruits",
      price: 50,
      offerPrice: 45,
      imageFiles: ["banana_image_1.png"],
      description: ["Sweet and ripe", "High in potassium", "Great for smoothies and snacking"],
    },
    {
      name: "Mango 1 kg",
      category: "Fruits",
      price: 150,
      offerPrice: 140,
      imageFiles: ["mango_image_1.png"],
      description: ["Sweet and flavorful", "Perfect for smoothies and desserts", "Rich in Vitamin A"],
    },
    {
      name: "Grapes 500g",
      category: "Fruits",
      price: 70,
      offerPrice: 65,
      imageFiles: ["grapes_image_1.png"],
      description: ["Fresh and juicy", "Rich in antioxidants", "Perfect for snacking and fruit salads"],
    },
    {
      name: "Amul Milk 1L",
      category: "Dairy",
      price: 60,
      offerPrice: 55,
      imageFiles: ["amul_milk_image.png"],
      description: ["Pure and fresh", "Rich in calcium", "Ideal for tea, coffee, and desserts"],
    },
    {
      name: "Paneer 200g",
      category: "Dairy",
      price: 90,
      offerPrice: 85,
      imageFiles: ["paneer_image.png"],
      description: ["Soft and fresh", "Rich in protein", "Ideal for curries and snacks"],
    },
    {
      name: "Eggs 12 pcs",
      category: "Dairy",
      price: 90,
      offerPrice: 85,
      imageFiles: ["eggs_image.png"],
      description: ["Farm fresh", "Rich in protein", "Ideal for breakfast and baking"],
    },
    {
       name: "Basmati Rice 5kg",
       category: "Grains",
       price: 550,
       offerPrice: 520,
       imageFiles: ["basmati_rice_image.png"],
       description: ["Long grain and aromatic", "Perfect for biryani and pulao", "Premium quality"],
    },
    {
       name: "Wheat Flour 5kg",
       category: "Grains",
       price: 250,
       offerPrice: 230,
       imageFiles: ["wheat_flour_image.png"],
       description: ["High-quality whole wheat", "Soft and fluffy rotis", "Rich in nutrients"],
    },
    {
       name: "Brown Bread 400g",
       category: "Bakery",
       price: 40,
       offerPrice: 35,
       imageFiles: ["brown_bread_image.png"],
       description: ["Soft and healthy", "Made from whole wheat", "Ideal for breakfast and sandwiches"],
    }
];

const seedDB = async () => {
    try {
        console.log("Connecting to Database...");
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Database Connected.");

        console.log("Clearing existing products...");
        await Product.deleteMany({});

        const assetsPath = path.join(__dirname, "../client/src/assets");

        for (const p of productsToSeed) {
            console.log(`Processing product: ${p.name}`);
            const imageUrls: string[] = [];

            for (const file of p.imageFiles) {
                const filePath = path.join(assetsPath, file);
                if (fs.existsSync(filePath)) {
                    console.log(`  Uploading ${file} to Cloudinary...`);
                    const result = await cloudinary.uploader.upload(filePath, {
                        folder: "Bluemart/Products",
                    });
                    imageUrls.push(result.secure_url);
                } else {
                    console.warn(`  Warning: File ${file} not found at ${filePath}`);
                }
            }

            await Product.create({
                name: p.name,
                category: p.category,
                price: p.price,
                offerPrice: p.offerPrice,
                description: p.description,
                image: imageUrls,
                inStock: true
            });
            console.log(`  Product ${p.name} seeded successfully.`);
        }

        console.log("Seeding complete!");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
