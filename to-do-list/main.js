window.addEventListener("DOMContentLoaded", function () {

   function DOMElements() {

      const DOM = {
         form: "#addForm",
         inputText: "#newItemText",
         inputFilter: "#filter",
         items: "#items",
         btnDelete: "#all-delete",
         taskItem: '.content__list-item'
      }

      return DOM;

   }

   const DOM = DOMElements();

   const form = document.querySelector(DOM.form);
   const inputText = document.querySelector(DOM.inputText);
   const items = document.querySelector(DOM.items);
   const inputFilter = document.querySelector(DOM.inputFilter);
   const allDelete = document.querySelector(DOM.btnDelete);

   const localTodo = localStorage.getItem("itemsTask");

   const taskList = localTodo ? JSON.parse(localTodo) : [];

   form.addEventListener("submit", addItem);
   items.addEventListener("click", deleteTask);
   inputFilter.addEventListener("keyup", filter);
   allDelete.addEventListener('click', deleteAllTask);

   function addItem(e) {

      e.preventDefault();

      const inputTextValue = inputText.value;

      if (inputTextValue === "") {

         alert("Введите задачу");

      } else {
         const html = `
            <li class="content__list-item">
               <p class="content__list-text">${inputTextValue}</p> 
               <button data-action="delete" type="button" class="content__item-delete">
                     Удалить
               </button>
            </li>
         `;

         items.insertAdjacentHTML("afterbegin", html);

         taskList.push(inputTextValue);
         localStorage.setItem("itemsTask", JSON.stringify(taskList));

         inputText.value = "";
      }

   }

   function deleteTask(e) {

      if (e.target.classList.contains("content__item-delete")) {

         if (confirm()) {
            const itemTask = e.target.closest(".content__list-item");
            const itemText = itemTask.querySelector(".content__list-text");

            taskList.forEach(item => {
               if(item === itemText.textContent) {
                  let indexElement = taskList.indexOf(item);
                  taskList.splice(indexElement, 1);
               }
            }); 

            localStorage.setItem("itemsTask", JSON.stringify(taskList));

            itemTask.remove();
         }

      }

   }

   function filter() {
      const itemsTask = items.querySelectorAll(".content__list-item");

      if (itemsTask.length > 0) {
         itemsTask.forEach(item => {
            let textTask = item.querySelector(".content__list-text").textContent.trim().toLowerCase();
            let textFilter = this.value.trim().toLowerCase();

            item.classList.add("remove");


            if (textTask.includes(textFilter)) {
               item.classList.remove("remove");
            }

         });
      }
   }

   function localData() {
      taskList.forEach(item => {
         const html = `
            <li class="content__list-item">
               <p class="content__list-text">${item}</p> 
               <button data-action="delete" type="button" class="content__item-delete">
                     Удалить
               </button>
            </li>
         `

         items.insertAdjacentHTML("beforeend", html);
      });
   }

   localData();


   function deleteAllTask() {

      if (confirm('Вы точно желаете всё удалить?')) {
         taskList.length = 0;
         items.innerHTML = "";
         localStorage.setItem('itemsTask', JSON.stringify(taskList));
      }

   }


});   