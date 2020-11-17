function getAllCard() {
  const root = document.getElementById('root');
  const back = document.getElementById('back');
  back.innerHTML = ''
  root.innerHTML = ''
  for (let i = 0; i <= 9007; i++) {
    if (courseData[i].subject == undefined) {
      continue;
    } 
    root.insertAdjacentHTML('beforeend', renderCourseCard(i));
  }
}


function renderCourseCard (id) {
  const course = courseData[id];
  let courseTitle = course.subject + " " + course.courseNum;

  return `<div class="column is-one-third" style="float: left" display:inline;>
            <div class="card" style="width: 300px;height: 200px;">
              <header class="card-header">
                <a class="card-header-title" onclick=renderCoursePage(${id})>${courseTitle}</a>
                <a href="" class="card-header-icon" aria-label="more options">
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

function renderCoursePage (id) {
  const root = document.getElementById('root');
  const back = document.getElementById('back');

  const course = courseData[id];
  let courseTitle = course.subject + " " + course.courseNum;
  back.innerHTML = `<a class="button is-white is-outlined" onclick=getAllCard()>
                      &lt;Back
                    </a>`
  root.innerHTML = `<div class="hero-body">
                      <div class="container">
                        <h1 class="title">
                          ${course.className}
                        </h1>
                        <h2 class="subtitle">
                          ${courseTitle}
                        </h2>
                      </div>
                    </div>`
}
