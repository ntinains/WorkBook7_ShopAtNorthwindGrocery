window.onload = () => {
    const searchForm = document.getElementById("search-form");
    const searchTypeSelect = document.getElementById("search-type");
    const categoryDropdown = document.getElementById("category-dropdown");
    const productListContainer = document.getElementById("products-list");

    function getProductsByCategory(categoryId) {
        fetch(`http://localhost:8081/api/products?categoryId=${categoryId}`)
            .then(response => response.json())
            .then((products) => {
                productListContainer.innerHTML = ""; // Clear existing products
                products.forEach((product) => {
                    createProductCard(product);
                });
            });
    }

    function getAllProducts() {
        fetch(`http://localhost:8081/api/products`)
            .then(response => response.json())
            .then((products) => {
                productListContainer.innerHTML = ""; // Clear existing products
                products.forEach((product) => {
                    createProductCard(product);
                });
            });
    }

    function createProductCard(product) {
        const card = document.createElement("div");
        card.textContent = `${product.productName} - Price: $${product.unitPrice}`;
        card.appendChild(createDetailsLink(product.productId));
        productListContainer.appendChild(card);
    }

    function createDetailsLink(productId) {
        const link = document.createElement("a");
        link.href = `/details.html?productId=${productId}`;
        link.textContent = "See Details";
        return link;
    }

    // Event listener for form submission
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const searchType = searchTypeSelect.value;

        if (searchType === "by-category") {
            const selectedCategoryId = categoryDropdown.value;
            if (selectedCategoryId) {
                getProductsByCategory(selectedCategoryId);
            } else {
                alert("Please select a category.");
            }
        } else if (searchType === "view-all") {
            getAllProducts();
        } else {
            alert("Please select a search type.");
        }
    });

    // Event listener for changing search type
    searchTypeSelect.addEventListener("change", () => {
        // Adjust the display property based on the selected search type
        categoryDropdown.style.display = (searchTypeSelect.value === "by-category") ? "inline-block" : "none";
    });

    // Fetch categories when the page loads
    fetchCategories();
};

function fetchCategories() {
    fetch("http://localhost:8081/api/categories")
        .then(response => response.json())
        .then((categories) => {
            // Populate category dropdown
            populateCategoryDropdown(categories);
        });
}

function populateCategoryDropdown(categories) {
    const categoryDropdown = document.getElementById("category-dropdown");
    categoryDropdown.innerHTML = ""; // Clear existing options

    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a category...";
    categoryDropdown.appendChild(defaultOption);

    // Add options for each category
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.categoryId;
        option.textContent = category.name;
        categoryDropdown.appendChild(option);
    });
}
