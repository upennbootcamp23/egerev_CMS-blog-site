async function loginBtnHandler(event) 
{
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if(username && password)
    {   
        const url = "/api/users/login";
        const headers = { Accept: "application/json", "Content-Type": "application/json", };

        const res = await fetch(url,
            {
                method: "post",
                headers,
                body: JSON.stringify(
                    {
                        username,
                        password
                    }
                ),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if(res.ok)
        {
            document.location.replace('/dashboard');
        } 
        else 
        {
            window.alert("Username and Password might be wrong - let's check it out!");
            alert(response.statusText);
        }
    }
}

async function signupBtnHandler(event) 
{
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const headers = { Accept: "application/json", "Content-Type": "application/json", };

    if(username && password)
    {
        const res= await fetch("/api/users/",
            {
                method: "post",
                headers,
                body: JSON.stringify(
                    {
                        username,
                        password
                    }
                ),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        );

        

        if(res.ok)
        {
            alert("ok");
            const res= await fetch("/api/users/login",
                {
                    method: "post",
                    body: JSON.stringify(
                        {
                            username,
                            password
                        }
                    ),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if(res.ok)
            {
                document.location.replace('/dashboard');
            } 
            else 
            {
                alert("Error: " + response.statusText);
            }
        } 
        else 
        {
            alert("Error: " + response.statusText);
        }
    }
}


if(document.getElementById('login-form'))
{
    document.getElementById('login-form').addEventListener("submit",loginBtnHandler);
}
else
{
    document.getElementById('signup-form').addEventListener("submit",signupBtnHandler);
}