import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Loan" },
  { href: "/farmer-consumer", label: "Farmer-Consumer" },
  { href: "/price", label: "Store" },
  { href: "/testimonials", label: "Ask me" },
  { label: 'About', href: '/about' },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Simple Application Interface",
    description:
      "Easily submit and manage your loan inquiries with a user-friendly interface.",
  },
  {
    icon: <Fingerprint />,
    text: "Multi-Platform Access",
    description:
      "Check and apply for loans seamlessly across mobile, desktop, and tablet platforms.",
  },
  {
    icon: <ShieldHalf />,
    text: "Pre-Designed Loan Templates",
    description:
      "Get started quickly with built-in templates tailored for various loan types.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Status Updates",
    description:
      "Track your loan application status in real-time, allowing for quick decisions and adjustments.",
  },
  {
    icon: <PlugZap />,
    text: "Collaborative Review Tools",
    description:
      "Work together with financial advisors or co-applicants in real-time to ensure a smooth application process.",
  },
  {
    icon: <GlobeLock />,
    text: "Insights Dashboard",
    description:
      "Gain valuable insights into loan options, rates, and repayment plans through an integrated analytics dashboard.",
  },
];

export const checklistItems = [
  {
    title: "Simplify Product Listings",
    description:
      "Farmers can easily list their products, making it simple for consumers to discover fresh, local produce.",
  },
  {
    title: "Streamlined Order Processing",
    description:
      "Effortlessly manage orders, ensuring a smooth transaction between farmers and consumers.",
  },
  {
    title: "Real-Time Sales Tracking",
    description:
      "Monitor product performance and sales in real-time to make informed decisions and meet consumer demand.",
  },
  {
    title: "Hassle-Free Communication",
    description:
      "Enable direct communication between farmers and consumers to answer questions and build trust.",
  },
];

export const pricingOptions = [
  {
    title: "Rice Seeds",
    price: "₹200",
    features: [
      "High-quality rice seeds for sale",
      "Improve crop yield with our seeds",
      "Drought-tolerant rice seeds available",
      "Pure and certified rice seeds guaranteed",
    ],
  },
  {
    title: "Sickle",
    price: "₹800",
    features: [
      "High-carbon sickles for harvesting ease",
      "Durable sickles for rice and wheat",
      "Ergonomic sickle handles for comfort",
      "Sharp sickle blades for efficient cutting",
    ],
  },
  {
    title: "Shovel",
    price: "₹1500",
    features: [
      "Sturdy shovels for digging and planting",
      "Durable shovels for heavy-duty use",
      "Ergonomic shovel handles for reduced strain",
      "Sharp shovel edges for easy soil penetration",
    ],
  },
  {
    title: "Organic Fertilizer",
    price: "₹2000",
    features: [
      "100% organic fertilizer for healthy crops",
      "Boosts soil fertility naturally",
      "Safe for vegetables and grains",
      "Sourced sustainably for eco-friendly farming",
    ],
  },
  {
    title: "Drip Irrigation Kit",
    price: "₹5000",
    features: [
      "Efficient water-saving irrigation solution",
      "Ideal for small and large farms",
      "Reduces water wastage by 70%",
      "Easy installation and maintenance",
    ],
  },
  {
    title: "Compost Bin",
    price: "₹1200",
    features: [
      "Eco-friendly compost bin for organic waste",
      "Converts kitchen waste into fertilizer",
      "Ideal for small-scale farming",
      "Compact and easy to use",
    ],
  },
];


export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];

