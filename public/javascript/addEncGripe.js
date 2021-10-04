// // This will go on the dashboard.handlebars

async function newGripeHandler(event) {
    event.preventDefault();

    const content = document.querySelector('textarea[id="gripeModalInput"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            content,
            category_id: 2
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


async function newEncHandler(event) {
    event.preventDefault();

    const content = document.querySelector('textarea[id="encModalInput"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            content,
            category_id:1
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

document.querySelector('.gripeForm').addEventListener('submit', newGripeHandler);
document.querySelector('.encForm').addEventListener('submit', newEncHandler);

// Add button logic to submit the add encouragements modal