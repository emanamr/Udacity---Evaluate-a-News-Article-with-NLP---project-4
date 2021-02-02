function isUrlValid(string) {
    const regexp= /([https://|http://])*([www.])*\w+\.\w+\D+/
  if(regexp.test(string))
    {
      return true
    }
  else{
        return false;
      }
  }

  export { isUrlValid }