export const loans = [
  {
    name: "Kisan Credit Card Loan",
    description: "Short-term credit from SBI to meet the farmer's working capital needs.",
    link: "https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card"
  },
  {
    name: "Agriculture Gold Loan",
    description: "Loan from Union Bank secured by gold, specifically for agricultural purposes.",
    link: "https://www.unionbankofindia.co.in/english/agriculture-loan.aspx"
  },
  {
    name: "Farm Mechanization Loan",
    description: "HDFC loan for purchasing tractors and other farm machinery.",
    link: "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan"
  },
  {
    name: "Crop Loan",
    description: "ICICI Bank's loan for meeting crop production expenses.",
    link: "https://www.icicibank.com/rural/loans/farmer-finance"
  },
  {
    name: "Warehouse Receipt Loan",
    description: "Punjab National Bank loan against warehouse receipts for post-harvest storage.",
    link: "https://www.pnbindia.in/agriculture-credit-schemes.html"
  },
  {
    name: "Dairy Entrepreneurship Development Loan",
    description: "NABARD-supported loan for dairy farming, including cattle purchase.",
    link: "https://www.nabard.org/content1.aspx?id=23&catid=23&mid=423"
  },
  {
    name: "Solar Pump Loan",
    description: "Bank of Baroda loan for installing solar-powered irrigation pumps.",
    link: "https://www.bankofbaroda.in/agriculture-loan/solar-pump-loan"
  },
  {
    name: "Horticulture Loan",
    description: "Canara Bank loan for horticultural activities like fruit and vegetable cultivation.",
    link: "https://www.canarabank.com/english/bank-services/agriculture/"
  },
  {
    name: "Organic Farming Loan",
    description: "Axis Bank loan supporting organic farming initiatives and costs.",
    link: "https://www.axisbank.com/agriculture/agriculture-loans"
  },
  {
    name: "Greenhouse Construction Loan",
    description: "Loan from Central Bank of India for constructing greenhouses and polyhouses.",
    link: "https://www.centralbankofindia.co.in/en/agriculture-loans"
  },
  {
    name: "Agri Infrastructure Loan",
    description: "Federal Bank loan for setting up cold storage, warehouses, and other agri-infrastructure.",
    link: "https://www.federalbank.co.in/agriculture-banking"
  },
  {
    name: "Agri Clinic and Agri Business Centre Loan",
    description: "Indian Bank loan for agri-clinic and agri-business center initiatives by entrepreneurs.",
    link: "https://www.indianbank.in/agriculture-loans/"
  },
  {
    name: "Fisheries Loan",
    description: "Yes Bank loan for fishery development, including equipment and feed purchases.",
    link: "https://www.yesbank.in/business-banking/loans/agribusiness-loans"
  },
  {
    name: "Vermi-Compost Loan",
    description: "Bank of India loan for setting up vermi-compost facilities for organic waste management.",
    link: "https://www.bankofindia.co.in/english/agriculture-loans.aspx"
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Crop insurance scheme under PMFBY to secure farmers' income against yield losses.",
    link: "https://pmfby.gov.in/"
  },
  {
    name: "Farming Equipment Loan",
    description: "Kotak Mahindra Bank loan to finance farming equipment like seeders and plows.",
    link: "https://www.kotak.com/en/home/loans/farming-equipment-loan.html"
  },
  {
    name: "Poultry Farming Loan",
    description: "Union Bank of India loan for starting or expanding poultry farming operations.",
    link: "https://www.unionbankofindia.co.in/english/agriculture-loan.aspx"
  },
  {
    name: "Agri Business Loan",
    description: "Bank of Maharashtra loan for agri-businesses such as food processing and supply chains.",
    link: "https://bankofmaharashtra.in/agri-business-loan"
  },
  {
    name: "Livestock Loan",
    description: "Indian Overseas Bank loan for purchasing livestock and managing animal husbandry.",
    link: "https://www.iob.in/Agri-Loans"
  },
  {
    name: "Irrigation Loan",
    description: "State Bank of India loan for improving irrigation systems and techniques.",
    link: "https://www.sbi.co.in/web/agri-rural/irrigation-loan"
  },
  {
    name: "Fish Farming Loan",
    description: "Punjab National Bank loan to support fish farming initiatives and setup costs.",
    link: "https://www.pnbindia.in/fish-farming-loan.html"
  },
  // New loan options
  {
    name: "Mushroom Cultivation Loan",
    description: "Bank of Maharashtra loan for financing mushroom farming activities.",
    link: "https://bankofmaharashtra.in/mushroom-cultivation-loan"
  },
  {
    name: "Floriculture Loan",
    description: "SBI loan for financing flower cultivation and marketing.",
    link: "https://www.sbi.co.in/web/agri-rural/floriculture-loan"
  },
  {
    name: "Rainfed Area Development Loan",
    description: "NABARD scheme for promoting agriculture in rainfed areas.",
    link: "https://www.nabard.org/content1.aspx?id=20&mid=486"
  },
  {
    name: "Agricultural Infrastructure Fund Loan",
    description: "Loan from NABARD for creating post-harvest and marketing infrastructure.",
    link: "https://www.nabard.org/content1.aspx?id=19&mid=481"
  },
  {
    name: "Post Harvest Technology Loan",
    description: "HDFC Bank loan to promote post-harvest technology and preservation.",
    link: "https://www.hdfcbank.com/personal/borrow/popular-loans/agriculture-loans"
  },
  {
    name: "Aquaculture Loan",
    description: "ICICI Bank loan for financing aquaculture projects.",
    link: "https://www.icicibank.com/rural/aquaculture-loan.page"
  }
];

