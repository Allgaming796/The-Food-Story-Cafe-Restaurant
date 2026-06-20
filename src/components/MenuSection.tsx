import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Flame, Sparkles, Plus, Minus, ShoppingBag, ArrowRight, HeartCrack, HelpCircle, Share2, Check, Sparkle, ChevronDown, ChevronUp } from "lucide-react";
import { MenuItem } from "../types";

export const getDishImage = (item: MenuItem): string => {
  const lowerName = item.name.toLowerCase();

  // 1. Direct matching to custom generated AI food images
  if (lowerName.includes("pav bhaji") || item.id === "bf7") {
    return "/src/assets/images/pav_bhaji_deluxe_1781831942822.jpg";
  }
  if (lowerName.includes("aloo paratha") || item.id === "bf2") {
    return "/src/assets/images/aloo_paratha_deluxe_1781831957455.jpg";
  }
  if (lowerName.includes("maggi") || lowerName.includes("noodles")) {
    return "/src/assets/images/veg_masala_maggi_1781825948836.jpg";
  }
  if (lowerName.includes("rose pasta") || lowerName.includes("pink sauce")) {
    return "/src/assets/images/rose_pasta_craft_1781825861248.jpg";
  }
  if (item.id === "bf6" || item.id === "bf1") {
    // Chhole Bhature or Poori Aloo
    return "/src/assets/images/chhole_bhature_1781825559053.jpg";
  }
  if (item.id === "app4" || item.id === "app1" || item.id === "app3") {
    // Tandoori Platter
    return "/src/assets/images/tandoori_platter_1781825576474.jpg";
  }
  if (item.id.startsWith("pz") || item.name.toLowerCase().includes("pizza")) {
    // Sourdough Pizza
    return "/src/assets/images/sourdough_pizza_1781825589371.jpg";
  }
  if (
    item.id === "mn2" || 
    item.id === "mn4" || 
    item.id === "mn3" || 
    item.name.toLowerCase().includes("paneer") || 
    item.name.toLowerCase().includes("kofta")
  ) {
    // Paneer butter masala or rich mains curry
    return "/src/assets/images/paneer_butter_masala_1781825605890.jpg";
  }
  if (
    item.id.startsWith("ds") || 
    item.name.toLowerCase().includes("waffle") || 
    item.name.toLowerCase().includes("brownie") ||
    item.name.toLowerCase().includes("halwa")
  ) {
    // Waffles, Halwa, Brownies
    return "/src/assets/images/dessert_waffle_1781825622918.jpg";
  }

  // 2. Unsplash high-resolution food photography URLs
  if (lowerName.includes("burger")) {
    return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80";
  }
  if (lowerName.includes("pasta")) {
    return "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80";
  }
  if (lowerName.includes("momos") || lowerName.includes("momo")) {
    return "https://images.unsplash.com/photo-1625220194771-7ebedd0b70b9?w=500&auto=format&fit=crop&q=80";
  }
  if (lowerName.includes("sandwich") || lowerName.includes("toast")) {
    return "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80";
  }
  if (lowerName.includes("tea") || lowerName.includes("chai")) {
    return "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80";
  }
  if (
    lowerName.includes("coffee") || 
    lowerName.includes("latte") || 
    lowerName.includes("frape") || 
    lowerName.includes("shake") ||
    lowerName.includes("smoothie")
  ) {
    return "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80";
  }
  if (
    lowerName.includes("mojito") || 
    lowerName.includes("soda") || 
    lowerName.includes("spritz") || 
    lowerName.includes("cooler") ||
    lowerName.includes("shake") ||
    lowerName.includes("mocktail")
  ) {
    return "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&auto=format&fit=crop&q=80";
  }
  if (
    lowerName.includes("dosa") || 
    lowerName.includes("uttapam") || 
    lowerName.includes("idli") ||
    lowerName.includes("vada")
  ) {
    return "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=80";
  }
  if (
    lowerName.includes("paratha") || 
    lowerName.includes("roti") || 
    lowerName.includes("naan") || 
    lowerName.includes("kulcha") ||
    lowerName.includes("bread")
  ) {
    return "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=80";
  }
  if (
    lowerName.includes("noodle") || 
    lowerName.includes("chowmein") || 
    lowerName.includes("chinese")
  ) {
    return "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80";
  }
  if (
    lowerName.includes("dal") || 
    lowerName.includes("tadka") || 
    lowerName.includes("makhani") ||
    lowerName.includes("curry") ||
    lowerName.includes("gravy")
  ) {
    return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80";
  }
  if (
    lowerName.includes("pakoda") || 
    lowerName.includes("pakora") || 
    lowerName.includes("fries") || 
    lowerName.includes("finger") || 
    lowerName.includes("tikki") || 
    lowerName.includes("samosa") ||
    lowerName.includes("rolls")
  ) {
    return "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=80";
  }

  // 3. Fallbacks based on category keys
  if (item.category === "appetizers") {
    return "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80";
  }
  if (item.category === "mains") {
    return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop&q=80";
  }
  if (item.category === "drinks") {
    return "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&auto=format&fit=crop&q=80";
  }

  return "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80";
};

