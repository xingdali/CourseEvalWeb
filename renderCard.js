

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

async function renderCoursePage (id) {
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
                    </div>
                    <div id="card">
                    </div>
                    <section class="container">
                      <div class="container" id="comment-list"></div>
                    </section>`
  if (document.cookie) {
    const mybutton = `<button class="button is-info" onclick=generateTextCard(${id})>Share your comment!</button>`
    const card = document.getElementById('card');
    card.innerHTML = mybutton;
  }
  await renderComments(id);
  
}

async function renderComments(id) {
  const course = courseData[id];
  const result = await axios({
    method: 'get',
    url: 'http://localhost:3010/post'
  })
  const list = document.getElementById('comment-list');
  const comment_list = result.data.filter(element => (element.subject == course.subject && element.courseNum == filterInt(course.courseNum)));
  if (comment_list.length == 0) {
    list.innerHTML = '<p>No comments yet, share your experience!<p>';
    return;
  }
  comment_list.forEach(element => {
    let comments = getComments(element);
    list.insertAdjacentHTML('beforeend', comments);
  });
}

function getComments(element) {
  return `<article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="chancellor.jpg">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                    <strong>Nobody</strong> 
                    <br>
                    <span>${element.body}</span>
                    </p>
                </div>

            </div>
          </article>`
}

async function postComment(id) {
    const text = document.getElementById('post');
    const postBox = document.getElementById('post-box');
    const cardPosition = document.getElementById('card');
    const course = courseData[id];
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3010/post',
        data: {
          subject: course.subject,
          courseNum: course.courseNum,
          body: text.value
        }
      });
      if (result.status == 200) {
        const root = document.getElementById('comment-list');
        root.remove();
        renderCoursePage(id);
    }
} 

let generateTextCard = function(id) {
  const cardPosition = document.getElementById('card');
  const card = `<article class="media" id="post-box">
              <figure class="media-left">
              <p class="image is-64x64">
                  <img src="chancellor.jpg">
              </p>
              </figure>
              <div class="media-content">
              <div class="field">
                  <p class="control">
                  <textarea class="textarea" id="post" placeholder="Share your experience:)"></textarea>
                  </p>
              </div>
              <nav class="level">
                  <div class="level-left">
                  <div class="level-item">
                      <button class="button is-info" onclick=postComment(${id})>Share</button>
                  </div>
                  </div>
              </nav>
              </div>
          </article>`;
  cardPosition.innerHTML = card
} 

function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return NaN
  }
}