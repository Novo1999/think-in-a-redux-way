export const changeIsCorrect = (prevQuizInfo, optionNum) => {
  const updatedOptions = prevQuizInfo.options.map((option, index) => {
    if (index === optionNum) {
      return { ...option, isCorrect: true }
    } else {
      return { ...option, isCorrect: false }
    }
  })

  return {
    ...prevQuizInfo,
    options: updatedOptions,
  }
}
