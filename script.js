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

  if (menuToggle && navMobile) {
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
