// گوگل سرچ
document.getElementById('googleSearch').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;
  if (query.trim() !== '') {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  }
});

// ساعت و تاریخ
function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('time').textContent = time;
  document.getElementById('date').textContent = date;
}
setInterval(updateTime, 1000);
updateTime();

// Todo List
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo;
    const btn = document.createElement('button');
    btn.textContent = '❌';
    btn.onclick = () => removeTodo(index);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById('todoInput');
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  if (input.value.trim() !== '') {
    todos.push(input.value.trim());
    localStorage.setItem('todos', JSON.stringify(todos));
    input.value = '';
    loadTodos();
  }
}

function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

document.getElementById('addTodoButton').addEventListener('click', addTodo);
loadTodos();

// تغییر فونت
document.getElementById('fontSelector').addEventListener('change', function () {
  document.body.style.fontFamily = this.value;
});

// تغییر تم
document.getElementById('themeSelector').addEventListener('change', function () {
  if (this.value === 'modern') {
    document.body.classList.add('bg-modern');
    document.body.classList.remove('bg-minimal');
  } else {
    document.body.classList.add('bg-minimal');
    document.body.classList.remove('bg-modern');
  }
});

// تصویر پس‌زمینه
document.getElementById('backgroundInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.body.style.backgroundImage = `url(${e.target.result})`;
      localStorage.setItem('backgroundImage', e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// بارگزاری تصویر پس‌زمینه ذخیره‌شده
const savedBackground = localStorage.getItem('backgroundImage');
if (savedBackground) {
  document.body.style.backgroundImage = `url(${savedBackground})`;
}

// آب و هوا (OpenWeatherMap)
const apiKey = 'YOUR_API_KEY';
const city = 'Tehran';

function fetchWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fa`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('weatherInfo').textContent = `${data.weather[0].description} - ${data.main.temp}°C`;
    })
    .catch(error => {
      document.getElementById('weatherInfo').textContent = 'مشکل در دریافت اطلاعات';
    });
}

fetchWeather();
