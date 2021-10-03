// This gets linked on encouragements.handlebars
let post_id = document.querySelector('label [for="postNumber"]').id();
console.log('post_id: ',post_id);

// Button logic for commenting
async function commentFormHandler(event){
    event.preventDefault();

    const content = document.querySelector('textarea[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    if(content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                content
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}



// Button logic for getting a new random encouragement 
async function encouragementHandler(event){
    event.preventDefault();

    if(comment_text) {
        const response = await fetch('/', {
            method: 'GET',
            body: JSON.stringify({
                content
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}


// Button logic to add hugs to the post 
async function hugHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/posts/hug', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
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

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
document.querySelector('#nextEncBtn').addEventListener('click', encouragementHandler);
document.querySelector('#hug-btn').addEventListener('click', hugHandler);