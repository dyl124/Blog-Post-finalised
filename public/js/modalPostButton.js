const blogPostHandler = async (event) => {
  event.preventDefault();
  

  let userId;

  try {
    // Using Fetch API to get user ID
    const userIdResponse = await fetch('/getUserId');
    const userIdData = await userIdResponse.json();
    userId = userIdData.userId;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    // Handle error, show a message to the user, etc.
    return;
  }

  try {
    // Continue with the blog post handling
    const blogTitleInput = document.getElementById('tittleModal');
    const authorInput = document.getElementById('authorModal');
    const blogContentInput = document.getElementById('blogContent');

    const blogTitle = blogTitleInput.value;
    const author = authorInput.value;
    const blogContent = blogContentInput.value;

    const response = await fetch('/addblog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blog_tittle: blogTitle,
        author: author,
        blog_content: blogContent,
        user_id: userId,
      }),
    });
    if (!userId) {
      alert('Please login');
    }
    
    if (response.ok) {
      alert('New blog received.');
      window.location.reload();
      // Handle success, maybe close the modal, refresh the blog list, etc.
    } else {
      console.error('Error creating blog post:', response.status);

      // Log the response text for debugging

      // Handle the error, show a message to the user, etc.
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    // Handle network errors, unexpected issues, etc.
  }
};

document.querySelector('#blogForm').addEventListener('submit', blogPostHandler);
