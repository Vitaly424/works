(function () {

   var Question = function (question, answers, currect) {
      this.question = question;
      this.answers = answers;
      this.correct = currect;
   }

   Question.prototype.displayQuestion = function () {
      console.log("%c" + this.question, "background: blue; color: #fff");

      for (var i = 0; i < this.answers.length; i++) {
         console.log(i + ": " + this.answers[i]);
      }

   };

   Question.prototype.checkAnswer = function (answer, callback) {

      var innerScore;

      if (answer === this.correct) {
         console.log('%c Правильный ответ', "background: green; color: #fff;");
         innerScore = callback(true);
      } else {
         console.log('%c Неверный ответ, попробуйте ещё раз', "background: red; color: #fff;");
         innerScore = callback(false);
      }

      this.displayScore(innerScore);

   };


   Question.prototype.displayScore = function(score) {
      console.log(`%c Ваш счёт равен ${score}`, "background: orange;");
   }


   var q1 = new Question(
      "JavaScript самый лучший язык программирования?",
      ["Да", "Нет"],
      0
   );

   var q2 = new Question(
      "this внутри метода всегда ссылается на?",
      ["Window", "Document", "Объект"],
      2
   );

   var q3 = new Question(
      "Что такое skope в javaScript?",
      ["Документ с разметкой", "Все методы внутри объекта", "Движок javaScript", "Область видимости"],
      3
   );

   var questions = [q1, q2, q3];

   function score() {
      var scoreValue = 0;

      return function (correct) {
         if (correct) {
            scoreValue++;
         }
         return scoreValue;
      }
   }

   var keepScoe = score();

   function nextQuestion() {
      var n = Math.floor(Math.random() * questions.length);

      questions[n].displayQuestion();

      var answer = prompt("Введите номер верного ответа");

      questions[n].checkAnswer(parseInt(answer), keepScoe);

      if (answer !== "exit" && answer !== null) {
         nextQuestion();
      }
   }


   nextQuestion();


})();

