const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// Hàm render quốc gia
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>😁</span>${(
        +data.population / 1000000
      ).toFixed(1)} million people</p>
      <p class="country__row"><span>👂</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
  btn.style.position = 'absolute';
  btn.style.bottom = '20px'; // Khoảng cách từ đáy trang
  btn.style.left = '50%'; // Canh giữa
  btn.style.transform = 'translateX(-50%)'; // Canh giữa hoàn hảo
};

// Hàm lấy dữ liệu quốc gia
const getCountryData = function (country) {
  // Fetch quốc gia chính
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders ? data[0].borders[0] : null;
      if (!neighbour) return;

      // Fetch quốc gia láng giềng
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    //chỉ gọi khi promise hoàn thành
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      //chỉ được gọi khi promise từ chối
      //bắt lỗi khi xảy ra 1 lỗi trong chuỗi
      console.error(`Something went wrong: ${err.message}`);
      countriesContainer.insertAdjacentHTML(
        'beforeend',
        `<p >Something went wrong: ${err.message}</p>`
      );
      // countriesContainer.style.opacity = 1;
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
      //luôn xảy ra dù promise đúng hay sai
    });
};

// Lắng nghe sự kiện click trên nút
btn.addEventListener('click', function () {
  getCountryData('germany');
});

// const whereAmI = async function (country) {};
// //thêm async
