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


function showApp() {
    authSection.classList.add("hidden");
    appSection.classList.remove("hidden");
}


function showAuth() {
    appSection.classList.add("hidden");
    authSection.classList.remove("hidden");
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