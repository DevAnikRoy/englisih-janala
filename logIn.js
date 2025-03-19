document.getElementById('get-start-btn').addEventListener('click', () => {

    const name = document.getElementById('name-input').value;
    const password = document.getElementById('password-input').value;
    
    if (name.length > 1) {
        if (password == 123456) {
            
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Welcome, ${name}!`,
                confirmButtonText: 'OK',
            }).then(() => {
                
                const sections = document.querySelectorAll('.hidden');
                document.getElementById('hero-section').style.display = 'none';

                sections.forEach(section => {
                    section.style.display = 'block';
                });

                
                document.getElementById('password-input').value = "";

                document.getElementById('loading-spinner').style.display = 'none'
            });
        }
        else {
            alert("Your Password is 123456")
        }

    }
    else {
        alert('Enter a Proper Name')
    }


});


