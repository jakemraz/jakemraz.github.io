// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // 검색 기능
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const mainContent = document.getElementById('main-content');

    // 모든 포스트 데이터 수집
    let posts = [];
    
    // Jekyll에서 JSON 데이터 생성 (실제로는 search.json 파일 필요)
    // 임시로 DOM에서 포스트 수집
    function collectPosts() {
        const postElements = document.querySelectorAll('.post');
        posts = Array.from(postElements).map(post => {
            const titleElement = post.querySelector('.post-title a');
            const excerptElement = post.querySelector('.post-excerpt');
            const metaElement = post.querySelector('.post-meta');
            
            return {
                title: titleElement ? titleElement.textContent : '',
                url: titleElement ? titleElement.getAttribute('href') : '',
                excerpt: excerptElement ? excerptElement.textContent : '',
                date: metaElement ? metaElement.textContent : ''
            };
        });
    }

    function performSearch(query) {
        if (!query.trim()) {
            searchResults.style.display = 'none';
            mainContent.style.display = 'block';
            return;
        }

        collectPosts();
        
        const results = posts.filter(post => {
            const searchText = (post.title + ' ' + post.excerpt).toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        displayResults(results, query);
    }

    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="post" style="text-align: center; padding: 3rem;">
                    <h2>검색 결과 없음</h2>
                    <p>"${query}"에 대한 결과를 찾을 수 없습니다.</p>
                </div>
            `;
        } else {
            let html = `<h2>검색 결과 (${results.length}개)</h2>`;
            results.forEach(post => {
                html += `
                    <article class="post search-result-item">
                        <a href="${post.url}">
                            <h3>${post.title}</h3>
                            <div class="post-meta">${post.date}</div>
                            <p class="post-excerpt">${post.excerpt}</p>
                        </a>
                    </article>
                `;
            });
            searchResults.innerHTML = html;
        }

        searchResults.style.display = 'block';
        mainContent.style.display = 'none';
    }

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value;
            performSearch(query);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                performSearch(query);
            }
        });

        // 검색어 초기화
        searchInput.addEventListener('input', function() {
            if (searchInput.value === '') {
                searchResults.style.display = 'none';
                mainContent.style.display = 'block';
            }
        });
    }
});