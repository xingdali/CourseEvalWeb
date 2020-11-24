function getAllCard() {
  const root = document.getElementById('root');
  const back = document.getElementById('back');
  back.innerHTML = ''
  root.innerHTML = ''
  var length = Object.values(courseData).length;
  for (let i = 0; i < length; i++) {
    if (courseData[i].subject == undefined) {
      continue;
    } 
    root.insertAdjacentHTML('beforeend', renderCourseCard(i));
  }

}

function init() {
  getAllCard();
  // bind search event
  document.getElementById('search').addEventListener('click', beginSearch);
  //
  var key = getParameterByName('key');
  if(key) {
    document.getElementById('searchInput').value = key;
    beginSearch();
  }
}

function beginSearch() {
  var searchKey = document.getElementById('searchInput').value.trim();
  for(var id in courseData) {
    var course = courseData[id];
    if(
        searchMatch(searchKey, course.subject) ||
        searchMatch(searchKey, [course.subject,course.courseNum].join(' ')) ||
        searchMatch(searchKey, [course.subject,course.courseNum].join('')) ||
        searchKey === course.courseNum){
      renderCoursePage(id);
      return ;
    }
  }
  alert('cannot find');
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function searchMatch(key, content) {
  if(!key || !content) {
    return false;
  }
  key = key.toLowerCase().trim().split(' ').map(function (a) {return a}).join(' ');
  content = content.toLowerCase().trim().split(' ').map(function (a) {return a}).join(' ');
  if(content.indexOf(key)!==-1) {
    return true;
  }
  return false;
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
                    var cookie = document.cookie;
                    var arrcookie = cookie.split(';');
                    var isLogin = false;
                    var key='';
                    for (var i = 0; i < arrcookie.length; i++) {
                        key = arrcookie[i].split('=');
                        console.log(key[0]);
                        if (key[0] == ' user') {
                            isLogin = true;
                            break;
                        }
                    }
                    console.log(document.cookie);
  if (isLogin) {
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
    url: 'https://course-eval-web.herokuapp.com/post'
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
  console.log(element.author)
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
        url: 'https://course-eval-web.herokuapp.com/post',
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

async function generateAnAnimal() {
  // const options = await axios({
  //   method: 'GET',
  //   url: 'https://mlemapi.p.rapidapi.com/randommlem',
  //   headers: {
  //     'x-rapidapi-key': 'a37d655385msh3516d473b72f82ep109fdejsn4309fd548dd7',
  //     'x-rapidapi-host': 'mlemapi.p.rapidapi.com'
  //   }
  // });
  // console.log(options.data);
  const options = {
    method: 'get',
    url: 'https://mlemapi.p.rapidapi.com/randommlem',
    headers: {
      'x-rapidapi-key': 'a37d655385msh3516d473b72f82ep109fdejsn4309fd548dd7',
      'x-rapidapi-host': 'mlemapi.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return NaN
  }
}
