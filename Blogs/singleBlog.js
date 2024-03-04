// Sample blog data
const blog = {
    title: "First Blog Post",
    headline: "Introduction to Vanilla JavaScript",
    fulltext: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lorem nec odio dictum varius. Duis at nisl eu nisi maximus commodo ut vel libero. Nulla facilisi.",
    image: "https://via.placeholder.com/800x400"
};

let comments = [];

function displayBlog() {
    const blogContainer = document.getElementById('blog-container');

    const blogPost = document.createElement('div');
    blogPost.classList.add('blog-post');

    const titleElement = document.createElement('h2');
    titleElement.textContent = blog.title;

    const headlineElement = document.createElement('h3');
    headlineElement.textContent = blog.headline;

    const fulltextElement = document.createElement('p');
    fulltextElement.textContent = blog.fulltext;

    const imageElement = document.createElement('img');
    imageElement.src = blog.image;
    imageElement.alt = blog.title;

    blogPost.appendChild(titleElement);
    blogPost.appendChild(headlineElement);
    blogPost.appendChild(fulltextElement);
    blogPost.appendChild(imageElement);

    blogContainer.appendChild(blogPost);
}

function addComment() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();
    const userName =  'Mulo The Great';

    if (userName && commentText !== '') {
        const comment = {
            user: userName,
            text: commentText
        };
        comments.push(comment);
        displayComments();
        commentInput.value = '';
    } else {
        alert('Please provide a user name and comment.');
    }
}

function displayComments() {
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `<strong>${comment.user}:</strong> ${comment.text}`;
        commentsContainer.appendChild(commentElement);
    });
}

displayBlog();