export const RAW_MENU: MenuItem[] = [
  // --- BREAKFAST ---
  {
    id: "bf1",
    name: "Poori Aloo (5 pc)",
    description: "Deep-fried golden whole wheat balloon bread served with authentic spiced potato curry.",
    price: 150,
    category: "appetizers",
    tags: ["Breakfast", "Classic", "Hot Sellers"],
    spiciness: 1,
  },
  {
    id: "bf2",
    name: "Aloo Paratha",
    description: "Whole wheat griddle flatbread filled with seasoned minced potatoes, toasted in golden ghee.",
    price: 80,
    category: "appetizers",
    tags: ["Breakfast", "Classic"],
    spiciness: 1,
  },
  {
    id: "bf3",
    name: "Gobhi Paratha",
    description: "Griddle toasted soft flatbread loaded with spiced grated cauliflower mixture and aromatic herbs.",
    price: 80,
    category: "appetizers",
    tags: ["Breakfast", "Fresh Herbs"],
    spiciness: 1,
  },
  {
    id: "bf4",
    name: "Aloo Onion Paratha",
    description: "A delicious combination of spiced onions and mashed potatoes stuffed in hot toasted paratha.",
    price: 80,
    category: "appetizers",
    tags: ["Breakfast", "Vibrant Spice"],
    spiciness: 1,
  },
  {
    id: "bf5",
    name: "Paneer Paratha",
    description: "Tender flatbread stuffed with grated cottage cheese, roasted cumin, and fine green chillies.",
    price: 100,
    category: "appetizers",
    tags: ["Breakfast", "Rich Cottage Cheese", "Protein"],
    spiciness: 1,
  },
  {
    id: "bf6",
    name: "Chhole Bhature",
    description: "Iconic North Indian pair of fluffy deep-fried leavened sourdough bread and dark spiced chickpea curry.",
    price: 150,
    category: "appetizers",
    tags: ["Breakfast", "Hearty Comfort", "Legendary"],
    spiciness: 2,
  },
  {
    id: "bf7",
    name: "Pav Bhaji",
    description: "Thick mashed mixed vegetable curry slow-simmered on a flat top, served with lightly toasted butter buns.",
    price: 150,
    category: "appetizers",
    tags: ["Breakfast", "Bambaat Street Flavor"],
    spiciness: 2,
  },
  {
    id: "bf8",
    name: "Veg. Grilled Sandwich",
    description: "Perfectly crisped sandwich stuffed with crunchy mixed greens and creamy specialty dressing.",
    price: 150,
    category: "appetizers",
    tags: ["Breakfast", "Light Bite"],
    spiciness: 0,
  },
  {
    id: "bf9",
    name: "Cheese Grilled Sandwich",
    description: "Golden griddled toast featuring molten premium cheeses melted to gooey perfection.",
    price: 170,
    category: "appetizers",
    tags: ["Breakfast", "Kids Favorite"],
    spiciness: 0,
  },
  {
    id: "bf10",
    name: "Spinach Corn Sandwich",
    description: "Creamy garden-picked baby spinach folded with sweet corn kernels inside grilled multigrain slices.",
    price: 170,
    category: "appetizers",
    tags: ["Breakfast", "Healthy Choice"],
    spiciness: 0,
  },
  {
    id: "bf11",
    name: "Paneer Pakora",
    description: "Cottage cheese rectangles coated in spiced gram flour batter and golden deep-fried (Page 2).",
    price: 150,
    category: "appetizers",
    tags: ["Breakfast", "Snack Specialty"],
    spiciness: 1,
  },

  // --- SHORT EATS & MOMOS ---
  {
    id: "se1",
    name: "Aloo Tikki Burger",
    description: "Crispy fried golden potato patty topped with sliced sweet onions, tomatoes, and dynamic custom sauces.",
    price: 69,
    category: "appetizers",
    tags: ["Short Eats", "Bite-Sized"],
    spiciness: 1,
  },
  {
    id: "se2",
    name: "Classic Veg. Burger",
    description: "Wholesome vegetable garden patty layered under melting cheese slices and signature herb mayonnaise.",
    price: 79,
    category: "appetizers",
    tags: ["Short Eats", "Budget Friendly"],
    spiciness: 1,
  },
  {
    id: "se3",
    name: "Rose Pasta",
    description: "Al-dente pasta tossed beautifully in a warm, sweet-tangy mixture of creamy tomatoes and fresh cheese.",
    price: 309,
    category: "appetizers",
    tags: ["Short Eats", "Italian Fusion"],
    spiciness: 1,
  },
  {
    id: "se4",
    name: "Aglio Olio Pasta",
    description: "Healthy premium pasta drizzled in dark olive oil, minced golden garlic, red pepper shavings, and herbs.",
    price: 299,
    category: "appetizers",
    tags: ["Short Eats", "Classic Italian", "Garlic Fusion"],
    spiciness: 2,
  },
  {
    id: "se5",
    name: "Veg. Maggi",
    description: "Quick-cooked comfort noodles tossed with finely diced garden vegetables and traditional tastemaker.",
    price: 99,
    category: "appetizers",
    tags: ["Short Eats", "Comfort Food"],
    spiciness: 1,
  },
  {
    id: "se6",
    name: "Kurkure Momos",
    description: "Extra-crunchy outer coated vegetable momos fried till perfectly crisp, served with fierce schezwan dip.",
    price: 189,
    category: "appetizers",
    tags: ["Momos Series", "Highly Recommended"],
    spiciness: 2,
  },
  {
    id: "se7",
    name: "Afghani Momos",
    description: "Steamed momos dipped in a velvety marinade of thick dairy cream, white pepper, and light cashew dust.",
    price: 219,
    category: "appetizers",
    tags: ["Momos Series", "Mild & Creamy"],
    spiciness: 1,
  },
  {
    id: "se8",
    name: "Baked Momos",
    description: "Delicious freshly baked dumplings presenting golden blistered skins loaded with tender mixed vegetables.",
    price: 249,
    category: "appetizers",
    tags: ["Momos Series", "Healthier Option"],
    spiciness: 1,
  },

  // --- TANDOORI & CHINESE START ---
  {
    id: "app1",
    name: "Tandoori Aloo",
    description: "Scooped whole potatoes filled with raisins, spices, and cottage cheese, char-blistered in claypit ovens.",
    price: 225,
    category: "appetizers",
    tags: ["Tandoori Craft", "Smoky"],
    spiciness: 2,
  },
  {
    id: "app2",
    name: "Veg Seekh Kabab",
    description: "Juicy minced vegetables and greens masterfully seasoned, skewered, and coal-fired until tender.",
    price: 299,
    category: "appetizers",
    tags: ["Tandoori Craft", "Spiced Kabab"],
    spiciness: 2,
  },
  {
    id: "app3",
    name: "Paneer Tikka",
    description: "Thick hand-cut cottage cheese cubes marinated in high-spice curd batter and slow-roasted over natural coals.",
    price: 325,
    category: "appetizers",
    tags: ["Tandoori Craft", "Legendary"],
    spiciness: 2,
  },
  {
    id: "app4",
    name: "Tandoori Platter",
    description: "Our signature feast comprising Paneer Tikka, Malai Paneer Tikka, Veg Seekh Kebab, Mushroom Tikka, and Roasted Pineapple.",
    price: 549,
    category: "appetizers",
    tags: ["Tandoori Craft", "Grand Shareable"],
    spiciness: 2,
  },
  {
    id: "app5",
    name: "Honey Chilli Lotus Stem",
    description: "Crispy thin slices of lotus stem drenched in a rich sweet glaze of real honey, dark soy, and tossed sesame seeds.",
    price: 269,
    category: "appetizers",
    tags: ["Chinese Starters", "Crunchy Sweet"],
    spiciness: 2,
  },
  {
    id: "app6",
    name: "Chilli Paneer Dry",
    description: "Lightly coated cottage cheese chunks tossed on red-hot fire wok with bell peppers, onions, ginger, and soy glaze.",
    price: 319,
    category: "appetizers",
    tags: ["Chinese Starters", "Fiery Favorite"],
    spiciness: 2,
  },
  {
    id: "app7",
    name: "Dahi ke Kebab",
    description: "Delicate melt-in-mouth patties crafted from hung curd, crushed cardamoms, and green chillies, pan-sear crisped.",
    price: 275,
    category: "appetizers",
    tags: ["North Indian Start", "Soft Texture"],
    spiciness: 1,
  },

  // --- STONEFIRED PIZZAS ---
  {
    id: "pz1",
    name: "Margherita Pizza (Medium)",
    description: "Double-fermented stonefired dough crust topped with sweet plum tomato base and premium gooey mozzarella.",
    price: 249,
    category: "mains",
    tags: ["Sourdough Pizza", "Heritage Classic"],
    spiciness: 0,
  },
  {
    id: "pz2",
    name: "Paneer Makhani Pizza (Medium)",
    description: "Gourmet crust covered in creamy spiced sweet butter-gravy, chargrilled paneer cubes, and sliced bell peppers.",
    price: 299,
    category: "mains",
    tags: ["Sourdough Pizza", "Indo-Italian Fusion"],
    spiciness: 1,
  },
  {
    id: "pz3",
    name: "Farm House Pizza (Medium)",
    description: "Loaded with hand-chopped mushrooms, capsicums, red ripe tomatoes, and sweet gold corn on blistered dough.",
    price: 349,
    category: "mains",
    tags: ["Sourdough Pizza", "Veggie Treat"],
    spiciness: 1,
  },
  {
    id: "pz4",
    name: "TFS Special Pizza (Medium)",
    description: "Our signature double-baked pizza doused in premium cheeses, special hot peppers, and garden-fresh assortments.",
    price: 379,
    category: "mains",
    tags: ["Sourdough Pizza", "Feast Special"],
    spiciness: 2,
  },

  // --- NORTH INDIAN MAINS ---
  {
    id: "mn1",
    name: "Dal Makhani Handi",
    description: "Organic black lentils slow-simmered over oakwood embers for 18 hours inside clay pots, whipped with hand-churned dairy butter.",
    price: 275,
    category: "mains",
    tags: ["North Indian Mains", "Slow Cooked"],
    spiciness: 1,
  },
  {
    id: "mn2",
    name: "Paneer Butter Masala",
    description: "Soft cottage cheese chunks cooked in rich base of sweet tomatoes, cashews, and butter sauce with fenugreek leaves.",
    price: 369,
    category: "mains",
    tags: ["North Indian Mains", "Rich Gravy"],
    spiciness: 1,
  },
  {
    id: "mn3",
    name: "Cheese Tomato Butter",
    description: "Our legendary regional signature dish: melted local cheeses folded into rich buttered tomato-cashew curry.",
    price: 369,
    category: "mains",
    tags: ["North Indian Mains", "Highly Unique", "Chef Recommended"],
    spiciness: 1,
  },
  {
    id: "mn4",
    name: "Paneer Lababdar",
    description: "Decadent cottage cheese squares folded with minced paneer into a thick, highly spiced onion-tomato smooth base.",
    price: 369,
    category: "mains",
    tags: ["North Indian Mains", "Luxurious Spicy"],
    spiciness: 2,
  },
  {
    id: "mn5",
    name: "Malai Kofta",
    description: "Fried potato and cottage cheese dumplings presenting hidden dried fruit cavities, floated in silky white gravy.",
    price: 299,
    category: "mains",
    tags: ["North Indian Mains", "Sweet & Mild"],
    spiciness: 1,
  },
  {
    id: "mn6",
    name: "Chaap Rogan Josh",
    description: "Vegetarian soy chaap batons slow-braised inside deep iron handi with Kashmiri deghi chillies and whole spices.",
    price: 369,
    category: "mains",
    tags: ["North Indian Mains", "Fiery Lucknowi Spice"],
    spiciness: 3,
  },
  {
    id: "mn7",
    name: "Chilly Paneer Gravy",
    description: "Classic Indo-Chinese gravy prep: fried cottage cheese cubes simmered in spiced soy-starch broth with scallions.",
    price: 349,
    category: "mains",
    tags: ["Chinese Mains", "Wok Stirred"],
    spiciness: 2,
  },
  {
    id: "mn8",
    name: "Veg. Hakka Noodles",
    description: "Stretched wheat noodles stir-fried in high-power Asian woks with shredded green cabbages, carrots, and white pepper.",
    price: 229,
    category: "mains",
    tags: ["Chinese Mains", "All-Time Classic"],
    spiciness: 1,
  },

  // --- SIDES, RAITA, SOUTH INDIAN & COMBOS ---
  {
    id: "sd1",
    name: "Butter Tandoori Roti",
    description: "Tandoor baked organic whole-wheat flatbread garnished with local churned butter.",
    price: 30,
    category: "mains",
    tags: ["Breads", "Sides"],
    spiciness: 0,
  },
  {
    id: "sd2",
    name: "Garlic Naan",
    description: "Fragrant clay-oven leavened yeast bread loaded with chopped sharp garlic, fresh cilantro, and ghee varnish.",
    price: 75,
    category: "mains",
    tags: ["Breads", "Garlic Punch"],
    spiciness: 0,
  },
  {
    id: "sd3",
    name: "Churchur Naan",
    description: "Multi-layered extra flaky butter crisp bread crushed softly by hand for that highly addictive crunch.",
    price: 109,
    category: "mains",
    tags: ["Breads", "Highly Unique"],
    spiciness: 0,
  },
  {
    id: "sd4",
    name: "Veg. Biryani",
    description: "Dum-cooked fragrant basmati rice layered meticulously with spiced garden vegetables, saffron milk, and fried onions.",
    price: 325,
    category: "mains",
    tags: ["Rice Specials", "Smoky Aromatics"],
    spiciness: 2,
  },
  {
    id: "sd5",
    name: "Masala Dosa",
    description: "Thin golden rice crepe stuffed with mashed yellow mustard potatoes, served with tangy lentil sambhar & coconut chutney.",
    price: 195,
    category: "mains",
    tags: ["South Indian", "Crisp Crepe"],
    spiciness: 1,
  },
  {
    id: "sd6",
    name: "Special Thali",
    description: "The complete luxury spread: Dal Makhani, Paneer Main, Mix Veg, 1 Butter Naan, 1 Lachha Paratha, Plain Rice, Raita & sweet Dessert.",
    price: 349,
    category: "mains",
    tags: ["Combos Special", "Extremely Filling"],
    spiciness: 2,
  },
  {
    id: "sd7",
    name: "Chinese Thali",
    description: "Wok-cooked feast: Steamed/Fried Momos, spring rolls, Hakka noodles, fried rice, and choice of Manchurian/Chilli Paneer.",
    price: 329,
    category: "mains",
    tags: ["Combos Special", "Asian Medley"],
    spiciness: 2,
  },

  // --- DRINKS, SHAKES & COFFEE ---
  {
    id: "dr1",
    name: "Masala Tea",
    description: "Rich black CTC tea leaves boiled with fresh country milk, crushed ginger roots, cardamoms, and black peppers.",
    price: 50,
    category: "drinks",
    tags: ["Hot Beverages", "Locally Loved"],
    spiciness: 1,
  },
  {
    id: "dr2",
    name: "Hot Chocolate",
    description: "Thick velvety melted dark cocoa cream dusted with fine chocolate shavings.",
    price: 180,
    category: "drinks",
    tags: ["Hot Beverages", "Rich Dessert Sip"],
    spiciness: 0,
  },
  {
    id: "dr3",
    name: "Ferrero Rocher Shake",
    description: "Ultra rich vanilla gelato blended with hazelnut cocoa spread and whole crushed golden Ferrero chocolate shells.",
    price: 220,
    category: "drinks",
    tags: ["Beverage Shakes", "Luxury Premium"],
    spiciness: 0,
  },
  {
    id: "dr4",
    name: "Banoffee Shake",
    description: "Nostalgic sweet combination of ripe sweet bananas, dark rich caramel swirl, and thick whipped cream.",
    price: 120,
    category: "drinks",
    tags: ["Beverage Shakes", "Dessert Drink"],
    spiciness: 0,
  },
  {
    id: "dr5",
    name: "Classic Cold Coffee",
    description: "Rich frothy blend of dark roast chicory espresso, cold whole milk, and chocolate syrup borders.",
    price: 150,
    category: "drinks",
    tags: ["Cold Beverages", "Summer Special"],
    spiciness: 0,
  },
  {
    id: "dr6",
    name: "Fresh Lime Soda",
    description: "Freshly squeezed green limes muddled with sugar and salted club carbonation.",
    price: 80,
    category: "drinks",
    tags: ["Mocktails", "Light & Fizzy"],
    spiciness: 0,
  },
  {
    id: "dr7",
    name: "Black Curant Mojito",
    description: "Rich sweet blackcurrant purees shaken with crushed mint sprigs, lime wedges, and dynamic fizz.",
    price: 100,
    category: "drinks",
    tags: ["Mocktails", "Fruit Fusion"],
    spiciness: 0,
  },
  {
    id: "dr8",
    name: "Spicy Mango Mojito",
    description: "Unbelievable fusion of Alphonso mango pulp, crushed spicy green chillies, rock salt, sweet syrup, and soda.",
    price: 100,
    category: "drinks",
    tags: ["Mocktails", "Spicy Sweet Twist"],
    spiciness: 1,
  },
  {
    id: "dr9",
    name: "Cactus Mojito",
    description: "Our mystical blue-green mocktail combining botanical cactus fruit essence, mint lime, and cold tonic syrup.",
    price: 150,
    category: "drinks",
    tags: ["Mocktails", "Highly Exotic"],
    spiciness: 0,
  },

  // --- SWEETS, WAFFLES & DESSERTS ---
  {
    id: "ds1",
    name: "Blueberry Waffle (Full)",
    description: "Crispy freshly baked grid waffles smeared with tart blueberry sauce, served with cold vanilla bean scoop.",
    price: 249,
    category: "desserts",
    tags: ["Gourmet Waffles", "Warm & Crispy"],
    spiciness: 0,
  },
  {
    id: "ds2",
    name: "Nutella Waffle (Full)",
    description: "Rich dark cocoa hazelnut spread loaded onto hot golden grid waffles, topped with sweet slivered almonds.",
    price: 309,
    category: "desserts",
    tags: ["Gourmet Waffles", "Signature Sweet"],
    spiciness: 0,
  },
  {
    id: "ds3",
    name: "Gulab Jamun (2 pc)",
    description: "Spongy cardamom deep-fried cheese balls steeped inside rosewater clarified sugar syrup.",
    price: 50,
    category: "desserts",
    tags: ["Mouth Watering Desserts", "Classic Sweets"],
    spiciness: 0,
  },
  {
    id: "ds4",
    name: "Rasmalai",
    description: "Creamy squeezed cheese disc cakes soaked inside highly reduced cardamom saffron dairy milk bath.",
    price: 60,
    category: "desserts",
    tags: ["Mouth Watering Desserts", "Indian Heritage"],
    spiciness: 0,
  },
  {
    id: "ds5",
    name: "Moong Dal Halwa",
    description: "Rich dessert paste crafted from skinless yellow lentils, heavy milk sweets, roasted cashew-nuts, and warm pure ghee.",
    price: 80,
    category: "desserts",
    tags: ["Mouth Watering Desserts", "Warm Indian Halwa"],
    spiciness: 0,
  },
  {
    id: "ds6",
    name: "Brownie Sizzler",
    description: "Warm molten chocolate fudge walnut brownie placed on a piping hot cast-iron platter, finished with cold vanilla bean ice cream.",
    price: 149,
    category: "desserts",
    tags: ["Sweets Hub", "Showstopper Sizzles"],
    spiciness: 1,
  },
];

