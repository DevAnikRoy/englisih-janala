function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(response => response.json())
        .then(data => displayCategories(data.data)); // Pass the array directly
}

loadCategories();

function displayCategories(categories) { // Changed category to categories to be more descriptive
    const categoryContainer = document.getElementById('category');
    categoryContainer.innerHTML = ''; // Clear previous content

    categories.forEach(cate => { // Use forEach for better readability
        const categoryButton = document.createElement('button');
        categoryButton.className = " bg-[#ececec] text-[#ff1e3c] font-semibold text-sm py-1 px-4 rounded-md hover:cursor-pointer hover:bg-[#ff1e3c] hover:text-white";
        categoryButton.textContent = cate.level_no;

        categoryButton.addEventListener('click', () => {
            // Add your event handling logic here
            console.log(`Button clicked: ${cate.level_no}`);
            //Example: loadVideos(cate.level_no);
        });

        categoryContainer.appendChild(categoryButton);
    });
}