import React, { useState } from 'react';
import './FAQ.css';
import '../pageStyles/NavbarFAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: "Question 1", answer: "Answer to question 1." },
    { question: "Question 2", answer: "Answer to question 2." },
    { question: "Question 3", answer: "Answer to question 3." },
    { question: "Question 4", answer: "Answer to question 4." },
    { question: "Question 5", answer: "Answer to question 5." },
  ];

  return (
    <div className="faq-container">
      <nav className="navbarFAQ">
        <div className="navbar-left">
          <a href="/homePage">←</a>
        </div>
        <div className="navbar-center">
          <span>TechTips</span>
        </div>
      </nav>


      <h1>Frequently Asked Questions</h1>
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleQuestion(index)}>
              <span>{faq.question}</span>
              <span className="toggle-icon">{openIndex === index ? 'v' : '^'}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
