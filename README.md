# Dev Collective Team Portfolio

Premium orange-and-black 5-member team portfolio built with Node.js, Express, EJS, CSS, and JavaScript.

## Run Locally

```bash
npm install
npm start
```

Open `http://localhost:3003`.

## Routes

- `/` - Home page
- `/team` - Our Team showcase with clickable member cards
- `/projects` - Team and individual projects
- `/skills` - Categorized team skills
- `/about` - Background, mission, vision, and goals
- `/contact` - Contact form and social links
- `/member/:id` - Direct member profile page

## Edit Content

Update members, projects, and skill categories in `server.js`.

Member photos are stored in `public/images/members`. Replace `member1.jpg` through `member5.jpg` with your real photos, or update each member's `image` path in `server.js`.
