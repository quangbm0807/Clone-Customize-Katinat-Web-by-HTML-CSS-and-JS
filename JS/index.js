document.addEventListener("DOMContentLoaded", function () {
    let slider = document.querySelector('.slider');
    let slides = document.querySelector('.slides');
    let slideWidth = slider.clientWidth;
    let currentSlide = 0;

    function slideToNext() {
      currentSlide++;
      if (currentSlide >= 2) { // 2 là số lượng hình ảnh trong thanh trượt
        currentSlide = 0;
      }
      slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    setInterval(slideToNext, 1000); // Thay đổi slide mỗi 3 giây
  });
  function openCity(evt, cityName, defaultCityId) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityName).style.display = "block";
  }

  openCity(event, 'London', 'London');
  document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra nếu trình duyệt hỗ trợ Geolocation API
    if ('geolocation' in navigator) {
      // Hiển thị thông báo yêu cầu truy cập vị trí
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          alert(`Vị trí của bạn: Vĩ độ: ${latitude}, Kinh độ: ${longitude}`);
        },
        function (error) {
          // Xử lý trường hợp người dùng từ chối truy cập vị trí
          console.error('Không thể truy cập vị trí:', error);
          alert('Bạn đã từ chối truy cập vị trí.');
        }
      );
    } else {
      // Xử lý trường hợp trình duyệt không hỗ trợ Geolocation API
      alert('Trình duyệt không hỗ trợ truy cập vị trí.');
    }
  });
  
