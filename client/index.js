const postForm = document.getElementById('botForm');
const postFeed = document.getElementById('postFeed');


//load posts from the server
const loadPosts = async () => {
  const res = await fetch('/posts');
  const posts = await res.json();
  postFeed.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${post.author.username}</strong>: ${post.content}</p>
      <p>Beeps: ${post.beeps} | Boops: ${post.boops}</p>
    `;
    postFeed.appendChild(div);
  });
};

postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(postForm);
  const content = formData.get('content');
  await fetch('/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  postForm.reset();
  loadPosts();
});

window.onload = loadPosts;
