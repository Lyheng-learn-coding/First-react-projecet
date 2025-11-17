import { FaGithub } from "react-icons/fa";

function Footer({ class1, class2, class3 }) {
  return (
    <footer
      className={`bg-[#393939] w-full p-2.5 flex justify-center items-center text-white ${class1} ${class2} ${class3}`}
    >
      <div className="text-[1.2rem] flex gap-3 items-center justify-center">
        <p className="font-extralight">By Lyheng</p>
        <a
          className="text-[1.5rem]"
          href="https://github.com/Lyheng-learn-coding"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
