const logoutHandler = async () => {
    const response = await fetch('/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    // Send to homepage for login/register if succesful.
    if (response.ok) {
      document.location.replace('/');
      alert('you are now logged out.')
    } else {
      alert('Failed to log out.');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logoutHandler);
  