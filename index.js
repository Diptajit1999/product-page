// let http = new XMLHttpRequest();

// http.open("GET", "db.json", true);
// http.send();

// http.onload = function () {
//   if (this.status == 200) {
//     let products = JSON.parse(this.responseText);
//     console.log(products);
//     console.log(products.products);
//     let output = "";

//     for (let item of products.products) {
//       output += `
//             <div class="products">
//               <p class="name">${item.name}</p>
//               <p class="price">${item.price}</p>
//               <p class="description">${item.description}</p>
//               <img src="${item.thumbnail}" alt="${item.name}">
//               <div class="images">
//                 ${item.images.map(image => image ? `<img src="${image}" alt="${item.name}">` : '').join(' ')}
//               </div>
//             </div>
//             `;
//     }

//     document.querySelector(".products").innerHTML = output;
//   }
// };
// console.log("HI",document.getElementById("products"))
function productList() {
    
  fetch("./db.json")
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let output = "";
      for (let item of data.products) {
        // console.log(item)
        let truncatedDescription = item.description.slice(0, 25);
        if (item.description.length > 25) {
            truncatedDescription += '...';
        }
        output += `
          <div class="product">
            <p class="name">${item.name}</p>
            <p class="price">${item.price}</p>
            <p class="description">${truncatedDescription}</p>
            <img src="${item.thumbnail}" alt="${item.name}">
            <div class="images">
              ${item.images
                .map((image) =>
                  image ? `<img src="${image}" alt="${item.name}">` : ""
                )
                .join(" ")}
            </div>
            <button onclick="viewProductDetails('${
              item.id
            }')">View Details</button>
          </div>
        `;
      }
    //   console.log(output)
    //   console.log("HI",document.querySelector("#products"))
      document.querySelector("#products").innerHTML = output;
    })
    .catch((error) => console.error("Error:", error));
}
productList()

// Function to navigate to product detail page when the view details button is clicked
function viewProductDetails(productId) {
  console.log(productId);
  window.location.href = `productDetail.html?id=${productId}`;

}
