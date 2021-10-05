// This will get linked in gripes.handlebars

// Side arrow button which will get another random gripe

let post_id = document.querySelector('.post-id').id.trim();

// Button logic for commenting
async function commentFormHandler(event){
    event.preventDefault();

    const content = document.querySelector('textarea[name="gripeComment"]').value.trim();
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

// Button logic for getting a random gripe post 
async function gripeHandler(event){
    console.log('hello');
    event.preventDefault();
            document.location.reload();
}


// Button logic to add hugs to the post 
async function hugHandler(event) {
    event.preventDefault();

    const response = await fetch('/api/posts/giveHug', {
        method: 'PUT',
        body: JSON.stringify({
            post_id,
            category_id: 2
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
document.querySelector('#nextGripeBtn').addEventListener('click', gripeHandler);
document.querySelector('#hug-btn').addEventListener('click', hugHandler);