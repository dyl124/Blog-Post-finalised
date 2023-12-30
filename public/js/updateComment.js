let commentId; // Declare commentId outside any function to make it accessible
const getCommentId = () => {
  const updateBtns = document.querySelectorAll('.editComment');

  // Declare commentId outside the forEach loop
  updateBtns.forEach(button => {
    button.addEventListener('click', () => {
      // Use dataset.id to get the value from data-id attribute
      commentId = button.dataset.id;
    });
  });
};

// Call the function to get the comment ID
getCommentId();

const commentPutHandler = async (event) => {
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
    // Continue with the comment handling
    const commentInput = document.getElementById('updatecommentContent');
    const newComment = commentInput.value;

    // Use the captured commentId here
    const response = await fetch(`/updateComment/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: newComment,
        user_id: userId
      }),
    });

    if (!userId) {
      alert('Please login');
    }
    if (response.ok) {
      alert('Comment updated.');
      window.location.reload();
      // Handle success, maybe close the modal, refresh the comment list, etc.
    } else {
      console.error('Error updating comment:', response.status);


    }
  } catch (error) {
    console.error('Error updating comment:', error);
    // Handle network errors, unexpected issues, etc.
  }
};

document.querySelector('#updatecommentform').addEventListener('submit', commentPutHandler);
