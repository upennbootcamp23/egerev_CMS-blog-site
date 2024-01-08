async function editBtnHandler(event) 
{
    event.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();

    if(title && body)
    {
        const id = window.location.toString().split('/')[window.location.toString().split('/').length-1];
        const res= await fetch(`/api/posts/${id}`,
            {
                method: "put",
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

async function deleteBtnHandler(event) 
{
    event.preventDefault();


        const id = window.location.toString().split('/')[window.location.toString().split('/').length-1];
        const res= await fetch(`/api/posts/${id}`,
            {
                method: "delete",
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

document.querySelector('#deleteBtn').addEventListener('click', deleteBtnHandler);
document.querySelector('#editBtn').addEventListener('click', editBtnHandler);