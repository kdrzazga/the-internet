document.addEventListener("DOMContentLoaded", function() {
    var paragraphDiv = document.getElementById('paragraph-div');
    paragraphDiv.setAttribute('id', 'paragraph-div' + Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000);
    paragraphDiv.setAttribute('data-id', '19819793');

    var checkbox2 = document.getElementById('labelCheckbox2');

    // Show checkbox 2 after 1 second
    setTimeout(function() {
        checkbox2.style.display = 'block'; // to occupy a whole line
    }, 1000);

    const randomTextboxes = document.getElementById('random-textboxes');
    const max = Math.floor(Math.random() * (11 - 2)) + 2;
    for (var i = 0; i < max; i++){
        randomTextboxes.innerHTML += '<input type="text" style="width: 20px;"/>'
    }

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

  document.getElementById('submitBtn').addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const selectedRadio = document.querySelector('input[name="radioOption"]:checked');

        let flag = selectedRadio ? selectedRadio.value : 'No flag selected';

        const params = new URLSearchParams({
            name: name,
            lastName: lastName,
            flag: flag
        });

        window.location.href = `filled.html?${params.toString()}`;
    });
});

function addButton() {
    var div = document.getElementById('new-buttons');
    div.innerHTML += '<button onclick="removeButton(this)">Remove me</button>';
}

function removeButton(button) {
    button.parentNode.removeChild(button);
}
