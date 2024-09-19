function toggleMenu() {
    const navbarLinks = document.querySelector('.navbar ul');
    navbarLinks.classList.toggle('show');
}

function openNav() {
    if (window.matchMedia('(max-width: 768px)').matches) {
        document.getElementById("myDashboard").style.width = "280px";
    
    }
    else{
        document.getElementById("myDashboard").style.width = "280px";
        document.getElementById("imageContainer").style.display = "flex"; 
    }
}


function closeNav() {
    document.getElementById("myDashboard").style.width = "0";
    document.getElementById("imageContainer").style.display = "flex";    
    document.getElementById("service-section").style.display = "block"
    document.getElementById("contact-section").style.display = "block"
    if (window.matchMedia('(max-width: 768px)').matches){
        document.getElementById("dars").style.display = "none"
    }
}


function closenaaav(){
    document.getElementById("myDashboard").style.width = "0";
    document.getElementById("service-section").style.display="none"
    document.getElementById("contact-section").style.display = "none"
    document.getElementById("dars").style.display = "block";
}


/* siderbar close for small screens*/
const mediaquery = window.matchMedia('(max-width: 768px)')
function closeSidebarOnClick() {
    if (mediaquery.matches) {
        closenaaav();
         
    }
}



function showSection(id) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show the selected section
    document.getElementById(id).classList.remove('hidden');

    // Hide the background image when any section is shown
    document.getElementById('imageContainer').style.display = 'none';
    

}




let students = [];
let editingIndex = -1;

function addStudent() {
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const rollNo = document.getElementById('studentRollNo').value;

    if (name.trim() === '' || email.trim() === '' || rollNo.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    if (editingIndex === -1) {
        students.push({ name, email, rollNo });
    } else {
        students[editingIndex] = { name, email, rollNo };
        editingIndex = -1;
    }

    document.getElementById('studentName').value = '';
    document.getElementById('studentEmail').value = '';
    document.getElementById('studentRollNo').value = '';
    renderStudents();
}

function renderStudents() {
    rendertable('#studentTable tbody', true); // Render with actions for Student Records
    rendertable('#studentTableAttendance tbody', false); // Render without actions for Attendance
    
}

function rendertable(selector, includeActions) {
    const tableBody = document.querySelector(selector);
    tableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.rollNo}</td>
            ${includeActions
                ? `<td>
                          <button onclick="editStudent(${index})">
                              <span style='color:white;background-color:green;font-size:20px;'>Edit</span>
                          </button>
                          <button onclick="deleteStudent(${index})">
                              <span style='color:white;background-color:red;font-size:20px;'>Delete</span>
                          </button>
                      </td>`
                : `<td>
                          <label>
                              <input type="radio" name="attendance${index}" value="Present" onclick="markAttendance(${index}, 'Present')"> Present
                          </label>
                          <label>
                              <input type="radio" name="attendance${index}" value="Absent" onclick="markAttendance(${index}, 'Absent')"> Absent
                          </label>
                      </td>`
            }
        `;
        tableBody.appendChild(row);
    });
}

function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentEmail').value = student.email;
    document.getElementById('studentRollNo').value = student.rollNo;
    editingIndex = index;
}

function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        renderStudents();
    }
}




/* notice <section></section>*/

function addnotice() {
    const noticeText = document.getElementById('noticeboard').value.trim();

    // Check if the textarea is not empty
    if (noticeText !== '') {
        // Create a new div to hold each notice and its delete button
        const noticeElement = document.createElement('div');
        noticeElement.classList.add('notice-item'); // Add a class for styling

        // Create a paragraph to display the notice text
        const noticeParagraph = document.createElement('p');
        noticeParagraph.textContent = noticeText;

        // Create a delete button for the notice
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.onclick = function () {
            // Remove the notice element when the delete button is clicked
            noticeElement.remove();
        };

        // Append the paragraph and delete button to the notice element
        noticeElement.appendChild(noticeParagraph);
        noticeElement.appendChild(deleteButton);

        // Append the notice element to the notice container
        document.getElementById('notice-container').appendChild(noticeElement);

        // Clear the textarea after adding the notice
        document.getElementById('noticeboard').value = '';
    } else {
        alert('Please enter a notice before submitting.');
    }
}



/* LOGIN AND SIGNUP BUTTON*/

function openModal() {
    document.getElementById("loginModal").style.display = "flex";
}

// Function to close the login modal
function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}


// Array to store teacher details
const teachers = [];

// Variable to track the index of the teacher being edited
let editingTeacherIndex = -1;

// Function to add or update a teacher
function addteacher() {
    // Get the input values
    const teacherName = document.getElementById('teacher-name').value;
    const classIncharge = document.getElementById('class-incharge').value;
    const subHandling = document.getElementById('sub-handling').value;

    // Check if all fields are filled
    if (teacherName && classIncharge && subHandling) {
        // If editingTeacherIndex is -1, add a new teacher; otherwise, update the existing teacher
        if (editingTeacherIndex === -1) {
            // Add new teacher
            teachers.push({
                tname: teacherName,
                classin: classIncharge,
                subhand: subHandling,
            });
        } else {
            // Update existing teacher details
            teachers[editingTeacherIndex] = {
                tname: teacherName,
                classin: classIncharge,
                subhand: subHandling,
            };
            // Reset editing index after updating
            editingTeacherIndex = -1;
        }

        // Clear the input fields
        document.getElementById('teacher-name').value = '';
        document.getElementById('class-incharge').value = '';
        document.getElementById('sub-handling').value = '';

        // Render the updated table
        renderttable('#teacherTable tbody', true);
    } else {
        alert('Please fill all fields before adding.');
    }
}

// Function to render the teacher table
function renderttable(selector, includeActions) {
    const tableBody = document.querySelector(selector);
    tableBody.innerHTML = '';

    // Iterate over each teacher and add rows to the table
    teachers.forEach((teacher, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${teacher.tname}</td>
            <td>${teacher.classin}</td>
            <td>${teacher.subhand}</td>
            ${includeActions
                ? `<td>
                        <button onclick="editTeacher(${index})">
                            <span style="color:white; background-color:green; font-size:20px;">Edit</span>
                        </button>
                        <button onclick="deleteTeacher(${index})">
                            <span style="color:white; background-color:red; font-size:20px;">Delete</span>
                        </button>
                    </td>`
                : ''
            }
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a teacher
function deleteTeacher(index) {
    // Confirm before deleting the teacher
    if (confirm('Are you sure you want to delete this teacher?')) {
        // Remove the teacher from the array
        teachers.splice(index, 1);
        // Re-render the updated table
        renderttable('#teacherTable tbody', true);
    }
}

// Function to edit a teacher
function editTeacher(index) {
    // Get the current values of the teacher and populate the form fields
    const teacher = teachers[index];
    document.getElementById('teacher-name').value = teacher.tname;
    document.getElementById('class-incharge').value = teacher.classin;
    document.getElementById('sub-handling').value = teacher.subhand;

    // Set editingTeacherIndex to the current teacher's index for updating purposes
    editingTeacherIndex = index;
}
