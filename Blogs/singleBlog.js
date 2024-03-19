import STORAGE_URI  from "../API/storageApi.js";
import Base_URL from "../API/api.js"
import {gettingUserName, gettingToken} from '../Services/userServices.js'
document.addEventListener("DOMContentLoaded", function() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const blogId = urlSearchParams.get('blogId');
    const apiUrl = `http://localhost:3000/api/blogs/${blogId}`;

    const blogContainer = document.getElementById('blog-container');
    const commentsContainer = document.getElementById('comments');
    const commentInput = document.getElementById('comment-input');

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayBlog(data);
        console.log(data);
        console.log(data.comments);
        displayComments(data.comments);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });

    document.getElementById('add-comment-btn').addEventListener('click', addComment);

    function displayBlog(blog) {
        const blogPost = document.createElement('div');
        blogPost.classList.add('blog-post');
        blogPost.innerHTML = `
            <h2>${blog.title}</h2>
            <h3>${blog.headlineText}</h3>
            <img src="${STORAGE_URI}/${blog.imageUrl}" alt="Blog Image">
            <p>${blog.content}</p>
        `;
        blogContainer.appendChild(blogPost);
    }

    function displayComments(comments) {
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <strong>${comment.author}</strong>: ${comment.content}
            `;
            commentsContainer.appendChild(commentElement);
        });
    }

    function addComment() {
        const commentText = commentInput.value.trim();
        const userName = gettingUserName();
        const token = gettingToken();
    
        if (commentText !== "") {
            const comment = {
                author: userName,
                content: commentText
            };
    
            fetch(`${Base_URL}/blogs/comment/${blogId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(comment),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
               
                commentInput.value = '';
                alert(comment);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                alert('Failed to add comment. Please try again later.');
            });
        } else {
            alert("Please enter a comment.");
        }
    }
    
});
