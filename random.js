
  
//   function viewProductDetails(productId) {
//     window.location.href = `productDetail.html?id=${productId}`; // Navigate to product.html with product ID as query parameter
//   }

  

// // Retrieve the product ID from the URL query parameters
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get('id');

// // Fetch product details based on the product ID
// fetch(`./getProductDetails?id=${productId}`)
//   .then(response => response.json())
//   .then(product => {
//     // Display product details on the page
//     const productDetailsElement = document.getElementById('productDetails');
//     productDetailsElement.innerHTML = `
//       <p class="name">${product.name}</p>
//       <p class="price">${product.price}</p>
//       <p class="description">${product.description}</p>
//       <img src="${product.thumbnail}" alt="${product.name}">
//       <div class="images">
//         ${product.images.map(image => image ? `<img src="${image}" alt="${product.name}">` : '').join('')}
//       </div>
//     `;
//   })
//   .catch(error => console.error("Error:", error));



// fetch("./db.json")
//   .then(response => 
//     {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   }
// )
//   .then(data => {
//     console.log(data)
//     let output = "";
//     for (let item of data.products) {
//       output += `
//             <div class="products">
//               <p class="name">${item.name}</p>
//               <p class="price">${item.price}</p>
//               <p class="description">${item.description}</p>
//               <img src="${item.thumbnail}" alt="${item.name}">
//               <div class="images">
//                 ${item.images.map(image => image ? `<img src="${image}" alt="${item.name}">` : '').join('')}
//               </div>
//               <button onclick="viewProductDetails('{{ item.id }}')">View Details</button>
//             </div>
//             `;
//     }
//     document.querySelector("#products").innerHTML = output;
//   })
//   .catch(error => console.error("Error:", error));


// function viewProductDetails(productId) {
//     window.location.href = `productDetail.html?id=${productId}`; // Navigate to productDetail.html with product ID as query parameter
//   }



fetch("./db.json")
  .then(response => {
    console.log(response)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    let output = "";
    for (let item of data.products) {
      output += `
        <div class="product">
          <p class="name">${item.name}</p>
          <p class="price">${item.price}</p>
          <p class="description">${item.description}</p>
          <img src="${item.thumbnail}" alt="${item.name}">
          <div class="images">
            ${item.images.map(image => image ? `<img src="${image}" alt="${item.name}">` : '').join('')}
          </div>
          <button onclick="viewProductDetails('${item.id}')">View Details</button>
        </div>
      `;
    }
    document.querySelector("#products").innerHTML = output;
  })
  .catch(error => console.error("Error:", error));

function viewProductDetails(productId) {
  window.location.href = `productDetail.html?id=${productId}`;
}

// Function to fetch product details based on the provided product ID
function fetchProductDetails(productId) {
    // Fetch product details only if the product ID is provided
    if (productId) {
      fetch(`./db.json?id=${productId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(product => {
          // Display product details on the page if the product exists
          if (product) {
            const productDetailsElement = document.getElementById('productDetails');
            productDetailsElement.innerHTML = `
              <p class="name">${product.name}</p>
              <p class="price">${product.price}</p>
              <p class="description">${product.description}</p>
              <img src="${product.thumbnail}" alt="${product.name}">
              <div class="images">
                ${product.images.map(image => image ? `<img src="${image}" alt="${product.name}">` : '').join('')}
              </div>
            `;
          } else {
            console.error("Product not found");
          }
        })
        .catch(error => console.error("Error:", error));
    } else {
      console.error("Product ID not provided");
    }
  }
  
  // Function to handle fetching product details when the page has finished loading
  function handlePageLoad() {
    // Retrieve the product ID from the URL query parameters within the productDetail.html page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Call fetchProductDetails function with the retrieved product ID
    fetchProductDetails(productId);
  }
  
  // Add event listener to execute handlePageLoad function when the page has finished loading
  document.addEventListener('DOMContentLoaded', handlePageLoad);
  






  // // Function to fetch product details based on the provided product ID
// function fetchProductDetails(productId) {
//     // Fetch product details only if the product ID is provided
//     if (productId) {
//       fetch(`./db.json?id=${productId}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }
//           return response.json();
//         })
//         .then((product) => {
//           // Display product details on the page if the product exists
//           if (product) {
//             const productDetailsElement =
//               document.querySelector("#productDetails");
//             productDetailsElement.innerHTML = `
//                 <p class="name">${product.name}</p>
//                 <p class="price">${product.price}</p>
//                 <p class="description">${product.description}</p>
//                 <img src="${product.thumbnail}" alt="${product.name}">
//                 <div class="images">
//                   ${product.images
//                     .map((image) =>
//                       image ? `<img src="${image}" alt="${product.name}">` : ""
//                     )
//                     .join("")}
//                 </div>
//               `;
//           } else {
//             console.error("Product not found");
//           }
//         })
//         .catch((error) => console.error("Error:", error));
//     } else {
//       console.error("Product ID not provided");
//     }
//   }
  
//   // Function to handle fetching product details when the page has finished loading
//   function handlePageLoad() {
//     // Retrieve the product ID from the URL query parameters within the productDetail.html page
//     const urlParams = new URLSearchParams(window.location.search);
//     console.log("urlparamas--",urlParams);
//     const productId = urlParams.get("id");
//     console.log(productId);
//     // Call fetchProductDetails function with the retrieved product ID
//     // fetchProductDetails(productId);
//   }
  