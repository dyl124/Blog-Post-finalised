document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.deleteBlog');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const buttonId = button.dataset.id;


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

        const response = await fetch(`/${buttonId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });
        if (!userId) {
          alert('Please login');
        }
        if (response.ok) {
          // Blog deleted successfully
          confirm('Are you sure you want to delete this blog?')
          window.location.reload();
        } else {
          // Handle error response
          const errorMessage = await response.json();
          console.error('Error deleting blog:', errorMessage.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    });
  });
});
