document.addEventListener("DOMContentLoaded", function() {
    var paragraphDiv = document.getElementById('paragraph-div');
    paragraphDiv.setAttribute('id', 'paragraph-div' + Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000);
    paragraphDiv.setAttribute('data-id', '19819793');

    var checkbox2 = document.getElementById('labelCheckbox2');

    // Show checkbox 2 after 1 second
    setTimeout(function() {
        checkbox2.style.display = 'block'; // to occupy a whole line
    }, 1000);

    const dropdown = document.getElementById('dropdown');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // Select all checkboxes in the form

    dropdown.addEventListener('change', function() {
        if (this.value === '2') {
            // Hide checkboxes when option 2 is selected
            checkboxes.forEach(checkbox => {
                checkbox.style.display = 'none'; // Hide the parent label of the checkbox
            });
        } else {
            // Show checkboxes again if the selected option is not 2
            checkboxes.forEach(checkbox => {
                checkbox.style.display = 'inline'; // Show the parent label of the checkbox
            });
        }
    });
});

// Function to add buttons dynamically
function addButton() {
    var div = document.getElementById('new-buttons');
    div.innerHTML += '<button onclick="removeButton(this)">Remove me</button>';
}

// Function to remove the button when clicked
function removeButton(button) {
    button.parentNode.removeChild(button);
}
