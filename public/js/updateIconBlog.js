var buttonId; // Declare buttonId outside the functions

const getButtonId = () => {
  const updateBtns = document.querySelectorAll('.updateBlog');

  updateBtns.forEach(button => {
    button.addEventListener('click', () => {
      buttonId = button.dataset.id;
     let texttittle = document.getElementById('blogModalLabel');
     texttittle.innerHTML = 'Update your blog';
     
    });
  });
};

getButtonId();


const updateHandler = async (event) => {
  event.preventDefault();

  let userId;

  try {
    // Using Fetch API to get user ID
    const userIdResponse = await fetch('/getUserId');
    const userIdData = await userIdResponse.json();
    userId = userIdData.userId;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return;
  }

  try {
    // Continue with the blog post handling
    const blogTitleInput = document.getElementById('ttittleModal');
    const authorInput = document.getElementById('aauthorModal');
    const blogContentInput = document.getElementById('bblogContent');

    // Call the function to get the butto n ID
    getButtonId();
    const blogTitle = blogTitleInput.value;
    const author = authorInput.value;
    const blogContent = blogContentInput.value;

    const response = await fetch(`/update/${buttonId}`, {
      method: 'PUT',
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
      alert('Blog updated successfully.');
      window.location.reload();
    } else {
      console.error('Error updating blog:', response.status);

    }
  } catch (error) {
    console.error('Error updating blog:', error);
  }
};

document.querySelector('#updateBlog').addEventListener('submit', updateHandler);
