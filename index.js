
// 1)
const apiUrlPosts = 'https://jsonplaceholder.typicode.com/posts';
fetchPosts(apiUrlPosts);

async function fetchPosts(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Результат запроса постов:', data);
    } catch (error) {
        console.error('Ошибка при запросе данных постов:', error.message);
    }
}
// ------------------------------------------
// 2)
function submitForm() {
    const form = document.getElementById('postForm');
    const title = form.elements['title'].value;
    const body = form.elements['body'].value;
    const postData = {
        title: title,
        body: body,
        userId: 1, // Просто для примера
    };
    sendPostRequest('https://jsonplaceholder.typicode.com/albums', postData)
        .then(data => {
            console.log('Ответ сервера:', data);
            alert('Успешно отправлено!');
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка!');
        });
}
function sendPostRequest(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    });
}
    // --------------------------------------------------
   // 3)
    document.addEventListener('DOMContentLoaded', () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(users => {
                const userList = document.getElementById('userList');
                users.forEach(user => {
                    const listItem = document.createElement('li');
                    listItem.textContent = user.name;
                    userList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
    // -----------------------------------------------------
//   4)
function getData() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/nonexistent'; // Ссылка на несуществующий ресурс, чтобы вызвать ошибку 404 (Not Found)
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные:', data);
        })
        .catch(error => {
            handleApiError(error);
        });
}
function handleApiError(error) {
    const errorContainer = document.getElementById('errorContainer');
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = `Произошла ошибка: ${error.message}`;
    errorContainer.style.display = 'block';
}
// ---------------------------------------------
// 5)
function fetchData() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateDataOnPage(data);
        })
        .catch(error => {
            console.error('Ошибка при запросе к API:', error);
        });
}
function updateDataOnPage(data) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.textContent = JSON.stringify(data);
}
setInterval(fetchData, 5000);// Выполнять запрос каждые 5 секунд
fetchData();// Изначальный запрос при загрузке страницы
