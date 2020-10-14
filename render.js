export const renderHeroCard = function(course) {
  // TODO: Copy your code from a04 to render the hero card

let courseTitle = course.subject + " " + course.courseNum;

  return `<div class="column is-one-third" style="float: left" display:inline;>


<div class="card" style="width: 300px;">
<header class="card-header">
  <p class="card-header-title">
  ${courseTitle}
  </p>
  <a href="#" class="card-header-icon" aria-label="more options">
    <span class="icon">
      <i class="fas fa-angle-down" aria-hidden="true"></i>
    </span>
  </a>
</header>
<div class="card-content">
  <div class="content">
    <span> Name: ${course.className} </span>
    <br>
    <span> Component: ${course.component} </span>
    <br>
    <span> Instructor: ${course.instructor} </span>
    <br>
  </div>
</div>
<footer class="card-footer">
  <a href="#" class="card-footer-item">Save</a>
  <a href="#" class="card-footer-item">Edit</a>
  <a href="#" class="card-footer-item">Delete</a>
</footer>

</div>
  </div>`
};

/**
   * Given an array of hero objects, this function converts the data into HTML,
   *     loads it into the DOM, and adds event handlers.
   * @param  heroes  An array of hero objects to load (see data.js)
   */
  export const loadHeroesIntoDOM = function(courses) {
    // Grab a jQuery reference to the root HTML element
    const $root = $("#root");
  
    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
  
    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    let arr = [];
    
    for (let i = 0; i < courses.length; i++) {
        arr[i] = renderHeroCard(courses[i]);
    }

    $root.append(arr);

    return $root;
  };
  
  /**
   * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
   */
  $(function() {
    loadHeroesIntoDOM(courseData);
  });