document.addEventListener('DOMContentLoaded', async function () {
    // DISPLAY CURRENT DATE ON DASHBOARD LOAD
    const currentDateElement = document.getElementById('currentDate');
    const currentDate = new Date();
    currentDateElement.textContent = currentDate.toDateString();
});

document.addEventListener('DOMContentLoaded', async function () {
    // DISPLAY CURRENT DATE ON DASHBOARD LOAD
    const commentTimeElements = document.querySelectorAll('#commentTime');
    const currentDate = new Date();

    // Iterate over all elements with the class 'commentTime' and set their text content
    commentTimeElements.forEach(element => {
        element.textContent = currentDate.toDateString();
    });
});

document.addEventListener('DOMContentLoaded', async function () {
    // DISPLAY CURRENT DATE ON DASHBOARD LOAD
    const blogTimeElements = document.querySelectorAll('#blogTime');
    const currentDate = new Date();

    // Iterate over all elements with the id 'blogTime' and set their text content
    blogTimeElements.forEach(element => {
        element.textContent = currentDate.toDateString();
    });
});
