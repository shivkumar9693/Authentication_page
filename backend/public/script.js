document.getElementById('teacherSelect').addEventListener('change', function () {
    const teacherId = this.value;
    
    if (teacherId) {
      fetch(`/api/teachers/${teacherId}`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('teacherProfile').style.display = 'block';
          document.getElementById('name').textContent = data.name;
          document.getElementById('profilePicture').src = data.profilePicture;
          document.getElementById('subject').textContent = data.subject;
          document.getElementById('email').textContent = data.email;
          document.getElementById('phone').textContent = data.phone;
          document.getElementById('bio').textContent = data.bio;
          document.getElementById('experience').textContent = data.experience;
          document.getElementById('classesHandled').textContent = data.classesHandled.join(', ');
        })
        .catch(error => console.error(error));
    } else {
      document.getElementById('teacherProfile').style.display = 'none';
    }
  });
  