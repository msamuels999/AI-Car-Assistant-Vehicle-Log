const SUPABASE_URL = "https://fgzccptkbbdwdfxzhkfj.supabase.co";
const SUPABASE_KEY = "sb_publishable_E754wP0lECJFsI7kbLAwQA_kOUuMQuK";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const authSection = document.getElementById("authSection");
const appSection = document.getElementById("appSection");

const emailInput = document.getElementById("authEmail");
const passwordInput = document.getElementById("authPassword");

const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const logoutButton = document.getElementById("logoutButton");

const authMessage = document.getElementById("authMessage");

const vehicleLogForm = document.getElementById("vehicleLogForm");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const recordDateInput = document.getElementById("date");
const notesInput = document.getElementById("notes");
const recordsContainer = document.getElementById("recordsContainer");


function showApp() {
    authSection.classList.add("hidden");
    appSection.classList.remove("hidden");

    loadRecords();
}


function showAuth() {
    appSection.classList.add("hidden");
    authSection.classList.remove("hidden");
}

async function loadRecords() {

    const { data, error } = await supabaseClient
        .from("vehicle_logs")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error loading records:", error);
        recordsContainer.innerHTML =
            "<p>Unable to load vehicle records.</p>";
        return;
    }

    recordsContainer.innerHTML = "";

    if (data.length === 0) {
        recordsContainer.innerHTML =
            "<p>No vehicle records yet.</p>";
        return;
    }

    data.forEach((record) => {

        const card = document.createElement("div");
        card.className = "record-card";

        const formattedDate =
            new Date(record.record_date + "T00:00:00")
                .toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

        card.innerHTML = `
            <div class="record-header">
                <div>
                    <h3>${record.title}</h3>
                    <span class="category">
                        ${record.category}
                    </span>
                </div>

                <span class="record-date">
                    ${formattedDate}
                </span>
            </div>

            <p>${record.notes || "No notes provided."}</p>

            <div class="record-actions">
                <button class="edit-button">
                    Edit
                </button>

                <button class="delete-button">
                    Delete
                </button>
            </div>
        `;

        recordsContainer.appendChild(card);
    });
}


registerButton.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        authMessage.textContent =
            "Please enter an email and password.";
        return;
    }

    authMessage.textContent = "Creating account...";

    const { data, error } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

    if (error) {
        console.error("Registration error:", error);
        authMessage.textContent = error.message;
        return;
    }

    console.log("Registration successful:", data);

    authMessage.textContent =
        "Registration successful!";

    if (data.session) {
        showApp();
    }
});


loginButton.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        authMessage.textContent =
            "Please enter an email and password.";
        return;
    }

    authMessage.textContent = "Logging in...";

    const { error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        console.error("Login error:", error);
        authMessage.textContent = error.message;
        return;
    }

    authMessage.textContent = "";

    showApp();
});


logoutButton.addEventListener("click", async () => {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
        return;
    }

    emailInput.value = "";
    passwordInput.value = "";

    showAuth();
});

vehicleLogForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const recordDate = recordDateInput.value;
    const notes = notesInput.value.trim();

    if (!title || !category || !recordDate) {
        alert("Please complete the title, category, and date.");
        return;
    }

    const { error } = await supabaseClient
        .from("vehicle_logs")
        .insert([
            {
                title: title,
                category: category,
                record_date: recordDate,
                notes: notes
            }
        ]);

    if (error) {
        console.error("Error adding record:", error);
        alert("Unable to add the vehicle record.");
        return;
    }

    vehicleLogForm.reset();

    await loadRecords();
});

async function checkSession() {

    const { data } =
        await supabaseClient.auth.getSession();

    if (data.session) {
        showApp();
    } else {
        showAuth();
    }
}


checkSession();

console.log("Supabase authentication loaded.");