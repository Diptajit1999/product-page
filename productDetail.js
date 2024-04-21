// Function to fetch and display the details of the product with the given ID
function displayProductDetails(idNumber) {
  let productId = +(idNumber);
  fetch("./db.json")
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then((data) => {
          const product = data.products.find(item => item.id === productId);
          if (product) {
              // Render the product details on the page
              document.querySelector("#product-name").textContent = product.name;
              document.querySelector("#product-price").textContent = product.price;
              document.querySelector("#product-description").textContent = product.description;
              document.querySelector("#product-image").src = product.thumbnail;

              // Clear previous carousel items
              const carouselInner = document.querySelector(".carousel-inner");
              carouselInner.innerHTML = '';

              // Loop through the images and create carousel items
              product.images.forEach((imageUrl, index) => {
                  if (imageUrl) {
                      const carouselItem = document.createElement("div");
                      carouselItem.classList.add("carousel-item");
                      if (index === 0) {
                          carouselItem.classList.add("active");
                      }

                      const img = document.createElement("img");
                      img.classList.add("d-block");
                      img.classList.add("w-100");
                      img.src = imageUrl;
                      img.alt = product.name;

                      carouselItem.appendChild(img);
                      carouselInner.appendChild(carouselItem);
                  }
              });

              // Activate carousel if there are multiple images
              if (product.images.length > 1) {
                  const carousel = document.querySelector("#carouselExample");
                  const carouselInstance = new bootstrap.Carousel(carousel);

                  // Previous button click event
                  const prevButton = document.querySelector(".carousel-control-prev");
                  prevButton.addEventListener("click", () => {
                      carouselInstance.prev();
                  });

                  // Next button click event
                  const nextButton = document.querySelector(".carousel-control-next");
                  nextButton.addEventListener("click", () => {
                      carouselInstance.next();
                  });
              }
          } else {
              console.error("Product not found");
          }
      })
      .catch((error) => console.error("Error:", error));
}

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