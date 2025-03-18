async function loadCategories() {
    const url = 'https://openapi.programming-hero.com/api/levels/all'
    const res = await fetch(url)
    const data = await res.json()
    displayCategories(data.data)
}
loadCategories()

async function displayCategories(category) {
    try {
        const categoryContainer = document.getElementById('category');
        for (let cate of category) {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `
     <button id = "btn" onclick="loadLessons(${cate.level_no})" class="btn bg-white text-[#422AD5] border-[#422AD5] border-solid border-1 font-semibold text-sm py-1 px-4 rounded-sm hover:cursor-pointer hover:bg-[#422AD5] hover:text-white"><i class="fa-solid fa-book-open"></i> Lesson-${cate.level_no}</button>
`;
            categoryContainer.append(categoryDiv);
        }
        categoryContainer.addEventListener('click', function (event) {
            if (event.target.tagName === 'BUTTON') {
                // Hide the alert section
                document.getElementById('select-lesson-aleart').classList.add('hidden');
                 // Remove the 'selected' class from all buttons
                 const buttons = categoryContainer.querySelectorAll('button');
                 buttons.forEach(button => {
                     button.classList.remove('selected');
                 });
 
                 // Add the 'selected' class to the clicked button
                 event.target.classList.add('selected');
             }
            
        });
    }
    catch (error) {
        console.error('Error fetching buttons:', error);
    }

}
// displayCategories()

async function loadLessons(id) {
    // console.log
    try {
        const url = `https://openapi.programming-hero.com/api/level/${id}`
        const res = await fetch(url);
        const data = await res.json();
        displayLessons(data.data);
    }
    catch (error) {
        console.log(error)
    }

}

async function displayLessons(lessons) {
    const lessonsContainer = document.getElementById('word-card');
    const lessonsWarning = document.getElementById('lesson-warning')
    //   remove previous card
    lessonsContainer.innerHTML = '';
    lessonsWarning.innerHTML = '';
    if (lessons.length === 0) {
        const lessonDiv = document.createElement('div');
        // lessonDiv.classList.add();
        lessonDiv.innerHTML = `
        <div class="flex flex-col justify-center items-center">
            <img class =" w-20" src="assets/alert-error.png" alt="">
            <p class= "text-sm text-[#A1A1A1] mt-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-2xl font-bold mt-2">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        lessonsWarning.appendChild(lessonDiv);
    }
    else {
        // design a card with text ,meaning , pronounciation
        for (let lesson of lessons) {
            const lessonDiv = document.createElement('div');
            // lessonDiv.classList.add('card', 'bg-base-100', 'shadow-xl');
            lessonDiv.innerHTML = `
        <div class="card-body">
            <div class = "bg-white p-7 text-center rounded-md hover:cursor-pointer hover:bg-sky-100">
                <h2 class="inter-font text-xl font-bold">${lesson.word}</h2>
                <p class = "mt-3">Meaning /Pronounciation</p>
                <p class = "mt-3 text-xl font-bold">'${lesson.meaning}/${lesson.pronunciation}'</p>
                <div class = "flex justify-between items-center">
                    <i class="fa-solid fa-circle-info bg-sky-100"></i>
                    <i class="fa-solid fa-volume-high bg-sky-100"></i>
                </div> 
            </div>  
            </div>
        </div>
        `;
            lessonsContainer.appendChild(lessonDiv);
        }
    }

}

// load information

async function loadInfo(id) {
    // console.log(id)
    try {
        const url = `https:// openapi.programming-hero.com/api/word/${id}`
        const res = await fetch(url);
        const data = await res.json();
        displayInfo(data.data);
        console.log(data.data)
    }
    catch (error) {
        console.log(error)
    }

}
loadInfo()