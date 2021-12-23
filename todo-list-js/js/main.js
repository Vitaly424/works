document.addEventListener('DOMContentLoaded', () => {

   const form = document.querySelector('[data-form]');
   const list = document.querySelector('[data-list]');
   const inputText = document.querySelector('[data-input]');
   const lengthTasks = document.querySelector('[data-task-length]');
   
   lengthTasks.textContent = 'Список задач пуст';

   window.state = {
      tasks: []
   }

   const colors = {
      black: "#000000",
      green: "#008000"
   }

   // Генерируем случайный ID, есть вероятность создать похожий ключ
   class GenerateID {
      constructor() {}

      setNumber(number) {
         this._number = number;
   
         if (this._number < 2000) {
            this._number = 2000;
         } else if(this._number > 2000) {
            this._number = this._number;
         } 
      }
   
      getIndex() {
         let number = this._number;
         let ids = [];
    
         for(let i = 0; i < number; i++) {
            let radnomArr = this.getArrayRandom();
            ids.push(radnomArr + i + radnomArr);
         }
         
         let n = Math.floor(Math.random() * ids.length);

         this.id = ids[n];
         return ids[n];
      }
   
      getArrayRandom() {
         let array = [
            'sdghd',
            'asddg',
            'sdhw3',
            '432gda',
            'ergdfs',
            'sfsdgh',
            'sfsd41'
         ]
   
         let random = Math.floor(Math.random() * array.length);
         return array[random];
      }
   }

   // Создаём объект с задачей
   class Task {
      constructor(text) {
         this.id = this.generateId();
         this.text = text;
      }

      generateId() {
         const generateIdObject = new GenerateID();
         generateIdObject.setNumber(2000);
         return generateIdObject.getIndex();
      }
   }

   // Отлавливаем событие submit
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      let inputTextValue = inputText.value;

      // Добавляем задачу в список
      addTask(inputTextValue);
   });


   list.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-remove')) {
         
         // Удаляем задачу из View
         e.target.closest('[data-task]').remove();

         // Обновляем количество задач
         getLengthTasks();
      }
   });

   inputText.addEventListener('input', () => {
      inputText.classList.remove('input--error');
      inputText.setAttribute('placeholder', 'Напишите свою задачу');
   });

   function addTask(inputTextValue) {

      // Добавляем задачу в модель, и возвращаем из неё значение
      const text = addModelTask(inputTextValue);

      if (inputTextValue !== '') {

         let templateTaskHtml = `
            <li class='task' data-task>
               <label class="label-checkbox">
                  <input class="label-checkbox__real" type="checkbox">
                  <span class="label-checkbox__custom"></span>
               </label>
               
               <div class="task__content">
                  <p class="task__text">${text}</p>
               </div>

               <div class="task__buttons">
                  <button class="button  button--remove" data-remove>Удалить</button>
               </div>
            </li>
         `;

         list.insertAdjacentHTML('afterbegin', templateTaskHtml);

         inputText.value = '';
         
         const tasks = document.querySelectorAll('[data-task]').length;

         getLengthTasks();
      } else {
         inputText.classList.add('input--error');
         inputText.setAttribute('placeholder', 'Заполните поле');
      }
   }


   // Устанавливает количество задач
   function getLengthTasks() {
      let tasksLength = state.tasks.length;

      if (tasksLength === 0) {
         lengthTasks.style.color = colors.black;
         lengthTasks.textContent = 'Список задач пуст';
      } else {
         lengthTasks.style.color = colors.green;
         lengthTasks.textContent = tasksLength;
      }
   }

   // Создаём объект с задачей, и записываем её в массив
   function addModelTask(data) {
      const objTask = new Task(data);
      state.tasks.push(objTask);
      return objTask.text;
   }

});