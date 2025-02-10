const apiKey = 'a843ac04503645f6999beab84ba8e822';
const apiUrl = `https://newsapi.org/v2/everything?q=kabaddi&apiKey=${apiKey}`;

// Create main container
const mainContainer = document.createElement('div');
mainContainer.style.display = 'flex';
mainContainer.style.margin = '20px';
document.body.appendChild(mainContainer);

// Create news container
const newsContainer = document.createElement('div');
newsContainer.id = 'news-container';
newsContainer.style.flex = '3';
newsContainer.style.display = 'grid';
newsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
newsContainer.style.gap = '20px';
newsContainer.style.marginRight = '20px';
mainContainer.appendChild(newsContainer);

// Create recommendations container
const recommendationsContainer = document.createElement('div');
recommendationsContainer.id = 'recommendations-container';
recommendationsContainer.style.flex = '1';
recommendationsContainer.style.backgroundColor = '#f9f9f9';
recommendationsContainer.style.padding = '15px';
recommendationsContainer.style.borderRadius = '8px';
mainContainer.appendChild(recommendationsContainer);

// Add styling
const style = document.createElement('style');
style.innerHTML = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
  }
  .news-item, .recommendation-item {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .news-item img, .recommendation-item img {
    width: 100%;
    height: auto;
  }
  .news-item h3, .recommendation-item h4 {
    margin: 10px;
  }
  .news-item p {
    margin: 10px;
    color: #555;
  }
  .news-item a, .recommendation-item a {
    margin: 10px;
    display: inline-block;
    text-decoration: none;
    color: #007BFF;
    font-size: 14px;
  }
  #recommendations-container h2 {
    text-align: center;
    margin-bottom: 15px;
  }
`;
document.head.appendChild(style);

// Fetch and display tennis news
async function fetchkabaddiNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const articles = data.articles.slice(0, 30); // Show top 30 news for grid
    const recommendedArticles = data.articles.slice(8, 13); // Recommend 5 articles

    articles.forEach(article => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      newsItem.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
        <h3>${article.title}</h3>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(newsItem);
    });

    recommendationsContainer.innerHTML = '<h2>Recommended News</h2>';
    recommendedArticles.forEach(article => {
      const recommendationItem = document.createElement('div');
      recommendationItem.className = 'recommendation-item';
      recommendationItem.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="Recommended News">
        <h4>${article.title}</h4>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      recommendationsContainer.appendChild(recommendationItem);
    });

  } catch (error) {
    console.error('Error fetching cricket news:', error);
    newsContainer.innerHTML = '<p>Failed to load cricket news. Please try again later.</p>';
  }
}

fetchkabaddiNews();