export const listItems = [
  {
      title: "Quality Assurance",
      description: "All products are sourced from certified organic farms."
  },
  {
      title: "Fresh Delivery",
      description: "Receive your products directly from farmers within hours of harvest."
  },
  {
      title: "Fair Pricing",
      description: "We ensure fair prices for both farmers and consumers."
  },
  {
      title: "Support Local Farmers",
      description: "Every purchase supports local agricultural communities."
  },
  {
      title: "Healthy Choices",
      description: "Choose from a variety of chemical-free, healthy products."
  },
];

export const products = [
  {
    name: "Organic Tomatoes",
    description: "Freshly picked organic tomatoes from our farm.",
    image: "src/assets/items/tomato.jpg",
    price: "₹200.00",
    farmerName: "Ravi Sharma",
    contact: "9876543210",
    area: "Madhya Pradesh",
    rating: 4.8,
    link: "https://example.com/tomatoes",
  },
  {
    name: "Farm Fresh Eggs",
    description: "Organic, free-range eggs from happy hens.",
    image: "src/assets/items/eggs.jpg",
    price: "₹250.00",
    farmerName: "Anjali Verma",
    contact: "9123456789",
    area: "Punjab",
    rating: 4.5,
    link: "https://example.com/eggs",
  },
  {
    name: "Herbal Spinach",
    description: "Chemical-free, fresh spinach harvested today.",
    image: "src/assets/items/spinach.jpg",
    price: "₹150.00",
    farmerName: "Priya Iyer",
    contact: "9988776655",
    area: "Karnataka",
    rating: 4.7,
    link: "https://example.com/spinach",
  },
  {
    name: "Organic Carrots",
    description: "Crunchy, sweet organic carrots straight from the field.",
    image: "src/assets/items/carrot.jpg",
    price: "₹180.00",
    farmerName: "Rahul Gupta",
    contact: "9765432109",
    area: "Himachal Pradesh",
    rating: 4.6,
    link: "https://example.com/carrots",
  },
  {
    name: "Fresh Strawberries",
    description: "Juicy, ripe strawberries perfect for snacking.",
    image: "src/assets/items/straw.jpg",
    price: "₹300.00",
    farmerName: "Sneha Reddy",
    contact: "9543216780",
    area: "Maharashtra",
    rating: 4.9,
    link: "https://example.com/strawberries",
  },
  {
    name: "Cucumber",
    description: "Crisp, refreshing cucumbers great for salads.",
    image: "src/assets/items/cucumber.jpeg",
    price: "₹120.00",
    farmerName: "Vikram Singh",
    contact: "9871234560",
    area: "Uttar Pradesh",
    rating: 4.4,
    link: "https://example.com/cucumbers",
  },
  {
    name: "Bell Peppers",
    description: "Vibrant bell peppers rich in vitamins and flavor.",
    image: "src/assets/items/bell.jpg",
    price: "₹200.00",
    farmerName: "Nisha Patel",
    contact: "9234567890",
    area: "Gujarat",
    rating: 4.3,
    link: "https://example.com/bellpeppers",
  },
  {
    name: "Fresh Basil",
    description: "Aromatic fresh basil, perfect for cooking.",
    image: "src/assets/items/basil.jpg",
    price: "₹80.00",
    farmerName: "Aarav Joshi",
    contact: "9123456781",
    area: "Tamil Nadu",
    rating: 4.8,
    link: "https://example.com/basil",
  },
  {
    name: "Organic Potatoes",
    description: "Earthy, wholesome organic potatoes from local farms.",
    image: "src/assets/items/potato.jpg",
    price: "₹90.00",
    farmerName: "Pooja Mehta",
    contact: "9876543211",
    area: "Bihar",
    rating: 4.7,
    link: "https://example.com/potatoes",
  },
];


export const practices = [
  {
    icon: "🌱",
    title: "Precision Agriculture",
    description: "Using data and technology to optimize farming practices and boost yield.",
    benefits: "Reduces waste, conserves water, and enhances crop quality.",
    link: "https://example.com/precision-agriculture"
  },
  {
    icon: "🚜",
    title: "No-Till Farming",
    description: "Avoids soil disruption, conserving soil moisture and reducing erosion.",
    benefits: "Improves soil health and increases organic matter.",
    link: "https://example.com/no-till-farming"
  },
  {
    icon: "🌾",
    title: "Cover Cropping",
    description: "Planting specific crops to cover the soil rather than for harvesting.",
    benefits: "Reduces soil erosion, improves fertility, and increases biodiversity.",
    link: "https://example.com/cover-cropping"
  }
];
