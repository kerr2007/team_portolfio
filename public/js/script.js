const menuToggle = document.querySelector(".mobile-menu-toggle");
const navPanel = document.querySelector(".nav-panel");

if (menuToggle && navPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navPanel.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((element) => revealObserver.observe(element));
} else {
  revealItems.forEach((element) => element.classList.add("visible"));
}

const animateProgressBars = (scope = document) => {
  scope.querySelectorAll(".progress-bar").forEach((bar) => {
    requestAnimationFrame(() => bar.classList.add("animate"));
  });
};

const progressPanels = document.querySelectorAll(".profile-panel");

if ("IntersectionObserver" in window) {
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProgressBars(entry.target);
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.28 }
  );

  progressPanels.forEach((panel) => progressObserver.observe(panel));
} else {
  animateProgressBars();
}

const membersDataElement = document.querySelector("#members-data");
const teamCards = document.querySelectorAll(".team-card");
const detailPanel = document.querySelector("#memberDetailPanel");
const rosterCards = document.querySelectorAll(".roster-card");
const homeSkillPanel = document.querySelector("#homeSkillPanel");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const createBadgeList = (items) =>
  `<div class="badge-list animate">${items
    .map((item, index) => `<span style="--delay: ${index * 65}ms">${escapeHtml(item)}</span>`)
    .join("")}</div>`;

