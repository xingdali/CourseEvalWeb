const course_data = require('data-store')({ path: process.cwd() + '/data/courseData.json' });

class courseData {

    constructor (id, className, subject, courseNum, instructor) {
        this.id = id;
        this.className = className;
        this.courseNum = courseNum;
        this.subject = subject;
        this.instructor = instructor;
    }

    update () {
        course_data.set(this.id.toString(), this);
    }

    delete () {
        course_data.del(this.id.toString());
    }
}

courseData.getAllIDs = () => {
    return Object.keys(course_data.data).map((id => {return parseInt(id);}));
}

courseData.findByID = (id) => {
    let cdata = course_data.get(id);
    if (cdata != null) {
        return new courseData(cdata.id, cdata.className, cdata.courseNum, cdata.subject, cdata.instructor);
    }
    return null;
}

courseData.next_id = courseData.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

courseData.create = (className, courseNum, instructor) => {
    let id = courseData.next_id;
    courseData.next_id += 1;
    let b = new courseData(id, className, courseNum, instructor);
    course_data.set(b.id.toString(), b);
    return b;
}

//let b1 = new Book(0, "My First Book", 10.50, ['Ketan Mayer-Patel', 'Maitray Patel']);
//book_data.set(b1.id.toString(), b1);

module.exports = courseData;