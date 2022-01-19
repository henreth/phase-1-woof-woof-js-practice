const dogURL = 'http://localhost:3000/pups'

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    filterDogs();
})

// fetch dogs from database
function fetchDogs() {
    return fetch(dogURL)
    .then( (resp) => resp.json())
    .then( (json) => renderDogs(json) )
}

// add dogs to the website task bar
function renderDogs(dogs) {
    const dogBar = document.getElementById('dog-bar');
    dogs.forEach(dog => {
        //create span card with dog information
        let dogSpan = document.createElement('span');
        dogSpan.className='dog-card'
        dogSpan.textContent=dog.name
        dogSpan.imageSource = dog.image;
        dogSpan.dogType=dog.isGoodDog;
        dogSpan.idValue = dog.id

        //add event listener for dog display to span
        dogSpan.addEventListener('click',showDog);
        dogBar.appendChild(dogSpan);
    }

    )
}

// display dogs on website
const showDog = (event) => {
    const dog = event.target
    const dogDisplay = document.getElementById('dog-info');

    // removes dog from display upon clicking 
    while (dogDisplay.firstChild) {
        dogDisplay.removeChild(dogDisplay.lastChild);}


    const dogImg = document.createElement('img');
    dogImg.src = dog.imageSource;
    dogDisplay.appendChild(dogImg);

    const dogName = document.createElement('h2');
    dogName.textContent=dog.name
    dogDisplay.appendChild(dogName);

    const dogButton = document.createElement('button');
    dogButton.textContent=dogIdentifier(dog);
    dogButton.isGoodDog=dog.dogType;
    dogButton.id=dog.idValue;

    //add listening event to dogbutton to change dogtype
    dogButton.addEventListener('click',changeDogType);
    dogDisplay.appendChild(dogButton);


}

// creates proper string for dogButton to identify if they are a good dog or not 
const dogIdentifier = (dog) => {
    if (dog.dogType===true){
        return 'Good Dog!'
    } else {
        return 'Bad Dog!'
    }
}

// changing dog type
const changeDogType = (event) => {
    event.preventDefault();
    const dogType = event.target.isGoodDog;
    const dogId = event.target.id;
    updateDog(!dogType,dogId);
}

  const updateDog = (dogType,dogId) => {
    const newURL= dogURL+`/${dogId}`;
    const formData = {
        isGoodDog: dogType,
      };
      
      const configurationObject = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      };
      
      return fetch(newURL, configurationObject)
        .then(function (response) {
          return response.json();
        })
        .then(function (object) {
            console.log('Successfully Updated the Database')
        })
        .catch(function (error) {
            alert("ERROR");
        });
  }

// FILTER DOGS

//find button and add event listener
const filterDogs = () => {
    const dogFilter = document.getElementById('good-dog-filter');
    dogFilter.addEventListener('click', filterThoseDogs);
    
}

// identify dogs and their dog, filter is necessary
function filterThoseDogs(event) {
    if (event.target.textContent==='Filter good dogs: OFF'){
        event.target.textContent='Filter good dogs: ON'
        const dogs = document.querySelectorAll('.dog-card');
        for (dog of dogs) {
            if (dog.dogType===false)
            dog.style.visibility='hidden'
        }
    } else {
        event.target.textContent='Filter good dogs: OFF'
        const dogs = document.querySelectorAll('.dog-card');
        for (dog of dogs) {
            if (dog.dogType===false)
            dog.style.visibility='visible'
        }
    }
}