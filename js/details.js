window.onload = () => {
    let urlParams = new URLSearchParams(location.search);
    let currentProductId = urlParams.get("productId");
    let viewDetailsBtn = document.getElementById("btn");
    let productContainer = document.getElementById("product-container");

    viewDetailsBtn.onclick = () => {
        fetch(`http://localhost:8081/api/products/1`)
            .then((res) => res.json())
            .then((productDetails) => {
                productContainer.innerHTML = `
                    <h2>${productDetails.productName}</h2>
                    <ul>
                        <li>Product Id: ${productDetails.productId}</li>
                        <li>Unit Price: $${parseFloat(productDetails.unitPrice).toFixed(2)}</li>
                        <li>Units in Stock: ${productDetails.unitsInStock}</li>
                        <li>Category Id: ${productDetails.categoryId}</li>
                        <li>Supplier: ${productDetails.supplier}</li>
                        <li>Discontinued: ${productDetails.discontinued}</li>
                    </ul>
                `;
            })
    };
};
