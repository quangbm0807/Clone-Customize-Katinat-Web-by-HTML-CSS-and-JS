function openCity(evt, cityName) {
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
    evt.currentTarget.className += " active";
  }
function validate(evtObj) {
evtObj.preventDefault();

let fullName = document.getElementById('ho').value;
let email = document.getElementById('mail').value;
let password = document.getElementById('pass').value;
let confirmPassword = document.getElementById('passCheck').value;
let phoneNumber = document.getElementById('number').value;
let birthDate = document.querySelector('input[name="birthDate"]').value;
let region = document.querySelector('select[name="region"]').value;
let gender = document.querySelector('select[name="gender"]').value;

let check = checkName(fullName);
if (check === false) {
  alert("Họ và tên không được để trống.");
  return false;
}

check = checkPhone(phoneNumber);
if (check === false)
  return false;

check = checkPass(password);
if (check === false)
  return false;

check = passChecker(password, confirmPassword);
if (check === false)
  return false;

check = checkEmail(email);
if (check === false)
  return false;

check = checkBirthDate(birthDate);
if (check === false)
  return false;

check = checkRegion(region);
if (check === false)
  return false;

check = checkGender(gender);
if (check === false)
  return false;

alert("Đăng ký thành công!");
return true;
}

function checkName(str) {
if (str.trim().length === 0)
  return false;
else
  return true;
}
function checkPass(str) {
if (str.length === 0) {
  alert("Mật khẩu không được để trống");
  return false;
}
if (str.length < 5) {
  alert("Độ dài mật khẩu quá ngắn");
  return false;
}
if (str.match(/[A-Z]/) == null) {
  alert("Mật khẩu phải chứa chữ hoa");
  return false;
}
if (str.match(/[a-z]/) == null) {
  alert("Mật khẩu phải chứa chữ thường");
  return false;
}
if (str.match(/\d/) == null) {
  alert("Mật khẩu phải chứa số");
  return false;
}
return true;
}
function passChecker(str1, str2) {
if (str1 !== str2) {
  alert("Mật khẩu không khớp");
  return false;
}
return true;
}
function checkEmail(str) {
if (str.trim() === '') {
  alert('Email không được để trống.');
  return false;
}
if (str.trim().length === 0)
  return false;
let idx = str.indexOf('@');
if (idx === -1) {
  alert("Email phải chứa '@'");
  return false;
}
let idx_1 = str.lastIndexOf('@');
if (idx !== idx_1) {
  alert("Email không chứa quá 1 ký tự '@'");
  return false;
}
if (idx === 0) {
  alert("Trước '@' không được để trống");
  return false;
}
if (idx === str.length - 1) {
  alert("Sau '@' không được để trống");
  return false;
}
return true;
}
function checkPhone(str) {
if (str.trim().length === 0)
  return false;
if (!/^\d{10}$/.test(str)) {
  alert("Số điện thoại chỉ được chứa số và có độ dài là 10.");
  return false;
}
return true;
}
function checkBirthDate(date) {
if (date.trim() === '') {
  alert('Vui lòng chọn ngày sinh.');
  return false;
}
return true;
}

function checkRegion(region) {
if (region.trim() === '') {
  alert('Vui lòng chọn khu vực.');
  return false;
}
return true;
}

function checkGender(gender) {
if (gender.trim() === '') {
  alert('Vui lòng chọn giới tính.');
  return false;
}
return true;
}

let form = document.querySelector("form");
form.addEventListener("submit", validate);