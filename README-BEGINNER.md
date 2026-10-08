# HRKAFE Website — Beginner Guide

## Files
- `index.html` — website structure and content
- `style.css` — design, colours, layout and responsive behaviour
- `script.js` — mobile menu, job search/filter, contact form and job data

## Test on your computer
1. Put all three files in the same folder.
2. Double-click `index.html`.
3. It will open in Chrome/Edge.
4. If you change a file, save it and refresh the browser.

## Before publishing
Search all three files for:
- `YOUR_EMAIL`
- `YOUR_PHONE`
- `YOUR_WHATSAPP_NUMBER`
- `YOUR_LINKEDIN_URL`
- `YOUR_GOOGLE_FORM_LINK`

Replace these with your real details.

## Adding a job
Open `script.js`.
Find:
`const jobs = [`

Copy the commented job template and replace the example values with the real job details.

Example:
{
  title: "Business Development Manager",
  industry: "Hospitality",
  location: "Mumbai, Maharashtra",
  experience: "5–8 years",
  type: "Full Time",
  description: "Short factual description.",
  applyLink: "YOUR_APPLICATION_FORM_LINK"
},

Only publish genuine, current openings.

## Important
This is a static website. The contact form currently opens the visitor's email application using `mailto:`. The candidate CV button is designed to point to a Google Form.

For automated submissions, connect the button to your Google Form.

## Free publishing options
Recommended:
1. Create a GitHub repository named `hrkafe-website`.
2. Upload `index.html`, `style.css`, `script.js` and the `assets` folder.
3. Connect the repository to Cloudflare Pages.
4. Add `www.hrkafe.in` as the custom domain in Cloudflare Pages.
5. Configure DNS at your domain registrar as instructed by Cloudflare.

Alternative:
Use GitHub Pages directly.

## Domain
Your domain is `www.hrkafe.in`. Make sure your DNS settings point the domain to the hosting service you choose.

## Future upgrade
When HRKAFE grows, the same front-end can be connected to:
- a real job database
- automated candidate forms
- email notifications
- an ATS
- employer dashboards
- candidate dashboards
