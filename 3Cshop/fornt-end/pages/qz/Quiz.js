import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Quiz = () => {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const questions = [
    {
      id: 1,
      question: '你最常使用的3C電器是什麼？',
      options: [
        { text: '手機', score: 10 },
        { text: '筆記型電腦', score: 8 },
        { text: '平板電腦', score: 6 },
        { text: '智能手錶', score: 4 },
      ],
    },
    {
      id: 2,
      question: '你購買3C電器時最看重的是什麼？',
      options: [
        { text: '價格', score: 10 },
        { text: '品牌', score: 8 },
        { text: '功能', score: 6 },
        { text: '外觀設計', score: 4 },
      ],
    },
    {
      id: 3,
      question: '你通常多久會更換一次手機？',
      options: [
        { text: '每年', score: 10 },
        { text: '每兩年', score: 8 },
        { text: '每三年或更久', score: 6 },
        { text: '只有在手機壞掉時才更換', score: 4 },
      ],
    },
    {
      id: 4,
      question: '你喜歡使用哪種操作系統？',
      options: [
        { text: 'iOS', score: 10 },
        { text: 'Android', score: 8 },
        { text: 'Windows', score: 6 },
        { text: 'macOS', score: 4 },
      ],
    },
    {
      id: 5,
      question: '你對新技術的接受程度如何？',
      options: [
        { text: '非常高', score: 10 },
        { text: '較高', score: 8 },
        { text: '一般', score: 6 },
        { text: '較低', score: 4 },
      ],
    },
    {
      id: 6,
      question: '你對環保的重視程度如何？',
      options: [
        { text: '非常重視', score: 10 },
        { text: '較重視', score: 8 },
        { text: '一般', score: 6 },
        { text: '不太重視', score: 4 },
      ],
    },
  ]

  const handleChange = (id, answer) => {
    setAnswers({ ...answers, [id]: answer })
    setErrors({ ...errors, [id]: null })
  }

  //計分器 把每個選項的score加起來
  const CalculateAns = (answers) => {
    let totalScore = 0
    for (const answer of Object.values(answers)) {
      totalScore += answer.score
    }

    //判斷式 依totalScore值來決定recommendation的內容 (也可以用switch判斷式)
    if (totalScore >= 50) {
      return '最新款智能手機'
    } else if (totalScore >= 40) {
      return '高性能筆記型電腦'
    } else if (totalScore >= 30) {
      return '輕薄平板電腦'
    } else {
      return '智能手錶'
    }
  }

  const handleSubmit = () => {
    const newErrors = {}
    questions.forEach((q) => {
      if (!answers[q.id]) {
        newErrors[q.id] = '尚未回答此問題'
      }
    })

    // length如果>0，代表有選項沒填
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    console.log('送出的資料:', answers)
    const recommendation = CalculateAns(answers)
    showCalculateAns(recommendation)
    setSubmitted(true)
  }

  //跳出Toastify訊息
  const showCalculateAns = (recommendation) => {
    toast(`我們推薦您購買：${recommendation}`)
  }

  return (
    <div>
      {/* 用map把questions陣列排出來 */}
      {questions.map((q) => (
        <div key={q.id}>
          <h5>{q.question}</h5>
          {q.options.map((option) => (
            <label key={option.text}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={option.text} // 顯示text內容
                onChange={() => handleChange(q.id, option)}
                disabled={submitted} // 禁用選項
              />
              {option.text}
            </label>
          ))}
          {errors[q.id] && (
            <p style={{ color: 'red', fontSize: '12px' }}>{errors[q.id]}</p>
          )}
          <hr />
        </div>
      ))}
      <button onClick={handleSubmit} disabled={submitted}>
        提交
      </button>
      <ToastContainer />
    </div>
  )
}

export default Quiz
