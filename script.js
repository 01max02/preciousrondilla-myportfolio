document.addEventListener("DOMContentLoaded", () => {
  // Toggle mobile menu
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // Smooth scrolling for navigation links
  const links = document.querySelectorAll("header nav ul li a")
  const headerHeight = document.querySelector("header").offsetHeight

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      }

      // Get the target section
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        // Calculate position with offset for header
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Update active link
        links.forEach((link) => link.classList.remove("active"))
        this.classList.add("active")
      }
    })
  })

  // Update active link on scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100 // Added extra offset
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        links.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active")
          }
        })
      }
    })

    // Add shadow to header when scrolled
    const header = document.querySelector("header")
    if (scrollPosition > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
})

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  // Get header height for scroll calculations
  const headerHeight = document.querySelector("header").offsetHeight

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // Smooth scrolling with header offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      }

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Calculate position with offset for header
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Update active state in navigation
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active")
        })
        this.classList.add("active")
      }
    })
  })

  // Add shadow to header when scrolled
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header")
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Update active navigation link based on scroll position
    const scrollPosition = window.scrollY

    // Get all sections and their positions
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100 // Added extra offset for better UX
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active")
          }
        })
      }
    })
  })

  // Animation on Scroll
  const heroText = document.querySelector(".hero-text")
  const heroImage = document.querySelector(".hero-image")

  if (heroText && heroImage) {
    setTimeout(() => {
      heroText.style.opacity = "1"
      heroText.style.transform = "translateY(0)"
    }, 300)

    setTimeout(() => {
      heroImage.style.opacity = "1"
      heroImage.style.transform = "translateY(0)"
    }, 600)
  }

  // Add these styles to make the animations work
  const style = document.createElement("style")
  style.textContent = `
    .hero-text, .hero-image {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.8s ease;
    }
  `
  document.head.appendChild(style)

  // Add interactivity to the circles
  const circles = document.querySelectorAll(".circle")
  circles.forEach((circle) => {
    circle.addEventListener("mousedown", (event) => {
      const circleElement = event.target
      const shiftX = event.clientX - circleElement.getBoundingClientRect().left
      const shiftY = event.clientY - circleElement.getBoundingClientRect().top

      const moveAt = (pageX, pageY) => {
        circleElement.style.left = pageX - shiftX + "px"
        circleElement.style.top = pageY - shiftY + "px"
      }

      const onMouseMove = (event) => {
        moveAt(event.pageX, event.pageY)
      }

      document.addEventListener("mousemove", onMouseMove)

      circleElement.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", onMouseMove)
        circleElement.onmouseup = null
      })
    })

    circle.ondragstart = () => false // Disable default drag behavior
  })

  // About Section Scripts
  const scrollDescription = (direction) => {
    const content = document.querySelector(".pr-portfolio-card-content.scrollable")
    if (content) {
      if (direction === "up") {
        content.scrollTop -= 50
      } else {
        content.scrollTop += 50
      }
    }
  }

  // Make scrollDescription function available globally
  window.scrollDescription = scrollDescription

  // Removed JavaScript functionality related to 'pr-portfolio-certificate-modal'

  // Add functionality to enlarge certificates on click
  const certImages = document.querySelectorAll(".pr-portfolio-cert-box img")
  certImages.forEach((image) => {
    image.addEventListener("click", () => {
      const modal = document.createElement("div")
      modal.style.position = "fixed"
      modal.style.top = "0"
      modal.style.left = "0"
      modal.style.width = "100%"
      modal.style.height = "100%"
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
      modal.style.display = "flex"
      modal.style.justifyContent = "center"
      modal.style.alignItems = "center"
      modal.style.zIndex = "1000"

      const enlargedImg = document.createElement("img")
      enlargedImg.src = image.src
      enlargedImg.style.maxWidth = "90%"
      enlargedImg.style.maxHeight = "90%"
      enlargedImg.style.borderRadius = "10px"

      modal.appendChild(enlargedImg)

      modal.addEventListener("click", () => {
        modal.remove()
      })

      document.body.appendChild(modal)
    })
  })

  // Skills Section Scripts
  document.querySelectorAll(".skill-filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      document.querySelectorAll(".skill-filter-btn").forEach((btn) => btn.classList.remove("active"))
      // Add active class to the clicked button
      button.classList.add("active")

      // Hide all skill category contents
      document.querySelectorAll(".skill-content-panel").forEach((content) => content.classList.remove("active"))
      // Show the corresponding skill category content
      const category = button.getAttribute("data-category")
      document.getElementById(category).classList.add("active")
    })
  })

  // Project filter functionality
  document.querySelectorAll(".proj-filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      document.querySelectorAll(".proj-filter-button").forEach((btn) => btn.classList.remove("active"))
      // Add active class to the clicked button
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")

      // Filter projects
      document.querySelectorAll(".proj-item").forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "flex"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For now, just show an alert
      alert(`Thank you for your message! We'll get back to you at ${email} soon.`)

      // Reset form
      contactForm.reset()
    })
  }

  // JavaScript to handle modal functionality

  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();

      // Get the project ID from the button's data attribute
      const projectId = button.getAttribute('data-project');
      const projectDetails = getProjectDetails(projectId);

      // Create modal dynamically
      const modal = document.createElement('div');
      modal.classList.add('modal');

      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>${projectDetails.title}</h2>
          <p>${projectDetails.description}</p>
          <div class="modal-tech-tags">
            ${projectDetails.technologies.map(tech => `<span>${tech}</span>`).join('')}
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // Show the modal
      modal.style.display = 'block';

      // Close modal on clicking the close button
      modal.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
      });

      // Close modal on clicking outside the modal content
      window.addEventListener('click', event => {
        if (event.target === modal) {
          modal.style.display = 'none';
          modal.remove();
        }
      });
    });
  });

  // Function to get project-specific details
  function getProjectDetails(projectId) {
    const projectData = {
      'portfolio': {
        title: 'VenOs Point-of-Sale (POS) Web Application',
        description: 'VenOs is a web-based Point of Sale (POS) application developed as a group project to support small business owners who do not have the budget for expensive POS sytems. Core features include user authentication, sales tracking, inventory management, full CRUD (Create, Read, Update, Delete) operations for products and transactions, and automatic receipt generation after every sale. VenOs provides a practical and affordable solution for managing sales and keeping records organized.',
        technologies: ['HTML', 'CSS', 'PHP', 'SQLite']
      },
      'dashboard': {
        title: 'VenOs Point-of-Sale (POS) Mobile Application ',
        description: 'VenOs is a mobile Point of Sale (POS) application developed using Android Studio and SQLite, designed for small business owners who need an affordable and offline-friendly solution. The app features sales tracking, inventory management, product and transaction CRUD operations, and receipt generation. With its lightweight and user-friendly interface, VenOs empowers business owners to manage their sales anytime, anywhere—even without an internet connection.',
        technologies: ['Android Studio', 'Figma', 'SQLite', 'Firebase']
      },
      'new-project': {
        title: 'Liceo De Luisiana Library Management System (LMS)',
        description: 'Liceo de Luisiana LMS is a desktop application developed as a group project to help the school library efficiently manage their operations. Built using Java and XAMPP (MySQL), the system provides a user-friendly interface for librarians to manage book inventories, student records, and borrowing/return transactions. Key features include user login, book and student CRUD operations, real-time book availability tracking, and due date monitoring. Liceo de Luisiana LMS aims to simplify library tasks and improve resource management in an academic setting.',
        technologies: ['Java', 'NetBeans', 'Xampp', 'MySQL']
      }
    };

    return projectData[projectId] || {
      title: 'Xendora Ecommerce Website',
      description: 'Xendora is a group-developed eCommerce website for selling photography studio equipment, tools, and cameras. Built using HTML, CSS, JavaScript, Bootstrap, Flask, Firebase, MySQL, and Jinja2, it features a responsive design, secure user authentication, a dynamic product catalog with search and filter options, a real-time shopping cart, order tracking, and an admin dashboard for managing users, products, and orders—offering photographers a smooth and reliable shopping experience.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Python', 'Flask', 'Firebase', 'Jinja2', 'MySQL']
    };
  }

  // Infinite loop for Tech Stack icons
  const techStackSlider = document.querySelector("#languages .skill-slider");

  if (techStackSlider) {
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    // Clone the icons for infinite effect
    const cloneIcons = () => {
      const icons = Array.from(techStackSlider.children);
      icons.forEach((icon) => {
        const clone = icon.cloneNode(true);
        techStackSlider.appendChild(clone);
      });
    };

    cloneIcons();

    // Add smooth scrolling effect
    const startAutoScroll = () => {
      techStackSlider.scrollLeft += 1;
      if (techStackSlider.scrollLeft >= techStackSlider.scrollWidth / 2) {
        techStackSlider.scrollLeft = 0;
      }
      requestAnimationFrame(startAutoScroll);
    };

    startAutoScroll();

    // Add drag-to-scroll functionality
    techStackSlider.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      startX = e.pageX - techStackSlider.offsetLeft;
      scrollLeft = techStackSlider.scrollLeft;
    });

    techStackSlider.addEventListener("mouseleave", () => {
      isMouseDown = false;
    });

    techStackSlider.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    techStackSlider.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - techStackSlider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      techStackSlider.scrollLeft = scrollLeft - walk;
    });
  }

  // JavaScript for form submission feedback
  const form = document.querySelector('.styled-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    });
  }
})
