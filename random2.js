// Function to extract the product ID from the URL query string
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  
  // Get the product ID from the URL query string
  const productId = getProductIdFromUrl();
  
  // Display the details of the product with the given ID
  if (productId) {
    displayProductDetails(productId);
  } else {
    console.error("Product ID not found in URL");
  }
  // Function to fetch and display the details of the product with the given ID
  function displayProductDetails(idNumber) {
    console.log(idNumber)
    console.log(typeof idNumber)
    let productId=+(idNumber)
    fetch("./db.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        console.log(data.products)
        const product = data.products.find(item => item.id === productId);
        if (product) {
          // Render the product details on the page
          document.querySelector("#product-name").textContent = product.name;
          document.querySelector("#product-price").textContent = product.price;
          document.querySelector("#product-description").textContent = product.description;
          document.querySelector("img").src=product.thumbnail
          // Clear previous images
          const imageContainer = document.querySelector(".product-images");
          imageContainer.innerHTML = '';
          
          // Loop through the images and create img elements
          product.images.forEach(imageUrl => {
            if(imageUrl) {
              const img = document.createElement("img");
              img.src = imageUrl;
              img.alt = product.name;
              imageContainer.appendChild(img);
            }
          });
        } else {
          console.error("Product not found");
        }
      })
      .catch((error) => console.error("Error:", error));
  }
  