function showNewPostForm() {
    document.getElementById("post-form").style.display="block";
    document.location.replace('/dashboard/newpost/');
}

async function createBtnHandler(event) 
{
    event.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();

    if(title && body)
    {
        const res= await fetch("/api/posts/",
            {
                method: "post",
                body: JSON.stringify(
             {
                        title,
                        body
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
            alert(response.statusText);
        }
    }
}

document.querySelector('#newPostBtn').addEventListener('click', showNewPostForm);
document.querySelector('#createBtn').addEventListener('click', createBtnHandler);