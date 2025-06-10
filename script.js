/* ---------- تنظیمات اولیه برای API هوا ---------- */
const apiKey = 'YOUR_API_KEY';  // کلید API خود را اینجا وارد کنید
const city = 'Tehran';          // نام شهر مورد نظر

// -------------------------
// جستجوی گوگل
// -------------------------
document.getElementById('googleSearch').addEventListener('submit', function (event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;
  if (query.trim() !== '') {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  }
});

// -------------------------
// به‌روزرسانی زمان و تاریخ
// -------------------------
function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('time').textContent = time;
  document.getElementById('date').textContent = date;
}
setInterval(updateTime, 1000);
updateTime();

// -------------------------
// پیام خوشامدگویی شخصی
// -------------------------
function displayWelcomeMessage() {
  let name = localStorage.getItem('userName');
  if (!name) {
    name = prompt('لطفاً نام خود را وارد کنید:');
    if (name) {
      localStorage.setItem('userName', name);
    } else {
      name = 'دوست عزیز';
    }
  }
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) {
    greeting = 'صبح بخیر';
  } else if (hour < 18) {
    greeting = 'ظهر بخیر';
  } else {
    greeting = 'عصر بخیر';
  }
  const welcomeEl = document.getElementById('welcomeMessage');
  if (welcomeEl) {
    welcomeEl.textContent = `${greeting}، ${name}!`;
  }
}
displayWelcomeMessage();

// -------------------------
// مدیریت لیست کارها (Todo List)
// -------------------------
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between bg-gray-600 p-2 rounded';
    li.innerHTML = `<span>${todo}</span>`;
    const btn = document.createElement('button');
    btn.textContent = '❌';
    btn.classList.add('text-red-500');
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

// -------------------------
// ایجاد منوی تنظیمات روی کاراکتر (تنها تنظیمات: فونت، بک گراند و تم)
// -------------------------
function createSettingsMenu() {
  const menu = document.createElement("div");
  menu.id = "settingsMenu";
  menu.className = "absolute bg-gray-800 text-white p-4 rounded shadow-lg z-50";
  menu.style.top = "60px";     // موقعیت منو (بر اساس طرح خود تنظیم شود)
  menu.style.right = "20px";
  menu.style.display = "none";
  
  // تنها تنظیمات فونت، بک گراند و تم در منو قرار می‌گیرد
  menu.innerHTML = `
    <div class="mb-4">
      <h3 class="text-lg font-bold mb-2">فونت</h3>
      <select id="menuFontSelector" class="bg-gray-600 text-white rounded p-2 w-full">
        <option value="Vazirmatn">Vazirmatn</option>
        <option value="Sahel">Sahel</option>
        <option value="Shabnam">Shabnam</option>
      </select>
    </div>
    <div class="mb-4">
      <h3 class="text-lg font-bold mb-2">بک گراند</h3>
      <input type="file" id="menuBackgroundInput" accept="image/*" class="text-white w-full" />
    </div>
    <div class="mb-4">
      <h3 class="text-lg font-bold mb-2">تم</h3>
      <select id="menuThemeSelector" class="bg-gray-600 text-white rounded p-2 w-full">
        <option value="minimal">مینیمال</option>
        <option value="modern">مدرن</option>
      </select>
    </div>
  `;
  document.body.appendChild(menu);
  
  // تغییر فونت از منوی تنظیمات
  document.getElementById("menuFontSelector").addEventListener("change", function() {
    document.body.style.fontFamily = this.value;
  });
  // تغییر تم از منوی تنظیمات
  document.getElementById("menuThemeSelector").addEventListener("change", function() {
    if (this.value === "modern") {
      document.body.classList.remove("bg-minimal");
      document.body.classList.add("bg-modern");
    } else {
      document.body.classList.remove("bg-modern");
      document.body.classList.add("bg-minimal");
    }
  });
  // تغییر تصویر پس‌زمینه از منوی تنظیمات
  document.getElementById("menuBackgroundInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.body.style.backgroundImage = `url(${e.target.result})`;
        localStorage.setItem("backgroundImage", e.target.result);
      }
      reader.readAsDataURL(file);
    }
  });
  
  return menu;
}

// -------------------------
// رویداد کلیک روی تصویر کاراکتر جهت نمایش/پنهان کردن منوی تنظیمات
// -------------------------
const userIcon = document.getElementById("userIcon");
if (userIcon) {
  userIcon.addEventListener("click", function() {
    const menu = document.getElementById("settingsMenu") || createSettingsMenu();
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  });
}

// -------------------------
// بارگزاری تصویر پس‌زمینه ذخیره شده (در صورت وجود)
// -------------------------
const savedBackground = localStorage.getItem("backgroundImage");
if (savedBackground) {
  document.body.style.backgroundImage = `url(${savedBackground})`;
}

// -------------------------
// یادداشت ها
// -------------------------
const notesArea = document.getElementById('notesArea');
if (notesArea) {
  notesArea.value = localStorage.getItem('notes') || '';
  notesArea.addEventListener('input', () => {
    localStorage.setItem('notes', notesArea.value);
  });
}

// -------------------------
// نقل قول روز
// -------------------------
function fetchQuote() {
  fetch('https://api.quotable.io/random?lang=fa')
    .then(res => res.json())
    .then(data => {
      document.getElementById('quoteText').textContent = data.content;
    })
    .catch(() => {
      const quotes = [
        'زندگی زیباست.',
        'آنکه برای دیگران شمع می‌افروزد، خود می‌سوزد.',
        'هر که طاووس خواهد، جور هندوستان کشد.'
      ];
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      document.getElementById('quoteText').textContent = quote;
    });
}
fetchQuote();

// -------------------------
// دریافت اطلاعات آب و هوا برای بخش اصلی صفحه
// -------------------------
function fetchWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fa`)
    .then(response => response.json())
    .then(data => {
      if (data.weather && data.weather.length > 0) {
        document.getElementById('weatherInfo').textContent = `${data.weather[0].description} - ${data.main.temp}°C`;
      } else {
        document.getElementById('weatherInfo').textContent = 'اطلاعات آب و هوا در دسترس نیست';
      }
    })
    .catch(error => {
      console.error('خطا در دریافت اطلاعات آب و هوا:', error);
      document.getElementById('weatherInfo').textContent = 'مشکل در دریافت اطلاعات آب و هوا';
    });
}
fetchWeather();

// -------------------------
// ساخت تقویم در صفحه اصلی (تقویم ثابت در بخش اصلی)
// -------------------------
function generateMainCalendar() {
  const calendarContainer = document.getElementById("mainCalendar");
  if (!calendarContainer) return;
  
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 1) % 7;
  
  let calendarHTML = `
    <div class="text-center mb-2 font-bold">
      ${now.toLocaleString('fa-IR', { month: 'long', year: 'numeric' })}
    </div>
    <div class="grid grid-cols-7 gap-1 text-center text-sm">
  `;
  
  const daysOfWeek = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  daysOfWeek.forEach(day => {
    calendarHTML += `<div class="font-semibold">${day}</div>`;
  });
  
  for (let i = 0; i < offset; i++) {
    calendarHTML += `<div></div>`;
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    if (day === now.getDate()) {
      calendarHTML += `<div class="bg-green-500 rounded-full p-1">${day}</div>`;
    } else {
      calendarHTML += `<div>${day}</div>`;
    }
  }
  calendarHTML += `</div>`;
  calendarContainer.innerHTML = calendarHTML;
}

// فراخوانی تقویم در صفحه اصلی پس از بارگذاری
generateMainCalendar();
