import { useEffect, useRef, useState } from "react";

export const useInView = (
  options = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target); // Stop observing after first trigger (one-time animation)
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isVisible };
};

export const FadeInSection = ({ children, className = "", id }) => {
  const { ref, isVisible } = useInView();

  return (
    <section
      ref={ref}
      id={id}
      className={`fade-in-section ${
        isVisible ? "fade-in-visible" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
};
