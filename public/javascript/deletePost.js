async function reply_click(id){
  
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
