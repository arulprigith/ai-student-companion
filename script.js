// =====================================================
// LOGIN / SIGNUP
// =====================================================

function checkLoginStatus() {

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const account = localStorage.getItem("studentAccount");

    if (isLoggedIn === "true" && account) {
        showApp();
    } else {
        showAuth();
    }
}


// Show Login

function showAuth() {

    document.getElementById("authScreen").style.display = "flex";

    document.getElementById("appContent").style.display = "none";
}


// Show App

function showApp() {

    document.getElementById("authScreen").style.display = "none";

    document.getElementById("appContent").style.display = "block";

    updateWelcomeName();
}


// Show Login Form

function showLogin() {

    document.getElementById("loginForm").style.display = "block";

    document.getElementById("signupForm").style.display = "none";
}


// Show Signup Form

function showSignup() {

    document.getElementById("loginForm").style.display = "none";

    document.getElementById("signupForm").style.display = "block";
}


// Signup

function signup() {

    const name =
        document.getElementById("signupName").value.trim();

    const username =
        document.getElementById("signupUsername").value.trim();

    const password =
        document.getElementById("signupPassword").value.trim();


    if (
        name === "" ||
        username === "" ||
        password === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    if (password.length < 4) {

        alert("Password must contain at least 4 characters.");

        return;
    }


    const existingAccount =
        localStorage.getItem("studentAccount");


    if (existingAccount) {

        alert("An account already exists. Please login.");

        showLogin();

        return;
    }


    const account = {

        name: name,

        username: username,

        password: password

    };


    localStorage.setItem(
        "studentAccount",
        JSON.stringify(account)
    );


    const oldProfile =
        JSON.parse(
            localStorage.getItem("studentProfile")
        ) || {};


    oldProfile.name = name;


    localStorage.setItem(
        "studentProfile",
        JSON.stringify(oldProfile)
    );


    alert("Account created successfully! 🎉");

    showLogin();

    document.getElementById("loginUsername").value =
        username;

    document.getElementById("loginPassword").value = "";

}


// Login

function login() {

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();


    if (
        username === "" ||
        password === ""
    ) {

        alert("Please enter username and password.");

        return;
    }


    const accountData =
        localStorage.getItem("studentAccount");


    if (!accountData) {

        alert("No account found. Please create an account.");

        showSignup();

        return;
    }


    const account =
        JSON.parse(accountData);


    if (
        username === account.username &&
        password === account.password
    ) {

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        alert("Login successful! 🎉");

        showApp();

    } else {

        alert("Incorrect username or password.");

    }

}


// Logout

function logout() {

    localStorage.setItem(
        "isLoggedIn",
        "false"
    );

    showAuth();

    showLogin();

    document.getElementById("loginUsername").value = "";

    document.getElementById("loginPassword").value = "";

}


// Welcome Name

function updateWelcomeName() {

    const accountData =
        localStorage.getItem("studentAccount");


    if (!accountData) {
        return;
    }


    const account =
        JSON.parse(accountData);


    document.getElementById("welcomeUser").innerText =
        "Welcome, " + account.name + "! 👋";

}


// =====================================================
// STUDY MATERIALS
// =====================================================

function openMaterials() {

    document.getElementById("materialsModal").style.display =
        "block";

}


function closeMaterials() {

    document.getElementById("materialsModal").style.display =
        "none";

}


function showMaterial(subject) {

    const materialContent =
        document.getElementById("materialContent");


    let topics = [];


    if (subject === "Python") {

        topics = [
            "Python Basics",
            "Variables and Data Types",
            "Conditions and Loops",
            "Functions",
            "Lists and Dictionaries",
            "Object Oriented Programming"
        ];

    }


    else if (subject === "Artificial Intelligence") {

        topics = [
            "Introduction to AI",
            "Types of AI",
            "Intelligent Agents",
            "Search Algorithms",
            "Knowledge Representation",
            "AI Applications"
        ];

    }


    else if (subject === "Machine Learning") {

        topics = [
            "Introduction to Machine Learning",
            "Supervised Learning",
            "Unsupervised Learning",
            "Regression",
            "Classification",
            "Clustering"
        ];

    }


    else if (subject === "Data Science") {

        topics = [
            "Introduction to Data Science",
            "Data Collection",
            "Data Cleaning",
            "Data Visualization",
            "Statistics",
            "Data Analysis"
        ];

    }


    materialContent.innerHTML =
        "<h3>" +
        subject +
        "</h3>" +

        topics.map(function(topic) {

            return "<div>📌 " + topic + "</div>";

        }).join("");

}


// =====================================================
// AI ASSISTANT
// =====================================================

function openAI() {

    document.getElementById("aiModal").style.display =
        "block";

}


function closeAI() {

    document.getElementById("aiModal").style.display =
        "none";

}


function handleEnter(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}


function sendMessage() {

    const input =
        document.getElementById("userInput");


    const message =
        input.value.trim();


    if (message === "") {

        return;

    }


    const chatBox =
        document.getElementById("chatBox");


    chatBox.innerHTML +=
        '<div class="message user-message">' +
        "<b>You:</b> " +
        message +
        "</div>";


    input.value = "";


    chatBox.innerHTML +=
        '<div class="message ai-message" id="thinking">' +
        "<b>AI:</b> Thinking..." +
        "</div>";


    chatBox.scrollTop =
        chatBox.scrollHeight;


    setTimeout(function() {

        const thinking =
            document.getElementById("thinking");


        if (thinking) {
            thinking.remove();
        }


        const response =
            getAIResponse(message);


        chatBox.innerHTML +=
            '<div class="message ai-message">' +
            "<b>AI:</b> " +
            response +
            "</div>";


        chatBox.scrollTop =
            chatBox.scrollHeight;

    }, 700);

}


function getAIResponse(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("hello") ||
        text.includes("hi")
    ) {

        return "Hello! 👋 How can I help you with your studies?";

    }


    if (text.includes("python")) {

        return "Python is a beginner-friendly programming language. Start with variables, conditions, loops and functions.";

    }


    if (
        text.includes("machine learning") ||
        text.includes("ml")
    ) {

        return "Machine Learning allows computers to learn patterns from data. Start with supervised and unsupervised learning.";

    }


    if (
        text.includes("artificial intelligence") ||
        text.includes("ai")
    ) {

        return "Artificial Intelligence is the field of creating systems that can perform tasks requiring human-like intelligence.";

    }


    if (text.includes("data science")) {

        return "Data Science combines programming, statistics and data analysis to extract useful insights from data.";

    }


    if (
        text.includes("study") ||
        text.includes("learn")
    ) {

        return "Try studying for 45 minutes and taking a 10-minute break. Use the Study Planner to organize your topics.";

    }


    if (text.includes("exam")) {

        return "For exams, revise important concepts, practice previous questions and take short quizzes regularly.";

    }


    if (
        text.includes("coding") ||
        text.includes("programming")
    ) {

        return "Practice coding every day. Start with small problems and gradually move to bigger projects.";

    }


    if (
        text.includes("tired") ||
        text.includes("motivation")
    ) {

        return "Take a short break, drink some water and start with one small topic. You can do it! 💪";

    }


    if (text.includes("thank")) {

        return "You're welcome! 😊 Keep learning!";

    }


    return "I'm here to help with your studies. Try asking about Python, AI, Machine Learning, Data Science, exams or study plans.";

}


