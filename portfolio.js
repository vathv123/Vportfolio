let musicPlayed = document.querySelector(".musicPlayed");
let audio = musicPlayed.querySelector("audio");
let playIcon = musicPlayed.querySelector(".play");
let pauseIcon = musicPlayed.querySelector(".pause");
// smoothScrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth curve
  smooth: true,
  direction: "vertical",
  gestureDirection: "vertical",
//   scrollElements: ['.lenis-scrollable'],
  smoothTouch: true,
  touchMultiplier: 1.5,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

  

// cursorMove
document.body.addEventListener("mousemove", (dets) =>{
    gsap.to("#cursor", {
        x: dets.clientX, 
        y: dets.clientY, 
        ease: "back.out"
    })
})

// scrollBar
window.addEventListener("scroll", () => {
    const scrollPercentage = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
    const scrollbarHeight = window.innerHeight * (window.innerHeight / document.documentElement.scrollHeight) + 50;
    const scrollbarPosition = scrollPercentage * (window.innerHeight - scrollbarHeight);
  
    gsap.to("#scrollBar", {
      y: scrollbarPosition, 
      height: scrollbarHeight,
      ease: "power2.out"
    });
});

// scaleFixed
// function scaleContent() {
//   let scaleX = window.innerWidth / 1920; 
//   let scaleY = window.innerHeight / 1080;
//   let scale = Math.min(scaleX, scaleY);  

//   document.querySelectorAll(".page").forEach((elem) => {
//     elem.style.transform = `scale(${scale})`;

//     // Adjust height to scaled height
//     // assuming 1080px is original height of page elements
//     elem.style.height = `${1080 * scale}px`;
//   });
// }


// window.addEventListener("resize", scaleContent); 
// scaleContent(); 

// incrementLoading
let incrementElement = document.getElementById("increment");
let startTime = performance.now();

function getDynamicDuration() {
    let elapsedTime = performance.now() - startTime;
    let duration = Math.max(0.5, Math.min(4, (elapsedTime / 1000) * 0.5));
    return duration;
}

let tl = gsap.timeline();

tl.to({ val: 0 }, {
    val: 10,
    duration: 2,
    ease: "none",
    onUpdate: function() {
        incrementElement.textContent = Math.floor(this.targets()[0].val);
    }
})
.to({ val: 10 }, {
    val: 30,
    duration: 1,
    delay: 1,
    onUpdate: function() {
        incrementElement.textContent = Math.floor(this.targets()[0].val);
    }
})
.to({ val: 90 }, {
    val: 99,
    duration: getDynamicDuration(),
    ease: "power4.out",
    onUpdate: function() {
        incrementElement.textContent = Math.floor(this.targets()[0].val);
    },
    onComplete: function () {
        gsap.to(asideLoading, {
            duration: 2,
            width: "0%",
            transform: "translateX(-100%) skewX(-10deg)",
            ease: "power4.inOut",
        });
        
        gsap.to("#increment", {
            duration: 2,
            x: -300,
            ease: "power4.inOut",
        });
        
        gsap.to("#pageAll", {
            duration: 2.3,
            transform: "translateX(0%)",
            ease: "power4.inOut",
            clipPath: "inset(0% 0% 0% 0%)",
            onComplete: function() {
                musicPlayed.style.display = 'flex';
                gsap.to("#navBefore", {
                    opacity: 0,
                    onComplete: function() {
                        gsap.to("#fixedDuplication", {
                            opacity: 1,
                            onComplete: function() {
                                gsap.to("#set", {
                                    display: "flex",
                                    onComplete: function() {
                                        gsap.registerPlugin(ScrollTrigger);

                                        const paragraphs = document.querySelectorAll(".pWrapper p");
                                        const textWrapAll = document.querySelectorAll(".textWrapAll");

                                        textWrapAll.forEach((element) => {
                                        let words = element.innerHTML.split(/(\s+|<br>)/); 

                                        
                                        element.innerHTML = words.map(word =>
                                            word.trim() === "<br>" ? "<br>" : 
                                            `<span class="splitTxts" style="opacity: 0; display: inline-block;">${word}</span>`
                                        ).join(" ");

                                        let spans = element.querySelectorAll(".splitTxts");

                                        gsap.set(spans, { opacity: 0, x: 40, });

                                        gsap.to(spans, {
                                            opacity: 1,
                                            x: 0,
                                            stagger: 0.05,
                                            duration: 2,
                                            ease: "power4.out",
                                            scrollTrigger: {
                                              trigger: element,
                                              start: "top 80%", 
                                              toggleActions: "play reverse none reverse",
                                              scrub: 3,
                                            }
                                          });
                                        });

                                        gsap.set(paragraphs, { opacity: 0, y: 0 });

                                        paragraphs.forEach(p => {
                                            gsap.to(p, {
                                                y: 0,
                                                opacity: 1,
                                                duration: 1.5,
                                                scrollTrigger: {
                                                    trigger: p,
                                                    start: "top 50%",
                                                    end: "top 30%",
                                                    scrub: 1,
                                                    toggleActions: "play none none reverse",
                                                }
                                            });
                                        });
                                    }
                                });
                                gsap.fromTo("#scrollBar", 
                                    {
                                        x: 5,
                                        opacity: 0
                                        
                                    },
                                    {
                                        x: 0,
                                        opacity: 1,
                                    }
                                )
                            }
                        })
                    }
                })
            }
        });  
        // gsap.from("#textWrap span", {
        //     opacity: 0,
        //     x: 50,
        //     stagger: {
        //         amount: 1,  // total duration of staggered movement
        //         from: "start", // Starting from the first letter
        //     },
        //     duration: 1,
        //     ease: "power4.out",
        //     rotation: function() {
        //         return Math.random() * 10 - 5; // Random rotation effect
        //     },
        //     yoyo: true, // Make it reverse the movement
        //     delay: 0.5, // Delay before animation starts
        // });

        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
        trigger: "#page1",  
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none none", 

        onEnter: () => {
            gsap.fromTo("#textWrap span", {
            opacity: 0,
            x: 90
            }, {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 1,
            delay: 0.4,
            ease: "power4.out",
            });
        },
        onLeave: () => {
            gsap.set("#textWrap span", { opacity: 0, x: 90 });
        },

        onEnterBack: () => {
            gsap.set("#textWrap span", { opacity: 0, x: 90 }); 

            gsap.delayedCall(0.5, () => {
            gsap.fromTo("#textWrap span", {
                opacity: 0,
                x: 90
            }, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power4.out",
            });
            });
        },

        onLeaveBack: () => {
            gsap.set("#textWrap span", { opacity: 0, x: 90 });
        }
        });


        gsap.to(".header__opening", {
            animation: "dashOpening 3s cubic-bezier(.05, .8, .1, .95) forwards",
            delay: 2,
            onComplete: function() {
                gsap.to(".header__arrow", {
                    display: "block",
                    animation: "arrowMove 0.5s cubic-bezier(.05, .8, .1, .95) forwards",
                    delay: 1,
                    onComplete: function() {
                        gsap.to(".header__opening", {
                            display: "none",
                            delay: -2,
                        });
                        gsap.to(".header__arrow__triangle", {
                            delay: 0.5,
                            display: "block"
                        })
                    }
                })
            }
        })
    }
});    

