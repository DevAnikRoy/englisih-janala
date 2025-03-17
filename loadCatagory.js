function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(response => response.json())
        .then(data => displayCategories(data.data));
}
loadCategories()

function displayCategories(category) {
    const categoryContainer = document.getElementById('category');
    for (let cate of category) {
        console.log(cate.level_no)
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
     <button class="bg-white text-[#422AD5] border-[#422AD5] border-solid border-1 font-semibold text-sm py-1 px-4 rounded-sm hover:cursor-pointer hover:bg-[#422AD5] hover:text-white"><i class="fa-solid fa-book-open"></i> Lesson-${cate.level_no}</button>
`;
        categoryContainer.append(categoryDiv);
    }

}
displayCategories()