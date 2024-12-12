// Get photos from API
async function fetchAsyncImages() {
    try {
        for (let i = 1; i < 6; i++) {
            let response = await fetch("./img/img" + i + ".jpg");

            if (response.ok) {
                console.log(response);
                let image = await response.json();

                displayYourPhotos(image);
            }
            else {
                console.error("Error : " + response.status);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

// Get local images
function getLocalImages() {
    for (let i = 1; i < 6; i++) {
        const image = "./img/img" + i + ".jpg";
        displayYourImages(image);
    }
}

// Display images
function displayYourImages(image) {
    // Get aside "Vos photos"
    const aside = document.getElementsByTagName("aside")[0];

    // Create img element
    const img = document.createElement("img");
    img.classList.add("image");
    img.src = image;

    // Add CSS
    img.style.width = "80px";

    // Add event listener
    imagesEvent(aside);

    // Append img in aside
    aside.appendChild(img);
}

// Add image slots
function addImageSlots() {
    // Get main zone
    const main = document.getElementsByTagName("main")[0];

    for (let i = 0; i < 4; i++) {

        const slot = document.createElement("div");
        slot.classList.add("slot");
        slot.textContent = "zone " + i;

        // Add CSS
        main.style.gridTemplateColumns = "1fr 1fr 1fr";
        //main.style.alignItems = "center";
        main.style.gap = "0";
        main.style.padding = "15px";

        slot.style.textAlign = "center";
        slot.style.border = "2px dotted red";
        slot.style.width = "100px";
        slot.style.height = "100px";

        // Add event listener
        imagesEvent(main);

        main.appendChild(slot);
    }
}

function imagesEvent(element) {
    const images = element.querySelectorAll(".image");
    const slots = element.querySelectorAll(".slot");

    element.addEventListener("click", (event) => {
        // Event for images
        if (event.target.classList.contains("image")) {
            images.forEach((image) => {
                image.classList.remove("selected");
                image.style.border = "none";
            });
            event.target.classList.add("selected");
            event.target.style.border = "2px solid red";
        }

        // Event for slots
        if (event.target.classList.contains("slot")) {
            slots.forEach((slot) => {
                slot.classList.remove("selected");
                slot.style.border = "2px dotted red";
            });
            event.target.classList.add("selected");
            event.target.style.border = "2px solid red";
        }

        // Insert image ton main
        images.forEach((image) => {
            console.log("test1");
            slots.forEach((slot) => {
                console.log("test2");
                if (image.classList.contains("selected") && slot.classList.contains("selected")) {
                    console.log("test");
                    slot.appendChild(image);
                }
            })
        })
    });
}


// Execute on start
addImageSlots();
getLocalImages();