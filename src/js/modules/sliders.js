import { getZero } from "./timer";

function sliders({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  //Slider 1

  /* const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current");

  let slideIndex = 1;

  showSLides(slideIndex);

  total.textContent = getZero(slides.length);

  function showSLides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => (item.style.display = "none"));

    slides[slideIndex - 1].style.display = "block";

    current.textContent = getZero(slideIndex);
  }

  function plusSlides(n) {
    showSLides((slideIndex += n));
  }

  prev.addEventListener("click", () => {
    plusSlides(-1);
  });
  next.addEventListener("click", () => {
    plusSlides(1);
  }); */

  //Slider 2
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
    offset = 0;

  showCurrentNum(slideIndex);
  total.textContent = getZero(slides.length);

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const dots = document.createElement("ol"),
    dotsArr = [];
  dots.classList.add("carousel__dots");
  slider.append(dots);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i == 0) {
      dot.classList.add("dot_active");
    }
    dots.append(dot);
    dotsArr.push(dot);
  }

  function showCurrentNum(n) {
    current.textContent = getZero(n);
  }

  function showActiveDot(arr) {
    arr.forEach((dot) => dot.classList.remove("dot_active"));
    arr[slideIndex - 1].classList.add("dot_active");
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    showCurrentNum(slideIndex);

    slidesField.style.transform = `translateX(-${offset}px)`;

    showActiveDot(dotsArr);
  });

  next.addEventListener("click", () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    showCurrentNum(slideIndex);

    slidesField.style.transform = `translateX(-${offset}px)`;

    showActiveDot(dotsArr);
  });

  dotsArr.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      showCurrentNum(slideIndex);

      showActiveDot(dotsArr);
    });
  });
}

export default sliders;
