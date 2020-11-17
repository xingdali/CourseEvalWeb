class Course {
    constructor(obj_json) {
        this.id = obj_json.id;
        this.className = obj_json.className;
        this.courseNum = obj_json.courseNum;
        this.subject = obj_json.subject;
        this.instructor = obj_json.instructor;
    }
}

Course.find = async (id) => {
    try {
        let response = await $.ajax("http://localhost:3030/courseData/"+id,
        {
            type: "GET",
            dataType: "json"
        });

        return new Course(response);
    } catch {
        throw "No course with id: " + id;
    }
}