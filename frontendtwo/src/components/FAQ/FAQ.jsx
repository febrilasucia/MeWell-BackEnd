import  React from 'react'
import { BsFillArrowDownCircleFill } from "react-icons/bs";

function FAQ() {

const data = [
  {
    question: 'What Is Lorem Ipsum 1?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolor commodi aspernatur explicabo hic quis minima magni eligendi, voluptate, earum natus rem optio quisquam? Earum ad nulla eveniet! Natus, rem.'
  },
  {
    question: 'What Is Lorem Ipsum 2?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolor commodi aspernatur explicabo hic quis minima magni eligendi, voluptate, earum natus rem optio quisquam? Earum ad nulla eveniet! Natus, rem.'
  },
  {
    question: 'What Is Lorem Ipsum 3?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolor commodi aspernatur explicabo hic quis minima magni eligendi, voluptate, earum natus rem optio quisquam? Earum ad nulla eveniet! Natus, rem.'
  },
  {
    question: 'What Is Lorem Ipsum 4?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolor commodi aspernatur explicabo hic quis minima magni eligendi, voluptate, earum natus rem optio quisquam? Earum ad nulla eveniet! Natus, rem.'
  },
  {
    question: 'What Is Lorem Ipsum 5?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolor commodi aspernatur explicabo hic quis minima magni eligendi, voluptate, earum natus rem optio quisquam? Earum ad nulla eveniet! Natus, rem.'
  },
]

  return (
    <>
        <div className="container-faq  w-[40%] m-auto mt-[100px]">

          <h2 className='text-center text-2xl font-bold text-blue-400 mb-20'>Frequently Asked Quoestion <span className='underline underline-offset-8'>(FAQs)</span></h2>

            {/* <div className="Question-Section">
              <div className="accordion flex my-8 w-[100%] px-5 py-4 border-2 border-blue-600 cursor-pointer rounded-full">
                  <span className="icon text-[30px] text-blue-400 mr-3 transform transition-all ease-in duration-500"><BsFillArrowDownCircleFill /> </span>
                  <h5 className='flex justify-center items-center text-[20px] font-semibold'>What is Lorem Ipsum?</h5>
              </div>
              <div className="panel px-10 ml-9 border-l-blue-600 border-l-2 max-h-[300px] text-justify overflow-hidden transform transition-all duration-500 ease-in">
                  <p className='text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate adipisci totam repudiandae qui maiores accusamus maxime quae, incidunt saepe autem nobis. Id numquam animi quis velit incidunt officia quibusdam.</p>
              </div>
            </div> */}

            {data.map((item, i) => (
              <div className="Question-Section" key={i}>
              <div className="accordion flex my-8 w-[100%] px-5 py-4 border-2 border-blue-600 cursor-pointer rounded-full">
                  <span className="icon text-[30px] text-blue-400 mr-3 transform transition-all ease-in duration-500"><BsFillArrowDownCircleFill /></span>
                  <h5 className='flex justify-center items-center text-[20px] font-semibold'>{item.question}</h5>
              </div>
              <div className="panel px-10 ml-9 border-l-blue-600 border-l-2 max-h-[300px] text-justify overflow-hidden transform transition-all duration-500 ease-in">
                  <p className='text-md'>{item.answer}</p>
              </div>
            </div>
            ))}



            {/* <div className="Question-Section">
              <div className="accordion flex my-8 w-[100%] px-5 py-4 border-2 border-blue-600 cursor-pointer rounded-full">
                  <span className="icon text-[30px] text-blue-400 mr-3 transform transition-all ease-in duration-500"><BsFillArrowDownCircleFill /> </span>
                  <h5 className='flex justify-center items-center text-[20px] font-semibold'>What is Lorem Ipsum?</h5>
              </div>
              <div className="panel px-10 ml-9 border-l-blue-600 border-l-2 max-h-[300px] text-justify overflow-hidden transform transition-all duration-500 ease-in">
                  <p className='text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate adipisci totam repudiandae qui maiores accusamus maxime quae, incidunt saepe autem nobis. Id numquam animi quis velit incidunt officia quibusdam.</p>
              </div>
            </div> */}

        </div>
    </>
  )
}

export default FAQ