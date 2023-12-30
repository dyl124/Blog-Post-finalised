let blogId; // Declare blogId outside the function

const getBlogId = () => {
  const updateBtns = document.querySelectorAll('.newComment');

  // Declare blogId outside the forEach loop
  updateBtns.forEach(button => {
    button.addEventListener('click', () => {
      // Use dataset.id to get the value from data-id attribute
      blogId = button.dataset.id;
    });
  });
};

// Call the function to get the button ID
getBlogId();

const commentPostHandler = async (event) => {
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
    const commentInput = document.getElementById('commentContent');
    const newComment = commentInput.value;

    // Use the captured blogId here
    const response = await fetch('/addcomment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: newComment,
        blog_id: blogId,
        user_id: userId
      }),
    });
    
    if (!userId) {
      alert('Please login');
    }
    if (response.ok) {
      alert('New Comment received.');
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

document.querySelector('#commentform').addEventListener('submit', commentPostHandler);