// =====================================================
// QUIZ
// =====================================================

const quizQuestions = [

    {
        question: "Which language is commonly used in Data Science?",
        options: [
            "Python",
            "HTML",
            "CSS",
            "XML"
        ],
        answer: 0
    },

    {
        question: "What does AI stand for?",
        options: [
            "Automatic Internet",
            "Artificial Intelligence",
            "Advanced Input",
            "Applied Information"
        ],
        answer: 1
    },

    {
        question: "Which is a Machine Learning technique?",
        options: [
            "Supervised Learning",
            "Web Design",
            "HTML Coding",
            "Networking"
        ],
        answer: 0
    },

    {
        question: "Which Python keyword is used to define a function?",
        options: [
            "function",
            "define",
            "def",
            "fun"
        ],
        answer: 2
    },

    {
        question: "Which field focuses on extracting insights from data?",
        options: [
            "Data Science",
            "Graphic Design",
            "Networking",
            "Operating Systems"
        ],
        answer: 0
    }

];


let currentQuestion = 0;

let quizScore = 0;


function startQuiz() {

    currentQuestion = 0;

    quizScore = 0;

    document.getElementById("quizModal").style.display =
        "block";

    showQuizQuestion();

}


function showQuizQuestion() {

    const question =
        quizQuestions[currentQuestion];


    const quizContent =
        document.getElementById("quizContent");


    let html =
        "<h3>Question " +
        (currentQuestion + 1) +
        " of " +
        quizQuestions.length +
        "</h3>";


    html +=
        "<p><b>" +
        question.question +
        "</b></p>";


    question.options.forEach(function(option, index) {

        html +=
            '<button class="quiz-option" onclick="selectAnswer(' +
            index +
            ')">' +
            option +
            "</button>";

    });


    quizContent.innerHTML =
        html;

}


