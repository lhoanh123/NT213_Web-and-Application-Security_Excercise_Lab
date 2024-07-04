// Get the mobile input element
const mobileInput = document.getElementById("mobile");
let flag=1;

mobileInput.addEventListener("input", function () {
    const mobileNumber = mobileInput.value;
    const mobileNumberPattern = /^[0-9]{10}$/;

    if (!mobileNumberPattern.test(mobileNumber)) {
        mobileInput.setCustomValidity("Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số.");
        flag=0;
    } else {
        mobileInput.setCustomValidity("");
        flag=1;
    }
});

// Get the age input element
const ageInput = document.getElementById("Age");

ageInput.addEventListener("input", function () {
    const age = parseInt(ageInput.value);

    if (isNaN(age) || age <= 0 ) {
        ageInput.setCustomValidity("Vui lòng nhập độ tuổi hợp lệ.");
        flag=0;
    } else {
        ageInput.setCustomValidity("");
        flag=1;
    }
});

// Get the email input element
const emailInput = document.getElementById("email");

emailInput.addEventListener("input", function () {
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailInput.setCustomValidity("Vui lòng nhập địa chỉ email hợp lệ.");
        flag=0;
    } else {
        emailInput.setCustomValidity("");
        flag=1;
    }
});

// Get the password input element
const passwordInput = document.getElementById("password");

passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])\S{8,}$/;

    if (!passwordPattern.test(password)) {
        passwordInput.setCustomValidity("Mật khẩu phải chứa ít nhất 8 ký tự và bao gồm ít nhất một chữ số, một chữ cái và một ký tự đặc biệt.");
        flag=0;
    } else {
        passwordInput.setCustomValidity("");
        flag=1;
    }
});

// Get the repassword input element
const repasswordInput = document.getElementById("repassword");

repasswordInput.addEventListener("input", function () {
    const repassword = repasswordInput.value;
    const password = passwordInput.value;

    if (repassword !== password) {
        repasswordInput.setCustomValidity("Mật khẩu không khớp.");
        flag=0;
    } else {
        repasswordInput.setCustomValidity("");
        flag=1;
    }
});

// Get all the checkbox inputs
const checkboxes = document.querySelectorAll(".food");

// Add event listener to each checkbox
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
        // Check if at least one checkbox is checked
        const checkedCheckboxes = document.querySelectorAll(".food:checked");
        const foodLabel = document.querySelector('label[for="pho"]');
        const errorMessage = foodLabel.nextSibling;

        if (checkedCheckboxes.length > 0) {
            // If at least one checkbox is checked, remove error message
            if (errorMessage && errorMessage.tagName === "SPAN") {
                errorMessage.remove();
            }
            flag=1;
        } else {
            // If no checkbox is checked, display error message
            if (!errorMessage || errorMessage.tagName !== "SPAN") {
                const newErrorMessage = document.createElement('span');
                newErrorMessage.textContent = "Vui lòng chọn ít nhất một món ăn.";
                newErrorMessage.style.color = "red";
                foodLabel.parentNode.insertBefore(newErrorMessage, foodLabel.nextSibling);
                flag=0;
            }
        }
    });
});

// Add submit event listener to the form
const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    const checkedCheckboxes = document.querySelectorAll(".food:checked");

    // Check if at least one checkbox is checked
    if (checkedCheckboxes.length === 0) {
        event.preventDefault(); // Prevent form submission
        const foodLabel = document.querySelector('label[for="pho"]');
        const errorMessage = foodLabel.nextSibling;

        // Display error message
        if (!errorMessage || errorMessage.tagName !== "SPAN") {
            const newErrorMessage = document.createElement('span');
            newErrorMessage.textContent = "Vui lòng chọn ít nhất một món ăn.";
            newErrorMessage.style.color = "red";
            foodLabel.parentNode.insertBefore(newErrorMessage, foodLabel.nextSibling);
            flag=0;
        }
    }

    if(flag)
    {
        alert("Form đã được gửi");
    }
});


