const sigin=document.getElementById('signin').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const msg=document.getElementById('msg');
    if(!email||!password)
    {
        msg.textContent='Please fill in all fields';
        msg.style.color="red"
    }
    try
    {
        const res=await fetch('http://localhost:5000/api/v1/users/second',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({email,password})
            }
        );
        const response=await res.json();
        if(res.ok)
        {
           alert('You have been logged in');
            window.location.href="http://localhost:5000";
        }
        else
        {
            msg.textContent=response.message||"Login failed";
            msg.style.color="red"
        }
        form.reset();
    }
    catch(err)
    {
        msg.textContent=response.message||"Server error"
    }
})