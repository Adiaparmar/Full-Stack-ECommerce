import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const questions = [
  {
    question: "Question1",
    answer:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  },
  {
    question: "Question2",
    answer:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  },
  {
    question: "Question3",
    answer:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  },
  {
    question: "Question3",
    answer:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  },
  {
    question: "Question3",
    answer:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  },
  {
    question: "Question3",
    answer:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  },
];

function Questions() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pl-4 justify-center items-center">
      <hr className="border-t-3 border-gray-500 mt-3 px-0 mx-0" />
      <div className="text-2xl my-3 font-bold ml-3 ">FAQs ..</div>
      <div className="w-[90vw] mt-6">
        {questions.map((item, index) => (
          <div className="item mb-2" key={index}>
            <div
              className="title cursor-pointer rounded-md border-gray-400 border-1 py-2 px-4 flex justify-between items-center bg-[#C2D2CA]"
              onClick={() => handleClick(index)}
            >
              <h2 className="font-semibold text-[#033e25] text-xl">
                {item.question}
              </h2>
              <span>{activeIndex === index ? <FaMinus /> : <FaPlus />}</span>
            </div>
            <div
              className={`content overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? "max-h-96" : "max-h-0"
              } bg-[#2D6A4F] text-white px-4 `}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;
