var date = new Date();
var tdate = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
if (month<10) {
    month = '0'+ month;
}
if (date<10) {
    date = '0'+ date;
}
var mindate = year+ "-"+month+"-"+tdate;
document.getElementById("date").setAttribute('min', mindate)
console.log(mindate);

var date = document.getElementById('date');

