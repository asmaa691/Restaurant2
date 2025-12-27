-- FLAMES Restaurant - React Web Application
A modern, responsive restaurant website built with React.js that showcases menu items, allows customers to browse dishes, add items to a cart, and learn about the restaurant. The application features a clean, user-friendly interface with a warm color scheme that reflects the restaurant's branding.


-- Screenshots of the UI


### Home Page

<img width="1346" height="624" alt="home" src="https://github.com/user-attachments/assets/73eb9085-e40b-4ddd-8030-97f1e4db7243" />

### Menu Page
<img width="1345" height="617" alt="menu" src="https://github.com/user-attachments/assets/ff00dffa-6e89-4b19-9383-6dd66e47ba7d" />


### Shopping Cart
<img width="1315" height="666" alt="cart" src="https://github.com/user-attachments/assets/2ee017b7-efc9-4397-a5fa-dcbaec27a77c" />


### Dish Details
<img width="1355" height="638" alt="dishDetails1" src="https://github.com/user-attachments/assets/80b3f6e2-c298-404b-9cec-87a24f09602c" />


### Mobile
<img width="506" height="596" alt="mobile png" src="https://github.com/user-attachments/assets/7aef6f9a-e4ba-4beb-9729-cb9e12c24abb" />

### About Page
<img width="1340" height="641" alt="about" src="https://github.com/user-attachments/assets/5fd3a0cb-053a-4bfc-9c43-7cafe3c7c1c2" />


### Contact Page
<img width="1348" height="637" alt="contact" src="https://github.com/user-attachments/assets/7dd6c7ed-29b7-43ee-9059-82e303af2b46" />


### Services Page
<img width="1328" height="630" alt="services" src="https://github.com/user-attachments/assets/4314c62e-4400-49d0-ab74-fd217b6a67dd" />


-- Key Features:

Interactive menu browsing with high-quality food images

Dynamic shopping cart with add/remove functionality

Individual dish detail pages

Responsive design for all devices

Professional restaurant branding and information

This project demonstrates modern React development practices including component-based architecture, state management, client-side routing, and responsive CSS design.

-- Technologies Used
Frontend: React.js, React Router DOM

Styling: Custom CSS with Flexbox/Grid

Build Tool: Create React App

Version Control: Git & GitHub

Deployment: GitHub Pages

 --Installation & Setup
Prerequisites
Node.js (v14 or higher)

npm or yarn package manager

Steps to Run Locally
  1-Clone the repository
   git clone https://github.com/[asmaa691]/Restaurant.git
   cd flames-restaurant
  2-Install dependencies
   npm install
  3-Start development server
   npm start
  4-Open your browser
   Navigate to http://localhost:3000 to view the application  

  
-- Available Scripts
npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.



-- project structure

Restaurant/
├── public/
│   └── assets/          # Image files
│       ├── pizza.jpg
│       ├── burger.jpg
│       ├── pasta.jpg
│       └── salad.jpg
├── src/
│   ├── components/      # Reusable components
│   │   ├── Nav.js      # Navigation bar
│   │   ├── Footer.js   # Footer component
│   │   ├── DishCard.js # Dish display card
│   │   └── Cart.js     # Shopping cart
│   ├── pages/          # Page components
│   │   ├── Home.js     # Landing page
│   │   ├── About.js    # About us
│   │   ├── Menu.js     # Menu with cart
│   │   ├── Dish.js     # Dish details
│   │   ├── Contact.js  # Contact info
│   │   └── Services.js # Services offered
│   ├── data/
│   │   └── dishes.js   # Menu data
│   ├── App.js          # Main app component
│   ├── index.js        # App entry point
│   └── index.css       # Global styles
└── package.json        # Dependencies
 
--Usage
 --Browse Menu
Visit the Menu page to see all available dishes

Click "View Details" for more information about any dish

Use "Add to Cart" to add items to your order

 --Manage Cart
View your cart at the bottom of the Menu page

See itemized list with prices

Remove unwanted items with the "Remove" button

Monitor your total cost in real-time

 --Learn More
Check the About page for restaurant information

Visit Contact page for location and contact details

Explore Services page for feature overview

