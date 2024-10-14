const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Django Course',
        author: 'Mosh Hamedani',
        tags: ['django', 'backend'],
        isPublished: true,
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course.find({ isPublished: true }).sort({ name: 1 }).select({ name: 1, author: 1 });
    // .countDocuments();
    console.log(courses);
}

// async function updateCourse(id) {
//     const course = await Course.findById(id);
//     console.log(course);
//     console.log(id);
//     if (!course) return;

//     course.isPublished = true;
//     course.author = 'Another Author';

//     const result = await course.save();
//     console.log(result);
// }

async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate(
        id,
        {
            $set: {
                author: 'Jason',
                isPublished: false,
            },
        },
        { new: true }
    );
    console.log(course);
}

// getCourses();
// createCourse();
updateCourse('670aa11e8bee494a0d4b46aa');
