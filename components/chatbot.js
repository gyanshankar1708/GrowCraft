// ---------------- FAQ and Quick Questions ----------------
const FAQ = [
  {
    triggers: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
    response: "Hello 👋! How can I help you today?"
  },
  {
    triggers: ["thanks", "thank you", "thx"],
    response: "You're welcome! 😊 Happy to help."
  },
  {
    triggers: ["bye", "goodbye", "see you", "later"],
    response: "Goodbye! 👋 Have a great day!"
  },
  {
    triggers: ["how are you", "how r u", "how are u"],
    response: "I’m just a bot 🤖 but I’m doing great! Thanks for asking. How can I assist you?"
  },
  {
    triggers: ["what is growcraft", "growcraft", "about growcraft"],
    response: "🌱 <b>GrowCraft</b> is your go-to platform for helping businesses <b>thrive online</b>! We also provide hands-on <b>training</b> and <b>internship programs</b> for students to gain <b>real-world experience</b>."
  },
  {
    triggers: ["services", "offerings", "digital services"],
    response: `🚀 We offer a full <b>digital growth toolkit</b> for businesses:<br>\n
💻 <b>Website Development</b> – Sleek, responsive websites<br>\n
📈 <b>Digital Marketing</b> – Reach your audience with impact<br>\n
🤳 <b>Social Media Management</b> – Grow your online community<br>\n
🎨 <b>Graphic Design</b> – Make your brand visually unforgettable<br>\n
✍️ <b>Content Writing</b> – Words that convert visitors into customers<br>\n
🛡️ <b>Cyber Analysis</b> – Keep your digital assets secure<br>\n
💡 Explore all services on our <b>Services page</b>.`
  },
  {
    triggers: ["How can i join the internship program", "training program", "student program"],
    response: "🎓 Our <b>Training & Internship Program</b> helps students gain <b>real-world experience</b>. Work on <b>live projects</b>, learn new skills, and grow professionally. Check out the <b>Careers</b> or <b>Services</b> page to apply."
  },
  {
    triggers: ["portfolio", "past work", "projects", "our work"],
    response: "📂 We have detailed <b>case studies</b> of our projects in <b>marketing</b>, <b>web design</b>, and <b>branding</b>. Visit the <b>Our Work</b> page to see how we’ve helped businesses <b>shine online</b>."
  },
  {
    triggers: ["contact", "quote", "start project", "get a quote"],
    response: "✨ To start a <b>project</b> or get a <b>quote</b>, visit our <b>Contact Us</b> page, fill out the form with your <b>project details</b>, and we’ll get back to you!"
  },
  {
    triggers: ["blog", "articles", "resources"],
    response: "📝 Read our latest <b>insights</b> on <b>digital marketing trends</b>, <b>website guides</b>, and <b>industry tips</b> on the <b>Blogs</b> page."
  },
  {
    triggers: ["team","who is behind growcraft", "about us"],
    response: "💡<b>GrowCraft</b> is powered by a team of <b>innovators</b> and <b>digital enthusiasts</b> on a mission to help businesses <b>grow</b>. Learn more on the <b>About Us</b> page."
  },
  {
    triggers: [],
    response: "Sorry, I didn’t understand. Please try asking differently."
  }
];

const QUICK_QUESTIONS = [
  "What is GrowCraft?",
  "What services do you offer?",
  "How can i join the internship program?",
  "Can I see examples of your past work?",
  "How do I start a project or get a quote?",
  "Where can I read your blog or articles?",
  "Who is behind growCraft?",
  "How to contact support?"
];

  
  // ---------------- Elements ----------------
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");
  const chatWindow = document.getElementById("chatWindow");
  const quickDiv = document.getElementById("quickQuestions");


  // ---------------- Render Quick Questions (Horizontal + See More / See Less) ----------------
  let showFirstFour = true; // true = show first 4, false = show last 4

  function renderQuickQuestions() {
    quickDiv.innerHTML = ""; // clear existing buttons

    // Decide which 4 questions to show
    const questionsToShow = showFirstFour 
        ? QUICK_QUESTIONS.slice(0,4) 
        : QUICK_QUESTIONS.slice(4,8);

    // Add question buttons
    questionsToShow.forEach(q => {
      const btn = document.createElement("button");
      btn.textContent = q;
      btn.className = "quick-question-btn";
      btn.onclick = () => sendMessage(q);
      quickDiv.appendChild(btn);
    });

    // Add See More / See Less toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = showFirstFour ? "See More " : "See Less ";
    toggleBtn.className = "quick-question-btn toggle-btn";
    toggleBtn.onclick = () => {
      showFirstFour = !showFirstFour;
      renderQuickQuestions();
    };
    quickDiv.appendChild(toggleBtn);
  }

  // Initial render
  renderQuickQuestions();


  // ---------------- Toggle Chat ----------------
  function toggleChat() {
    chatWindow.classList.toggle("open");
    if(chatWindow.classList.contains("open")) chatInput.focus();
  }

  // ---------------- Send Message ----------------
  function sendMessage(customText) {
    const text = customText || chatInput.value.trim();
    if (!text) return;
    addMessage("user", text);
    chatInput.value = "";
    setTimeout(() => {
      const response = findResponse(text);
      addMessage("bot", response);
    }, 500);
  }

  // ---------------- Add Message to Chat ----------------
  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = `chatbot-msg ${sender}-msg`;
    msg.innerHTML = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // ---------------- Find Response ----------------
  // function findResponse(text) {
  //   const lc = text.toLowerCase();
  //   for (const item of FAQ) {
  //     if (item.triggers.some(trig => lc.includes(trig))) return item.response;
  //   }
  //   return FAQ.find(i => i.triggers.length === 0).response;
  // }
//   function findResponse(text) {
//   const lc = text.toLowerCase();
//   for (const item of FAQ) {
//     if (item.triggers.some(trig => lc.includes(trig.toLowerCase()))) {
//       return item.response;
//     }
//   }
//   return FAQ.find(i => i.triggers.length === 0).response;
// }
function findResponse(text) {
  const lc = text.toLowerCase();

  // Sort FAQ triggers by length (longest first)
  const sortedFAQ = [...FAQ].sort((a, b) => {
    const maxA = Math.max(...a.triggers.map(t => t.length), 0);
    const maxB = Math.max(...b.triggers.map(t => t.length), 0);
    return maxB - maxA;
  });

  for (const item of sortedFAQ) {
    if (item.triggers.some(trig => lc.includes(trig.toLowerCase()))) {
      return item.response;
    }
  }

  return FAQ.find(i => i.triggers.length === 0).response;
}

  // ---------------- Support Enter Key ----------------
  chatInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
  });
