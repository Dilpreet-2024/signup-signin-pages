document.getElementById('btnone').addEventListener('click', async (e) => {
    e.preventDefault(); // Stop form from reloading the page

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const photo = document.getElementById('photo').files[0];
    const msg = document.getElementById('msg');

    // Clear previous messages
    msg.textContent = '';

    if (!name || !email || !password || !photo) {
        msg.textContent = 'Please fill all fields';
        msg.style.color = "red";
        return;
    }

    // Create FormData to send text + file
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('photo', photo);

    try {
        console.log("Sending request...");
        const res = await fetch('http://localhost:5000/api/v1/users/first', {
            method: 'POST',
            body: formData
        });

        const response = await res.json();

        if (res.ok) {
            msg.textContent = response.message || "User registered successfully";
            msg.style.color = "green";
            console.log("Success:", response);

            // Reset the form only after success
            document.getElementById('formone').reset();
        } else {
            msg.textContent = response.message || "Signup failed";
            msg.style.color = "red";
            console.log("Error:", response);
        }

    } catch (err) {
        console.error("Fetch Error:", err);
        msg.textContent = "Server error";
        msg.style.color = "red";
    }
});
