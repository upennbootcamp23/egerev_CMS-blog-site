async function addComment(event) 
{
    event.preventDefault();

    let post_id = window.location.toString().split('/')[window.location.toString().split('/').length-1];

    const comment = document.getElementById('comment').value.trim();

    if(comment)
    {
        const res= await fetch("/api/comments/",
            {
                method: "post",
                body: JSON.stringify(
             {
                        comment_text:comment,
                        post_id: post_id
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
            document.location.replace(`/posts/${post_id}`);
        } 
        else 
        {
            alert(response.statusText);
        }
    }
}

document.querySelector('#commentBtn').addEventListener('click', addComment);