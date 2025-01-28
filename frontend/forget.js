const change=document.getElementById('change');
change.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const cpassword=document.getElementById('cpassword').value;
    const msg=document.getElementById('msg');
    if(!email||!password||!cpassword)
    {
     msg.textContent="Required fields are empty";
     return;
    }
    if(password!=cpassword)
    {
        msg.textContent="Password and confirm password are not same";
        msg.style.color="red";
        return;
    }
    try
    {
        const res=await fetch('http://localhost:5000/api/v1/users/third',
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
            msg.textContent=response.message||"Password changed successfully";
            msg.style.color="green";
        }
        else
        {
            msg.textContent=response.message||"Error changing password";
        }
    }
    catch(err)
    {
        msg.textContent="Server error";
        msg.style.color="red";
    }

})