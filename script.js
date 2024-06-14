document.addEventListener('DOMContentLoaded', () => {
  const fruits = [
    { name: 'Apple', image: 'images/appleimage (1).jpg', price: 60 },
    { name: 'Banana', image: 'images/banana (1).jpg', price: 20 },
    { name: 'Ovacado', image: 'images/ovacado (1).jpg', price: 50 },
    { name: 'Grapes', image: 'images/grapes (1).jpg', price: 50 },
    { name: 'Pineapple', image: 'images/pineapple (1).jpg', price: 100 },
    { name: 'Oranges', image: 'images/Oranges (1).jpg', price: 20 },
    { name: 'Strawberry', image: 'images/strawberries (1).jpg', price: 100 },
    {name: 'Mangoes', image: 'images/mangoes (1).jpg',price: 100},
    {name: 'Pawpaw', image: 'images/pawpaw (1).jpg', price: 150},
    {name: 'Lemon', image:'images/lemon (1).jpg',price: 30},
    {name: 'Thornmelon', image: 'images/Thornmelon (1).jpg',price: 40},
    {name: 'watermelon', image: 'images/watermelon (1).jpg', price: 150},
    // Add more fruits as needed
  ];

  const vegetables = [
    { name: 'Carrot', image: 'images/Carrots (1).jpg', price: 50 },
    { name: 'Cabbage', image: 'images/cabbages (1).jpg', price: 100 },
    { name: 'Tomatoes', image: 'images/tomatoes (1).jpg', price: 50 },
    { name: 'Cucumber', image: 'images/cucumber (1).jpg', price: 60 },
    { name: 'Onions', image: 'images/onions (1).jpg', price: 40 },
    { name: 'Parsley', image: 'images/parsley (1).jpg', price: 20 },
    {name: 'Pepper', image: 'images/PEPPER (1).jpg', price: 10},
    // Add more vegetables as needed
  ];

  const itemsContainer = document.getElementById('items-container');
  const searchInput = document.getElementById('search');
  const cartContainer = document.getElementById('cart-container');
  const allButton = document.getElementById('all-button');
  const fruitsButton = document.getElementById('fruits-button');
  const vegetablesButton = document.getElementById('vegetables-button');
  const cartItems = [];
  let currentCategory = 'all';

  console.log('DOM fully loaded and parsed');

  function displayItems(items) {
    console.log('Displaying items:', items);
    itemsContainer.innerHTML = '';
    items.forEach(item => {
      const itemCard = createCard(item);
      itemsContainer.appendChild(itemCard);
    });
  }

  function filterItems(items, searchTerm) {
    console.log('Filtering items with search term:', searchTerm);
    return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  function handleSearch() {
    const searchTerm = searchInput.value;
    console.log('Handling search with term:', searchTerm);
    let filteredItems = [];
    if (currentCategory === 'all') {
      filteredItems = filterItems(fruits.concat(vegetables), searchTerm);
    } else if (currentCategory === 'fruits') {
      filteredItems = filterItems(fruits, searchTerm);
    } else if (currentCategory === 'vegetables') {
      filteredItems = filterItems(vegetables, searchTerm);
    }
    displayItems(filteredItems);
  }

  function addToCart(item, quantity) {
    console.log('Adding to cart:', item);
    const cartItem = { ...item, quantity };
    cartItems.push(cartItem);
    updateCart();
  }

  function removeFromCart(index) {
    console.log('Removing from cart, index:', index);
    cartItems.splice(index, 1);
    updateCart();
  }

  function updateCart() {
    console.log('Updating cart with items:', cartItems);
    cartContainer.innerHTML = '';

    let totalAmount = 0;
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.textContent = `${item.name} - ${item.price}/= x ${item.quantity}`;

      totalAmount += item.price * item.quantity;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        removeFromCart(index);
      });

      cartItem.appendChild(removeButton);
      cartContainer.appendChild(cartItem);
    });

    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.textContent = `Total Amount: ${totalAmount}/=`;

    cartContainer.appendChild(totalElement);
  }

  function handleCategory(category) {
    currentCategory = category;
    if (category === 'all') {
      displayItems(fruits.concat(vegetables));
    } else if (category === 'fruits') {
      displayItems(fruits);
    } else if (category === 'vegetables') {
      displayItems(vegetables);
    }
  }

  searchInput.addEventListener('input', handleSearch);
  allButton.addEventListener('click', () => handleCategory('all'));
  fruitsButton.addEventListener('click', () => handleCategory('fruits'));
  vegetablesButton.addEventListener('click', () => handleCategory('vegetables'));

  // Initial display
  displayItems(fruits.concat(vegetables));

  function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;

    const name = document.createElement('h3');
    name.textContent = item.name;

    const price = document.createElement('p');
    price.textContent = `${item.price}/=`;

    const quantityLabel = document.createElement('label');
    quantityLabel.textContent = 'Quantity:';
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = 1;
    quantityInput.min = 1;

    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Cart';
    addButton.addEventListener('click', () => {
      console.log('Button clicked for item:', item);
      const quantity = parseInt(quantityInput.value);
      addToCart(item, quantity);
    });

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(quantityLabel);
    card.appendChild(quantityInput);
    card.appendChild(addButton);

    return card;
  }
});