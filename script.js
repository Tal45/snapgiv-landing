document.addEventListener("DOMContentLoaded", () => {
  // Check and fix image paths if needed
  const images = document.querySelectorAll('img[src^="/logo.png"]')
  images.forEach((img) => {
    img.onerror = function () {
      // If the image fails to load with the leading slash, try without it
      this.src = this.src.replace("/logo.png", "logo.png")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMobile = document.querySelector(".nav-mobile")

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("menu-open")
    navMobile.classList.toggle("show")
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".nav-mobile .nav-link")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("menu-open")
      navMobile.classList.remove("show")
    })
  })

  // Contact form submission with mailto
  function handleFormSubmit(e) {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const eventDate = document.getElementById("eventDate").value
    const message = document.getElementById("message").value

    // Format date if provided
    const formattedDate = eventDate ? new Date(eventDate).toLocaleDateString() : "Not specified"

    // Create email subject and body
    const subject = `SnapGiv Inquiry from ${name}`
    const body = `Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Event Date: ${formattedDate}

Message:
${message}`

    // Create mailto link
    const mailtoLink = `mailto:snapgiv@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Show loading state
    const submitBtn = document.querySelector(".btn-submit")
    const originalBtnText = submitBtn.innerHTML

    submitBtn.innerHTML = `
      <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
      </svg>
      Opening Email...
    `
    submitBtn.disabled = true

    // Short delay to show loading state before opening email client
    setTimeout(() => {
      // Open email client
      window.location.href = mailtoLink

      // Show success message after a brief delay
      setTimeout(() => {
        const contactForm = document.getElementById("contactForm")
        const formSuccess = document.getElementById("formSuccess")

        contactForm.style.display = "none"
        formSuccess.style.display = "flex"
        submitBtn.innerHTML = originalBtnText
        submitBtn.disabled = false
        contactForm.reset()
      }, 1000)
    }, 500)

    return false
  }

  const contactForm = document.getElementById("contactForm")
  const formSuccess = document.getElementById("formSuccess")

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  // Keep the rest of the contact form code for the "send another message" functionality
  const sendAnother = document.getElementById("sendAnother")
  if (sendAnother) {
    sendAnother.addEventListener("click", () => {
      formSuccess.style.display = "none"
      contactForm.style.display = "flex"
    })
  }

  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Add animation to steps on scroll
  const steps = document.querySelectorAll(".step")

  function checkScroll() {
    steps.forEach((step) => {
      const stepTop = step.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (stepTop < windowHeight * 0.8) {
        step.style.opacity = "1"
        step.style.transform = "translateY(0)"
      }
    })
  }

  // Initialize steps with opacity 0 and transform
  steps.forEach((step) => {
    step.style.opacity = "0"
    step.style.transform = "translateY(20px)"
    step.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Check on load and scroll
  checkScroll()
  window.addEventListener("scroll", checkScroll)
})
