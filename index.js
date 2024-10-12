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
    const courses = await Course
        // .find({ author: 'Mosh Hamedani', isPublished: true })
        // Starts with
        .find({ author: /^Mosh/ })
        // Ends with
        .find({ author: /Hamedani$/ })
        // Ends with / Case incensitive
        .find({ author: /Hamedani$/i })
        // Contains
        .find({ author: /.*Mosh*./ })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();