//swiperSlide
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  speed: 1200,
  simulateTouch: true,
  grabCursor: true,
  resistance: true,
  resistanceRatio: 0.65,
  threshold: 5,
  touchRatio: 1.25,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

swiper.update(); 
swiper.slideToLoop(3, 0); 





const hoverBoxs = document.querySelectorAll(".swiper-slide")
hoverBoxs.forEach( (elem) => {
    elem.addEventListener("mouseenter", () => {
        if (elem.classList.contains("swiper-slide-active")) {
            document.querySelector("#cursor").innerHTML = 'VIEW PROJECT',
            gsap.to("#cursor", {
                width: "120px", 
                height: "120px", 
                duration: 0.3,
                ease: "power1.out"
            });
        }
    });
    elem.addEventListener("mouseleave", () => {
        if (elem.classList.contains("swiper-slide-active")) {
            document.querySelector("#cursor").innerHTML = '',
            gsap.to("#cursor", {
                width: "20px", 
                height: "20px", 
                duration: 0.3,
                ease: "power1.out"
            });
        }
    });  
})

//inspectBlock
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});
document.onkeydown = function (e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73)) {
        e.preventDefault();
    }
};

// downloadFile
document.querySelector("#resume").addEventListener("click", function() {
    const link = document.createElement("a");
    link.href = "File/Resume.pdf"; 
    link.download = "File/ResumeModel1.pdf"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

//marqueEffect
let touchStartX = 0;
  let currentDirection = null;

  function scrollMarquee(forward) {
    // Avoid restarting the same animation
    if (currentDirection === forward) return;
    currentDirection = forward;

    // Rotate arrow
    gsap.to(".marque img", {
      rotate: forward ? 180 : 0,
      duration: 1,
      ease: "power2.out"
    });

    // Animate scroll
    gsap.to(".marque", {
      xPercent: forward ? -200 : 0,
      duration: 10, // Slower = longer
      repeat: -1,
      ease: "linear"
    });
  }

  // Desktop scroll
  window.addEventListener("wheel", (e) => {
    scrollMarquee(e.deltaY > 0);
  });

  // Mobile touch scroll
  window.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  window.addEventListener("touchmove", (e) => {
    const deltaX = e.touches[0].clientX - touchStartX;
    scrollMarquee(deltaX < 0); // swipe left = forward
  });


// musicPlayed


let isPlaying = false;

musicPlayed.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play();
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
        isPlaying = true;
    } else {
        audio.pause();
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
        isPlaying = false;
    }
});



const pathElement = document.querySelector("svg path");
  const line = document.querySelector("#line");
  const finalPath = "M 10 100 Q 400 100 790 100";

  line.addEventListener("mousemove", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    // Adjust control point freely with extended range for upward movement
    const adjustedY = y < 100 ? y - (100 - y) * 2 : y; 

    const path = `M 10 100 Q ${x} ${adjustedY} 790 100`;

    gsap.to(pathElement, {
      attr: { d: path },
      duration: 0.2,
      ease: "power2.out",
    });
  });

  line.addEventListener("mouseleave", () => {
    gsap.to(pathElement, {
      attr: { d: finalPath },
      duration: 0.8,
      ease: "elastic.out(1,0.2)"
    });
  });

   function playAllVideos() {
    document.querySelectorAll("video").forEach((video) => {
      video.play().catch((e) => {
        // Just catch and ignore autoplay errors silently
      });
    });
  }

  // Play on first touch or scroll
  window.addEventListener("touchstart", playAllVideos, { once: true });
  window.addEventListener("scroll", playAllVideos, { once: true });
  window.addEventListener("click", playAllVideos, { once: true });


  if (window.innerWidth < 768) { // 768px is a common breakpoint for tablets/phones
    alert("For the best experience, please view this on a computer.");
}

