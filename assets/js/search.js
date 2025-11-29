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

    let postsData = [];
    let isDataLoaded = false;

    // search.json에서 포스트 데이터 로드
    async function loadPostsData() {
        if (isDataLoaded) return;
        
        try {
            const response = await fetch('/search.json');
            postsData = await response.json();
            isDataLoaded = true;
        } catch (error) {
            console.error('검색 데이터 로드 실패:', error);
        }
    }

    // 페이지 로드 시 데이터 미리 로드
    loadPostsData();

    function performSearch(query) {
        if (!query.trim()) {
            searchResults.style.display = 'none';
            mainContent.style.display = 'block';
            return;
        }

        if (!isDataLoaded) {
            searchResults.innerHTML = `
                <div class="post" style="text-align: center; padding: 2rem;">
                    <p>검색 데이터를 불러오는 중...</p>
                </div>
            `;
            searchResults.style.display = 'block';
            mainContent.style.display = 'none';
            
            loadPostsData().then(() => {
                performSearch(query);
            });
            return;
        }

        const queryLower = query.toLowerCase();
        const results = postsData.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(queryLower);
            const contentMatch = post.content.toLowerCase().includes(queryLower);
            const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(queryLower));
            
            return titleMatch || contentMatch || tagsMatch;
        });

        displayResults(results, query);
    }

    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-header">
                    <h2>검색 결과</h2>
                    <button id="close-search" class="close-search-btn">✕</button>
                </div>
                <div class="post" style="text-align: center; padding: 3rem;">
                    <h3 style="margin-bottom: 1rem;">검색 결과 없음</h3>
                    <p>"${escapeHtml(query)}"에 대한 결과를 찾을 수 없습니다.</p>
                </div>
            `;
        } else {
            let html = `
                <div class="search-header">
                    <h2>검색 결과 (${results.length}개)</h2>
                    <button id="close-search" class="close-search-btn">✕</button>
                </div>
            `;
            
            results.forEach(post => {
                // 검색어 하이라이트
                const highlightedTitle = highlightText(post.title, query);
                const highlightedExcerpt = highlightText(post.excerpt, query);
                
                html += `
                    <article class="post search-result-item">
                        <h3 class="post-title">
                            <a href="${post.url}">${highlightedTitle}</a>
                        </h3>
                        <div class="post-meta">${post.date}</div>
                        <p class="post-excerpt">${highlightedExcerpt}</p>
                        <a href="${post.url}" class="read-more">더 읽기 →</a>
                    </article>
                `;
            });
            searchResults.innerHTML = html;
            
            // 닫기 버튼 이벤트
            document.getElementById('close-search').addEventListener('click', closeSearch);
        }

        searchResults.style.display = 'block';
        mainContent.style.display = 'none';
    }

    function highlightText(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return escapeHtml(text).replace(regex, '<mark>$1</mark>');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function closeSearch() {
        searchResults.style.display = 'none';
        mainContent.style.display = 'block';
        searchInput.value = '';
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

        // ESC 키로 검색 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSearch();
            }
        });
    }
});