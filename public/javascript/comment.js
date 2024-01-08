async function commentFormHandler(event) {
    event.preventDefault();

    let comment = document.querySelector('textarea[name="comment-body"]').value.trim();  
    let post_id_number = window.location.toString().split('/')
    [window.location.toString().split('/').length - 1];    

    if(comment) {
        const response = await fetch('/api/comments', {
            method: POST,
            body: JSON.stringify({
                post_id_number,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }    
        });

        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', 'commentFormHandler');