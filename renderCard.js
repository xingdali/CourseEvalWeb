window.onload = function() {
  const root = document.getElementById('root')
  console.log(courseData[117].subject);
  for (let i = 0; i <= 9007; i++) {
    if (courseData[i].subject == undefined) {
      continue;
    } 
    root.insertAdjacentHTML('beforeend', renderCourseCard(courseData[i]));
  }
};


function renderCourseCard (course) {
  let courseTitle = course.subject + " " + course.courseNum;

  return `<div class="column is-one-third" style="float: left" display:inline;>
            <div class="card" style="width: 300px;height: 200px;">
              <header class="card-header">
                <p class="card-header-title">${courseTitle}</p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
            <div class="card-content">
              <div class="content">
                <span> Name: ${course.className} </span><br>
                <span> Instructor: ${course.instructor} </span><br>
              </div>
          </div>`
};
  