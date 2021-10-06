async function reply_click(id){
  
    const safeguard = await confirm("Are you sure that you would like to delete this post?");
    if (safeguard == true) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });
    
        if(response.ok) {
        document.location.replace('/dashboard');
        }
         else {
        alert(response.statusText);
        }
    }
}
