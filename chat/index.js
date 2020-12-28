import{Employee} from './employee.js';
import{Person} from './person.js';

const socket = io();

document.getElementById('join-chat-button').addEventListener('click', function() {
    const input = document.getElementById('user-name-input');
    const userName = input.value;
    if (userName.length > 0) {
        document.getElementById('user-name-missing').classList.add('display-none');
        socket.emit('join-chat', userName);
    } else {
        document.getElementById('user-name-missing').classList.remove('display-none');
    }
})

socket.on('joined-chat', function(usersNo) {
    console.log('You joined chat!');
    document.getElementById('chat-container').classList.remove('display-none');
    // TEMA 3
    document.getElementById('online-users').innerHTML = usersNo;
    // END
})

document.getElementById('send-message-button').addEventListener('click', function() {
    const input = document.getElementById('message');
    const color = document.getElementById("color").value;
    const message = input.value;
    input.value='';
    socket.emit('send-message', message, color);
})

socket.on('new-message', function(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = message;
    messagesContainer.appendChild(messageElement);
})

document.getElementById('leave-chat-button').addEventListener('click', function () {
    const input = document.getElementById('user-name-input');
    const userName = input.value;
    socket.emit('leave-chat', userName);
})

socket.on('menu', function() {
    // console.log('You left chat!');
    document.getElementById('chat-container').classList.add('display-none');
})

const employee = new Employee('John', 7540);
employee.walk();
employee.work();
employee.getSalary();
employee.vacation();
employee.details();

const person = new Person('Ana');
person.walk();
person.details();

let arr = [1 ,-2, 6, -7,10, 9, 14, true, false, null, undefined];

let result = arr.filter(function (item) {
    return (parseInt(item) == item);
  }).map(x => x*10).reduce((a, b) => a + b);

  console.log(result);
  