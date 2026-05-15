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
const memberModal = document.querySelector("#memberModal");
const memberModalBody = document.querySelector("#memberModalBody");
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
  const twoDigit = (value) => String(value).padStart(2, "0");
  const summarizeText = (value) => {
    const sentences = String(value || "")
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .join(" ");

    return sentences || value;
  };

  const setSelectedCards = (cards, memberId) => {
    cards.forEach((card) => {
      const isSelected = card.dataset.memberId === String(memberId);
      card.classList.toggle("is-selected", isSelected);
      card.classList.toggle("is-faded", !isSelected);
      card.setAttribute("aria-pressed", String(isSelected));
    });
  };

  const renderMemberModal = (member) => {
    memberModalBody.innerHTML = `
      <div class="modal-portrait">
        <span class="modal-member-number">${twoDigit(member.id)}</span>
        <img src="${escapeHtml(member.image)}" alt="${escapeHtml(member.name)} profile">
        <div class="modal-portrait-overlay">
          <span>${escapeHtml(member.role)}</span>
          <strong>${escapeHtml(member.name)}</strong>
        </div>
      </div>

      <div class="modal-profile">
        <p class="eyebrow">Elite profile ${twoDigit(member.id)}</p>
        <h2 id="memberModalTitle">${escapeHtml(member.name)}</h2>
        <p class="modal-role">${escapeHtml(member.role)}</p>
        <p class="modal-summary">${escapeHtml(summarizeText(member.bio))}</p>

        <div class="modal-info-grid">
          <section>
            <h3>Core Skills</h3>
            ${createBadgeList(member.skills.slice(0, 4).map((skill) => skill.name))}
          </section>

          <section>
            <h3>Main Tools / Languages</h3>
            ${createBadgeList(member.programmingLanguages.slice(0, 5))}
          </section>
        </div>

        <section class="modal-contact">
          <h3>Contact</h3>
          ${createSocialLinks({ Email: `mailto:${member.email}`, ...member.socialLinks })}
        </section>
      </div>
    `;
  };

  const openMemberModal = (memberId) => {
    const member = findMember(memberId);
    if (!member) return;

    selectedMemberId = String(memberId);
    setSelectedCards(teamCards, memberId);

    const selectedCard = Array.from(teamCards).find((card) => card.dataset.memberId === String(memberId));
    selectedCard?.classList.add("is-launching");
    window.setTimeout(() => selectedCard?.classList.remove("is-launching"), 360);

    renderMemberModal(member);

    memberModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    window.requestAnimationFrame(() => {
      memberModal.classList.add("is-open");
    });
  };

  function closeMemberModal() {
    selectedMemberId = null;
    teamCards.forEach((card) => {
      card.classList.remove("is-selected", "is-faded");
      card.setAttribute("aria-pressed", "false");
    });

    memberModal.classList.remove("is-open");
    memberModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    window.setTimeout(() => {
      if (!memberModal.classList.contains("is-open")) {
        memberModalBody.innerHTML = "";
      }
    }, 260);
  }

  if (teamCards.length && memberModal && memberModalBody) {
    teamCards.forEach((card) => {
      card.addEventListener("click", () => openMemberModal(card.dataset.memberId));
    });

    memberModal.querySelectorAll("[data-modal-close]").forEach((control) => {
      control.addEventListener("click", closeMemberModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && memberModal.classList.contains("is-open")) {
        closeMemberModal();
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