interface MenuSectionProps {}

export function MenuSection({}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "appetizers" | "mains" | "drinks" | "desserts">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ [id: string]: number }>({});

  // Match My Craving filter states
  const [cravingSpice, setCravingSpice] = useState<"any" | "mild" | "fiery">("any");
  const [cravingDiet, setCravingDiet] = useState<"any" | "dairy-free" | "sattvic" | "dessert">("any");

  const [visibleLimit, setVisibleLimit] = useState(4);

  // Toggle state to control image presence and compact sizing
  const [menuImageView, setMenuImageView] = useState<"none" | "thumbnail" >(() => {
    const saved = localStorage.getItem("tfs_menu_image_view");
    return (saved === "thumbnail" ? "thumbnail" : "none") as "none" | "thumbnail";
  });

  const changeMenuImageView = (view: "none" | "thumbnail") => {
    setMenuImageView(view);
    localStorage.setItem("tfs_menu_image_view", view);
  };

  // Automatically reset visible limit when filters or searches change
  useEffect(() => {
    setVisibleLimit(4);
  }, [selectedCategory, searchQuery, cravingSpice, cravingDiet]);

  const filteredItems = useMemo(() => {
    return RAW_MENU.filter((item) => {
      // Standard category matching
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      
      // Text Search matching
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Spice Craving Filter
      let matchSpice = true;
      if (cravingSpice === "mild") matchSpice = item.spiciness <= 1;
      if (cravingSpice === "fiery") matchSpice = item.spiciness >= 2;

      // Diet Craving Filter
      let matchDiet = true;
      if (cravingDiet === "dairy-free") {
        matchDiet = !item.tags.some((t) => t.toLowerCase() === "dairy");
      }
      if (cravingDiet === "sattvic") {
        // Mocking sattvic preferences for sweet items or slow cooked non-garlic
        matchDiet = item.category === "desserts" || item.category === "drinks" || item.id === "m5" || item.id === "m2";
      }
      if (cravingDiet === "dessert") {
        matchDiet = item.category === "desserts" || item.tags.some((t) => t.toLowerCase().includes("drink") || t.toLowerCase().includes("sweet"));
      }

      return matchCategory && matchSearch && matchSpice && matchDiet;
    });
  }, [selectedCategory, searchQuery, cravingSpice, cravingDiet]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleLimit);
  }, [filteredItems, visibleLimit]);

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const cartList = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const menuObj = RAW_MENU.find((it) => it.id === id)!;
      return { item: menuObj, quantity: qty };
    });
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cartList.reduce((acc, current) => acc + current.item.price * current.quantity, 0);
  }, [cartList]);

  const clearCart = () => setCart({});

  // NEW FEATURE: WhatsApp Platter Quoter
  const handleShareOnWhatsApp = () => {
    if (cartList.length === 0) return;
    const itemsText = cartList
      .map((c) => `• *${c.quantity}* × ${c.item.name} (₹${c.item.price} each)`)
      .join("\n");
    const textMsg = `Hello! I have created a custom events catering platter estimate at *The Food Story Café & Restaurant* on your portal:\n\n${itemsText}\n\n*Total Combined Estimated Budget:* ₹${cartTotal}\n\nCan you please check availability and pricing options for our upcoming celebration?`;
    const encryptedMsg = encodeURIComponent(textMsg);
    window.open(`https://wa.me/917752817300?text=${encryptedMsg}`, "_blank");
  };

  const resetCravingFilters = () => {
    setCravingSpice("any");
    setCravingDiet("any");
  };

  const hasActiveCravingFilters = cravingSpice !== "any" || cravingDiet !== "any";

  return (
    <section className="py-16 bg-ivory-brand px-4 sm:px-6 lg:px-8 border-b border-ivory-dark font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header with rich colored background */}
        <div className="text-center space-y-3 max-w-3xl mx-auto bg-emerald-brand text-slate-white border border-gold-brand/45 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle background spice design flourish */}
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gold-brand/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-terra-brand/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-center items-center gap-1.5 text-gold-brand text-xs font-semibold tracking-widest uppercase font-mono relative z-10">
            <Sparkles className="w-4 h-4 text-gold-brand animate-pulse shrink-0" />
            <span className="text-sm">Pure Vegetarian Masterpieces</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-gold-brand font-bold relative z-10">
            Chapters of Our Culinary Story
          </h2>
          <p className="text-gray-200 text-sm sm:text-base font-light font-sans leading-relaxed max-w-2xl mx-auto relative z-10">
            Every creation is hand-rolled and infused with freshly dry-roasted local Lucknowi spices. Explore our premium selection or assemble a custom dining platter below.
          </p>
        </div>

        {/* NEW FEATURE: "Match My Craving" recommendation engine */}
        <div className="bg-white rounded-2xl border border-ivory-dark p-6 shadow-sm overflow-hidden text-left relative">
          <div className="absolute right-4 top-4 opacity-5 pointer-events-none select-none">
            <HelpCircle className="w-24 h-24 text-emerald-brand" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ivory-dark pb-4 mb-4">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-emerald-brand flex items-center gap-1.5">
                <Sparkle className="w-4 h-4 text-gold-brand fill-gold-brand shrink-0" />
                <span>Simple Taste & Ingredient Filter</span>
              </h3>
              <p className="text-xs text-charcoal-mid">
                Select your preferences to quickly filter matching dishes.
              </p>
            </div>
            {hasActiveCravingFilters && (
              <button
                onClick={resetCravingFilters}
                className="text-xs text-[#C85C3A] hover:underline font-mono uppercase font-bold shrink-0 self-start sm:self-center"
              >
                Reset filters ×
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spice tolerance buttons */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold tracking-wider font-mono text-charcoal-mid">
                Spice Level
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCravingSpice("any")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition ${
                    cravingSpice === "any"
                      ? "bg-emerald-brand text-white"
                      : "bg-ivory-brand hover:bg-ivory-dark text-emerald-brand"
                  }`}
                >
                  Any Spice level
                </button>
                <button
                  onClick={() => setCravingSpice("mild")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition flex items-center gap-1 ${
                    cravingSpice === "mild"
                      ? "bg-emerald-brand text-white shadow-sm"
                      : "bg-ivory-brand hover:bg-ivory-dark text-emerald-brand"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-gold-brand shrink-0" />
                  <span>Mild Spice / Less Spicy</span>
                </button>
                <button
                  onClick={() => setCravingSpice("fiery")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition flex items-center gap-1 ${
                    cravingSpice === "fiery"
                      ? "bg-emerald-brand text-white shadow-sm"
                      : "bg-ivory-brand hover:bg-ivory-dark text-emerald-brand"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#C85C3A] fill-[#C85C3A] shrink-0" />
                  <span>Spicy / Hot Dishes</span>
                </button>
              </div>
            </div>

            {/* Culinary preferences */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold tracking-wider font-mono text-charcoal-mid">
                Dietary & Taste Preferences
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCravingDiet("any")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition ${
                    cravingDiet === "any"
                      ? "bg-emerald-brand text-white"
                      : "bg-ivory-brand hover:bg-ivory-dark text-emerald-brand"
                  }`}
                >
                  All Flavor profiles
                </button>
                <button
                  onClick={() => setCravingDiet("sattvic")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition flex items-center gap-1 ${
                    cravingDiet === "sattvic"
                      ? "bg-emerald-brand text-white"
                      : "bg-ivory-brand hover:bg-ivory-dark text-emerald-brand"
                  }`}
                >
                  <span>Sattvic Option (No Onion/Garlic)</span>
                </button>
                <button
                  onClick={() => setCravingDiet("dairy-free")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition ${
                    cravingDiet === "dairy-free"
                      ? "bg-emerald-brand text-white"
                      : "bg-ivory-brand hover:bg-ivory-dark text-emerald-brand"
                  }`}
                >
                  Less Additives
                </button>
                <button
                  onClick={() => setCravingDiet("dessert")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition ${
                    cravingDiet === "dessert"
                      ? "bg-emerald-brand text-white"
                      : "bg-ivory-brand hover:bg-ivory-dark text-emerald-brand"
                  }`}
                >
                  Mouth Watering Desserts & Shakes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Filter and Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Categories Tab selector */}
          <div className="md:col-span-8 flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 justify-start">
            {(["all", "appetizers", "mains", "drinks", "desserts"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold font-mono tracking-wider uppercase transition cursor-pointer border transition-all ${
                  selectedCategory === cat
                    ? "bg-gold-brand text-emerald-brand border-gold-brand shadow-sm font-bold"
                    : "bg-white hover:bg-ivory-dark text-charcoal-dark border-ivory-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Real-time search field */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-brand" />
            <input
              type="text"
              placeholder="Search dishes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-gold-brand text-sm bg-white text-charcoal-dark placeholder-charcoal-mid"
            />
          </div>
        </div>

        {/* View Mode controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-ivory-dark rounded-2xl p-4 gap-4" id="image-toggle-bar">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-brand animate-pulse" />
            <p className="text-xs text-charcoal-mid font-medium font-sans">
              Showing <span className="font-bold text-emerald-brand">{filteredItems.length}</span> delicious dishes from our menu
            </p>
          </div>
          <div className="flex items-center gap-2 bg-ivory-brand border border-ivory-dark/65 rounded-xl p-1 shrink-0">
            <button
              onClick={() => changeMenuImageView("none")}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition duration-200 cursor-pointer flex items-center gap-1.5 ${
                menuImageView === "none"
                  ? "bg-emerald-brand text-white shadow-xs"
                  : "text-charcoal-mid hover:text-emerald-brand"
              }`}
            >
              <span>🚫 Text Only</span>
            </button>
            <button
              onClick={() => changeMenuImageView("thumbnail")}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition duration-200 cursor-pointer flex items-center gap-1.5 ${
                menuImageView === "thumbnail"
                  ? "bg-emerald-brand text-white shadow-xs"
                  : "text-charcoal-mid hover:text-emerald-brand"
              }`}
            >
              <span>🖼️ Compact Images</span>
            </button>
          </div>
        </div>

        {/* Main Menu Grid / Split Layout with Interactive Platter Cart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Delicacy Cards Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item) => {
                  const quantityInPlatter = cart[item.id] || 0;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={item.id}
                      className="group relative bg-white rounded-3xl border border-ivory-dark/90 hover:border-gold-brand/60 overflow-hidden transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                    >
                      {/* Card Content block */}
                      <div className="p-5 flex flex-col justify-between flex-grow">
                        <div className="space-y-3">
                          <div className="flex gap-4 items-start justify-between">
                            <div className="space-y-1.5 flex-1">
                              {/* Corner Tag inline category bubble */}
                              {item.tags && item.tags[0] && (
                                <span className="inline-block bg-emerald-brand/5 text-[9px] font-mono font-bold px-2 py-0.5 rounded text-emerald-brand border border-emerald-brand/10 mb-1">
                                  {item.tags[0]}
                                </span>
                              )}
                              
                              {/* Name & Spiciness indicators */}
                              <div className="space-y-1 font-sans">
                                <h4 className="font-serif text-base font-bold text-emerald-brand pr-2 group-hover:text-gold-brand transition leading-tight">
                                  {item.name}
                                </h4>
                                
                                {item.spiciness !== undefined && item.spiciness > 0 && (
                                  <div className="flex items-center text-[#C85C3A] gap-0.5 animate-pulse">
                                    {Array.from({ length: item.spiciness }).map((_, i) => (
                                      <Flame key={i} className="w-3 h-3 fill-[#C85C3A] text-[#C85C3A]" />
                                    ))}
                                    <span className="text-[9px] font-mono text-charcoal-mid ml-1">Spicy</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Compact Small image on the right which can be styled and toggled */}
                            {menuImageView === "thumbnail" && (
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-ivory-brand border border-ivory-dark/60 shrink-0 shadow-2xs">
                                <img
                                  src={getDishImage(item)}
                                  alt={item.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                              </div>
                            )}
                          </div>

                          {/* Brief description */}
                          <p className="text-charcoal-mid text-xs leading-relaxed font-light font-sans min-h-[34px] line-clamp-2">
                            {item.description}
                          </p>

                          {/* Dietary specifics tags */}
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(1).map((tag, idx) => (
                              <span key={idx} className="bg-ivory-brand text-emerald-brand text-[9px] font-mono px-2 py-0.5 rounded border border-ivory-dark/40">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* bottom pricing & interactivity */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-ivory-dark/50">
                          <span className="font-mono text-sm font-bold text-emerald-brand bg-emerald-brand/5 px-2 py-1 rounded-lg border border-emerald-brand/15">
                            ₹{item.price}
                          </span>

                          {/* Add button with animation toggle states */}
                          <div className="flex items-center gap-2 bg-ivory-brand border border-ivory-dark/80 rounded-lg p-0.5">
                            {quantityInPlatter > 0 ? (
                              <>
                                <button
                                  onClick={() => updateCartQuantity(item.id, -1)}
                                  className="w-6 h-6 flex items-center justify-center rounded text-emerald-brand hover:bg-ivory-dark active:scale-90 transition cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs text-emerald-brand font-bold px-1.5">
                                  {quantityInPlatter}
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded bg-emerald-brand text-gold-brand hover:bg-emerald-mid active:scale-90 transition cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="flex items-center justify-center gap-1 px-3 py-1 text-[11px] font-bold text-emerald-brand hover:bg-emerald-brand hover:text-gold-brand rounded transition cursor-pointer font-sans"
                              >
                                <Plus className="w-3.5 h-3.5 font-bold" />
                                <span>Add Platter</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {filteredItems.length === 0 && (
                <div className="col-span-full py-12 text-center text-charcoal-mid space-y-2 bg-white rounded-2xl border border-ivory-dark">
                  <HeartCrack className="w-8 h-8 mx-auto text-[#C85C3A]/60" />
                  <p className="text-sm font-light">No items match your selected filters or categories.</p>
                  <button
                    onClick={resetCravingFilters}
                    className="text-xs text-gold-brand font-bold uppercase tracking-wider font-mono hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* See More button / load count toggle */}
            {filteredItems.length > 4 && (
              <div className="flex flex-col items-center justify-center gap-2 pt-2">
                {visibleLimit < filteredItems.length ? (
                  <button
                    onClick={() => setVisibleLimit(filteredItems.length)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-brand hover:bg-emerald-mid text-white rounded-xl text-xs font-bold uppercase tracking-wide transition active:scale-95 cursor-pointer font-sans shadow-sm"
                  >
                    <ChevronDown className="w-4 h-4 text-gold-brand shrink-0" />
                    <span>See More ({filteredItems.length - 4} more dishes)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setVisibleLimit(4)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-ivory-dark text-emerald-brand hover:bg-ivory-brand rounded-xl text-xs font-bold uppercase tracking-wide transition active:scale-95 cursor-pointer font-sans shadow-sm"
                  >
                    <ChevronUp className="w-4 h-4 text-gold-brand shrink-0" />
                    <span>See Less</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Interactive Plate Panel (Cart) */}
          <div className="lg:col-span-4 sticky top-24 bg-emerald-brand rounded-2xl border border-emerald-mid p-6 text-white shadow-xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-emerald-mid pb-3">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-gold-brand" />
                <h3 className="font-serif text-lg font-bold text-white">
                  My Custom Platter
                </h3>
              </div>
              {cartList.length > 0 && (
                <button
                  onClick={clearCart}
                  className="font-mono text-[10px] text-gray-300 hover:text-gold-light transition cursor-pointer uppercase font-bold"
                >
                  Clear All
                </button>
              )}
            </div>

            {cartList.length === 0 ? (
              <div className="py-12 text-center space-y-3 font-sans">
                <div className="w-12 h-12 rounded-full bg-emerald-mid flex items-center justify-center text-lg mx-auto border border-emerald-light/40">
                  🌿
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white font-bold">Your platter card is empty.</p>
                  <p className="text-[11px] text-gray-300 max-w-[200px] mx-auto leading-relaxed">
                    Choose and add delicious vegetarian items to customize your event catering budget or dine-in planner!
                  </p>
                </div>
              </div>
            ) : (
              /* Loaded Cart List scrollbar */
              <div className="space-y-4">
                <div className="max-h-[260px] overflow-y-auto space-y-3 pr-1.5 scrollbar-thin">
                  {cartList.map(({ item, quantity }) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={item.id}
                      className="flex items-center justify-between gap-3 text-sm bg-emerald-mid p-2.5 rounded-xl border border-emerald-light/30 text-white"
                    >
                      <div className="flex-grow min-w-0 font-sans">
                        <p className="font-bold text-white truncate text-xs">{item.name}</p>
                        <p className="text-[10px] text-gold-light font-mono font-semibold">
                          ₹{item.price} × {quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-brand rounded-md border border-emerald-mid p-0.5 shrink-0">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-gray-300 hover:text-white rounded transition cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-white px-0.5">{quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-gray-300 hover:text-white rounded transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Subtotal summary counts */}
                <div className="bg-emerald-mid p-4 rounded-xl border border-emerald-light/30 space-y-2 font-sans">
                  <div className="flex justify-between text-xs text-gray-200">
                    <span>Items Selected:</span>
                    <span className="font-mono text-gold-light font-bold">
                      {cartList.reduce((sum, e) => sum + e.quantity, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium border-t border-emerald-brand pt-2">
                    <span className="text-gray-100">Catering Estimate:</span>
                    <span className="font-mono text-gold-brand text-base font-bold">
                      ₹{cartTotal}
                    </span>
                  </div>
                </div>

                {/* Combined action rows (Send on WhatsApp) */}
                <div className="space-y-2">
                  <button
                    onClick={handleShareOnWhatsApp}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white transition duration-300 py-3.5 rounded-xl font-bold text-xs select-none cursor-pointer uppercase tracking-wider shadow-md shadow-green-600/10"
                  >
                    <Share2 className="w-4 h-4 shrink-0" />
                    <span>Send Platter to WhatsApp</span>
                  </button>
                </div>
                
                <p className="text-[9.5px] text-gray-300 text-center leading-relaxed font-mono">
                  Share this custom platter combination instantly with our kitchen to confirm details, spice preferences, or customize your dining table!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
