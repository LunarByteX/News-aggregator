const newsApis = {
    cricket: `https://newsapi.org/v2/everything?q=cricket&apiKey=a843ac04503645f6999beab84ba8e822`,
    basketball: `https://newsapi.org/v2/everything?q=basketball&apiKey=a843ac04503645f6999beab84ba8e822`,
    football: `https://newsapi.org/v2/everything?q=football&apiKey=a843ac04503645f6999beab84ba8e822`,
    tennis: `https://newsapi.org/v2/everything?q=volleyball&apiKey=a843ac04503645f6999beab84ba8e822`,
    kabaddi: `https://newsapi.org/v2/everything?q=kabaddi&apiKey=a843ac04503645f6999beab84ba8e822`,
};

// Function to fetch news and display it
function fetchNews(sectionId, apiUrl) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById(sectionId);
            newsContainer.innerHTML = ""; // Clear previous news

            const articles = data.articles || [];
            articles.slice(0, 9).forEach(article => {
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';
                newsCard.innerHTML = `
                    <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
                    <h3>${article.title}</h3>
                    <p>${article.description || 'No description available.'}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => console.error(`Error fetching news for ${sectionId}:`, error));
}

// Function to fetch all news at once
function fetchAllNews() {
    Object.keys(newsApis).forEach(section => fetchNews(`${section}-news`, newsApis[section]));
}

// Fetch news initially and set refresh interval
fetchAllNews();
setInterval(fetchAllNews, 5 * 60 * 1000); // Refresh news every 5 minutes

// ------------------ ICC & Premier League Standings ------------------

// API URLs
const iccApi = 'https://api.cricapi.com/v1/rankings?apikey=3b7e25d5-5f6d-48f6-863f-c44fe72c1cc7';
const premierLeagueApi = 'https://api-football-standings.azharimm.site/leagues/eng.1/standings';

// Fetch ICC Cricket Rankings
function fetchICCRankings() {
    fetch(iccApi)
        .then(response => response.json())
        .then(data => {
            const iccContainer = document.querySelector("#icc-rankings ul");
            iccContainer.innerHTML = ""; // Clear existing data

            if (data.data) {
                const rankingType = data.data.find(rank => rank.format === "ODI"); // Choose ODI rankings
                if (rankingType) {
                    const teams = rankingType.teams.slice(0, 5); // Top 5 teams
                    teams.forEach(team => {
                        const li = document.createElement("li");
                        li.textContent = `${team.rank}. ${team.name} (${team.points} pts)`;
                        iccContainer.appendChild(li);
                    });
                } else {
                    iccContainer.innerHTML = "<li>Data not available</li>";
                }
            } else {
                iccContainer.innerHTML = "<li>Data not available</li>";
            }
        })
        .catch(error => console.error("Error fetching ICC Rankings:", error));
}

// Fetch Premier League Standings
function fetchPremierLeagueStandings() {
    fetch(premierLeagueApi)
        .then(response => response.json())
        .then(data => {
            const premierContainer = document.querySelector("#premier-league-standings ul");
            premierContainer.innerHTML = ""; // Clear existing data

            if (data.data && data.data.standings) {
                const teams = data.data.standings.slice(0, 5); // Top 5 teams
                teams.forEach(team => {
                    const li = document.createElement("li");
                    li.textContent = `${team.position}. ${team.team.name} (${team.points} pts)`;
                    premierContainer.appendChild(li);
                });
            } else {
                premierContainer.innerHTML = "<li>Data not available</li>";
            }
        })
        .catch(error => console.error("Error fetching Premier League Standings:", error));
}

// Fetch rankings on page load
fetchICCRankings();
fetchPremierLeagueStandings();