function selectAnswer(index) {

    if (
        index ===
        quizQuestions[currentQuestion].answer
    ) {

        quizScore++;

    }


    currentQuestion++;


    if (
        currentQuestion <
        quizQuestions.length
    ) {

        showQuizQuestion();

    } else {

        showQuizResult();

    }

}


function showQuizResult() {

    const percentage =
        Math.round(
            (quizScore / quizQuestions.length) * 100
        );


    localStorage.setItem(
        "latestQuizScore",
        percentage
    );


    document.getElementById("quizContent").innerHTML =

        "<h3>🎉 Quiz Completed!</h3>" +

        "<p>Your Score: <b>" +
        quizScore +
        "/" +
        quizQuestions.length +
        "</b></p>" +

        "<p>Percentage: <b>" +
        percentage +
        "%</b></p>" +

        "<button onclick='closeQuiz()'>Close</button>";

}


function closeQuiz() {

    document.getElementById("quizModal").style.display =
        "none";

}


// =====================================================
// STUDY PLANNER
// =====================================================

function openPlanner() {

    document.getElementById("plannerModal").style.display =
        "block";

    displayStudyTasks();

}


function closePlanner() {

    document.getElementById("plannerModal").style.display =
        "none";

}


function addStudyTask() {

    const subject =
        document.getElementById("taskSubject").value.trim();


    const topic =
        document.getElementById("taskTopic").value.trim();


    const date =
        document.getElementById("taskDate").value;


    const time =
        document.getElementById("taskTime").value;


    if (
        subject === "" ||
        topic === "" ||
        date === "" ||
        time === ""
    ) {

        alert("Please fill all study task details.");

        return;
    }


    const tasks =
        JSON.parse(
            localStorage.getItem("studyTasks")
        ) || [];


    const task = {

        id: Date.now(),

        subject: subject,

        topic: topic,

        date: date,

        time: time,

        reminded: false

    };


    tasks.push(task);


    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );


    document.getElementById("taskSubject").value = "";

    document.getElementById("taskTopic").value = "";

    document.getElementById("taskDate").value = "";

    document.getElementById("taskTime").value = "";


    displayStudyTasks();


    alert(
        "Study task added successfully! 📚\n\n" +
        "You will get a reminder at the scheduled time."
    );

}


function displayStudyTasks() {

    const list =
        document.getElementById("studyTaskList");


    const tasks =
        JSON.parse(
            localStorage.getItem("studyTasks")
        ) || [];


    if (tasks.length === 0) {

        list.innerHTML =
            "<p>No study tasks added yet.</p>";

        return;
    }


    list.innerHTML = "";


    tasks.forEach(function(task) {

        list.innerHTML +=

            '<div class="task-item">' +

            "<div>" +

            "<b>" +
            task.subject +
            "</b><br>" +

            task.topic +
            "<br>" +

            "📅 " +
            task.date +
            "<br>" +

            "⏰ " +
            task.time +

            "</div>" +

            '<button class="delete-btn" onclick="deleteStudyTask(' +
            task.id +
            ')">' +

            "Delete" +

            "</button>" +

            "</div>";

    });

}


function deleteStudyTask(id) {

    let tasks =
        JSON.parse(
            localStorage.getItem("studyTasks")
        ) || [];


    tasks =
        tasks.filter(function(task) {

            return task.id !== id;

        });


    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );


    displayStudyTasks();

}


// =====================================================
// STUDY REMINDER
// =====================================================

