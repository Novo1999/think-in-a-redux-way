export const changeOption = (prevQuizInfo, e, optionNum) => {
  const newOption = e.target.value
  const updatedOptions = prevQuizInfo.options.map((option, index) => {
    if (index === optionNum) {
      return { ...option, option: newOption }
    } else {
      return option
    }
  })

  return {
    ...prevQuizInfo,
    options: updatedOptions,
  }
}
