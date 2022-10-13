class _TextFormatter {
    constructor() {
      if (_TextFormatter.instance == null) {
        _TextFormatter.instance = this;
      }
      return _TextFormatter.instance;
    }
    getEllipsisText(text, maxLength) {
      let formattedText = text;
      if (formattedText.length > maxLength) {
        formattedText = formattedText.substr(0, maxLength);
        formattedText += '...';
      }
      return formattedText;
    }
    getHumanReadableDate(dateString){
      const date = new Date(dateString);
      const hours = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      
    }
    _getMonth(monthIndex){
      const month = ["January", "February", "March", "April", "June", "July",
                     "August", "September", "October", "November", "December"];

      return month[monthIndex]
    }
  }
  const TextFormatter = new _TextFormatter();
  Object.freeze(TextFormatter);
  export default TextFormatter;