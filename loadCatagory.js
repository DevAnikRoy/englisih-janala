async function loadCategories() {
    try {
        const url = 'https://openapi.programming-hero.com/api/levels/all';
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data);
    }
    catch (error) {
        console.error('Error fetching', error);
    }
}
loadCategories();

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
                // Remove the 'selected' class for all buttons
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

// Show the spinner
function showSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}
// Hide the spinner
function hideSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}
async function loadLessons(id) {
    showSpinner();
    try {
        const url = `https://openapi.programming-hero.com/api/level/${id}`
        const res = await fetch(url);
        const data = await res.json();
        displayLessons(data.data);
    }
    catch (error) {
        console.error('Error fetching', error);
    }
    finally {
        hideSpinner();
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
                <p class = "mt-3 text-xl font-bold">'${lesson.meaning ? `'${lesson.meaning}'` : 'অর্থ নেই'} / 
                            ${lesson.pronunciation ? `'${lesson.pronunciation}'` : 'উচ্চারণ নেই'}'</p>
                <div class = "mt-4 flex justify-between items-center">
                    <i onclick = "loadInfo(${lesson.id})" class="fa-solid fa-circle-info bg-sky-100"></i>
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
    try {
        const url = `https://openapi.programming-hero.com/api/word/${id}`
        const res = await fetch(url);
        const data = await res.json();
        displayInfo(data.data);
    }
    catch (error) {
        console.log(error)
    }

}
// loadInfo();

async function displayInfo(informations) {
    try {
        if (!informations || Object.keys(informations).length === 0) {
            const lessonInfoDiv = document.getElementById('lesson-info');
            const existingPopup = document.getElementById('popup');
            if (existingPopup) {
                existingPopup.remove();
            }

            const creatInfoDiv = document.createElement('div');
            creatInfoDiv.innerHTML = `
                <div id="popup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center">
                        <p class="text-xl font-bold">No data available</p>
                        <button id="closePopup" class="mt-5 bg-[#422AD5] text-white px-4 py-2 rounded hover:bg-white hover:text-[#422AD5] hover:border-1 border-[#422AD5] hover:font-bold">
                            Close
                        </button>
                    </div>
                </div>
            `;
            lessonInfoDiv.appendChild(creatInfoDiv);

            const closePopupButton = document.getElementById('closePopup');
            const popup = document.getElementById('popup');
            closePopupButton.addEventListener('click', () => {
                popup.classList.add('hidden');
            });

            return; 
        }
        // ----------------------------
        const synonyms = informations.synonyms

        let synonymsHTML = '';
        for (let synonym of synonyms) {
            synonymsHTML += `<p class="mb-4 text-start font-medium bg-[#EDF7FF] py-2 px-5">${synonym}</p>`;
            
            const lessonInfoDiv = document.getElementById('lesson-info');
            const existingPopup = document.getElementById('popup');
            if (existingPopup) {
                existingPopup.remove();
            }
            const creatInfoDiv = document.createElement('div');

            creatInfoDiv.innerHTML = `
            <div id="popup" class=" fixed inset-0 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center">
                <h1 class="text-start text-xl font-bold mb-5">${informations.word}(<i class="fa-solid fa-microphone-lines"></i> : ${informations.pronunciation})</h1>
                <p class="mb-1 text-start font-bold">Meaning</p>
                <p class="mb-5 text-start font-medium">${informations.meaning}</p>
                <p class="mb-1 text-start font-bold">Example</p>
                <p class="mb-4 text-start font-medium">${informations.sentence}</p>
                <p class="mb-3 text-start font-bold">সমার্থক শব্দ গুলো</p>
                <div class = "flex justify-start items-center gap-4">
                ${synonymsHTML}
                </div>
                <button id="closePopup" class = "mt-5 bg-[#422AD5] text-white px-4 py-2 rounded hover:bg-white hover:text-[#422AD5] hover:border-1 border-[#422AD5] hover:font-bold">
                    Complete Learning
                </button>
                </div>
            </div>
            `;
            lessonInfoDiv.appendChild(creatInfoDiv);

            const closePopupButton = document.getElementById('closePopup');
            closePopupButton.addEventListener('click', () => {
                popup.classList.add('hidden');
            });
        }
    }
    catch (error) {
        console.error('Error fetching buttons:', error);
    }

}