function checkStudyReminders() {

    const tasks =
        JSON.parse(
            localStorage.getItem("studyTasks")
        ) || [];


    if (tasks.length === 0) {

        return;

    }


    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            now.getDate()
        ).padStart(2, "0");


    const currentDate =
        year +
        "-" +
        month +
        "-" +
        day;


    const currentTime =
        String(
            now.getHours()
        ).padStart(2, "0") +
        ":" +
        String(
            now.getMinutes()
        ).padStart(2, "0");


    let changed = false;


    tasks.forEach(function(task) {

        if (
            task.date === currentDate &&
            task.time === currentTime &&
            task.reminded !== true
        ) {

            alert(
                "🔔 STUDY REMINDER!\n\n" +
                "📚 Subject: " +
                task.subject +
                "\n" +
                "📖 Topic: " +
                task.topic +
                "\n" +
                "⏰ Scheduled Time: " +
                task.time +
                "\n\n" +
                "It's time to study! 💪"
            );


            task.reminded = true;

            changed = true;

        }

    });


    if (changed) {

        localStorage.setItem(
            "studyTasks",
            JSON.stringify(tasks)
        );

    }

}


// Check every 30 seconds

setInterval(
    checkStudyReminders,
    30000
);


// =====================================================
// STUDENT PROFILE
// =====================================================

function openProfile() {

    document.getElementById("profileModal").style.display =
        "block";


    const profile =
        JSON.parse(
            localStorage.getItem("studentProfile")
        );


    if (profile) {

        document.getElementById("studentName").value =
            profile.name || "";

        document.getElementById("collegeName").value =
            profile.college || "";

        document.getElementById("department").value =
            profile.department || "";

        document.getElementById("studentYear").value =
            profile.year || "";

    }

}


function saveProfile() {

    const name =
        document.getElementById("studentName").value.trim();


    const college =
        document.getElementById("collegeName").value.trim();


    const department =
        document.getElementById("department").value.trim();


    const year =
        document.getElementById("studentYear").value;


    if (
        name === "" ||
        college === "" ||
        department === "" ||
        year === ""
    ) {

        alert("Please fill all profile details.");

        return;
    }


    const profile = {

        name: name,

        college: college,

        department: department,

        year: year

    };


    localStorage.setItem(
        "studentProfile",
        JSON.stringify(profile)
    );


    const accountData =
        localStorage.getItem("studentAccount");


    if (accountData) {

        const account =
            JSON.parse(accountData);


        account.name =
            name;


        localStorage.setItem(
            "studentAccount",
            JSON.stringify(account)
        );

    }


    updateWelcomeName();


    alert(
        "Profile saved successfully! ✅"
    );

}


function closeProfile() {

    document.getElementById("profileModal").style.display =
        "none";

}


// =====================================================
// STUDENT DASHBOARD
// =====================================================

function openDashboard() {

    document.getElementById("dashboardModal").style.display =
        "block";


    const tasks =
        JSON.parse(
            localStorage.getItem("studyTasks")
        ) || [];


    const quizScore =
        localStorage.getItem("latestQuizScore") || 0;


    const studySessions =
        tasks.length;


    const progress =
        Math.min(
            tasks.length * 10,
            100
        );


    const profile =
        JSON.parse(
            localStorage.getItem("studentProfile")
        );


    let welcomeText =
        "";


    if (
        profile &&
        profile.name
    ) {

        welcomeText =
            "<h3>Welcome, " +
            profile.name +
            "! 👋</h3>";

    }


    document.getElementById("dashboardContent").innerHTML =

        welcomeText +

        "<p>📚 <b>Study Tasks:</b> " +
        tasks.length +
        "</p>" +

        "<p>📝 <b>Latest Quiz Score:</b> " +
        quizScore +
        "%</p>" +

        "<p>⏰ <b>Study Sessions:</b> " +
        studySessions +
        "</p>" +

        "<p>🎯 <b>Progress:</b> " +
        progress +
        "%</p>" +

        '<div class="progress-container">' +

        '<div class="progress-bar" style="width:' +
        progress +
        '%"></div>' +

        "</div>";

}


function closeDashboard() {

    document.getElementById("dashboardModal").style.display =
        "none";

}


// =====================================================
// CLOSE MODALS
// =====================================================

window.onclick = function(event) {

    const modals =
        document.getElementsByClassName("modal");


    for (
        let i = 0;
        i < modals.length;
        i++
    ) {

        if (
            event.target ===
            modals[i]
        ) {

            modals[i].style.display =
                "none";

        }

    }

};


// =====================================================
// PAGE LOAD
// =====================================================

checkLoginStatus();


// Check reminder immediately when page loads

checkStudyReminders();