const createCleanList = (items) =>
  `<ul class="clean-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

const createSocialLinks = (links) =>
  `<div class="social-grid">${Object.entries(links)
    .map(
      ([label, url]) =>
        `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`
    )
    .join("")}</div>`;

if (membersDataElement) {
  const members = JSON.parse(membersDataElement.textContent || "[]");
  let selectedMemberId = null;

  const findMember = (memberId) => members.find((item) => String(item.id) === String(memberId));
  const getMemberIndex = (memberId) => members.findIndex((item) => String(item.id) === String(memberId));
  const twoDigit = (value) => String(value).padStart(2, "0");

  const setSelectedCards = (cards, memberId) => {
    cards.forEach((card) => {
      const isSelected = card.dataset.memberId === String(memberId);
      card.classList.toggle("is-selected", isSelected);
      card.classList.toggle("is-faded", !isSelected);
      card.setAttribute("aria-pressed", String(isSelected));
    });
  };

  const renderMemberDetails = (member) => {
    const currentIndex = getMemberIndex(member.id);
    const memberCount = members.length;
    const prevIndex = (currentIndex - 1 + memberCount) % memberCount;
    const nextIndex = (currentIndex + 1) % memberCount;
    const previousMember = members[prevIndex];
    const nextMember = members[nextIndex];

    detailPanel.innerHTML = `
      <div class="detail-content">
        <div class="detail-portrait-panel">
          <span class="detail-index">${twoDigit(currentIndex + 1)} / ${twoDigit(memberCount)}</span>
          <img class="detail-portrait" src="${escapeHtml(member.image)}" alt="${escapeHtml(member.name)} profile placeholder">
          <div class="detail-portrait-caption">
            <span>${escapeHtml(member.role)}</span>
            <strong>${escapeHtml(member.name)}</strong>
          </div>
        </div>

        <div class="detail-profile-copy">
          <div class="detail-toolbar">
            <div>
              <span class="eyebrow">Selected profile</span>
              <p>${escapeHtml(member.tagline)}</p>
            </div>
            <div class="member-nav-controls" aria-label="Browse team members">
              <button class="member-nav-button" type="button" data-member-nav="${escapeHtml(previousMember.id)}" aria-label="Show previous member">
                <span>Previous</span>
                <strong>${escapeHtml(previousMember.name)}</strong>
              </button>
              <button class="member-nav-button" type="button" data-member-nav="${escapeHtml(nextMember.id)}" aria-label="Show next member">
                <span>Next</span>
                <strong>${escapeHtml(nextMember.name)}</strong>
              </button>
            </div>
          </div>

          <div class="detail-header">
            <h2>${escapeHtml(member.name)}</h2>
            <p>${escapeHtml(member.role)}</p>
          </div>

          <p class="detail-bio">${escapeHtml(member.bio)}</p>

          <div class="detail-section">
            <h3>Skills</h3>
            ${member.skills
              .map(
                (skill) => `
                  <div class="skill-meter">
                    <div class="skill-meter-label">
                      <span>${escapeHtml(skill.name)}</span>
                      <strong>${escapeHtml(skill.level)}%</strong>
                    </div>
                    <div class="progress-track">
                      <span class="progress-bar" style="--level: ${escapeHtml(skill.level)}%"></span>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>

          <div class="detail-section">
            <h3>Programming Languages</h3>
            ${createBadgeList(member.programmingLanguages)}
          </div>

          <div class="detail-section">
            <h3>Projects</h3>
            ${createCleanList(member.projects)}
          </div>

          <div class="detail-section">
            <h3>Achievements</h3>
            ${createCleanList(member.achievements)}
          </div>

          <div class="detail-section">
            <h3>Contact</h3>
            ${createSocialLinks({ Email: `mailto:${member.email}`, ...member.socialLinks })}
          </div>

          <button class="btn btn-secondary reset-team" type="button">View All Members</button>
        </div>
      </div>
    `;

    animateProgressBars(detailPanel);

    detailPanel.querySelectorAll("[data-member-nav]").forEach((button) => {
      button.addEventListener("click", () => selectMember(button.dataset.memberNav, false));
    });

    const resetButton = detailPanel.querySelector(".reset-team");
    resetButton.addEventListener("click", resetTeamView);
  };

  const selectMember = (memberId, shouldScroll = true) => {
    const member = findMember(memberId);
    if (!member) return;

    selectedMemberId = String(memberId);
    setSelectedCards(teamCards, memberId);

    renderMemberDetails(member);
    detailPanel.classList.add("is-active");
    detailPanel.setAttribute("aria-hidden", "false");

    if (shouldScroll) {
      window.setTimeout(() => {
        detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 120);
    }
  };

  function resetTeamView() {
    selectedMemberId = null;
    teamCards.forEach((card) => {
      card.classList.remove("is-selected", "is-faded");
      card.setAttribute("aria-pressed", "false");
    });

    detailPanel.classList.remove("is-active");
    detailPanel.setAttribute("aria-hidden", "true");
    detailPanel.innerHTML = "";
  }

  if (teamCards.length && detailPanel) {
    teamCards.forEach((card) => {
      card.addEventListener("click", () => selectMember(card.dataset.memberId));
    });

    document.addEventListener("keydown", (event) => {
      if (!selectedMemberId || !detailPanel.classList.contains("is-active")) return;

      const selectedIndex = getMemberIndex(selectedMemberId);
      if (selectedIndex === -1) return;

      if (event.key === "ArrowLeft") {
        const previousIndex = (selectedIndex - 1 + members.length) % members.length;
        selectMember(members[previousIndex].id, false);
      }

      if (event.key === "ArrowRight") {
        const nextIndex = (selectedIndex + 1) % members.length;
        selectMember(members[nextIndex].id, false);
      }
    });
  }

  const renderHomeSkills = (member) => {
    homeSkillPanel.innerHTML = `
      <div class="home-skill-content">
        <div>
          <span>${escapeHtml(member.role)}</span>
          <strong>${escapeHtml(member.name)}</strong>
        </div>
        <p>${escapeHtml(member.tagline)}</p>
        <div class="home-skill-list">
          ${member.skills
            .map(
              (skill, index) => `
                <div class="skill-meter" style="--delay: ${index * 80}ms">
                  <div class="skill-meter-label">
                    <span>${escapeHtml(skill.name)}</span>
                    <strong>${escapeHtml(skill.level)}%</strong>
                  </div>
                  <div class="progress-track">
                    <span class="progress-bar" style="--level: ${escapeHtml(skill.level)}%"></span>
                  </div>
                </div>
              `
            )
            .join("")}
        </div>
        <a class="mini-profile-link" href="/member/${escapeHtml(member.id)}">Open full profile</a>
      </div>
    `;

    animateProgressBars(homeSkillPanel);
  };

  if (rosterCards.length && homeSkillPanel) {
    rosterCards.forEach((card) => {
      card.addEventListener("click", () => {
        const member = findMember(card.dataset.memberId);
        if (!member) return;

        setSelectedCards(rosterCards, card.dataset.memberId);
        homeSkillPanel.classList.add("is-active");
        renderHomeSkills(member);
      });
    });
  }
}

const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formMessage.className = "form-message";

    if (!name || !emailPattern.test(email) || message.length < 10) {
      formMessage.textContent = "Please enter a valid name, email, and message of at least 10 characters.";
      formMessage.classList.add("error");
      return;
    }

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      const result = await response.json();

      formMessage.textContent = result.message;
      formMessage.classList.add(response.ok ? "success" : "error");

      if (response.ok) {
        contactForm.reset();
      }
    } catch (error) {
      formMessage.textContent = "Something went wrong while sending the message. Please try again.";
      formMessage.classList.add("error");
    }
  });
}
