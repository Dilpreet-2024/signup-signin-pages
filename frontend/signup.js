const signup=document.getElementById('click').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const name=document.getElementById('username').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const msg=document.getElementById('msg')
    if(!name||!email||!password)
    {
        msg.textContent="required fields are empty";
        msg.style.color="red"
    }
    
    try
    {
        const res=await fetch('http://localhost:5000/api/v1/users/first',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({name,email,password})
            }
        );
        const response=await res.json();
        if(res.ok)
        {
            msg.textContent=response.message||"User registered successfully"
            msg.style.color="green"
        }
        else
        {
msg.textContent=response.message||"Signup failed";
msg.style.color="red"
        }
        signup.reset();

    }
    catch(err)
    {
        msg.textContent=response.message||"Server error"
    }
})