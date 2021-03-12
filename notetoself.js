//place localStorage inside <ul> and display them
window.onload = init;

function init () {
    //add a handler for when button is clicked
    var button = document.getElementById("add_button"); //grab the button
    button.onclick = createSticky; //add handler for when it is clicked

    var stickiesArray = getStickiesArray(); //grab array with stickies in it

    for (var i = 0; i < stickiesArray.length; i++) { //iterate thru stickies array
        var key = stickiesArray[i]; //grab each item that is a key to a sticky
        var value = JSON.parse(localStorage[key]);
        addStickyToDOM(key, value);// add it to the DOM
    }
}

//-------- addStockyToDom function (insert notes to <ul> element--------//

function addStickyToDom (key, stickyObj) {
    var stickies = document.getElementById("stickies"); //Grab stickies element

    var sticky = document.createElement ("li"); //create <li>

    //set the id attribute to the key so we can find it using
    //the ids stored in the stickies array
    sticky.setAttribute ("id", key); //adding unique id to <li> see pg450

    //Use the stickyObj color & set the backgrnd color CSS style
    sticky.style.backgroundColor = stickyObj.color;

    var span = document.createElement ("span"); //create <span>
    span.setAttribute ("class", "sticky"); // class name "sticky" to list

    //Use the stickyObj value as the text for the sticky note
    span.innerHTML = stickyObj.value; //set content of span

    //Add everything to the DOM
    sticky.appendChild (span); //add <span> to the sticky <li>
    stickies.appendChild (sticky); //add <li> to the stickies list

    //add an event listener so when you click on a sticky note it can be deleted
    sticky.onclick = deleteSticky;//click handler to delete
}

//-------- function to create new sticky note w/ a unique key --------//

function createSticky() {
    var stickiesArray = getStickiesArray();//grab stickies array
    var value = document.getElementById("note_text").value;//grab the text in the form text box
    var colorSelectObj = document.getElementById("note_color");
    var index = colorSelectObj.selectedIndex;
    var color = colorSelectObj[index].value;

    //create sticky note using JSON to hold value and color
    var currentDate = new Date();//create unique key for sticky
    var key = "sticky_" + currentDate.getTime();//create unique key for sticky
    var stickyObj = {
        "value": value,
        "color": color
    };
    localStorage.setItem (key, JSON.stringify(stickiesArray));

    addStickyToDOM(key, stickyObj);// add new text to the DOM to represent the sticky
}

//-------- getStickiesArray function --------//

function getStickiesArray () {
    var stickiesArray = localStorage.getItem ("stickiesArray");

    if (!stickiesArray) { //if no array
        stickiesArray = []; //then create an empty array and assign to stickiesArray
        localStorage.setItem ("stickiesArray", JSON.stringify (stickiesArray));//create a string rep of the array and store it
    } else {
        stickiesArray = JSON.parse (stickiesArray);// if already stored then parse it using JSON
    }
    return stickiesArray; //land up with array and return it
}

//-------- Delete sticky notes --------//

function deleteSticky (e) {
    var key = e.target.id;

    if (e.target.tagName.toLowerCase() == "span") {
        key = e.target.parentNode.id;
    }

    var stickiesArray = getStickiesArray();//grab stickiesarray function

    if (stickiesArray) {// make sure its stickiesarray
        for (var i = 0; i < stickiesArray.length; i++) { //iterate thru
            if (key == stickiesArray[i]) {//when we find correct key we delete it
                stickiesArray.splice (i,1);//splice removes elements from the array
            }
        }
        localStorage.removeItem (key);//remove sticky note by passing in the key
        localStorage.setItem ("stickiesArray", JSON.stringify (stickiesArray)); //save with key removed
        removeStickyFromDOM(key);
    }   
}

//-------- Remove sticky from DOM --------//

function removeStickyFromDOM (key) {
    var sticky = document.getElementById (key);
    sticky.parentNode.removeChild (sticky);
}

//-------- Clear sticky notes from DOM --------//
/*
function clearStickyNotes() {
	localStorage.clear();
	var stickyList = document.getElementById("stickies");
	var stickies = stickyList.childNodes;
	for (var i = stickies.length-1; i >= 0; i--) {
		stickyList.removeChild(stickies[i]);
	}

	// reset stickies array
	var stickiesArray = getStickiesArray();
}
*/