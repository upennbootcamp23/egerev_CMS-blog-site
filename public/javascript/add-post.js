async function newPostCreator(action) { 
    action.preventDefault();

    let title = document.querySelector('input[name="post-title"]').value;
    let post_message = document.querySelector('input[name="post-content"]').value;      

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_message
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);