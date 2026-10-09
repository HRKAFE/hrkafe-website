/*
  HRKAFE website script.
  BEGINNER NOTE:
  You can update job openings by editing the "jobs" list below.
  Each job is one block between { and }.
  Do not change the surrounding code.
*/

const jobs = [
  /*
  COPY THIS TEMPLATE WHEN YOU HAVE A REAL JOB OPENING:

  {
    title: "Your real job title",
    industry: "Your industry",
    location: "Mumbai, Maharashtra",
    experience: "3–6 years",
    type: "Full Time",
    description: "A short, factual description of the role.",
    applyLink: "YOUR_GOOGLE_FORM_OR_APPLICATION_LINK"
  },

  IMPORTANT:
  Only add real/current openings here. Do not publish confidential client details.
  */

  // HRKAFE currently has no live openings entered here.
];

const jobList = document.getElementById("job-list");
const jobEmpty = document.getElementById("job-empty");
const searchInput = document.getElementById("job-search");
const typeFilter = document.getElementById("job-type");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function renderJobs() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  const type = typeFilter?.value || "all";

  const filtered = jobs.filter(job => {
    const searchable = [
      job.title, job.industry, job.location, job.experience,
      job.type, job.description
    ].join(" ").toLowerCase();

    const matchesSearch = !query || searchable.includes(query);
    const matchesType = type === "all" || job.type === type;

    return matchesSearch && matchesType;
  });

  jobList.innerHTML = filtered.map(job => `
    <article class="job-card">
      <div class="job-meta">
        <span class="job-tag">${escapeHtml(job.industry)}</span>
        <span class="job-tag">${escapeHtml(job.type)}</span>
      </div>
      <h3>${escapeHtml(job.title)}</h3>
      <p>${escapeHtml(job.description)}</p>
      <div class="job-bottom">
        <span class="job-details">${escapeHtml(job.location)} · ${escapeHtml(job.experience)}</span>
       <a class="apply-link" href="https://docs.google.com/forms/d/e/1FAIpQLSdZ3f22hs84XRWderuJMUQfsisXChaLCKeURQnR8aog3wiEIA/viewform?usp=pp_url&amp;entry.797960200=${encodeURIComponent(job.title)}" target="_blank" rel="noopener">Apply Now ↗</a>
      </div>
    </article>
  `).join("");

  jobEmpty.hidden = filtered.length !== 0;
  jobList.hidden = filtered.length === 0;
}

searchInput?.addEventListener("input", renderJobs);
typeFilter?.addEventListener("change", renderJobs);
renderJobs();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

// Static-site contact form:
// Opens the visitor's email app with the submitted information.
// Replace services@hrkafe.in with your real HRKAFE email address.
document.getElementById("contact-form")?.addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);
  const recipient = "services@hrkafe.in";

  const subject = encodeURIComponent(`HRKAFE Website Enquiry — ${data.get("type") || "General"}`);
  const body = encodeURIComponent(
`Name: ${data.get("name")}
Email: ${data.get("email")}
I am an: ${data.get("type")}

Message:
${data.get("message")}`
  );

  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Small reveal-on-scroll effect
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}
