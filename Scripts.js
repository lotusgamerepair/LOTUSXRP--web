document.getElementById('data-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const info = e.target.elements.info.value;
  const prompt = `${info}`;

  document.getElementById('result').innerHTML = 'Loading...';

  // Perform the necessary AI processing or API calls here
  // and update the result div with the obtained data
  // For example:
  const fakeAPIResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await fakeAPIResponse.json();

  document.getElementById('result').innerHTML = data.title;
});
