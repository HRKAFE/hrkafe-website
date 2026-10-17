/*
  HRKAFE website script.
  BEGINNER NOTE:
  You can update job openings by editing the "jobs" list below.
  Each job is one block between { and }.
  Do not change the surrounding code.
*/

const jobs = [
     {
    title: "Hospitality Head – Guest Relations",
    industry: "Events and Wedding Industry",
    location: "Lower Parel",
    experience: "5+ Years (min. 2 in leadership)",
    type: "Full Time",
    description: "Lead guest relations and hospitality operations at events. Manage VIP guests, lead the hospitality team, coordinate accommodation, transport and vendors, resolve on-site concerns, and oversee budgets and post-event reporting."
  },
  {
    title: "Business Development Manager",
    industry: "Events and Wedding Industry",
    location: "Lower Parel",
    experience: "8–10 years",
    type: "Full Time",
    description: "Drive business growth through lead generation, client acquisition, pitching, negotiations and deal closure. Build sales pipelines, develop strategic partnerships, achieve revenue targets, and manage client relationships."
  },
  {
    title: "Project Executive / Client Service Executive",
    industry: "Events and Wedding Industry",
    location: "Lower Parel",
    experience: "1–3 years",
    type: "Full Time",
    description: "Support event planning and execution, coordinate timelines and internal teams, communicate with clients, manage vendors, assist with on-site operations, and maintain project records and post-event reports."
  },
  {
    title: "RSVP Coordinator",
    industry: "Events and Wedding Industry",
    location: "Lower Parel",
    experience: "2+ years",
    type: "Full Time",
    description: "Manage guest communications and invitations, track RSVPs and attendance, maintain guest databases, coordinate special requests with event and hospitality teams, resolve guest concerns, and prepare attendance reports."
  },
  {
    title: "Sponsorship Sales Head",
    industry: "Events, Weddings, Entertainment and Concerts",
    location: "Lower Parel",
    experience: "8–10 years",
    type: "Full Time",
    description: "Lead sponsorship strategy and sales from prospecting to deal closure. Develop sponsor pipelines, create sponsorship packages, negotiate high-value deals, build brand partnerships, achieve revenue targets, and oversee sponsor servicing and ROI reporting."
  }
  {
    title: "PET Trader",
    industry: "Plastic Recycling and Trading",
    location: "Lower Parel",
    experience: "3–7 years",
    type: "Full Time",
    description: "Manage end-to-end buying and selling of PET scrap, flakes, and recycled PET materials. Develop supplier and buyer networks, negotiate pricing and payment terms, track market rates, coordinate quality inspections and dispatches, and maintain trading records and payment follow-ups."
  },
  {
    title: "LDPE Procurement Executive",
    industry: "Recycling, Plastic Scrap and Polymer Trading",
    location: "Lower Parel",
    experience: "3–6 years",
    type: "Full Time",
    description: "Source LDPE scrap and recyclable plastic materials from vendors, scrap dealers, aggregators, and industries. Build supplier relationships, negotiate prices and payment terms, identify sourcing opportunities, coordinate logistics and plant teams, monitor scrap pricing, and ensure material quality."
  },
  {
    title: "Sales Manager – Recycled Plastic Granules",
    industry: "Plastic Recycling",
    location: "Lower Parel",
    experience: "5–8+ years",
    type: "Full Time",
    description: "Drive sales of recycled plastic granules through B2B and B2C business development. Build relationships with industrial buyers, converters, and manufacturing units, generate leads, achieve sales targets, monitor market pricing, coordinate production and logistics, and manage customer accounts."
  },
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
