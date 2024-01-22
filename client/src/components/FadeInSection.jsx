import React from "react";
export default function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(`entry`, entry, `is = ${entry.isIntersecting}`);
        setVisible(entry.isIntersecting);
      });
    });

    const { current } = domRef;
    observer.observe(current);

    //                      👇
    return () => observer.unobserve(current);
  }, []);
  return (
    <div
      className={`fade-in-section ${
        isVisible
          ? "animate-fade-right animate-once animate-duration-300 animate-delay-[600ms]"
          : ""
      }`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}
